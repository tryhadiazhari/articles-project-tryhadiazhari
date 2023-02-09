import React from "react";
import ReactDOM from "react-dom/client";
import Dashboard from "./Dashboard.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import { ContextProvider } from "./context/ContextProvider.jsx";
import ThemeProvider from "react-bootstrap/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider
            breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
            minBreakpoint="xxs"
        >
            <ContextProvider>
                <RouterProvider router={router} />
            </ContextProvider>
        </ThemeProvider>
    </React.StrictMode>
);
