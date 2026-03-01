import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@shared/ui/badge';
import { Separator } from '@shared/ui/separator';
import { formatDate } from '@shared/lib/format-date';
import { getPostBySlug } from '@pages/blog';

export function BlogPostPage() {
    const { slug = '' } = useParams();
    const post = getPostBySlug(slug);

    if (!post) return <Navigate to="/blog" replace />;

    return (
        <article className="-mt-10">
            <div>
                <Link
                    to="/blog"
                    className="mb-2 inline-flex h-6 items-center bg-transparent px-0 text-xs text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft className="mb-px mr-1 h-3.5 w-3.5" />
                    Back
                </Link>
            </div>

            <hgroup className="mb-1">
                <h1 className="max-w-[650px] text-2xl font-medium tracking-tighter lg:max-w-4xl lg:text-3xl xl:max-w-5xl xl:text-4xl">{post.title}</h1>
                <div className="mb-3 mt-2 flex max-w-[650px] items-center justify-between text-sm lg:max-w-4xl xl:max-w-5xl">
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 lg:text-base">{formatDate(post.date)}</p>
                </div>
            </hgroup>

            <div className="mb-2 flex space-x-2">
                {post.categories.map((category) => (
                    <Badge key={category} variant="outline" className="rounded-[4px]">
                        {category}
                    </Badge>
                ))}
            </div>
            <Separator className="mb-4" />

            <div className="prose prose-video prose-img:mx-auto prose-img:my-3 prose-pre:my-3 prose-hr:my-3 dark:prose-invert lg:prose-lg xl:prose-xl max-w-[650px] lg:max-w-4xl xl:max-w-5xl">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
        </article>
    );
}
