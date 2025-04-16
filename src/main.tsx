// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider, App as AntdApp } from "antd";
import AppRouter from "./routes";
import { AuthProvider } from "./context/AuthContext";
import "antd/dist/reset.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ConfigProvider
            theme={{
                token: { colorPrimary: "#1890ff" },
            }}
        >
            <AuthProvider>
                <AntdApp>
                    <AppRouter />
                </AntdApp>
            </AuthProvider>
        </ConfigProvider>
    </React.StrictMode>
);
