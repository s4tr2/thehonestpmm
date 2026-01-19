

interface SaasFinalCTAProps {
    headline: string;
    subheadline: string;
    ctaText: string;
    theme?: { accent: string };
}

export function SaasFinalCTA({ headline, subheadline, ctaText, theme }: SaasFinalCTAProps) {
    const accent = theme?.accent || '#d4ff00';

    return (
        <section className="py-32 bg-[#0a0a0a] relative overflow-hidden text-center">
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10 blur-[120px] pointer-events-none"
                style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)` }}
            />

            <div className="relative z-10 max-w-4xl mx-auto px-4">
                <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">{headline}</h2>
                <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">{subheadline}</p>
                <button
                    className="px-8 py-4 rounded-full font-bold text-black text-lg transition-transform hover:scale-105"
                    style={{ backgroundColor: accent }}
                >
                    {ctaText}
                </button>
            </div>
        </section>
    );
}
