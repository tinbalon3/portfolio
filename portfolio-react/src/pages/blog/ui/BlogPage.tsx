import { Link } from 'react-router-dom';
import { BlurFade } from '@shared/ui/blur-fade';
import { formatDate } from '@shared/lib/format-date';
import { getAllPosts } from '@pages/blog';

const BLUR_FADE_DELAY = 0.04;

export function BlogPage() {
    const posts = getAllPosts();

    return (
        <>
            <BlurFade delay={BLUR_FADE_DELAY}>
                <h1 className="mb-8 text-2xl font-medium tracking-tighter lg:text-3xl xl:text-4xl">Blog</h1>
            </BlurFade>

            <section>
                <ul className="grid">
                    {posts.map((post, id) => (
                        <li key={post.slug} className="max-w-prose border-b py-2 last:border-b-0 lg:max-w-3xl xl:max-w-4xl">
                            <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05}>
                                <Link className="flex flex-col space-y-1" to={`/blog/${post.slug}`}>
                                    <div className="flex w-full flex-col">
                                        <p className="tracking-tight lg:text-lg xl:text-xl">{post.title}</p>
                                        <p className="h-6 text-xs text-muted-foreground lg:text-sm">{formatDate(post.date)}</p>
                                    </div>
                                </Link>
                            </BlurFade>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}
