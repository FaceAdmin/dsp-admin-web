import React from "react";
import ReactDOM from "react-dom/client";
import { App, ConfigProvider } from "antd";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "./routes";
import "antd/dist/reset.css";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1890ff",
        },
      }}
    >
      <App>
        <RouterProvider router={router} />
      </App>
    </ConfigProvider>
  </React.StrictMode>
);
