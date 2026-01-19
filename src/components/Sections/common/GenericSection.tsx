

interface GenericSectionProps {
    headline?: string;
    subheadline?: string;
    isActive?: boolean;
    theme?: { accent: string };
    [key: string]: any;
}

export function GenericSection({ headline, subheadline, theme, ...props }: GenericSectionProps) {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-gray-900/50 border-b border-gray-800">
            <div className="max-w-4xl text-center">
                {headline && (
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">{headline}</h2>
                )}
                {subheadline && (
                    <p className="text-xl text-gray-400 mb-8">{subheadline}</p>
                )}
                <div className="p-4 bg-gray-800 rounded-lg text-left overflow-auto max-h-60 max-w-full">
                    <pre className="text-xs text-gray-500">
                        {JSON.stringify(props, null, 2)}
                    </pre>
                </div>
            </div>
        </section>
    );
}
