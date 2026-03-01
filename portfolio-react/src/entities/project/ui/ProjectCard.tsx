import { marked } from 'marked';
import type { Project } from '@entities/resume';
import { Badge } from '@shared/ui/badge';

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div className="flex h-full flex-col overflow-hidden rounded-lg border bg-card text-card-foreground transition-all duration-300 ease-out hover:shadow-lg">
            <a href={project.href || '#'} className="block cursor-pointer" target="_blank" rel="noreferrer">
                {project.video ? (
                    <video className="pointer-events-none mx-auto h-40 w-full object-cover object-top" src={project.video} autoPlay loop muted />
                ) : (
                    <div className="h-40 w-full overflow-hidden">
                        <img className="h-full w-full object-contain object-top" src={project.image} alt={project.title} />
                    </div>
                )}
            </a>

            <div className="flex flex-col px-2">
                <div className="space-y-1">
                    <div className="mt-1 text-base">{project.title}</div>
                    <time className="font-sans text-xs">{project.dates}</time>
                    <div className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
                        <div dangerouslySetInnerHTML={{ __html: marked.parse(project.description) }} />
                    </div>
                </div>
            </div>

            <div className="mt-auto flex flex-col px-2 text-sm text-muted-foreground">
                {project.technologies?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                        {project.technologies.map((tag) => (
                            <Badge key={tag} className="rounded-[4px] px-1 py-0 text-[11px]" variant="secondary">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex items-center px-2 pb-2 pt-2">
                {project.links?.length > 0 && (
                    <div className="flex flex-row flex-wrap items-start gap-1">
                        {project.links.map((link) => {
                            const Icon = link.icon;
                            return (
                                <a href={link.href} key={link.type} target="_blank" rel="noreferrer">
                                    <Badge className="flex items-center justify-center gap-1 px-2 py-1 text-[12px]" variant="outline">
                                        <Icon className="mb-px size-3" strokeWidth={1.6} />
                                        {link.type}
                                    </Badge>
                                </a>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
