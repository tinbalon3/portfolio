import { useEffect } from 'react';
import { AppRouter } from './providers/router';

export default function App() {
    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    return <AppRouter />;
}
