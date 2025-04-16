import React, { useEffect, useState } from "react";
import { Card, Typography, Row, Col, Spin } from "antd";
import { fetchDashboardData, HourData, TimeStatsData, LeaderboardItem } from "../../api/dashboard";
import {
    LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Legend,
} from "recharts";
import styles from "./DashboardPage.module.css";
import {formatDecToTime, formatHour} from "../../utils/formatTime.ts";

const DashboardPage: React.FC = () => {
    const [data, setData] = useState<{
        chart_hours: HourData[];
        chart_time_stats: TimeStatsData[];
        chart_leaderboard: LeaderboardItem[];
    } | null>(null);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const res = await fetchDashboardData();
                setData(res);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading || !data) {
        return <Spin tip="Loading dashboard..." />;
    }

    return (
        <div className={styles.dashboardContainer}>
            <Row gutter={[24, 24]}>

                {/* Graph 1: Visits by Hour */}
                <Col span={24} className={styles.chartRow}>
                    <Card className={styles.chartCard}>
                        <Typography.Title level={4} className={styles.chartTitle}>
                            Office Visits by Hour
                        </Typography.Title>
                        <Typography.Paragraph type="secondary" className={styles.chartSubtitle}>
                            Shows the number of employees in the office for each hour (8 AM – 8 PM).
                            Useful for identifying peak office hours.
                        </Typography.Paragraph>

                        <div className={styles.chartWrapper}>
                            <LineChart
                                width={1000}
                                height={300}
                                data={data.chart_hours}
                                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                            >
                                <CartesianGrid stroke="#ccc" />
                                <XAxis
                                    dataKey="hour"
                                    tickFormatter={formatHour}
                                    tickMargin={8}
                                />
                                <YAxis
                                    label={{ value: "Employee Count", angle: -90, position: "insideLeft" }}
                                    tickMargin={8}
                                />
                                <Tooltip labelFormatter={(val) => `Hour: ${formatHour(Number(val))}`} />
                                <Legend />
                                <Line type="monotone" dataKey="count" stroke="#8884d8" name="Employees" />
                            </LineChart>
                        </div>
                    </Card>
                </Col>

                {/* Graph 2: Average Check in and Check out Times */}
                <Col span={12} className={styles.chartRow + " " + styles.chartCol}>
                    <Card className={styles.chartCard}>
                        <Typography.Title level={4} className={styles.chartTitle}>
                            Average Check-in & Check-out Times
                        </Typography.Title>
                        <Typography.Paragraph type="secondary" className={styles.chartSubtitle}>
                            Displays the average check-in and check-out times per weekday.
                            Helps detect patterns (e.g., leaving early on Friday).
                        </Typography.Paragraph>

                        <div className={styles.chartWrapper}>
                            <BarChart
                                width={600}
                                height={250}
                                data={data.chart_time_stats}
                                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                            >
                                <CartesianGrid stroke="#ccc" />
                                <XAxis
                                    dataKey="day"
                                    tickMargin={8}
                                />
                                <YAxis
                                    label={{ value: "Time (HH:MM)", angle: -90, position: "insideLeft" }}
                                    domain={[0, 24]}
                                    tickMargin={8}
                                />
                                <Tooltip
                                    formatter={(value) => {
                                        if (typeof value === "number") {
                                            return formatDecToTime(value);
                                        }
                                        return value;
                                    }}
                                />
                                <Legend />
                                <Bar dataKey="arrival" fill="#82ca9d" name="Check-in" />
                                <Bar dataKey="departure" fill="#8884d8" name="Check-out" />
                            </BarChart>
                        </div>
                    </Card>
                </Col>

                {/* Graph 3: Top Office-Hour Leaders */}
                <Col span={12} className={styles.chartRow + " " + styles.chartCol}>
                    <Card className={styles.chartCard}>
                        <Typography.Title level={4} className={styles.chartTitle}>
                            Top Office-Hour Leaders
                        </Typography.Title>
                        <Typography.Paragraph type="secondary" className={styles.chartSubtitle}>
                            Ranking employees by total hours spent in the office over the last 7 days.
                        </Typography.Paragraph>

                        <div className={styles.chartWrapper}>
                            <BarChart
                                width={600}
                                height={300}
                                data={data.chart_leaderboard}
                                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                            >
                                <CartesianGrid stroke="#ccc" />
                                <XAxis
                                    dataKey="name"
                                    tickMargin={8}
                                />
                                <YAxis
                                    label={{ value: "Hours Spent", angle: -90, position: "insideLeft" }}
                                    tickMargin={8}
                                />
                                <Tooltip formatter={(val) => `${val} h`} />
                                <Legend />
                                <Bar dataKey="hours" fill="#ff7300" name="Hours" />
                            </BarChart>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default DashboardPage;
