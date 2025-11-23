import React from "react";

export default function Toolbar({ children }: { children?: React.ReactNode }) {
    return <div className="flex items-center gap-2 mb-4">{children}</div>;
}
