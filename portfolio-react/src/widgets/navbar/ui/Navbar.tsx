import { Link, useLocation } from 'react-router-dom';
import { DATA } from '@entities/resume';
import { ThemeToggle } from '@features/theme';
import { Separator } from '@shared/ui/separator';
import { cn } from '@shared/lib/utils';

export function Navbar() {
    const location = useLocation();

    return (
        <div className="pointer-events-none fixed inset-x-0 bottom-1 md:bottom-10 z-30 mx-auto mb-4 flex h-full max-h-14 origin-bottom">
            <div className="fixed inset-x-0 bottom-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)]" />
            <div className="pointer-events-auto relative z-50 mx-auto flex min-h-full items-center gap-1 rounded-full bg-background px-2 shadow-sm dark:border dark:border-white/10">
                {DATA.navbar.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.href;
                    return (
                        <Link
                            key={item.label}
                            to={item.href}
                            className={cn(
                                'flex size-12 items-center justify-center rounded-full transition-colors hover:bg-accent',
                                isActive && 'bg-accent'
                            )}
                            aria-label={item.label}
                        >
                            <Icon className="size-[18px]" strokeWidth={1.5} />
                        </Link>
                    );
                })}

                <Separator orientation="vertical" className="h-6" />

                {Object.values(DATA.contact.social)
                    .filter((social) => social.navbar)
                    .map((social) => (
                        <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex size-12 items-center justify-center rounded-full transition-colors hover:bg-accent"
                            aria-label={social.name}
                        >
                            <img src={social.icon} className="size-[18px] dark:hidden" alt={social.name} />
                            {social.dark_icon ? (
                                <img src={social.dark_icon} className="hidden size-[18px] dark:block" alt={social.name} />
                            ) : null}
                        </a>
                    ))}

                <Separator orientation="vertical" className="h-6" />
                <ThemeToggle />
            </div>
        </div>
    );
}
