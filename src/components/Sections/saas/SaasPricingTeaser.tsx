
import { Check } from 'lucide-react';

interface PricingTier {
    name: string;
    price: string;
    period: string;
    features: string[];
    highlighted?: boolean;
}

interface SaasPricingTeaserProps {
    headline: string;
    tiers: PricingTier[];
    theme?: { accent: string };
}

export function SaasPricingTeaser({ headline, tiers, theme }: SaasPricingTeaserProps) {
    const accent = theme?.accent || '#d4ff00';

    return (
        <section className="py-24 bg-black">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-white">{headline}</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    {tiers.map((tier, i) => (
                        <div
                            key={i}
                            className={`p-8 rounded-2xl border ${tier.highlighted
                                ? 'bg-white/10 border-[var(--accent)] relative'
                                : 'bg-transparent border-white/10'
                                }`}
                            style={{ '--accent': accent } as any}
                        >
                            {tier.highlighted && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[var(--accent)] text-black text-xs font-bold uppercase tracking-wide">
                                    Most Popular
                                </div>
                            )}
                            <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-4xl font-bold text-white">{tier.price}</span>
                                <span className="text-gray-500">{tier.period}</span>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {tier.features.map((feature, f) => (
                                    <li key={f} className="flex items-center gap-3 text-gray-400">
                                        <Check size={16} className={tier.highlighted ? 'text-[var(--accent)]' : 'text-gray-600'} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={`w-full py-4 rounded-full font-bold transition-all ${tier.highlighted
                                    ? 'bg-[var(--accent)] text-black hover:scale-105'
                                    : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                            >
                                Choose {tier.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
