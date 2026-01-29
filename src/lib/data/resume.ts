import { CodeIcon, Globe, HomeIcon, NotebookIcon } from 'lucide-svelte';
// Navbar Icons
import GithubSvg from '$lib/imgs/github.svg';
import GithubDarkSvg from '$lib/imgs/github-dark.svg';


import GmailSvg from '$lib/imgs/gmail.svg';
import GmailDarkSvg from '$lib/imgs/gmail-dark.svg';
import LogoImg from '$lib/imgs/logo.jpeg';
import SchoolImg from '$lib/imgs/school.jpeg';

import HeristepWrm from '$lib/imgs/heristep-wrm.webp';
import HeristepMrt from '$lib/imgs/heristep-mrt.png';
import HeristepDashboard from '$lib/imgs/dashboard-msu.png';
import UserImg from '$lib/imgs/user.jpeg';

// Your resume data
export const DATA = {
	name: 'Duong Van Sinl',
	initials: 'DS',
	url: 'https://tinbalon3',
	img: '', // Add your photo to src/lib/imgs/me.png and import it here if needed
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
			title: 'Software Engineer',
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
			degree: 'Software Engineering',
			logoUrl: SchoolImg, 
			start: 'Sept 2021',
			end: 'Present'
		}
	],
	projects: [
		{
			title: 'HeriStepAI Museum',
			href: 'https://apps.apple.com/vn/app/heristepai/id6747056914?l=vi',
			dates: 'June 2025 - Present',
			active: true,
			description:
				'Production smart-museum mobile application delivering zone-triggered multilingual audio experiences and Mapbox-based navigation. Built for a museum attracting approximately 500,000 visitors per year.',
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
			links: [],
			image: HeristepDashboard,
			video: ''
		}
	],
	hackathons: []
};
