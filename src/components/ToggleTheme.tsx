import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../hooks/useTheme";
export default function ToggleTheme() {
    const { theme, toggleTheme } = useTheme();


    return (
        <button
            onClick={(e) => toggleTheme(e)}
            className="relative text-muted hover:text-text transition-colors p-1.5 hover:bg-surface-hover rounded-lg"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                <SunIcon className="w-5 h-5" />
            ) : (
                <MoonIcon className="w-5 h-5" />
            )}
        </button>
    );
}