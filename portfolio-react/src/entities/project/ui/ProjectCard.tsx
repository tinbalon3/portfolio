import { marked } from 'marked';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Project } from '@entities/resume';
import { Badge } from '@shared/ui/badge';
import { useLanguage } from '@shared/i18n';

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    const { language, t } = useLanguage();
    const title = language === 'vi' ? project.titleVi ?? project.title : project.title;
    const description = language === 'vi' ? project.descriptionVi ?? project.description : project.description;
    const hasVisual = Boolean(project.video || project.image);
    const media = (
        <>
            <div className="h-56 sm:h-64">
                {project.video ? (
                    <video className="pointer-events-none h-full w-full object-cover object-top" src={project.video} autoPlay loop muted playsInline />
                ) : (
                    <img className="h-full w-full object-cover object-center" src={project.image} alt={project.title} />
                )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
                <div>
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/55 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-lg backdrop-blur-sm">
                        <span className="size-1.5 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
                        {project.active ? t('liveProject') : t('selectedCaseStudy')}
                    </div>
                    <h3 className="font-heading text-xl font-bold tracking-tight text-white sm:text-2xl">{title}</h3>
                </div>
                {project.href ? (
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                        <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                ) : null}
            </div>
        </>
    );

    return (
        <motion.article className="project-card flex flex-col" whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
            {hasVisual ? (
                project.href ? (
                    <a href={project.href} className="project-media group relative block overflow-hidden" target="_blank" rel="noreferrer" aria-label={`Open ${title}`}>
                        {media}
                    </a>
                ) : (
                    <div className="project-media group relative block overflow-hidden" aria-label={`${title} case study`}>
                        {media}
                    </div>
                )
            ) : (
                <div className="border-b border-border/80 p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-primary shadow-sm">
                                <span className="size-1.5 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
                                {project.active ? t('liveProject') : t('selectedCaseStudy')}
                            </div>
                            <h3 className="font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl">{title}</h3>
                        </div>
                        <a href={project.href || '#'} target={project.href ? '_blank' : undefined} rel={project.href ? 'noreferrer' : undefined} aria-label={`Open ${title}`} className="flex size-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary transition-colors duration-200 hover:bg-primary hover:text-primary-foreground">
                            <ArrowUpRight className="size-4" />
                        </a>
                    </div>
                </div>
            )}

            <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    <time>{project.dates}</time>
                    {project.href ? <ExternalLink className="size-3.5 text-primary" /> : null}
                </div>
                <div className="project-description mt-4 max-w-none text-pretty font-sans text-sm leading-6" dangerouslySetInnerHTML={{ __html: marked.parse(description) }} />

                <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                    {project.technologies?.map((tag) => (
                        <Badge key={tag} variant="secondary" className="rounded-full border border-border/80 bg-muted/60 px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                            {tag}
                        </Badge>
                    ))}
                </div>

                {project.links?.length > 0 ? (
                    <div className="mt-5 flex flex-wrap gap-2 border-t border-border/80 pt-4">
                        {project.links.map((link) => {
                            const Icon = link.icon;
                            return (
                                <a href={link.href} key={link.type} target="_blank" rel="noreferrer" className="group/link inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary">
                                    <Icon className="size-3.5 text-primary" strokeWidth={1.8} />
                                    {link.type === 'Live site' ? t('liveSite') : link.type}
                                    <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover/link:opacity-100" />
                                </a>
                            );
                        })}
                    </div>
                ) : null}
            </div>
        </motion.article>
    );
}
