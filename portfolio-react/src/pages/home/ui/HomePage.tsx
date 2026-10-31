import { marked } from 'marked';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
    Activity,
    ArrowDown,
    ArrowUpRight,
    CheckCircle2,
    Code2,
    ExternalLink,
    GraduationCap,
    Languages,
    Mail,
    MapPin,
    Sparkles
} from 'lucide-react';
import { DATA } from '@entities/resume';
import { HackathonCard } from '@entities/hackathon';
import { ProjectCard } from '@entities/project';
import { ResumeCard } from '@entities/resume';
import { Badge } from '@shared/ui/badge';
import { BlurFade } from '@shared/ui/blur-fade';
import { useLanguage } from '@shared/i18n';

const BLUR_FADE_DELAY = 0.08;

interface SectionHeadingProps {
    number: string;
    title: string;
    description?: string;
}

function SectionHeading({ number, title, description }: SectionHeadingProps) {
    return (
        <div className="mb-8 flex flex-col justify-between gap-4 md:mb-12 md:flex-row md:items-end">
            <div>
                <div className="section-label">
                    <span>{number}</span>
                    <span>{title}</span>
                </div>
                <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">{title}</h2>
            </div>
            {description ? <p className="max-w-md text-sm leading-7 text-muted-foreground md:text-right">{description}</p> : null}
        </div>
    );
}

function Metric({ value, label }: { value: string; label: string }) {
    return (
        <div className="border-l border-primary/35 pl-4">
            <div className="font-heading text-2xl font-bold text-foreground">{value}</div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{label}</div>
        </div>
    );
}

function HeroVisual() {
    const { t } = useLanguage();

    return (
        <div className="relative mx-auto w-full max-w-[440px] lg:mx-0 lg:ml-auto">
            <motion.div
                className="orbit-ring -inset-7 sm:-inset-10"
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                aria-hidden="true"
            />
            <div className="absolute -right-2 -top-5 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-card/80 px-3 py-2 text-[11px] font-semibold text-foreground shadow-xl backdrop-blur-xl sm:-right-8 sm:-top-7">
                <span className="size-2 animate-pulse rounded-full bg-primary shadow-[0_0_14px_hsl(var(--primary))]" />
                {t('shippingIdeas')}
            </div>
            <div className="hero-image-frame aspect-[0.88] rounded-[2rem] sm:aspect-square">
                <img src={DATA.avatarUrl} alt={`${DATA.name} portrait`} className="h-full w-full object-cover object-[58%_25%] grayscale-[0.18] transition duration-700 hover:scale-105 hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-primary/5" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                    <div>
                        <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">{t('basedInVietnam')}</div>
                        <div className="font-heading text-2xl font-bold tracking-tight text-white">{t('buildWithIntent')}</div>
                    </div>
                    <div className="flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md">
                        <Code2 className="size-5" />
                    </div>
                </div>
            </div>
            <motion.div
                className="glass-panel absolute -bottom-7 -left-4 z-10 rounded-2xl p-4 sm:-left-12"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
            >
                <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    <Activity className="size-3 text-primary" />
                    {t('currentlyBuilding')}
                </div>
                <div className="text-sm font-semibold text-foreground">HeriStepAI ecosystem</div>
                <div className="mt-2 h-1 w-28 overflow-hidden rounded-full bg-white/10">
                    <motion.div className="h-full rounded-full bg-primary" initial={{ width: 0 }} animate={{ width: '78%' }} transition={{ delay: 1, duration: 1 }} />
                </div>
            </motion.div>
        </div>
    );
}

