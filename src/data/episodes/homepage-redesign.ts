import type { Episode } from '@/types/episode';

export const homepageRedesignEpisode: Episode = {
    id: 'ep-001',
    slug: 'homepage-redesign',
    title: 'The Honest Homepage Redesign',
    description: 'What happens when everyone has opinions on the homepage',
    date: '2026-01-19',
    theme: {
        accent: '#d4ff00',
        background: '#0a0a0a'
    },
    sections: [
        {
            id: 'navbar',
            type: 'navbar',
            component: 'SaasNavbar',
            props: {
                logo: 'SynergyFlow',
                navItems: ['Product', 'Solutions', 'Pricing', 'Resources'],
                ctaText: 'Book a Demo'
            },
            commentary: {
                text: "Spent 3 weeks debating if this button should say 'Get Started' or 'Book a Demo'. CEO decided in 4 seconds.",
                expression: 'tired'
            }
        },
        {
            id: 'hero',
            type: 'hero',
            component: 'SaasHero',
            props: {
                headline: 'The All-in-One Platform for Modern Teams',
                subheadline: 'Streamline workflows, boost productivity, and drive results with our AI-powered solution.',
                primaryCta: 'Start Free Trial',
                secondaryCta: 'Watch Demo'
            },
            commentary: {
                text: "I wrote 47 versions of this headline. This one offends the fewest stakeholders.",
                expression: 'shrug'
            }
        },
        {
            id: 'features',
            type: 'features',
            component: 'SaasFeatures',
            props: {
                headline: 'Everything you need to succeed',
                features: [
                    { icon: 'chart', title: 'Real-time Analytics', description: 'Get insights that matter' },
                    { icon: 'plug', title: 'Seamless Integrations', description: 'Connect your favorite tools' },
                    { icon: 'sparkles', title: 'AI-Powered Insights', description: 'Let AI do the heavy lifting' },
                    { icon: 'users', title: 'Team Collaboration', description: 'Work better together' },
                    { icon: 'workflow', title: 'Custom Workflows', description: 'Build your perfect process' },
                    { icon: 'shield', title: 'Enterprise Security', description: 'Bank-level protection' }
                ]
            },
            commentary: {
                text: "Product gave me 34 features to highlight. Marketing said pick 6. I picked the ones that had icons ready.",
                expression: 'eyeroll'
            }
        },
        {
            id: 'footer',
            type: 'footer',
            component: 'SaasFooter',
            props: {
                columns: [
                    { title: 'Product', links: ['Features', 'Pricing', 'Integrations', 'Changelog'] },
                    { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
                    { title: 'Resources', links: ['Documentation', 'Help Center', 'API Reference', 'Status'] },
                    { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'GDPR'] }
                ]
            },
            commentary: {
                text: "Legal made me add 14 links here. Average monthly clicks: 3. Two of those were me testing.",
                expression: 'deadinside'
            }
        }
    ],
    outro: {
        text: "Anyway, I built a tool so I never have to do this again.",
        cta: {
            label: 'Check out Oden',
            url: 'https://getoden.com'
        }
    }
};
