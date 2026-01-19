import type { Expression } from './character';

export interface Section {
    id: string;
    type: string;
    component: string; // maps to a reusable component
    props: Record<string, any>; // section-specific content
    commentary: {
        text: string;
        expression: Expression;
    };
}

export interface Episode {
    id: string;
    slug: string; // URL: thehonestpmm.com/episodes/homepage-redesign
    title: string;
    description: string;
    date: string;
    thumbnail?: string;
    theme?: {
        accent: string;
        background: string;
    };
    sections: Section[];
    outro: {
        text: string;
        cta: {
            label: string;
            url: string;
        };
    };
}
