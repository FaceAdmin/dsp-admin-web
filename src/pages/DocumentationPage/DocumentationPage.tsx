import React from "react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const DocumentationPage: React.FC = () => {
    return (
        <div style={{ padding: "24px", background: "#fff", maxWidth: 1000 }}>
            <Title level={1}>Documentation</Title>

            <Paragraph>
                This web application, <strong>FaceAdmin</strong>, is designed to manage
                user data, attendance records, and other relevant information that is
                received from our Face Recognition PyQt application. The PyQt app handles
                the real-time face recognition tasks, while this website provides an
                administrative interface to manage, review, and update the data.
            </Paragraph>

            <Title level={3}>Dashboard</Title>
            <Paragraph>
                The <strong>Dashboard</strong> provides a quick overview of the system's
                current status, including summary statistics such as total number of users,
                attendance logs, or other important highlights. Administrators can see at
                a glance how many faces have been registered and get quick metrics about
                attendance and user activity.
            </Paragraph>

            <Title level={3}>Users</Title>
            <Paragraph>
                In the <strong>Users</strong> section, you can manage the list of all
                users in the system. This includes adding new users, updating existing
                user details, and deleting users who are no longer needed. You can also
                search for specific users by name or email. For each user, you can see
                their basic profile information, such as first name, last name, email, and
                assigned role.
            </Paragraph>

            <Title level={3}>Attendance</Title>
            <Paragraph>
                The <strong>Attendance</strong> page displays attendance records for all
                users, which are synced from the Face Recognition PyQt application.
                Administrators can view check-in and check-out times, total duration,
                and filter by date or user. This section helps keep track of when users
                arrive and leave, ensuring accurate records of attendance for reporting
                or auditing purposes.
            </Paragraph>

            <Title level={3}>Faces</Title>
            <Paragraph>
                The <strong>Faces</strong> section is used to manage user photos and
                face-related data. Here, you can see which users have already uploaded
                their images for recognition, and which have not. You can also add new
                photos or delete existing ones. Each user can provide multiple images
                to improve the accuracy of face recognition. This page syncs with the
                Face Recognition PyQt app, ensuring that the system always has the most
                up-to-date face encodings.
            </Paragraph>

            <Title level={3}>Codes</Title>
            <Paragraph>
                In the <strong>Codes</strong> page, you can manage OTP codes or other
                entry-related codes that users may use for alternative entry methods.
                For example, if a user cannot be recognized by face for any reason,
                they may use a unique code to verify their identity. Administrators can
                regenerate codes, resend emails with these codes, or search for users
                who have not yet configured a code.
            </Paragraph>

            <Title level={3}>Reports</Title>
            <Paragraph>
                The <strong>Reports</strong> page allows you to generate or view
                aggregated data, charts, or summaries about attendance, user activity,
                and system usage. You can filter by date range or user group to produce
                more targeted statistics. This helps administrators understand overall
                trends, identify peak hours, or verify compliance with specific
                requirements.
            </Paragraph>

            <Title level={3}>Logs</Title>
            <Paragraph>
                The <strong>Logs</strong> page provides a chronological feed of all
                significant system events. This can include face recognition check-ins,
                code entries, changes made by administrators, or error logs. By reviewing
                logs, administrators can trace user actions, debug potential issues, and
                maintain a secure audit trail.
            </Paragraph>

            <Title level={3}>Inquiries</Title>
            <Paragraph>
                If you have any questions or require further assistance, please email us
                at <strong>hi@faceadmin.org</strong>. We will be happy to help you with
                any inquiries or support requests related to FaceAdmin.
            </Paragraph>

        </div>
    );
};

export default DocumentationPage;
