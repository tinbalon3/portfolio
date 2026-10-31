import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Languages } from 'lucide-react';
import { DATA } from '@entities/resume';
import { ThemeToggle } from '@features/theme';
import { cn } from '@shared/lib/utils';
import { useLanguage } from '@shared/i18n';

export function Navbar() {
    const location = useLocation();
    const { language, setLanguage, t } = useLanguage();

    return (
        <header className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6" aria-label="Main navigation">
            <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/[0.1] bg-background/75 px-2 py-2 shadow-2xl shadow-black/20 backdrop-blur-xl">
                <Link to="/" className="group flex items-center gap-2 rounded-full px-3 py-1.5" aria-label="Go to homepage">
                    <span className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-extrabold text-primary-foreground transition-transform duration-300 group-hover:rotate-12">
                        DS
                    </span>
                    <span className="hidden text-sm font-semibold tracking-tight sm:inline">Duong Van Sinl</span>
                </Link>

                <nav className="flex items-center gap-0.5" aria-label="Primary">
                    {DATA.navbar.map((item) => {
                        const Icon = item.icon;
                        const isHashLink = item.href.startsWith('#');
                        const isActive = !isHashLink && location.pathname === item.href;
                        const className = cn(
                            'group flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors duration-200 hover:bg-accent hover:text-foreground sm:px-4',
                            isActive && 'bg-accent text-foreground'
                        );
                        const content = (
                            <>
                                <Icon className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" strokeWidth={1.8} />
                                <span className="hidden sm:inline">{item.label === 'Home' ? t('home') : item.label === 'Blog' ? t('blog') : t('projects')}</span>
                            </>
                        );

                        return isHashLink ? (
                            <a key={item.label} href={item.href} className={className} aria-label={item.label}>
                                {content}
                            </a>
                        ) : (
                            <Link key={item.label} to={item.href} className={className} aria-label={item.label} aria-current={isActive ? 'page' : undefined}>
                                {content}
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex items-center gap-1">
                    <div className="flex items-center rounded-full border border-border/70 bg-card/40 p-0.5" aria-label={t('languageLabel')}>
                        <Languages className="mx-1.5 size-3.5 text-primary" aria-hidden="true" />
                        {(['en', 'vi'] as const).map((option) => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => setLanguage(option)}
                                className={cn(
                                    'rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] transition-colors',
                                    language === option ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                                )}
                                aria-pressed={language === option}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    <div className="hidden items-center gap-1 sm:flex">
                        {Object.values(DATA.contact.social)
                            .filter((social) => social.navbar)
                            .map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 hover:bg-accent hover:text-foreground"
                                    aria-label={social.name}
                                >
                                    <img src={social.icon} className="size-4 opacity-75 transition-opacity group-hover:opacity-100 dark:hidden" alt="" />
                                    {social.dark_icon ? <img src={social.dark_icon} className="hidden size-4 opacity-75 transition-opacity group-hover:opacity-100 dark:block" alt="" /> : null}
                                </a>
                            ))}
                    </div>
                    <span className="mx-1 hidden h-5 w-px bg-border sm:block" />
                    <ThemeToggle />
                    <a href="#contact" className="hidden items-center gap-1 rounded-full bg-primary px-3 py-2 text-xs font-bold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5 sm:flex">
                        {t('letsTalk')}
                        <ArrowUpRight className="size-3.5" />
                    </a>
                </div>
            </div>
        </header>
    );
}
