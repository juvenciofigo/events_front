module.exports = {
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
    darkMode: "class",
    theme: {
        extend: {
            keyframes: {
                'orbit': {
                    '0%': { transform: 'translate(-50%, -50%) rotate(0deg) translateX(300px) rotate(0deg)' },
                    '100%': { transform: 'translate(-50%, -50%) rotate(360deg) translateX(300px) rotate(-360deg)' },
                },
            },
            animation: {
                'gradient-x-slow': 'gradient-x 10s ease infinite',
                'orbit-slow': 'orbit 20s linear infinite',
            },
            colors: {
                primary: {
                    DEFAULT: 'var(--color-primary)',
                    hover: 'var(--color-primary-hover)',
                    light: 'var(--color-primary-light)',
                    dark: 'var(--color-primary-dark)',
                },
                secondary: {
                    DEFAULT: 'var(--color-secondary)',
                    hover: 'var(--color-secondary-hover)',
                    light: 'var(--color-secondary-light)',
                },
                accent: {
                    DEFAULT: 'var(--color-accent)',
                    hover: 'var(--color-accent-hover)',
                },
                background: 'var(--color-background)',
                surface: {
                    DEFAULT: 'var(--color-surface)',
                    hover: 'var(--color-surface-hover)',
                    light: 'var(--color-surface-light)',
                },
                text: {
                    DEFAULT: 'var(--color-text)',
                    secondary: 'var(--color-text-secondary)',
                    muted: 'var(--color-text-muted)',
                    disabled: 'var(--color-text-disabled)',
                },
                link: {
                    DEFAULT: 'var(--color-secondary)',
                    hover: 'var(--color-secondary-hover)',
                },
                success: {
                    DEFAULT: 'var(--color-success)',
                    light: 'var(--color-success-light)',
                },
                warning: {
                    DEFAULT: 'var(--color-warning)',
                    light: 'var(--color-warning-light)',
                },
                error: {
                    DEFAULT: 'var(--color-error)',
                    light: 'var(--color-error-light)',
                },
                info: 'var(--color-info)',
            },
            borderColor: {
                DEFAULT: 'var(--border-color)',
                light: 'var(--border-color-light)',
                strong: 'var(--border-color-strong)',
            },
            boxShadow: {
                'sm': 'var(--shadow-sm)',
                'md': 'var(--shadow-md)',
                'lg': 'var(--shadow-lg)',
                'primary': 'var(--shadow-primary)',
            },
            borderRadius: {
                'sm': 'var(--radius-sm)',
                'md': 'var(--radius-md)',
                'lg': 'var(--radius-lg)',
                'xl': 'var(--radius-xl)',
                'full': 'var(--radius-full)',
            },
        },
    },
    plugins: [],
};
