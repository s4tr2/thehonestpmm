import type { Episode } from '@/types/episode';
import { Character } from '@/components/Character/Character';
import { SectionRenderer } from '@/components/SectionRenderer/SectionRenderer';
import { EpisodeSelector } from './EpisodeSelector';
import { OutroSection } from '@/components/Outro/OutroSection';
import { useScrollSection } from '@/hooks/useScrollSection';

interface EpisodeLayoutProps {
    episode: Episode;
    allEpisodes: Episode[];
}

export function EpisodeLayout({ episode, allEpisodes }: EpisodeLayoutProps) {
    const sectionIds = episode.sections.map(s => s.id);
    const activeSection = useScrollSection(sectionIds);

    const currentSectionData = episode.sections.find(s => s.id === activeSection);
    const currentCommentary = currentSectionData?.commentary || { text: '', expression: 'neutral' };

    return (
        <div
            className="relative min-h-screen bg-[#0a0a0a] text-white selection:bg-[#d4ff00] selection:text-black"
            style={{
                '--accent': episode.theme?.accent || '#d4ff00',
                '--background': episode.theme?.background || '#0a0a0a'
            } as React.CSSProperties}
        >
            <EpisodeSelector currentEpisode={episode} allEpisodes={allEpisodes} />

            <main>
                {episode.sections.map((section) => (
                    <SectionRenderer
                        key={section.id}
                        section={section}
                        isActive={activeSection === section.id}
                        theme={episode.theme}
                    />
                ))}

                <OutroSection outro={episode.outro} theme={episode.theme} />
            </main>

            <div className="z-50">
                <Character
                    expression={currentCommentary.expression}
                    comment={currentCommentary.text}
                    isVisible={!!activeSection} // Only show when a section is active
                />
            </div>
        </div>
    );
}
