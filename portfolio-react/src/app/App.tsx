import { useEffect } from 'react';
import { AppRouter } from './providers/router';
import { LanguageProvider } from '@shared/i18n';

export default function App() {
    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    return <LanguageProvider><AppRouter /></LanguageProvider>;
}
