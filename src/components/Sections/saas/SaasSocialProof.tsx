

interface SaasSocialProofProps {
    headline: string;
    logos: string[];
}

export function SaasSocialProof({ headline, logos }: SaasSocialProofProps) {
    return (
        <section className="py-16 bg-[#0a0a0a] border-y border-white/5">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-sm font-medium text-gray-500 mb-8 uppercase tracking-widest">
                    {headline}
                </p>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {logos.map((logo, i) => (
                        <div key={i} className="h-8 md:h-10 bg-white/20 rounded w-24 md:w-32 animate-pulse flex items-center justify-center text-xs text-white/10">
                            {logo}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
