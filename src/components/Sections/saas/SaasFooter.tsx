

interface Column {
    title: string;
    links: string[];
}

interface SaasFooterProps {
    columns: Column[];
    theme?: { accent: string };
}

export function SaasFooter({ columns, theme }: SaasFooterProps) {
    const accent = theme?.accent || '#d4ff00';

    return (
        <footer className="py-20 bg-black border-t border-white/10 text-sm">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-10">
                {columns.map((col, idx) => (
                    <div key={idx} className="flex flex-col gap-4">
                        <h4 className="font-bold text-white mb-2">{col.title}</h4>
                        <ul className="flex flex-col gap-3">
                            {col.links.map((link, lIdx) => (
                                <li key={lIdx}>
                                    <a href="#" className="text-gray-500 hover:text-[var(--accent)] transition-colors" style={{ '--accent': accent } as any}>
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-white/10 text-gray-600 flex justify-between items-center">
                <p>© 2026 SynergyFlow Inc. All rights reserved.</p>
                <div className="flex gap-4">
                    <div className="w-5 h-5 bg-gray-800 rounded-full" />
                    <div className="w-5 h-5 bg-gray-800 rounded-full" />
                    <div className="w-5 h-5 bg-gray-800 rounded-full" />
                </div>
            </div>
        </footer>
    );
}
