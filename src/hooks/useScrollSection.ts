import { useState, useEffect } from 'react';

export function useScrollSection(sectionIds: string[]): string | null {
    const [activeSection, setActiveSection] = useState<string | null>(null);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        sectionIds.forEach((id) => {
            const element = document.getElementById(id);
            if (!element) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                            setActiveSection(id);
                        }
                    });
                },
                { threshold: 0.5 }
            );

            observer.observe(element);
            observers.push(observer);
        });

        return () => {
            observers.forEach((observer) => observer.disconnect());
        };
    }, [sectionIds]);

    return activeSection;
}
