import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import styles from "./LogsPage.module.css";
import { getLogs, Log } from "../../api/logs";

const LogsPage: React.FC = () => {
    const [logs, setLogs] = useState<Log[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchLogs = async () => {
        try {
            const data = await getLogs();
            setLogs(data);
        } catch (error) {
            console.error("Failed to fetch logs:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchLogs();
        const interval = setInterval(fetchLogs, 5000); // Обновляем ленту каждые 5 секунд
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Live Feed</h2>
            {loading ? (
                <p className={styles.loading}>Loading...</p>
            ) : (
                <ul className={styles.logList}>
                    {logs.map((log) => (
                        <li key={log.id} className={styles.logItem}>
                            {dayjs(log.timestamp).format("MMM DD hh:mm:ss A")} - {log.action}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LogsPage;
