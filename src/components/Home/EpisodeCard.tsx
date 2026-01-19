import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Episode } from '@/types/episode';
import { Play } from 'lucide-react';

interface EpisodeCardProps {
    episode: Episode;
    index: number;
}

export function EpisodeCard({ episode, index }: EpisodeCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
        >
            <Link
                to={`/episodes/${episode.slug}`}
                className="group block relative rounded-2xl overflow-hidden bg-gray-900 border border-white/10 hover:border-[var(--accent)] transition-colors"
                style={{ '--accent': episode.theme?.accent || '#d4ff00' } as any}
            >
                <div className="aspect-video bg-gray-800 relative overflow-hidden">
                    {/* Placeholder for thumbnail */}
                    <div
                        className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity bg-gradient-to-br from-gray-700 to-black"
                        style={{ background: `linear-gradient(45deg, ${episode.theme?.background}, ${episode.theme?.accent})` }}
                    />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform">
                            <Play fill="currentColor" className="ml-1" />
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-mono text-[var(--accent)] px-2 py-1 rounded bg-white/5 border border-white/10">
                            EPISODE {index + 1}
                        </span>
                        <span className="text-xs text-gray-500">{episode.date}</span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--accent)] transition-colors">
                        {episode.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2">
                        {episode.description}
                    </p>
                </div>
            </Link>
        </motion.div>
    );
}
