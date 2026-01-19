import { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Using Link for now or useNavigate
import { Link } from 'react-router-dom';
import type { Episode } from '@/types/episode';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EpisodeSelectorProps {
    currentEpisode: Episode;
    allEpisodes: Episode[];
}

export function EpisodeSelector({ currentEpisode, allEpisodes }: EpisodeSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed top-4 left-4 z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-black/80 backdrop-blur-md rounded-full border border-white/10 text-white hover:bg-white/10 transition-colors"
            >
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="font-mono text-sm">EPISODE {allEpisodes.indexOf(currentEpisode) + 1}</span>
                <span className="text-gray-400">|</span>
                <span className="font-bold hidden sm:inline">{currentEpisode.title}</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full left-0 mt-2 w-72 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden p-2"
                    >
                        <div className="text-xs font-bold text-gray-500 px-3 py-2 uppercase tracking-wider">
                            Watch Next
                        </div>
                        <div className="flex flex-col gap-1">
                            {allEpisodes.map((ep) => (
                                <Link
                                    key={ep.id}
                                    to={`/episodes/${ep.slug}`}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${ep.id === currentEpisode.id
                                        ? 'bg-white/10'
                                        : 'hover:bg-white/5'
                                        }`}
                                >
                                    <div className="mt-1 min-w-[20px] h-[20px] rounded-full flex items-center justify-center border border-white/20">
                                        {ep.id === currentEpisode.id && <div className="w-2 h-2 bg-[var(--accent)] rounded-full" style={{ '--accent': ep.theme?.accent || '#d4ff00' } as any} />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white mb-0.5">{ep.title}</p>
                                        <p className="text-xs text-gray-400 line-clamp-1">{ep.description}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
