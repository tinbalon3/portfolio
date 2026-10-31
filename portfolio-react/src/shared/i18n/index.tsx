import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';

export type Language = 'en' | 'vi';

const translations = {
    en: {
        home: 'Home',
        blog: 'Blog',
        projects: 'Projects',
        letsTalk: "Let's talk",
        available: 'Available for opportunities',
        heroBefore: 'I turn complex ideas into',
        heroHighlight: 'clear experiences.',
        exploreWork: 'Explore my work',
        sayHello: 'Say hello',
        shippingIdeas: 'Shipping ideas',
        basedInVietnam: 'Based in Vietnam',
        buildWithIntent: 'Build with intent.',
        currentlyBuilding: 'Currently building',
        areasEngineering: 'Product-minded engineering',
        areasWebMobile: 'Web + mobile experiences',
        areasLocation: 'Location-aware interfaces',
        about: 'About me',
        aboutDescription: 'A little context behind the interfaces and systems I build.',
        shortVersion: 'The short version',
        shortVersionText: 'I care about the tiny details that make a product feel effortless: clear hierarchy, purposeful motion, and interfaces that hold up in the real world.',
        experience: 'Experience',
        experienceDescription: 'Places where I have learned to ship, collaborate, and own outcomes.',
        education: 'Education',
        educationDescription: 'The foundation behind my engineering mindset.',
        alwaysLearning: 'Always learning',
        alwaysLearningText: 'Curiosity is part of the job description.',
        englishProficiency: 'English proficiency',
        englishProficiencyText: 'Professional communication for international product teams.',
        certifiedLevel: 'Certified level',
        selectedWork: 'Selected work',
        selectedWorkDescription: 'A few products, experiments, and systems that I am proud to have shipped.',
        liveProject: 'Live project',
        selectedCaseStudy: 'Selected case study',
        liveSite: 'Live site',
        contact: 'Contact',
        contactTitleBefore: 'Have a good idea?',
        contactTitleHighlight: "Let's make it real.",
        contactDescription: 'Want to collaborate, talk shop, or just say hello? My inbox is always open for thoughtful conversations.',
        startConversation: 'Start a conversation',
        openToWork: 'Open to meaningful work',
        builtWithCare: 'Built with care.',
        backToTop: 'Back to top',
        back: 'Back',
        languageLabel: 'Language',
    },
    vi: {
        home: 'Trang chủ',
        blog: 'Bài viết',
        projects: 'Dự án',
        letsTalk: 'Trao đổi với tôi',
        available: 'Sẵn sàng cho cơ hội mới',
        heroBefore: 'Biến những ý tưởng phức tạp thành',
        heroHighlight: 'trải nghiệm rõ ràng.',
        exploreWork: 'Xem dự án của tôi',
        sayHello: 'Liên hệ',
        shippingIdeas: 'Đang triển khai ý tưởng',
        basedInVietnam: 'Làm việc tại Việt Nam',
        buildWithIntent: 'Xây dựng có chủ đích.',
        currentlyBuilding: 'Đang xây dựng',
        areasEngineering: 'Kỹ thuật hướng sản phẩm',
        areasWebMobile: 'Trải nghiệm web + mobile',
        areasLocation: 'Giao diện theo ngữ cảnh vị trí',
        about: 'Về tôi',
        aboutDescription: 'Một chút bối cảnh về những giao diện và hệ thống tôi xây dựng.',
        shortVersion: 'Tóm tắt',
        shortVersionText: 'Tôi quan tâm đến những chi tiết nhỏ giúp sản phẩm trở nên tự nhiên: thứ bậc rõ ràng, chuyển động có chủ đích và giao diện hoạt động tốt trong thực tế.',
        experience: 'Kinh nghiệm',
        experienceDescription: 'Những môi trường giúp tôi học cách triển khai, hợp tác và chịu trách nhiệm đến cùng.',
        education: 'Học vấn',
        educationDescription: 'Nền tảng hình thành tư duy kỹ sư của tôi.',
        alwaysLearning: 'Luôn học hỏi',
        alwaysLearningText: 'Tò mò cũng là một phần của công việc.',
        englishProficiency: 'Năng lực tiếng Anh',
        englishProficiencyText: 'Giao tiếp chuyên nghiệp trong các đội ngũ sản phẩm quốc tế.',
        certifiedLevel: 'Chứng chỉ',
        selectedWork: 'Dự án tiêu biểu',
        selectedWorkDescription: 'Một số sản phẩm, thử nghiệm và hệ thống tôi tự hào đã triển khai.',
        liveProject: 'Dự án đang hoạt động',
        selectedCaseStudy: 'Case study tiêu biểu',
        liveSite: 'Website',
        contact: 'Liên hệ',
        contactTitleBefore: 'Bạn có một ý tưởng hay?',
        contactTitleHighlight: 'Cùng biến nó thành hiện thực.',
        contactDescription: 'Muốn hợp tác, trao đổi về công nghệ hoặc đơn giản là chào hỏi? Tôi luôn sẵn sàng lắng nghe những cuộc trò chuyện thú vị.',
        startConversation: 'Bắt đầu trao đổi',
        openToWork: 'Sẵn sàng cho dự án phù hợp',
        builtWithCare: 'Được xây dựng chỉn chu.',
        backToTop: 'Về đầu trang',
        back: 'Quay lại',
        languageLabel: 'Ngôn ngữ',
    },
} as const;

type TranslationKey = keyof typeof translations.en;

interface LanguageContextValue {
    language: Language;
    setLanguage: (language: Language) => void;
    toggleLanguage: () => void;
    t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: PropsWithChildren) {
    const [language, setLanguageState] = useState<Language>(() => {
        const stored = window.localStorage.getItem('portfolio-language');
        return stored === 'vi' ? 'vi' : 'en';
    });

    const setLanguage = (nextLanguage: Language) => {
        setLanguageState(nextLanguage);
        window.localStorage.setItem('portfolio-language', nextLanguage);
    };

    useEffect(() => {
        document.documentElement.lang = language;
        document.title = language === 'vi' ? 'Duong Van Sinl — Lập trình viên Full-Stack' : 'Duong Van Sinl — Full-Stack Developer';
    }, [language]);

    const value = useMemo<LanguageContextValue>(() => ({
        language,
        setLanguage,
        toggleLanguage: () => setLanguage(language === 'en' ? 'vi' : 'en'),
        t: (key) => translations[language][key],
    }), [language]);

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// The hook intentionally lives beside its provider so feature consumers can import one i18n entrypoint.
// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
    return context;
}
