import React from "react";
import { motion } from "framer-motion";

interface PageTransitionProps {
    children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
    return (
        <>
            {children}

            <div className="fixed inset-0 z-[9999] flex flex-col pointer-events-none">
                <motion.div
                    className="relative w-full bg-slate-950 flex-1 pointer-events-auto"
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: 0 }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
                    style={{ originY: 0 }}
                />

                <motion.div
                    className="absolute top-1/2 left-0 right-0 h-[2px] bg-white z-50"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1, opacity: 0 }}
                    transition={{
                        scaleX: { duration: 0.5, ease: "easeInOut" },
                        opacity: { duration: 0.1, delay: 0.5 }
                    }}
                    style={{ originX: 0.5, translateY: "-50%" }}
                />

                <motion.div
                    className="relative w-full bg-slate-950 flex-1 pointer-events-auto"
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: 0 }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
                    style={{ originY: 1 }}
                />
            </div>
        </>
    );
}
