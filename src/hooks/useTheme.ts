import { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';

type Theme = 'dark' | 'light';

export function useTheme() {
    const [theme, setTheme] = useState<Theme>(() => {
        // Check localStorage first
        const stored = localStorage.getItem('theme') as Theme;
        if (stored) return stored;

        // Check system preference
        if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            return 'light';
        }

        return 'dark';
    });

    useEffect(() => {
        const root = document.documentElement;

        // Remove both classes first
        root.classList.remove('light', 'dark');

        // Add the current theme class
        root.classList.add(theme);

        // Save to localStorage
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = (e?: React.MouseEvent) => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';

        // @ts-ignore - View Transitions API might not be in TS lib yet
        if (!document.startViewTransition) {
            setTheme(newTheme);
            return;
        }

        // Anchor to top-right corner for "corner reveal" effect
        const x = window.innerWidth;
        const y = 0;
        const endRadius = Math.hypot(
            Math.max(x, innerWidth - x),
            Math.max(y, innerHeight - y)
        );

        // @ts-ignore
        const transition = document.startViewTransition(() => {
            flushSync(() => {
                setTheme(newTheme);
            });
        });

        transition.ready.then(() => {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
            ];

            document.documentElement.animate(
                {
                    clipPath: clipPath,
                },
                {
                    duration: 500,
                    easing: "ease-in-out",
                    pseudoElement: "::view-transition-new(root)",
                }
            );
        });
    };

    return { theme, toggleTheme, setTheme };
}
