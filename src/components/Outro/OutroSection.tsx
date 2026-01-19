import { motion } from 'framer-motion';

interface OutroProps {
    text: string;
    cta: {
        label: string;
        url: string;
    };
}

interface OutroSectionProps {
    outro: OutroProps;
    theme?: { accent: string };
}

export function OutroSection({ outro, theme }: OutroSectionProps) {
    const accent = theme?.accent || '#d4ff00';

    return (
        <section className="min-h-[50vh] flex flex-col items-center justify-center p-8 bg-black text-center relative overflow-hidden">
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-[100px] pointer-events-none"
                style={{ background: accent }}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-100px" }}
                className="relative z-10 max-w-2xl"
            >
                <div className="text-4xl md:text-6xl mb-8 animate-bounce">
                    🤫
                </div>
                <h2 className="text-2xl md:text-4xl font-display font-bold mb-8 text-white leading-tight">
                    "{outro.text}"
                </h2>

                <a
                    href={outro.cta.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-black transition-transform hover:scale-105"
                    style={{ backgroundColor: accent }}
                >
                    {outro.cta.label}
                    <span className="text-xl">→</span>
                </a>
            </motion.div>
        </section>
    );
}
