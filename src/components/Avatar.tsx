import React from "react";

export default function Avatar({ name, size = 40 }: { name?: string; size?: number }) {
    const initials = name
        ? name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()
        : "U";
    return (
        <div
            style={{ width: size, height: size }}
            className="rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-sm font-medium">
            {initials}
        </div>
    );
}
