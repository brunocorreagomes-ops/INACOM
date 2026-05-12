import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { SeoHead } from "../components/SeoHead";
import { ChevronRight, Calendar, Tag, ArrowLeft } from "lucide-react";

export function BlogPage() {
  const { slug } = useParams();

  if (slug) {
    return (
      <div className="min-h-screen bg-white">
        <SeoHead 
          title="Artigo Técnico | INACOM"
          description="Conteúdo técnico detalhado sobre processos de abrasivos e precisão industrial."
        />
        <article className="py-32 px-4 max-w-4xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary mb-12 hover:gap-3 transition-all">
            <ArrowLeft size={14} /> Voltar ao Blog
          </Link>
          <span className="text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Artigo Técnico</span>
          <h1 className="text-4xl md:text-6xl font-black uppercase mb-12 leading-tight tracking-monolith">
            Conhecimento em <br /> <span className="text-primary">Evolução.</span>
          </h1>
          <div className="prose prose-lg max-w-none font-light text-on-surface-variant space-y-8">
            <p className="text-xl leading-relaxed border-l-4 border-primary pl-8 italic">
              Este artigo está sendo atualizado por nossa equipe de engenharia para refletir as últimas normas ISO de rugosidade e metrologia industrial.
            </p>
            <p>
              O processo de brunimento é fundamental para a vida útil de componentes mecânicos. A correta especificação de abrasivos garante o desempenho e a segurança em aplicações críticas.
            </p>
          </div>
          
          <div className="mt-20 pt-12 border-t border-outline-variant/20">
            <Link to="/#pedido-orcamento" className="bg-primary text-white px-10 py-5 font-black uppercase tracking-widest hover:bg-primary-container transition-all inline-block">
              Consultar Especialista
            </Link>
          </div>
        </article>
      </div>
    );
  }

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
             <Link to="/blog/como-calcular-ra-brunimento" className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2 border-b-2 border-primary pb-2">
               Ler Artigo Completo <ChevronRight size={14} />
             </Link>
          </article>
        </div>
      </section>
    </div>
  );
}
