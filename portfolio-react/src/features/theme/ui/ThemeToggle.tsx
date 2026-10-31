import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@shared/ui/button';

type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
    if (typeof window === 'undefined') return 'dark';
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'dark';
}

export function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <Button
            onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
            variant="ghost"
            size="icon"
            className="rounded-full max-[380px]:h-8 max-[380px]:w-8"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
        </Button>
    );
}
