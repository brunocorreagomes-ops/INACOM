import { motion } from "motion/react";
import { SeoHead } from "../components/SeoHead";
import { ChevronRight, Calendar, User, Tag } from "lucide-react";

export function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <SeoHead 
        title="Blog Técnico INACOM | Expertise em Brunimento Industrial"
        description="Artigos fundamentais sobre processos de brunimento, metrologia e gestão industrial abrasiva."
        canonical="https://inacom.com.br/blog"
      />
      
      <header className="py-32 px-4 bg-surface-container-low border-b border-outline-variant/10">
        <div className="max-w-[1440px] mx-auto">
          <span className="text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-6 block">Industrial Insights</span>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-monolith leading-tight">
            Base de<br /><span className="text-primary">Conhecimento.</span>
          </h1>
          <p className="text-on-surface-variant mt-8 max-w-xl font-light text-xl border-l-2 border-primary pl-10">
            Acompanhe as últimas inovações e guias técnicos do setor de abrasivos e usinagem de precisão.
          </p>
        </div>
      </header>

      <section className="py-24 px-4 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* We would map the blog posts here, reuse BlogArticles component logic but with more detail */}
          <article className="group cursor-pointer">
             <div className="aspect-[16/9] bg-surface mb-8 ghost-border"></div>
             <div className="flex items-center gap-6 mb-4 text-[10px] font-bold uppercase tracking-widest text-outline">
               <span className="flex items-center gap-2 text-primary font-black"><Tag size={12} /> Metrologia</span>
               <span className="flex items-center gap-2"><Calendar size={12} /> 12 Abr, 2026</span>
             </div>
             <h2 className="text-2xl font-black uppercase leading-tight mb-6 group-hover:text-primary transition-colors">Como Calcular o Ra no Brunimento Industrial</h2>
             <p className="text-on-surface-variant font-light text-sm line-clamp-3 mb-8">
               A rugosidade aritmética (Ra) é o parâmetro mais crítico no brunimento industrial. Este guia ensina como realizar o cálculo matemático...
             </p>
             <button className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2 border-b-2 border-primary pb-2">
               Ler Artigo Completo <ChevronRight size={14} />
             </button>
          </article>
        </div>
      </section>
    </div>
  );
}
