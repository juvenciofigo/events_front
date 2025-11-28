import React from "react";
import { motion } from "framer-motion";

interface FeatureCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    className?: string;
}

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function FeatureCard({ title, description, icon, className = "" }: FeatureCardProps) {
    return (
        <motion.div
            variants={fadeInUp}
            className={`${className} group relative p-1 rounded-sm bg-gradient-to-b from-secondary to-blue-200/50 dark:from-white/10 dark:to-white/5 hover:from-primary/50 hover:to-accent/50 transition-all duration-500`}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent opacity-0 group-hover:opacity-100 rounded-sm blur-xl transition-opacity duration-500"></div>
            <div className="relative h-full bg-background/90 backdrop-blur-xl rounded-sm p-5 border border-borderColor-light dark:border-white/10 group-hover:border-white/20 overflow-hidden">
                <div className="absolute top-0 right-0 p-5 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                    {icon}
                </div>
                <div className="w-10 h-10 bg-primary/20 rounded-sm flex items-center justify-center mb-4 border border-primary/30 group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
                <h3 className="text-lg font-bold text-text mb-3">{title}</h3>
                <p className="text-sm text-muted leading-relaxed">{description}</p>
            </div>
        </motion.div>
    );
}
