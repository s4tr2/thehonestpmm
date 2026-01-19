import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface HeroSectionProps {
    latestEpisodeSlug: string;
}

export function HeroSection({ latestEpisodeSlug }: HeroSectionProps) {
    return (
        <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] bg-purple-900 pointer-events-none"
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10"
            >
                <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter">
                    THE HONEST <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4ff00] to-green-400">PMM</span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    A PMM's brutally honest take on the fake deliverables we're asked to make every day.
                </p>

                <Link
                    to={`/episodes/${latestEpisodeSlug}`}
                    className="inline-block bg-[#d4ff00] text-black px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_40px_-10px_#d4ff00]"
                >
                    Watch Latest Episode →
                </Link>
            </motion.div>
        </section>
    );
}
