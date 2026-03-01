import { marked } from 'marked';

export interface PostMeta {
    title: string;
    description: string;
    date: string;
    categories: string[];
    published: boolean;
    slug: string;
}

export interface BlogPost extends PostMeta {
    content: string;
}

const postFiles = import.meta.glob('../../../content/*.md', {
    query: '?raw',
    import: 'default',
    eager: true
}) as Record<string, string>;

function parseMarkdownContent(content: string) {
    // Extract title from first heading (# Title)
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : '';

    // Extract description from first paragraph after title
    // Skip the title line and any separator lines (---)
    let description = '';
    const lines = content.split('\n');
    let foundTitle = false;
    const descriptionLines: string[] = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Skip title line
        if (line.startsWith('# ')) {
            foundTitle = true;
            continue;
        }

        // Skip separator lines
        if (line === '---' || line.startsWith('##')) {
            break;
        }

        // Collect first paragraph (until empty line or next heading)
        if (foundTitle) {
            if (line === '') {
                if (descriptionLines.length > 0) break;
                continue;
            }
            descriptionLines.push(line);
            // Stop after collecting first meaningful paragraph (max 3 lines)
            if (descriptionLines.length >= 3) break;
        }
    }

    description = descriptionLines.join(' ').trim();

    // Fallback: use filename as title if no title found
    if (!title) {
        return { title: '', description };
    }

    return { title, description };
}

function parseFrontmatter(raw: string) {
    const match = raw.match(/^---\n([\s\S]*?)\n---\n?/);

    if (!match) {
        // No frontmatter, parse from markdown content
        const { title, description } = parseMarkdownContent(raw);
        return {
            metadata: {
                title,
                description,
                published: true
            },
            body: raw
        };
    }

    const metadataBlock = match[1];
    const body = raw.slice(match[0].length);
    const lines = metadataBlock.split('\n');
    const metadata: Record<string, string | string[] | boolean> = {};

    let currentKey = '';
    for (const line of lines) {
        if (line.trim().startsWith('- ') && currentKey) {
            const value = line.replace(/^\s*-\s*/, '').trim().replace(/^['"]|['"]$/g, '');
            const current = metadata[currentKey];
            if (Array.isArray(current)) {
                current.push(value);
            } else {
                metadata[currentKey] = [value];
            }
            continue;
        }

        const [rawKey, ...rest] = line.split(':');
        const key = rawKey?.trim();
        if (!key) continue;
        const value = rest.join(':').trim();
        currentKey = key;

        if (value === 'true' || value === 'false') {
            metadata[key] = value === 'true';
        } else if (value) {
            metadata[key] = value.replace(/^['"]|['"]$/g, '');
        } else {
            metadata[key] = [];
        }
    }

    // If title or description is missing, try to extract from body
    if (!metadata.title || !metadata.description) {
        const { title, description } = parseMarkdownContent(body);
        if (!metadata.title && title) {
            metadata.title = title;
        }
        if (!metadata.description && description) {
            metadata.description = description;
        }
    }

    return { metadata, body };
}

function toSlug(path: string) {
    return path.split('/').pop()?.replace('.md', '') ?? '';
}

function getDefaultDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function validateAndGetDate(date: string | undefined): string {
    if (!date || date.trim() === '') {
        return getDefaultDate();
    }

    const dateObj = new Date(date.replaceAll('-', '/'));
    if (isNaN(dateObj.getTime())) {
        return getDefaultDate();
    }

    return date;
}

export function getAllPosts(): PostMeta[] {
    const posts = Object.entries(postFiles)
        .map(([path, raw]) => {
            const { metadata } = parseFrontmatter(raw);
            const rawDate = String(metadata.date ?? '');
            const slug = toSlug(path);

            // Fallback: use slug as title if no title found
            let title = String(metadata.title ?? '');
            if (!title) {
                title = slug
                    .split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
            }

            // Fallback: use default description if empty
            let description = String(metadata.description ?? '');
            if (!description) {
                description = 'No description available';
            }

            return {
                title,
                description,
                date: validateAndGetDate(rawDate),
                categories: (metadata.categories as string[]) ?? [],
                published: Boolean(metadata.published ?? true),
                slug
            };
        })
        .filter((post) => post.published && post.title);

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
    const entry = Object.entries(postFiles).find(([path]) => toSlug(path) === slug);
    if (!entry) return null;

    const [, raw] = entry;
    const { metadata, body } = parseFrontmatter(raw);
    const rawDate = String(metadata.date ?? '');

    // Fallback: use slug as title if no title found
    let title = String(metadata.title ?? '');
    if (!title) {
        title = slug
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    // Fallback: use default description if empty
    let description = String(metadata.description ?? '');
    if (!description) {
        description = 'No description available';
    }

    return {
        title,
        description,
        date: validateAndGetDate(rawDate),
        categories: (metadata.categories as string[]) ?? [],
        published: Boolean(metadata.published ?? true),
        slug,
        content: marked.parse(body) as string
    };
}
