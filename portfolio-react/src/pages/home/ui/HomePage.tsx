import { marked } from 'marked';
import { DATA, ResumeCard } from '@entities/resume';
import { ProjectCard } from '@entities/project';
import { HackathonCard } from '@entities/hackathon';
import { Badge } from '@shared/ui/badge';
import { Avatar } from '@shared/ui/avatar';
import { BlurFade } from '@shared/ui/blur-fade';

const BLUR_FADE_DELAY = 0.04;

export function HomePage() {
    return (
        <main className="flex min-h-[100dvh] flex-col space-y-10">
            <section id="hero">
                <div className="mx-auto w-full max-w-2xl space-y-8 lg:max-w-4xl xl:max-w-5xl">
                    <div className="flex justify-between gap-2 lg:gap-4">
                        <div className="flex flex-1 flex-col space-y-1.5">
                            <BlurFade
                                delay={BLUR_FADE_DELAY}
                                className="text-3xl font-bold tracking-tighter sm:text-5xl lg:text-6xl xl:text-7xl/none"
                                yOffset={8}
                            >
                                Hi, I&apos;m {DATA.name} 👋
                            </BlurFade>
                            <BlurFade className="max-w-[600px] md:text-xl lg:text-lg xl:text-xl" delay={BLUR_FADE_DELAY}>
                                {DATA.description}
                            </BlurFade>
                        </div>
                        <BlurFade delay={BLUR_FADE_DELAY}>
                            <Avatar src={DATA.avatarUrl} alt={DATA.name} fallback={DATA.initials} containerClassName="size-28 border lg:size-32 xl:size-36" />
                        </BlurFade>
                    </div>
                </div>
            </section>

            <section id="about">
                <BlurFade delay={BLUR_FADE_DELAY}>
                    <h2 className="text-xl font-bold lg:text-2xl">About</h2>
                </BlurFade>
                <BlurFade delay={BLUR_FADE_DELAY * 1.4}>
                    <div className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert lg:text-base">
                        <div dangerouslySetInnerHTML={{ __html: marked.parse(DATA.summary) }} />
                    </div>
                </BlurFade>
            </section>

            <section id="work">
                <div className="flex min-h-0 flex-col gap-y-3">
                    <BlurFade delay={BLUR_FADE_DELAY}>
                        <h2 className="text-xl font-bold lg:text-2xl">Work Experience</h2>
                    </BlurFade>
                    {DATA.work.map((work, id) => (
                        <BlurFade key={`${work.company}-${id}`} delay={BLUR_FADE_DELAY * 1.2 + id * 0.05}>
                            <ResumeCard item={work} />
                        </BlurFade>
                    ))}
                </div>
            </section>

            <section id="education">
                <div className="flex min-h-0 flex-col gap-y-3">
                    <BlurFade delay={BLUR_FADE_DELAY}>
                        <h2 className="text-xl font-bold lg:text-2xl">Education</h2>
                    </BlurFade>
                    {DATA.education.map((edu, id) => {
                        const badges: string[] = [];
                        if (edu.gpa) badges.push(`GPA: ${edu.gpa}`);
                        if (edu.ielts) badges.push(`IELTS: ${edu.ielts}`);
                        return (
                            <BlurFade key={`${edu.school}-${id}`} delay={BLUR_FADE_DELAY * 1.2 + id * 0.05}>
                                <ResumeCard
                                    item={{
                                        company: edu.school,
                                        href: edu.href,
                                        badges,
                                        location: '',
                                        title: edu.school,
                                        logoUrl: edu.logoUrl,
                                        start: edu.start,
                                        end: edu.end,
                                        description: ''
                                    }}
                                    subtitle={edu.degree}
                                />
                            </BlurFade>
                        );
                    })}
                </div>
            </section>

            <section id="skills">
                <div className="flex min-h-0 flex-col gap-y-3">
                    <BlurFade delay={BLUR_FADE_DELAY}>
                        <h2 className="text-xl font-bold lg:text-2xl">Skills</h2>
                    </BlurFade>
                    <div className="flex flex-wrap gap-1">
                        {DATA.skills.map((skill, id) => (
                            <BlurFade key={skill} delay={BLUR_FADE_DELAY * id + 0.002}>
                                <Badge variant="secondary">{skill}</Badge>
                            </BlurFade>
                        ))}
                    </div>
                </div>
            </section>

            <section id="projects">
                <div className="w-full space-y-12 py-12">
                    <BlurFade delay={BLUR_FADE_DELAY}>
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg bg-foreground px-3 py-1 text-sm text-background">My Projects</div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">Check out my latest work</h2>
                                <p className="text-muted-foreground md:text-xl/relaxed lg:text-lg/relaxed xl:text-xl/relaxed">
                                    I&apos;ve worked on a variety of projects, from simple websites to complex web applications. Here are a few
                                    of my favorites.
                                </p>
                            </div>
                        </div>
                    </BlurFade>
                    <div className="mx-auto grid max-w-[800px] grid-cols-1 gap-3 sm:grid-cols-2 lg:max-w-5xl lg:grid-cols-3 xl:gap-4">
                        {DATA.projects.map((project, id) => (
                            <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 1.5 + id * 0.05}>
                                <ProjectCard project={project} />
                            </BlurFade>
                        ))}
                    </div>
                </div>
            </section>

            {DATA.hackathons.length > 0 && (
                <section id="hackathons">
                    <div className="w-full space-y-12 py-12">
                        <BlurFade delay={BLUR_FADE_DELAY}>
                            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                                <div className="space-y-2">
                                    <div className="inline-block rounded-lg bg-foreground px-3 py-1 text-sm text-background">Hackathons</div>
                                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">I like building things</h2>
                                </div>
                            </div>
                        </BlurFade>
                        <BlurFade delay={BLUR_FADE_DELAY * 2}>
                            <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
                                {DATA.hackathons.map((project) => (
                                    <BlurFade key={project.title} delay={BLUR_FADE_DELAY}>
                                        <HackathonCard hackathon={project} />
                                    </BlurFade>
                                ))}
                            </ul>
                        </BlurFade>
                    </div>
                </section>
            )}

            <section id="contact">
                <div className="grid w-full items-center justify-center gap-4 px-4 py-12 text-center md:px-6">
                    <BlurFade delay={BLUR_FADE_DELAY * 2}>
                        <div className="space-y-3">
                            <div className="inline-block rounded-lg bg-foreground px-3 py-1 text-sm text-background">Contact</div>
                            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Get in Touch</h2>
                            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-lg/relaxed xl:text-xl/relaxed">
                                Want to chat? Just shoot me an email{' '}
                                <a href={DATA.contact.social.email.url} className="text-blue-500 hover:underline">
                                    directly
                                </a>{' '}
                                and I&apos;ll respond whenever I can.
                            </p>
                        </div>
                    </BlurFade>
                </div>
            </section>
        </main>
    );
}
