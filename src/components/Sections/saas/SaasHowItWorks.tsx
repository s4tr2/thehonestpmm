import { motion } from 'framer-motion';

interface Step {
    number: number;
    title: string;
    description: string;
}

interface SaasHowItWorksProps {
    headline: string;
    steps: Step[];
    theme?: { accent: string };
}

export function SaasHowItWorks({ headline, steps, theme }: SaasHowItWorksProps) {
    const accent = theme?.accent || '#d4ff00';

    return (
        <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-white">{headline}</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connecting line */}
                    <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            className="relative flex flex-col items-center text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                        >
                            <div
                                className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-black mb-6 relative z-10"
                                style={{ backgroundColor: accent }}
                            >
                                {step.number}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                            <p className="text-gray-400">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
