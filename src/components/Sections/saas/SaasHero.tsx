import { motion } from 'framer-motion';

interface SaasHeroProps {
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    isActive?: boolean;
    theme?: { accent: string };
}

export function SaasHero({ headline, subheadline, primaryCta, secondaryCta, theme }: SaasHeroProps) {
    const accent = theme?.accent || '#d4ff00';

    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0a0a0a] pt-20">
            {/* Abstract background gradient blob */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 blur-[120px] pointer-events-none"
                style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)` }}
            />

            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-gray-300 inline-block backdrop-blur-sm"
                >
                    Announcement: We are AI now ✨
                </motion.div>

                <motion.h1
                    className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white tracking-tight leading-[1.1]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {headline}
                </motion.h1>

                <motion.p
                    className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    {subheadline}
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <button
                        className="px-8 py-4 rounded-full font-bold text-black transition-transform hover:scale-105 active:scale-95"
                        style={{ backgroundColor: accent }}
                    >
                        {primaryCta}
                    </button>
                    <button className="px-8 py-4 rounded-full font-bold text-white border border-gray-700 hover:border-gray-500 hover:bg-white/5 transition-all">
                        {secondaryCta}
                    </button>
                </motion.div>

                {/* Fake UI Preview */}
                <motion.div
                    className="mt-20 w-full max-w-4xl h-[400px] bg-gray-900/50 rounded-t-xl border border-gray-800 shadow-2xl overflow-hidden relative"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <div className="h-8 bg-gray-800/50 border-b border-gray-700/50 flex items-center px-4 gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                        <div className="w-3 h-3 rounded-full bg-green-500/20" />
                    </div>
                    <div className="p-8 grid grid-cols-3 gap-4 opacity-50">
                        <div className="h-32 bg-gray-800 rounded-lg animate-pulse" />
                        <div className="h-32 bg-gray-800 rounded-lg animate-pulse delay-75" />
                        <div className="h-32 bg-gray-800 rounded-lg animate-pulse delay-150" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
