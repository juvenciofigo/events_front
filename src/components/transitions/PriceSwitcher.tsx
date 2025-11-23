import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PriceSwitcherProps {
    price: number;
    currency?: string;
    className?: string;
}

function Digit({ digit }: { digit: string }) {
    return (
        <div className="relative inline-block overflow-hidden h-[1em] w-[0.6em] align-top">
            <AnimatePresence mode="popLayout">
                <motion.span
                    key={digit}
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    {digit}
                </motion.span>
            </AnimatePresence>
        </div>
    );
}

export default function PriceSwitcher({ price, currency = "R$", className = "" }: PriceSwitcherProps) {
    // Format price to string with 2 decimals
    const priceStr = price.toFixed(2);
    const [integerPart, decimalPart] = priceStr.split(".");
    const formattedInteger = parseInt(integerPart).toLocaleString("pt-BR");

    // Combine back for animation logic, but we'll render parts separately for styling if needed
    const fullStr = `${formattedInteger},${decimalPart}`;

    return (
        <div className={`inline-flex items-baseline font-mono ${className}`}>
            <span className="mr-1 text-0.8em opacity-60">{currency}</span>
            <div className="flex">
                {fullStr.split("").map((char, index) => {
                    if (char === "," || char === ".") {
                        return <span key={index} className="w-[0.3em] text-center">{char}</span>;
                    }
                    return <Digit key={`${index}-${char}`} digit={char} />;
                })}
            </div>
        </div>
    );
}