export function HomePage() {
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const { language, t } = useLanguage();
    const description = language === 'vi' ? DATA.descriptionVi : DATA.description;
    const summary = language === 'vi' ? DATA.summaryVi : DATA.summary;

    return (
        <main className="relative">
            <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />

            <section id="hero" className="page-container flex min-h-screen items-center pb-20 pt-32 sm:pb-28 sm:pt-36">
                <div className="grid w-full items-center gap-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
                    <div>
                        <BlurFade delay={BLUR_FADE_DELAY}>
                            <div className="eyebrow">
                                <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                                {t('available')}
                            </div>
                        </BlurFade>
                        <BlurFade delay={BLUR_FADE_DELAY * 2} yOffset={14}>
                            <h1 className="mt-7 max-w-3xl font-heading text-[clamp(3.2rem,9vw,7.4rem)] font-bold leading-[0.92] tracking-[-0.07em] text-foreground">
                                {t('heroBefore')} <span className="text-gradient">{t('heroHighlight')}</span>
                            </h1>
                        </BlurFade>
                        <BlurFade delay={BLUR_FADE_DELAY * 3}>
                            <p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">{description}</p>
                        </BlurFade>
                        <BlurFade delay={BLUR_FADE_DELAY * 4}>
                            <div className="mt-8 flex flex-wrap items-center gap-3">
                                <a href="#projects" className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-transform duration-200 hover:-translate-y-1">
                                    {t('exploreWork')}
                                    <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </a>
                                <a href={DATA.contact.social.email.url} className="group inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-5 py-3 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-primary/50 hover:bg-accent">
                                    <Mail className="size-4 text-primary" />
                                    {t('sayHello')}
                                </a>
                            </div>
                        </BlurFade>
                        <BlurFade delay={BLUR_FADE_DELAY * 5}>
                            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-5">
                                <Metric value="4" label={language === 'vi' ? 'sản phẩm đã triển khai' : 'products shipped'} />
                                <Metric value="1+ yr" label={language === 'vi' ? 'xây dựng cho người dùng thật' : 'building for real users'} />
                            </div>
                        </BlurFade>
                    </div>

                    <BlurFade delay={BLUR_FADE_DELAY * 2} yOffset={24} className="hidden lg:block">
                        <HeroVisual />
                    </BlurFade>
                </div>
            </section>

            <div className="border-y border-white/[0.08] bg-white/[0.02]" aria-label="Areas of focus">
                <div className="page-container flex items-center justify-between gap-8 overflow-hidden py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    <span className="whitespace-nowrap">{t('areasEngineering')}</span>
                    <span className="hidden size-1 rounded-full bg-primary sm:block" />
                    <span className="whitespace-nowrap">{t('areasWebMobile')}</span>
                    <span className="hidden size-1 rounded-full bg-primary sm:block" />
                    <span className="whitespace-nowrap">{t('areasLocation')}</span>
                    <Sparkles className="hidden size-4 shrink-0 text-primary sm:block" />
                </div>
            </div>

            <section id="about" className="page-container py-24 sm:py-32">
                <SectionHeading number="01 /" title={t('about')} description={t('aboutDescription')} />
                <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
                    <BlurFade>
                        <div className="glass-panel relative overflow-hidden rounded-3xl p-6 sm:p-8">
                            <div className="absolute -right-12 -top-12 size-36 rounded-full bg-primary/10 blur-3xl" />
                            <div className="relative flex items-start gap-4">
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                    <Sparkles className="size-5" />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-foreground">{t('shortVersion')}</div>
                                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{t('shortVersionText')}</p>
                                </div>
                            </div>
                            <div className="mt-8 flex items-center gap-3 text-xs text-muted-foreground">
                                <MapPin className="size-4 text-primary" />
                                {DATA.location}
                            </div>
                        </div>
                    </BlurFade>
                    <BlurFade delay={BLUR_FADE_DELAY}>
                        <div className="profile-summary max-w-none text-pretty font-sans text-base leading-8 sm:text-lg" dangerouslySetInnerHTML={{ __html: marked.parse(summary) }} />
                        <div className="mt-8 flex flex-wrap gap-2">
                            {DATA.skills.map((skill, id) => (
                                <motion.div key={skill} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: id * 0.025 }}>
                                    <Badge variant="secondary" className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary">
                                        {skill}
                                    </Badge>
                                </motion.div>
                            ))}
                        </div>
                    </BlurFade>
                </div>
            </section>

            <section id="work" className="page-container py-24 sm:py-32">
                <SectionHeading number="02 /" title={t('experience')} description={t('experienceDescription')} />
                <div className="relative ml-2 border-l border-border pl-6 sm:ml-5 sm:pl-10">
                    <div className="absolute -left-[5px] top-0 size-2 rounded-full bg-primary shadow-[0_0_18px_hsl(var(--primary))]" />
                    {DATA.work.map((work, id) => (
                        <BlurFade key={`${work.company}-${id}`} delay={BLUR_FADE_DELAY * id}>
                            <ResumeCard item={work} />
                        </BlurFade>
                    ))}
                </div>
            </section>

            <section id="education" className="page-container py-24 sm:py-32">
                <SectionHeading number="03 /" title={t('education')} description={t('educationDescription')} />
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {DATA.education.map((edu, id) => {
                        const badges: string[] = [];
                        if (edu.gpa) badges.push(`GPA ${edu.gpa}`);
                        if (edu.ielts) badges.push(`IELTS ${edu.ielts}`);
                        return (
                            <BlurFade key={`${edu.school}-${id}`} delay={BLUR_FADE_DELAY * id}>
                                <div className="glass-panel rounded-2xl p-1">
                                <ResumeCard item={{ company: edu.school, href: edu.href, badges, location: '', title: edu.school, logoUrl: edu.logoUrl, start: edu.start, end: edu.end, description: '' }} subtitle={language === 'vi' ? edu.degreeVi ?? edu.degree : edu.degree} />
                                </div>
                            </BlurFade>
                        );
                    })}
                    <BlurFade delay={BLUR_FADE_DELAY}>
                        <div className="flex h-full min-h-[140px] items-center gap-4 rounded-2xl border border-dashed border-primary/25 bg-primary/[0.04] p-6">
                            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary"><GraduationCap className="size-6" /></div>
                            <div><div className="font-heading text-lg font-semibold">{t('alwaysLearning')}</div><p className="mt-1 text-sm leading-6 text-muted-foreground">{t('alwaysLearningText')}</p></div>
                        </div>
                    </BlurFade>
                    <BlurFade delay={BLUR_FADE_DELAY * 2}>
                        <div className="glass-panel flex h-full min-h-[140px] flex-col justify-between rounded-2xl p-6">
                            <div className="flex items-start gap-4">
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Languages className="size-6" /></div>
                                <div>
                                    <div className="font-heading text-lg font-semibold">{t('englishProficiency')}</div>
                                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{t('englishProficiencyText')}</p>
                                </div>
                            </div>
                            <div className="mt-6 flex items-end justify-between border-t border-border/70 pt-4">
                                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{t('certifiedLevel')}</span>
                                <span className="font-heading text-2xl font-bold text-primary">IELTS 6.0</span>
                            </div>
                        </div>
                    </BlurFade>
                </div>
            </section>

            <section id="projects" className="page-container py-24 sm:py-32">
                <SectionHeading number="04 /" title={t('selectedWork')} description={t('selectedWorkDescription')} />
                <div className="project-masonry">
                    {DATA.projects.map((project, id) => (
                        <BlurFade key={project.title} delay={BLUR_FADE_DELAY * Math.min(id, 3)} className="project-masonry-item">
                            <ProjectCard project={project} />
                        </BlurFade>
                    ))}
                </div>
            </section>

            {DATA.hackathons.length > 0 ? (
                <section id="hackathons" className="page-container py-24 sm:py-32">
                    <SectionHeading number="05 /" title="Hackathons" description="Small teams, short timelines, and lots of curiosity." />
                    <ul className="ml-4 divide-y divide-dashed border-l border-border pl-4 sm:ml-10 sm:pl-8">
                        {DATA.hackathons.map((project) => <HackathonCard key={project.title} hackathon={project} />)}
                    </ul>
                </section>
            ) : null}

            <section id="contact" className="page-container pb-32 pt-24 sm:pb-40 sm:pt-32">
                <div className="relative overflow-hidden rounded-[2rem] border border-primary/25 bg-primary/[0.07] px-6 py-14 text-center sm:px-12 sm:py-20">
                    <div className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
                    <div className="relative">
                        <div className="section-label justify-center text-primary"><span>05 /</span><span>{t('contact')}</span></div>
                        <h2 className="mx-auto max-w-3xl font-heading text-4xl font-bold tracking-[-0.04em] sm:text-6xl">{t('contactTitleBefore')} <span className="text-gradient">{t('contactTitleHighlight')}</span></h2>
                        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">{t('contactDescription')}</p>
                        <a href={DATA.contact.social.email.url} className="group mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition-transform duration-200 hover:-translate-y-1">
                            {t('startConversation')}
                            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                    </div>
                </div>
                <div className="mt-10 flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground sm:flex-row">
                        <span>© {new Date().getFullYear()} {DATA.name}. {t('builtWithCare')}</span>
                        <div className="flex items-center gap-4">
                            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="size-3.5 text-primary" /> {t('openToWork')}</span>
                            <a href={DATA.contact.social.GitHub.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 transition-colors hover:text-primary">GitHub <ExternalLink className="size-3" /></a>
                            <a href={DATA.contact.social.LinkedIn.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 transition-colors hover:text-primary">LinkedIn <ExternalLink className="size-3" /></a>
                        </div>
                </div>
                <a href="#hero" className="mx-auto mt-8 flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-primary">
                    {t('backToTop')} <ArrowDown className="size-3 rotate-180" />
                </a>
            </section>
        </main>
    );
}
