import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1, // Retry queries only once on failure
            refetchOnWindowFocus: false,
        },
        mutations: {
            retry: 0, // Never retry mutations - this prevents duplicate submissions
        },
    },
});

createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
);
