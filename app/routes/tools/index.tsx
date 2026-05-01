import { InfoCard } from "../../components/InfoCard";
import { TextLink } from "../../components/TextLink";

const cardData = [
  {
    title: "Healthcare",
    subtitle: "Compliance for clinical, patient, and health data systems.",
    points: [
      {
        label: "HIPAA",
        href: "https://www.hhs.gov/hipaa/index.html",
        suffix: " - health information privacy and security",
      },
      {
        label: "HITECH",
        href: "https://www.hhs.gov/hipaa/for-professionals/index.html",
        suffix: " - electronic health records and breach notification",
      },
      {
        label: "21 CFR Part 11",
        href: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-A/part-11",
        suffix: " - electronic records and signatures",
      },
      "ISO 27799 - health information security management",
    ],
  },
  {
    title: "Finance",
    subtitle: "Controls for payments, customer data, and financial systems.",
    points: [
      {
        label: "PCI-DSS",
        href: "https://www.pcisecuritystandards.org/pci_security/",
        suffix: " - payment card security",
      },
      {
        label: "SOX",
        href: "https://www.sec.gov/spotlight/sarbanes-oxley.htm",
        suffix: " - financial reporting and internal controls",
      },
      {
        label: "GLBA",
        href: "https://www.federalreserve.gov/supervisionreg/topics/glbact.htm",
        suffix: " - data privacy for financial institutions",
      },
      "PSD2 - strong customer authentication in Europe",
      "ISO 27001 - information security management",
    ],
  },
  {
    title: "International",
    subtitle: "Global data protection and digital market requirements.",
    points: [
      {
        label: "GDPR",
        href: "https://gdpr.eu/",
        suffix: " - EU personal data protection",
      },
      {
        label: "DMA",
        href: "https://digital-strategy.ec.europa.eu/en/policies/digital-markets-act",
        suffix: " - digital markets and gatekeeper obligations",
      },
      {
        label: "UK DPA",
        href: "https://www.gov.uk/data-protection",
        suffix: " - UK data protection rules",
      },
      "APPI - Japan personal information protection",
      "PIPL - China's personal information protection law",
    ],
  },
];

export default function Tools() {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white min-h-screen">
      <div className="relative mx-auto w-full">

        <h1 className="py-8 text-2xl tracking-tight text-white">
          Tools for building regulated platforms
        </h1>
        <p className="text-sm text-slate-400 mb-6">
           New to the world of regulated platforms? Read the <a className="text-sky-300 underline decoration-sky-300 hover:text-sky-200 hover:decoration-sky-200 underline-offset-2" href="#regulatory-context">Regulatory Context section</a> below first.
        </p>

        <div className="mt-6">
          <div className="space-y-6 text-lg text-slate-300 leading-8">
            <p>We offer a range of tools to help you implement and maintain compliance across your platform. They are organized by layer so you can connect regulations to the actual infrastructure, services, and documentation you need.</p>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <section>
              <h2 className="text-lg font-semibold text-white">Private Cloud</h2>
              <p className="mt-2 text-slate-300 leading-7">If you want to operate your own compliant data center or private cloud environment, our infrastructure scripts in the <TextLink to="https://github.com/Neosofia/infrastructure">Private Cloud</TextLink> repo help you deploy a virtualization stack with compliant network segmentation, access controls, and platform isolation.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-white">Public Cloud</h2>
              <p className="mt-2 text-slate-300 leading-7">Infrastructure-as-code scripts in our <TextLink to="https://github.com/Neosofia/infrastructure">Public Cloud</TextLink> repo support compliant AWS, GCP, and Azure environments with VPCs, subnets, security groups, and logical controls designed for regulated workloads.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-white">Core Platform Services</h2>
              <p className="mt-2 text-slate-300 leading-7">Reusable authentication, authorization, and platform services in the <TextLink to="https://github.com/Neosofia/authentication">Authentication</TextLink> repo provide secure building blocks that let multiple teams ship compliant applications faster.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-white">Developer SDKs</h2>
              <p className="mt-2 text-slate-300 leading-7">SDKs and client libraries in the <TextLink to="https://github.com/Neosofia/sdk">SDK</TextLink> repo make it easier for developers to integrate compliance features like access management, auditing, and structured logging into their applications.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-white">Clinical Data Platform</h2>
              <p className="mt-2 text-slate-300 leading-7">A reference implementation of a compliant clinical data platform, built with our tools and services in the <TextLink to="https://github.com/Neosofia/cdp">Clinical Data Platform</TextLink> repo, can serve as a starting point or sandbox for your own solution.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-white">Compliance and Procedure Guides</h2>
              <p className="mt-2 text-slate-300 leading-7">A library of policies and procedures, plus guides for implementation and audit readiness in the <TextLink to="https://github.com/Neosofia/docs">Neosofia Docs</TextLink> repo and <TextLink to="https://neosofia.tech/resources/">Neosofia QMS, templates, and checklists</TextLink>, helps you turn controls into documented, repeatable practice.</p>
            </section>
          </div>
        </div>

        <div id="regulatory-context" className="mt-16">
          <h2 className="text-xl font-semibold text-white">Regulatory context</h2>
          <div className="mt-4 space-y-6 text-lg text-slate-300 leading-8">
            <p>Before you build or augment a compliant platform, it helps to understand the regulatory landscape you operate in. There are thousands of regulations that could apply to your platform, but the ones that matter most depend on your industry, customer base, and the types of data you handle.</p>
            <p>For B2B platforms, larger clients typically insist on compliance checks like SOC 2 and ISO 27001. They may also require data processing agreements, security questionnaires, and proof that your platform follows agreed controls. For B2C platforms, regional rules such as CCPA (California) and GDPR (EU) are often the first priority. On top of that, industry-specific rules matter if you handle sensitive healthcare or financial data. Cyber insurance adds another layer: insurers will typically require you to meet clear standards and controls before they will insure your platform.</p>
            <p>The landscape is complex and contains contradictions, but the good news is that there are common frameworks, controls, and policies that can help you meet the most important requirements across the board. If you want a deeper dive, check out our <TextLink to="/blog/0000_why_compliance">first</TextLink> and <TextLink to="/blog/0001_what_is_compliance">second</TextLink> blog posts for more context.</p>
            <p>In our <TextLink to="/blog/0004_mvc">Minimal Viable Compliance</TextLink> and <TextLink to="/blog/0005_beyond_mvc">Compliance Levels</TextLink> blog posts, we go into what we feel is the minimal set of controls any organization of any size and in any industry should have in place. We then break down the thousands of regulations into three levels of controls: 1) foundational controls that every platform should have, 2) general controls that apply across multiple industries, and 3) very specific controls tailored to particular industries or clients will insist you comply with.</p>
            <p>Our solution takes a cover-all-your-bases approach: we build a comprehensive set of controls, policies, and documentation that align with the most common requirements across industries in what we describe as level two compliance. This gives you a strong foundation to meet the needs of your clients and regulators while also providing the flexibility to adapt as your platform evolves for more stringent requirements.</p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {cardData.map((card) => (
              <InfoCard
                key={card.title}
                title={card.title}
                subtitle={card.subtitle}
                points={card.points}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
