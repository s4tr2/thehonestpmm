import { getAllEpisodes } from '@/data/episodes';
import { EpisodeGrid } from '@/components/Home/EpisodeGrid';
import { HeroSection } from '@/components/Home/HeroSection';

export default function HomePage() {
    const episodes = getAllEpisodes();
    const latestEpisode = episodes[0];

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#d4ff00] selection:text-black">
            <HeroSection latestEpisodeSlug={latestEpisode.slug} />

            <section className="px-4 py-24 max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold mb-12 text-center text-gray-500 uppercase tracking-widest">
                    Available Episodes
                </h2>
                <EpisodeGrid episodes={episodes} />
            </section>
        </main>
    );
}
