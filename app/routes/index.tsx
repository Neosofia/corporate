import { HeroSection } from "@/components/HeroSection";
import { ContentSection } from "@/components/ContentSection";
import { DashboardMockup } from "@/components/DashboardMockup";

export default function Home() {
  return (
    <>
      <HeroSection
        eyebrow="Open-source platform engineering"
        heading="Building compliant platforms is hard, but it doesn't have to be."
        description="Ship platform infrastructure with ready-made SDKs, policy automation, and expert guidance that keeps your teams moving."
        ctas={[
          { label: "Start Building", href: "/tools" },
          { label: "Contact us", href: "/contact", variant: "outline" },
        ]}
        visual={<DashboardMockup />}
      />

      <ContentSection
        heading="Tools built for platform velocity."
        description="Reusable SDKs, QMS generators, and infrastructure scripts keep teams aligned and reduce costly rework. Generate compliant documentation from standard templates and platform metadata. Use consistent authentication, access control, and workflow-building blocks across projects."
        ctas={[
          { label: "Build Your Own Cloud", href: "https://github.com/Neosofia/infrastructure" },
          { label: "Build Your Own Platform", href: "https://github.com/Neosofia/cdp" },
          { label: "Integrate with your platform", href: "https://github.com/Neosofia/sdk" },
        ]}
      />
    </>
  );
}
