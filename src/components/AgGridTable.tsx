import React from "react";

export default function AgGridTable({ children }: { children?: React.ReactNode }) {
    return (
        <div
            className="ag-theme-alpine"
            style={{ width: "100%", height: 400 }}>
            {/* Placeholder: integrate ag-grid-react here when needed */}
            {children}
        </div>
    );
}
