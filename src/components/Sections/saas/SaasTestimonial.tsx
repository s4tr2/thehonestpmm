
import { Quote } from 'lucide-react';

interface SaasTestimonialProps {
    quote: string;
    author: string;
    role: string;
    company: string;
    avatar?: string;
}

export function SaasTestimonial({ quote, author, role, company }: SaasTestimonialProps) {
    return (
        <section className="py-24 bg-[#0a0a0a] relative">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <Quote className="mx-auto mb-8 text-white/20 w-12 h-12" />
                <h2 className="text-2xl md:text-4xl font-display font-medium leading-tight mb-12 text-white">
                    "{quote}"
                </h2>

                <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10" />
                    <div className="text-left">
                        <div className="font-bold text-white">{author}</div>
                        <div className="text-sm text-gray-500">{role}, {company}</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
