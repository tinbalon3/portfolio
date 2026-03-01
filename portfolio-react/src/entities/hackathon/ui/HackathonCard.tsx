import { marked } from 'marked';
import type { Hackathon } from '@entities/resume';
import { Avatar } from '@shared/ui/avatar';
import { Badge } from '@shared/ui/badge';

interface HackathonCardProps {
    hackathon: Hackathon;
}

export function HackathonCard({ hackathon }: HackathonCardProps) {
    return (
        <li className="relative ml-10 py-4">
            <div className="absolute -left-16 top-2 flex items-center justify-center rounded-full bg-white">
                <Avatar src={hackathon.image} fallback={hackathon.title[0]} alt={hackathon.title} containerClassName="m-auto size-12 border" />
            </div>
            <div className="flex flex-1 flex-col justify-start gap-1">
                {hackathon.dates && <time className="text-xs text-muted-foreground">{hackathon.dates}</time>}
                <h2 className="font-semibold leading-none">{hackathon.title}</h2>
                {hackathon.description && (
                    <span className="prose text-sm text-muted-foreground dark:prose-invert">
                        <span dangerouslySetInnerHTML={{ __html: marked.parse(hackathon.description) }} />
                    </span>
                )}
            </div>
            {hackathon.links?.length > 0 && (
                <div className="mt-2 flex flex-row flex-wrap items-start gap-2">
                    {hackathon.links.map((link) => {
                        const Icon = link.icon;
                        return (
                            <a href={link.href} key={link.type}>
                                <Badge title={link.type} className="flex gap-2" variant="outline">
                                    <Icon className="h-4 w-4" strokeWidth={1.6} />
                                    {link.type}
                                </Badge>
                            </a>
                        );
                    })}
                </div>
            )}
        </li>
    );
}
