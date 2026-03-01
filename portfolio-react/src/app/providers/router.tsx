import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { lazy } from 'react';

const HomePage = lazy(() => import('@pages/home').then((module) => ({ default: module.HomePage })));
const BlogPage = lazy(() => import('@pages/blog').then((module) => ({ default: module.BlogPage })));
const BlogPostPage = lazy(() => import('@pages/blog-post').then((module) => ({ default: module.BlogPostPage })));
const Navbar = lazy(() => import('@widgets/navbar').then((module) => ({ default: module.Navbar })));

const ROUTES = Object.freeze({
    home: '/',
    blog: '/blog',
    blogPost: '/blog/:slug',
    notFound: '*',
});

export function AppRouter() {
    return (
        <BrowserRouter>
            <div className="relative mx-auto min-h-screen max-w-2xl bg-background px-6 py-12 font-sans antialiased sm:py-24 lg:max-w-4xl xl:max-w-5xl">
                <Routes>
                    <Route path={ROUTES.home} element={<HomePage />} />
                    <Route path={ROUTES.blog} element={<BlogPage />} />
                    <Route path={ROUTES.blogPost} element={<BlogPostPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <Navbar />
            </div>
        </BrowserRouter>
    );
}
