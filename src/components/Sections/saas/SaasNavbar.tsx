import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface SaasNavbarProps {
    logo: string;
    navItems: string[];
    ctaText: string;
    theme?: { accent: string };
}

export function SaasNavbar({ logo, navItems, ctaText, theme }: SaasNavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const accent = theme?.accent || '#d4ff00';

    return (
        <nav className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-lg border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                {/* Logo */}
                <div className="text-2xl font-bold tracking-tighter text-white">
                    {logo}
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                        >
                            {item}
                        </a>
                    ))}
                    <button
                        className="px-5 py-2.5 rounded-full text-sm font-bold text-black transition-transform hover:scale-105"
                        style={{ backgroundColor: accent }}
                    >
                        {ctaText}
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden absolute top-20 left-0 right-0 bg-black border-b border-white/10 p-4 flex flex-col gap-4"
                >
                    {navItems.map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="text-lg font-medium text-gray-300 hover:text-white"
                        >
                            {item}
                        </a>
                    ))}
                    <button
                        className="w-full py-3 rounded-lg font-bold text-black mt-2"
                        style={{ backgroundColor: accent }}
                    >
                        {ctaText}
                    </button>
                </motion.div>
            )}
        </nav>
    );
}
