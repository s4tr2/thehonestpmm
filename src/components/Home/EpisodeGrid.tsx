import type { Episode } from '@/types/episode';
import { EpisodeCard } from './EpisodeCard';

interface EpisodeGridProps {
    episodes: Episode[];
}

export function EpisodeGrid({ episodes }: EpisodeGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {episodes.map((episode, index) => (
                <EpisodeCard key={episode.id} episode={episode} index={index} />
            ))}
        </div>
    );
}
