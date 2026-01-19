import { motion } from 'framer-motion';

interface SaasIntegrationsProps {
    headline: string;
    integrations: string[];
}

export function SaasIntegrations({ headline, integrations }: SaasIntegrationsProps) {
    return (
        <section className="py-24 bg-black border-y border-white/10">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-12 text-white">{headline}</h2>
                <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                    {integrations.map((tool, i) => (
                        <motion.div
                            key={i}
                            className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/30 transition-all cursor-default"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            {tool}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
