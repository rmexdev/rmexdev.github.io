import { defineAstroPaperConfig } from './src/types/config';

export default defineAstroPaperConfig({
    site: {
        url: 'https://rmex.dev/',
        title: 'Rmex Dev',
        description: 'Portfolio and Blog of Rmex Dev',
        author: 'rmexdev',
        profile: 'https://rmex.dev/',
        ogImage: 'default-og.png',
        lang: 'en',
        dir: 'ltr',
    },
    posts: {
        perPage: 4,
        perIndex: 4,
        scheduledPostMargin: 15 * 60 * 1000,
    },
    features: {
        lightAndDarkMode: true,
        dynamicOgImage: true,
        showArchives: true,
        showBackButton: true,
        editPost: {
            enabled: false
        },
        search: 'pagefind',
    },
    socials: [
        { name: 'github', url: 'https://github.com/rmexdev' },
        { name: 'x', url: 'https://x.com/rmexdev' },
        // { name: 'linkedin', url: 'https://www.linkedin.com/in/harmeet01singh/' },
        { name: 'mail', url: 'mailto:rmexdev@proton.me' },
    ],
    shareLinks: [
        { name: 'whatsapp', url: 'https://wa.me/?text=' },
        { name: 'x', url: 'https://x.com/intent/post?url=' },
        { name: 'telegram', url: 'https://t.me/share/url?url=' },
        {
            name: 'pinterest',
            url: 'https://pinterest.com/pin/create/button/?url=',
        },
        { name: 'mail', url: 'mailto:?subject=See%20this%20post&body=' },
    ],
});
