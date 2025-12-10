import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastProps {
    id: string;
    type: ToastType;
    message: string;
    onClose: () => void;
}

const toastConfig = {
    success: {
        icon: CheckCircleIcon,
        bgColor: "bg-green-50 dark:bg-green-900/20",
        borderColor: "border-green-200 dark:border-green-800",
        iconColor: "text-green-600 dark:text-green-400",
        textColor: "text-green-900 dark:text-green-100",
    },
    error: {
        icon: XCircleIcon,
        bgColor: "bg-red-50 dark:bg-red-900/20",
        borderColor: "border-red-200 dark:border-red-800",
        iconColor: "text-red-600 dark:text-red-400",
        textColor: "text-red-900 dark:text-red-100",
    },
    warning: {
        icon: ExclamationTriangleIcon,
        bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
        borderColor: "border-yellow-200 dark:border-yellow-800",
        iconColor: "text-yellow-600 dark:text-yellow-400",
        textColor: "text-yellow-900 dark:text-yellow-100",
    },
    info: {
        icon: InformationCircleIcon,
        bgColor: "bg-blue-50 dark:bg-blue-900/20",
        borderColor: "border-blue-200 dark:border-blue-800",
        iconColor: "text-blue-600 dark:text-blue-400",
        textColor: "text-blue-900 dark:text-blue-100",
    },
};

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
    ({ id, type, message, onClose }, ref) => {
        const config = toastConfig[type];
        const Icon = config.icon;

        return (
            <motion.div
                ref={ref}
                layout
                initial={{ opacity: 0, y: -50, scale: 0.3 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                className={`
                flex items-center gap-3 p-2 rounded border shadow-lg backdrop-blur-sm
                ${config.bgColor} ${config.borderColor}
                min-w-[300px] max-w-md
            `}
            >
                <Icon className={`h-6 w-6 flex-shrink-0 ${config.iconColor}`} />

                <p className={`flex-1 text-sm font-medium ${config.textColor}`}>
                    {message}
                </p>

                <button
                    onClick={onClose}
                    className={`flex-shrink-0 ${config.iconColor} hover:opacity-70 transition-opacity`}
                    aria-label="Close"
                >
                    <XMarkIcon className="h-5 w-5" />
                </button>
            </motion.div>
        );
    }
);

Toast.displayName = 'Toast';

export default Toast;
