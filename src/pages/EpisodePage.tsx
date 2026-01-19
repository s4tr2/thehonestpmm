import { useParams } from 'react-router-dom';
import { getEpisodeBySlug, getAllEpisodes } from '@/data/episodes';
import { EpisodeLayout } from '@/components/Layout/EpisodeLayout';

export default function EpisodePage() {
    const { slug } = useParams<{ slug: string }>();
    // Use function to get episode to avoid undefined issues if data is loaded async later
    const episode = slug ? getEpisodeBySlug(slug) : undefined;
    const allEpisodes = getAllEpisodes();

    if (!episode) {
        return <div className="min-h-screen flex items-center justify-center text-white">Episode not found</div>;
    }

    return <EpisodeLayout episode={episode} allEpisodes={allEpisodes} />;
}
