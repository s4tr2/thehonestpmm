import { homepageRedesignEpisode } from './homepage-redesign';
import type { Episode } from '@/types/episode';

export const allEpisodes: Episode[] = [
    homepageRedesignEpisode,
];

export function getEpisodeBySlug(slug: string): Episode | undefined {
    return allEpisodes.find((ep) => ep.slug === slug);
}

export function getAllEpisodes(): Episode[] {
    return allEpisodes;
}
