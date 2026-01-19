import { motion } from 'framer-motion';
import { Sparkles, Zap, Shield, BarChart3, Users, Plug } from 'lucide-react';

interface Feature {
    icon: string;
    title: string;
    description: string;
}

interface SaasFeaturesProps {
    headline: string;
    features: Feature[];
    theme?: { accent: string };
}

const iconMap: Record<string, any> = {
    chart: BarChart3,
    plug: Plug,
    sparkles: Sparkles,
    users: Users,
    workflow: Zap,
    shield: Shield,
};

export function SaasFeatures({ headline, features, theme }: SaasFeaturesProps) {
    const accent = theme?.accent || '#d4ff00';

    return (
        <section className="py-24 bg-[#0a0a0a] relative">
            <div className="max-w-7xl mx-auto px-4">
                <motion.h2
                    className="text-3xl md:text-5xl font-bold text-center mb-16 text-white"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {headline}
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const Icon = iconMap[feature.icon] || Sparkles;

                        return (
                            <motion.div
                                key={index}
                                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors group"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div
                                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-black"
                                    style={{ backgroundColor: accent }}
                                >
                                    <Icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[var(--accent)] transition-colors" style={{ '--accent': accent } as any}>
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
