import { BookIcon, CodeIcon, Globe, HomeIcon, NotebookIcon, ServerIcon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
// Navbar Icons
import GithubSvg from '@shared/assets/github.svg';
import GithubDarkSvg from '@shared/assets/github-dark.svg';
import GmailSvg from '@shared/assets/gmail.svg';
import GmailDarkSvg from '@shared/assets/gmail-dark.svg';
import LogoImg from '@shared/assets/logo.jpeg';
import SchoolImg from '@shared/assets/school.jpeg';
import HeristepWrm from '@shared/assets/heristep-wrm.webp';
import HeristepMrt from '@shared/assets/heristep-mrt.png';
import HeristepDashboard from '@shared/assets/dashboard-msu.png';
import UserImg from '@shared/assets/user.jpeg';

// TypeScript Interfaces
export interface NavbarItem {
    href: string;
    icon: LucideIcon;
    label: string;
}

export interface SocialLink {
    name: string;
    url: string;
    icon: string;
    navbar: boolean;
    dark_icon?: string;
}

export interface Contact {
    email: string;
    tel: string;
    social: {
        [key: string]: SocialLink;
    };
}

export interface WorkExperience {
    company: string;
    href: string;
    badges: string[];
    location: string;
    title: string;
    logoUrl: string;
    start: string;
    end: string;
    description: string;
}

export interface Education {
    school: string;
    href: string;
    degree: string;
    logoUrl: string;
    start: string;
    end: string;
    gpa?: string;
    ielts?: string;
}

export interface ProjectLink {
    type: string;
    href: string;
    icon: LucideIcon;
}

export interface Project {
    title: string;
    href: string;
    dates: string;
    active: boolean;
    description: string;
    technologies: string[];
    links: ProjectLink[];
    image: string;
    video: string;
}

export interface Hackathon {
    title: string;
    href: string;
    dates: string;
    active: boolean;
    description: string;
    technologies: string[];
    links: ProjectLink[];
    image: string;
    video: string;
}

export interface ResumeData {
    name: string;
    initials: string;
    url: string;
    img: string;
    location: string;
    locationLink: string;
    description: string;
    summary: string;
    avatarUrl: string;
    skills: string[];
    navbar: NavbarItem[];
    contact: Contact;
    work: WorkExperience[];
    education: Education[];
    projects: Project[];
    hackathons: Hackathon[];
}

// Your resume data
export const DATA: ResumeData = {
    name: 'Duong Van Sinl',
    initials: 'DS',
    url: 'https://tinbalon3',
    img: '', // Add your photo to src/shared/assets/me.png and import it here if needed
    location: 'Tan Binh, Ho Chi Minh',
    locationLink: 'https://www.google.com/maps/place/Tan+Binh,+Ho+Chi+Minh+City,+Vietnam',
    description:
        'Frontend Developer (Web / Mobile) focused on building production-ready applications in tourism and event domains.',
    summary:
        'Software Engineer with 1+ year of experience building production-ready web and mobile applications in tourism and event domains. Strong focus on React, React Native, Mapbox, and GPS-based location experiences. Hands-on experience delivering large-scale user-facing systems and owning end-to-end Android/iOS deployment. Seeking to grow into a Web/Mobile Engineer with a strong system-ownership mindset.',
    avatarUrl: UserImg, // Add your avatar url or import image
    skills: [
        'JavaScript (ES6+)',
        'TypeScript',
        'Python',
        'Java',
        'HTML/CSS',
        'ReactJS',
        'React Native',
        'TailwindCSS',
        'Shadcn/ui',
        'Zustand',
        'React Query',
        'Springboot',
        'MySQL',
        'SQL',
        'Mapbox',
        'Git',
        'Vitest'
    ],
    navbar: [
        { href: '/', icon: HomeIcon, label: 'Home' },
        { href: '/blog', icon: NotebookIcon, label: 'Blog' },
        { href: '#', icon: CodeIcon, label: 'Projects' }
    ],
    contact: {
        email: 'tinbalon3@gmail.com',
        tel: '0779808678',
        social: {
            GitHub: {
                name: 'GitHub',
                url: 'https://github.com/tinbalon3',
                icon: GithubSvg,
                navbar: true,
                dark_icon: GithubDarkSvg
            },
            email: {
                name: 'Send Email',
                url: 'mailto:tinbalon3@gmail.com',
                icon: GmailSvg,
                navbar: true,
                dark_icon: GmailDarkSvg
            }
        }
    },
    work: [
        {
            company: 'AIAIVN',
            href: '',
            badges: [],
            location: 'Ho Chi Minh',
            title: 'Frontend Developer',
            logoUrl: LogoImg,
            start: 'Jan 2025',
            end: 'Present',
            description:
                'Developed HeriStepAI ecosystem including Smart Museum App, Marathon App, and Dashboard. Implemented beacon-driven positioning, Mapbox navigation, and managed end-to-end mobile releases for 500,000+ visitors/year.'
        }
    ],
    education: [
        {
            school: 'Saigon University',
            href: '',
            degree: "Bachelor's Degree in Software Engineering",
            logoUrl: SchoolImg,
            start: 'Sept 2021',
            end: 'March 2026',
            gpa: '3.59',
            ielts: '6.0'
        }
    ],
    projects: [
        {
            title: 'HeriStepAI Museum',
            href: 'https://apps.apple.com/vn/app/heristepai/id6747056914?l=vi',
            dates: 'June 2025 - Mar 2026',
            active: true,
            description:
                'Production smart-museum mobile application delivering zone-triggered multilingual audio experiences and Mapbox-based navigation.',
            technologies: [
                'React Native',
                'Mapbox',
                'IoT Beacon',
                'Android',
                'iOS'
            ],
            links: [
                {
                    type: 'App Store',
                    href: 'https://apps.apple.com/vn/app/heristepai/id6747056914?l=vi',
                    icon: Globe
                },
                {
                    type: 'Google Play',
                    href: 'https://play.google.com/store/apps/details?id=com.aiaivn.wrmmuseum&hl=en-US',
                    icon: Globe
                }
            ],
            image: HeristepWrm,
            video: ''
        },
        {
            title: 'HeriStepAI Marathon',
            href: 'https://web.facebook.com/share/p/17qcnrsVnp/',
            dates: 'May 2025 - Nov 2025',
            active: true,
            description:
                'Interactive race-course web application with Mapbox visualization, POIs, and advanced search/filter features. Implemented GPS-based automatic narration. Deployed for Techcombank marathon events (30,000+ participants).',
            technologies: [
                'ReactJS',
                'Shadcn/ui',
                'Mapbox',
                'GPS Tracking'
            ],
            links: [
                {
                    type: 'Event Link',
                    href: 'https://web.facebook.com/share/p/17qcnrsVnp/',
                    icon: Globe
                }
            ],
            image: HeristepMrt,
            video: ''
        },
        {
            title: 'HeriStepAI Museum Dashboard',
            href: '',
            dates: 'June 2025 - Present',
            active: true,
            description:
                'Internal dashboard enabling museum operators to manage sections, IoT beacons, multilingual content, interactive maps, and custom tour creation. Includes user-insight monitoring.',
            technologies: [
                'ReactJS',
                'Tanstack Router',
                'TailwindCSS',
                'Zustand',
                'Shadcn/ui'
            ],
            links: [
                {
                    type: 'Internal company',
                    href: '',
                    icon: ServerIcon
                }
            ],
            image: HeristepDashboard,
            video: ''
        },
        {
            title: 'Multi-Agent Ontology Generation System',
            href: 'https://github.com/tinbalon3/Ontology_integrated_chatbot?tab=readme-ov-file#multi-agent-ontology-generation-system',
            dates: 'Sept 2024 - March 2026',
            active: false,
            description:
                'Automated ontology generation system using multiple AI models to build knowledge graphs from text data. Features multi-agent architecture with OpenAI GPT, Google Gemini, and DeepSeek working in parallel to generate competency questions, skeleton ontologies, and Cypher queries. Integrated with Neo4j for graph database storage and vector search capabilities. Achieved 9.3/10 grade for graduation thesis.',
            technologies: [
                'Python',
                'OpenAI API',
                'Google Gemini API',
                'DeepSeek API',
                'Neo4j',
                'Vector Search',
                'YAML',
                'Async/Await',
                'Knowledge Graph'
            ],
            links: [
                {
                    type: 'Graduation Thesis',
                    href: 'https://github.com/tinbalon3/Ontology_integrated_chatbot?tab=readme-ov-file#multi-agent-ontology-generation-system',
                    icon: BookIcon
                }
            ],
            image: 'https://media.canva.com/v2/image-resize/format:PNG/height:752/quality:100/uri:ifs%3A%2F%2FM%2Fa2ded45b-463b-4e2f-9204-a6373eadcd70/watermark:F/width:1600?csig=AAAAAAAAAAAAAAAAAAAAALsJf912uburb6w3BluCVrOXQJvrXD2O57ATgdC45iGm&exp=1772375287&osig=AAAAAAAAAAAAAAAAAAAAACfadlWjx4zql_lsKi4qSiwGUDh59jDV4o_qM5bRVgwd&signer=media-rpc&x-canva-quality=screen_2x',
            video: ''
        }
        // ,
        // {
        //     title: 'VNA Fruit Website',
        //     href: 'https://github.com/tinbalon3/SHOPAPP_BACKEND',
        //     dates: '2024 - 2025',
        //     active: false,
        //     description:
        //         'E-commerce platform for Vietnamese fruits built with MVC architecture. Features product browsing, cart management, VNPay payment integration, product reviews, and admin dashboard. Implemented caching with Redis, asynchronous email notifications with Kafka, and Docker containerization for deployment.',
        //     technologies: [
        //         'Java',
        //         'Spring Boot',
        //         'Angular',
        //         'MySQL',
        //         'Redis',
        //         'Kafka',
        //         'VNPay',
        //         'Docker',
        //         'Flyway',
        //         'JUnit'
        //     ],
        //     links: [
        //         {
        //             type: 'Backend',
        //             href: 'https://github.com/tinbalon3/SHOPAPP_BACKEND',
        //             icon: CodeIcon
        //         },
        //         {
        //             type: 'Frontend',
        //             href: 'https://github.com/tinbalon3/SHOPAPP_FRONTEND',
        //             icon: CodeIcon
        //         }
        //     ],
        //     image: '',
        //     video: ''
        // }
    ],
    hackathons: []
};
