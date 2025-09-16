import { GlossaryList } from "@/components/glossary-list";
import { Header } from "@/components/glossary/Header";
import { AlphabetNav } from "@/components/glossary/AlphabetNav";
import { SearchBar } from "@/components/glossary/SearchBar";
import { GlossaryTerm } from "@/lib/db/schema";
import {getCurrentUser} from "@/lib/auth/actions";

const TERMS: GlossaryTerm[] = [
    {
        id: "1",
        term: "Alt Text",
        category: "SEO",
        definition:
            "Text description of an image used by search engines and screen readers to understand image content.",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "2",
        term: "Backlink",
        category: "SEO",
        definition:
            "A link from another site to your site. High-quality backlinks can improve search rankings.",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "3",
        term: "Content Pillar",
        category: "Content Marketing",
        definition:
            "A comprehensive resource that anchors related cluster content targeting specific audience needs.",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "4",
        term: "Domain Authority",
        category: "SEO",
        definition:
            "A predictive metric estimating how likely a website is to rank on search engine result pages.",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "5",
        term: "Embeddings",
        category: "Artificial Intelligence",
        definition:
            "Numeric vector representations of text used by AI models to compute similarity and retrieve context.",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "6",
        term: "Funnel",
        category: "Content Marketing",
        definition:
            "The journey a user takes from awareness to conversion, often mapped to content across stages.",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "7",
        term: "Generative AI",
        category: "Artificial Intelligence",
        definition:
            "AI systems that create new content such as text, images, or audio from learned patterns.",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "8",
        term: "Machine Learning Operations (MLOps)",
        category: "Artificial Intelligence",
        definition:
            "An end-to-end discipline that combines practices, tools, and cultural philosophies to reliably develop, deploy, monitor, and continuously improve machine learning systems in production. MLOps spans dataset versioning, feature stores, model training and evaluation pipelines, experiment tracking, continuous integration/continuous delivery (CI/CD) for models, scalable online/offline inference, observability (data and model drift detection), governance and compliance, rollback strategies, and cross-functional collaboration between data scientists, ML engineers, DevOps, security, and product teams. Effective MLOps minimizes time-to-value, reduces operational risk, and ensures models remain accurate, safe, and aligned with business outcomes over their lifecycle, even as data and user behavior evolve.",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

export default async function Home() {
    const user = await getCurrentUser();

    console.log('user', user);
  return (
    <div className="space-y-6">
      <Header />
      <SearchBar />
      <AlphabetNav />
      <GlossaryList initialTerms={TERMS} />
    </div>
  );
}
