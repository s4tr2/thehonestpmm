import type { Section } from '@/types/episode';
import { GenericSection } from '@/components/Sections/common/GenericSection';
import * as SaasSections from '@/components/Sections/saas';

const componentMap: Record<string, React.ComponentType<any>> = {
    SaasNavbar: SaasSections.SaasNavbar,
    SaasHero: SaasSections.SaasHero,
    SaasFeatures: SaasSections.SaasFeatures,
    SaasSocialProof: SaasSections.SaasSocialProof,
    SaasHowItWorks: SaasSections.SaasHowItWorks,
    SaasIntegrations: SaasSections.SaasIntegrations,
    SaasTestimonial: SaasSections.SaasTestimonial,
    SaasPricingTeaser: SaasSections.SaasPricingTeaser,
    SaasFinalCTA: SaasSections.SaasFinalCTA,
    SaasFooter: SaasSections.SaasFooter,
    GenericSection: GenericSection,
};

interface SectionRendererProps {
    section: Section;
    isActive: boolean;
    theme?: { accent: string; background: string };
}

export function SectionRenderer({ section, isActive, theme }: SectionRendererProps) {
    const Component = componentMap[section.component] || GenericSection;

    return (
        <div
            id={section.id}
            data-section={section.id}
            className="relative"
        >
            <Component {...section.props} isActive={isActive} theme={theme} />
        </div>
    );
}
