import { BookIcon, CodeIcon, Globe, HomeIcon, NotebookIcon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
// Navbar Icons
import GithubSvg from '@shared/assets/github.svg';
import GithubDarkSvg from '@shared/assets/github-dark.svg';
import GmailSvg from '@shared/assets/gmail.svg';
import GmailDarkSvg from '@shared/assets/gmail-dark.svg';
import LinkedinSvg from '@shared/assets/linkedin.svg';
import LinkedinDarkSvg from '@shared/assets/linkedin-dark.svg';
import LogoImg from '@shared/assets/logo.jpeg';
import SchoolImg from '@shared/assets/school.jpeg';
import MrBaoEnglishImg from '@shared/assets/mr-bao-english.png';
import LocalTripImg from '@shared/assets/localtrip-ai.png';
import CapitalSquareImg from '@shared/assets/capital-square.png';
import UpliftAuAdminImg from '@shared/assets/uplift-au-admin.png';
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
    titleVi?: string;
    descriptionVi?: string;
    employmentType?: string;
    duration?: string;
}

export interface Education {
    school: string;
    href: string;
    degree: string;
    logoUrl: string;
    start: string;
    end: string;
    degreeVi?: string;
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
    titleVi?: string;
    descriptionVi?: string;
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
    descriptionVi: string;
    summaryVi: string;
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
        'Full-Stack Developer building production-ready web and mobile products across education, tourism and event domains.',
    summary:
        'Full-Stack Engineer with 1+ year of experience building production-ready web and mobile applications across education, tourism and event domains. Comfortable moving from product discovery and interface design to APIs, data flows, deployment, and the details that make software dependable for real users.',
    descriptionVi:
        'Lập trình viên Full-Stack xây dựng các sản phẩm web và mobile sẵn sàng vận hành trong lĩnh vực giáo dục, du lịch và sự kiện.',
    summaryVi:
        'Kỹ sư Full-Stack với hơn 1 năm kinh nghiệm xây dựng các ứng dụng web và mobile trong lĩnh vực giáo dục, du lịch và sự kiện. Tôi có thể tham gia từ khám phá sản phẩm, thiết kế giao diện đến API, luồng dữ liệu, triển khai và những chi tiết giúp phần mềm vận hành đáng tin cậy cho người dùng thực tế.',
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
        'PHP',
        'Laravel',
        'Blade',
        'Springboot',
        'MySQL',
        'SQL',
        'REST APIs',
        'Docker',
        'Mapbox',
        'Git',
        'Vitest',
        'English (IELTS 6.0)'
    ],
    navbar: [
        { href: '/', icon: HomeIcon, label: 'Home' },
        { href: '/blog', icon: NotebookIcon, label: 'Blog' },
        { href: '#projects', icon: CodeIcon, label: 'Projects' }
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
            },
            LinkedIn: {
                name: 'LinkedIn',
                url: 'https://www.linkedin.com/in/v%C4%83n-s%C3%ACnl-d%C6%B0%C6%A1ng-904a95309/',
                icon: LinkedinSvg,
                navbar: true,
                dark_icon: LinkedinDarkSvg
            }
        }
    },
    work: [
        {
            company: 'AIAIVN',
            href: '',
            badges: ['Promoted'],
            location: 'Ho Chi Minh',
            title: 'Full Stack Engineer',
            logoUrl: LogoImg,
            start: 'Apr 2026',
            end: 'Present',
            employmentType: 'Full-time',
            duration: '1 yr 4 mos',
            description:
                'Expanded into full-stack ownership across education and product systems, contributing across Laravel, Blade, MySQL, SSO, payment workflows and responsive product interfaces.',
            titleVi: 'Kỹ sư Full-Stack',
            descriptionVi: 'Mở rộng phạm vi sang làm chủ toàn bộ vòng đời sản phẩm giáo dục và hệ thống web, từ Laravel, Blade, MySQL, SSO đến luồng thanh toán và giao diện responsive.'
        },
        {
            company: 'AIAIVN',
            href: '',
            badges: [],
            location: 'Ho Chi Minh',
            title: 'Frontend Developer',
            logoUrl: LogoImg,
            start: 'Jul 2025',
            end: 'Apr 2026',
            employmentType: 'Full-time',
            duration: '10 mos',
            description:
                'Developed the HeriStepAI ecosystem including Smart Museum App, Marathon App and Dashboard. Implemented beacon-driven positioning, Mapbox navigation and managed end-to-end mobile releases.',
            titleVi: 'Lập trình viên Frontend',
            descriptionVi: 'Phát triển hệ sinh thái HeriStepAI gồm Smart Museum App, Marathon App và Dashboard; triển khai định vị bằng beacon, điều hướng Mapbox và quản lý quy trình phát hành mobile.'
        },
        {
            company: 'VIETHAS TECHNOLOGY SOLUTION',
            href: '',
            badges: ['Angular', 'Angular Material'],
            location: 'On-site',
            title: 'Intern',
            logoUrl: '',
            start: 'Feb 2023',
            end: 'May 2023',
            employmentType: 'Internship',
            duration: '4 mos',
            description:
                'Built foundational frontend experience with Angular and Angular Material while collaborating in an on-site product team.',
            titleVi: 'Thực tập sinh',
            descriptionVi: 'Xây dựng nền tảng frontend với Angular và Angular Material, đồng thời phối hợp cùng đội ngũ sản phẩm tại văn phòng.'
        }
    ],
    education: [
        {
            school: 'Saigon University',
            href: '',
            degree: "Bachelor's Degree in Software Engineering",
            degreeVi: 'Cử nhân Kỹ thuật Phần mềm',
            logoUrl: SchoolImg,
            start: 'Sept 2021',
            end: 'March 2026',
            gpa: '3.59',
            ielts: '6.0'
        }
    ],
    projects: [
        {
            title: 'Uplift LMS — AU Client',
            href: '',
            dates: '2026',
            active: false,
            description:
                'A production learning management platform built for an Australian education client. The role-based Laravel system brings together admin operations, student and parent workflows, class scheduling, enrolments, attendance, invoices, wallets and payment operations in one dependable workspace. The admin dashboard turns daily work into a clear operating rhythm — from outstanding actions and attendance rolls to timetable visibility, finance follow-up and reporting — with SSO-backed access for every role.',
            descriptionVi: 'Nền tảng quản lý học tập production dành cho một khách hàng giáo dục tại Australia. Hệ thống Laravel phân quyền kết nối vận hành admin, quy trình cho học sinh và phụ huynh, lịch học, ghi danh, điểm danh, hóa đơn, ví học tập và thanh toán trong một không gian thống nhất. Dashboard giúp đội ngũ theo dõi công việc hằng ngày — từ các tác vụ tồn đọng, điểm danh đến thời khóa biểu, tài chính và báo cáo — với SSO cho từng vai trò.',
            technologies: ['Laravel', 'PHP', 'Blade', 'MySQL', 'SSO', 'Payments', 'Admin Platform'],
            links: [],
            image: UpliftAuAdminImg,
            video: ''
        },
        {
            title: 'Mr. Bảo English',
            href: 'https://mr-bao-english.vercel.app/',
            dates: '2026',
            active: true,
            description:
                'A conversion-focused education website that turns a personal teaching brand into a clear, trustworthy enrollment journey. The experience brings TOEIC, VSTEP and TESOL credentials, course pathways, teaching philosophy and a trial-registration CTA into one polished narrative — helping prospective learners understand the value before they commit.',
            descriptionVi: 'Website giáo dục tập trung vào chuyển đổi, biến thương hiệu giảng dạy cá nhân thành một hành trình đăng ký rõ ràng và đáng tin cậy. Nội dung về chứng chỉ TOEIC, VSTEP, TESOL, lộ trình khóa học, triết lý giảng dạy và CTA đăng ký học thử được kết nối thành một câu chuyện nhất quán.',
            technologies: ['Responsive Web', 'Landing Page', 'Conversion UX', 'Course Platform'],
            links: [{ type: 'Live site', href: 'https://mr-bao-english.vercel.app/', icon: Globe }],
            image: MrBaoEnglishImg,
            video: ''
        },
        {
            title: 'LocalTrip.ai',
            href: 'https://develop.localtrip.ai/en',
            dates: '2026',
            active: true,
            description:
                'A calm, editorial travel discovery platform that blends AI-assisted storytelling with local knowledge. Destination pages, article discovery, visual browsing and a natural handoff to ticket booking work together to make travel research feel less like searching and more like getting a recommendation from someone who lives there.',
            descriptionVi: 'Nền tảng khám phá du lịch mang phong cách editorial, kết hợp storytelling có hỗ trợ AI với kiến thức địa phương. Trang điểm đến, bài viết, trải nghiệm duyệt hình ảnh và chuyển tiếp tự nhiên sang đặt vé giúp việc tìm hiểu chuyến đi giống như nhận lời khuyên từ một người bản địa.',
            technologies: ['Travel UX', 'Content Platform', 'Destination Discovery', 'Responsive Web'],
            links: [{ type: 'Live site', href: 'https://develop.localtrip.ai/en', icon: Globe }],
            image: LocalTripImg,
            video: ''
        },
        {
            title: 'Capital Square Đà Nẵng',
            href: 'https://capitalsquareresidence.vn/',
            dates: '2026',
            active: true,
            description:
                'A premium real-estate experience designed to turn a complex property story into a confident decision. The landing journey moves from the riverfront hero and project scale to location, apartment types, amenities, policies and direct consultant contact — balancing aspirational visual storytelling with the information buyers need to take the next step.',
            descriptionVi: 'Trải nghiệm bất động sản cao cấp giúp biến câu chuyện dự án phức tạp thành một quyết định rõ ràng. Hành trình landing page dẫn người xem từ hình ảnh ven sông và quy mô dự án đến vị trí, loại căn hộ, tiện ích, chính sách và liên hệ tư vấn trực tiếp.',
            technologies: ['Real Estate UX', 'Lead Generation', 'Property Showcase', 'Responsive Web'],
            links: [{ type: 'Live site', href: 'https://capitalsquareresidence.vn/', icon: Globe }],
            image: CapitalSquareImg,
            video: ''
        },
        {
            title: 'HeriStepAI Museum',
            href: 'https://apps.apple.com/vn/app/heristepai/id6747056914?l=vi',
            dates: 'June 2025 - Mar 2026',
            active: true,
            description:
                'Production smart-museum mobile application delivering zone-triggered multilingual audio experiences and Mapbox-based navigation.',
            descriptionVi: 'Ứng dụng mobile bảo tàng thông minh vận hành thực tế, cung cấp trải nghiệm thuyết minh đa ngôn ngữ theo khu vực và điều hướng dựa trên Mapbox.',
            technologies: ['React Native', 'Mapbox', 'IoT Beacon', 'Android', 'iOS'],
            links: [
                { type: 'App Store', href: 'https://apps.apple.com/vn/app/heristepai/id6747056914?l=vi', icon: Globe },
                { type: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.aiaivn.wrmmuseum&hl=en-US', icon: Globe }
            ],
            image: '',
            video: ''
        },
        {
            title: 'HeriStepAI Marathon',
            href: 'https://web.facebook.com/share/p/17qcnrsVnp/',
            dates: 'May 2025 - Nov 2025',
            active: true,
            description:
                'Interactive race-course web application with Mapbox visualization, POIs, and advanced search/filter features. Implemented GPS-based automatic narration and deployed for Techcombank marathon events with 30,000+ participants.',
            descriptionVi: 'Ứng dụng web tương tác cho cung đường chạy với bản đồ Mapbox, POI và tính năng tìm kiếm/lọc nâng cao. Triển khai thuyết minh tự động dựa trên GPS cho các sự kiện marathon Techcombank với hơn 30.000 người tham gia.',
            technologies: ['ReactJS', 'Shadcn/ui', 'Mapbox', 'GPS Tracking'],
            links: [{ type: 'Event Link', href: 'https://web.facebook.com/share/p/17qcnrsVnp/', icon: Globe }],
            image: '',
            video: ''
        },
        {
            title: 'Multi-Agent Ontology Generation System',
            href: 'https://github.com/tinbalon3/Ontology_integrated_chatbot?tab=readme-ov-file#multi-agent-ontology-generation-system',
            dates: 'Sept 2024 - March 2026',
            active: false,
            description:
                'Automated ontology generation system using multiple AI models to build knowledge graphs from text data. Features parallel agents powered by OpenAI GPT, Google Gemini and DeepSeek, with Neo4j storage and vector search. Achieved a 9.3/10 grade for the graduation thesis.',
            descriptionVi: 'Hệ thống tự động sinh ontology sử dụng nhiều mô hình AI để xây dựng knowledge graph từ dữ liệu văn bản. Hệ thống có các agent chạy song song với OpenAI GPT, Google Gemini và DeepSeek, lưu trữ bằng Neo4j cùng vector search; đạt điểm 9,3/10 cho khóa luận tốt nghiệp.',
            technologies: ['Python', 'OpenAI API', 'Google Gemini API', 'DeepSeek API', 'Neo4j', 'Vector Search', 'Knowledge Graph'],
            links: [{ type: 'Graduation Thesis', href: 'https://github.com/tinbalon3/Ontology_integrated_chatbot?tab=readme-ov-file#multi-agent-ontology-generation-system', icon: BookIcon }],
            image: '',
            video: ''
        }
    ],
    hackathons: []
};
