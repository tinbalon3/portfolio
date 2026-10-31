import { useState } from 'react';
import { ChevronRight, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import type { WorkExperience } from '@entities/resume';
import { Avatar } from '@shared/ui/avatar';
import { Badge } from '@shared/ui/badge';
import { cn } from '@shared/lib/utils';
import { useLanguage } from '@shared/i18n';

interface ResumeCardProps {
    item: WorkExperience;
    subtitle?: string;
}

export function ResumeCard({ item, subtitle }: ResumeCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const { language } = useLanguage();
    const hasDescription = Boolean(item.description);
    const title = language === 'vi' ? item.titleVi ?? item.title : item.title;
    const description = language === 'vi' ? item.descriptionVi ?? item.description : item.description;

    return (
        <button type="button" onClick={() => hasDescription && setIsExpanded((prev) => !prev)} className="group w-full text-left" aria-expanded={hasDescription ? isExpanded : undefined}>
            <motion.div className="relative flex gap-4 rounded-2xl border border-transparent p-4 transition-colors duration-300 hover:border-primary/20 hover:bg-white/[0.03] sm:gap-5 sm:p-5" whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <div className="relative z-10 flex-none">
                    <Avatar
                        src={item.logoUrl}
                        alt={item.company}
                        fallback={item.company[0]}
                        containerClassName="size-12 border border-primary/20 bg-white p-1 shadow-lg shadow-black/20 sm:size-14"
                        className="rounded-xl object-contain"
                    />
                </div>
                <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                        <div>
                            <h3 className="inline-flex items-center gap-1.5 font-heading text-base font-bold leading-none text-foreground sm:text-lg">
                                {item.company}
                                <ChevronRight className={cn('size-4 text-primary opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100', isExpanded && 'rotate-90 opacity-100')} />
                            </h3>
                            {item.employmentType || item.duration ? <div className="mt-1 text-xs text-muted-foreground/80">{[item.employmentType, item.duration].filter(Boolean).join(' · ')}</div> : null}
                            <div className="mt-2 text-sm text-muted-foreground">{subtitle ?? title}</div>
                        </div>
                        <div className="shrink-0 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-primary sm:text-right">{item.start} — {item.end || 'Present'}</div>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        {item.location ? <span className="inline-flex items-center gap-1.5"><MapPin className="size-3.5 text-primary" />{item.location}</span> : null}
                        {item.badges?.map((badge) => <Badge key={badge} variant="secondary" className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary">{badge}</Badge>)}
                    </div>
                    {hasDescription && isExpanded ? <p className="mt-4 max-w-2xl border-t border-border pt-4 text-sm leading-7 text-muted-foreground">{description}</p> : null}
                </div>
            </motion.div>
        </button>
    );
}
