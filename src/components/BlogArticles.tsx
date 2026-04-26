import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogPost {
// ...
  slug: string;
  title: string;
  category: string;
  date: string; // ISO 8601
  dateDisplay: string;
  excerpt: string;
  keywords: string[];
  image: string;
  schema: {
    headline: string;
    description: string;
    datePublished: string;
    articleSection: string;
    keywords: string;
  }
}

const posts: BlogPost[] = [
  {
    slug: "como-calcular-ra-brunimento",
    title: "Como Calcular o Ra no Brunimento Industrial: Guia Completo",
    category: "Metrologia",
    date: "2026-04-12",
    dateDisplay: "12 Abr, 2026",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    excerpt: "A rugosidade aritmética (Ra) é o parâmetro mais crítico no brunimento. Aprenda como calcular, medir e interpretar os resultados para garantir a qualidade...",
    keywords: ["calcular Ra brunimento", "rugosidade superficial brunimento", "Ra honing"],
    schema: {
      headline: "Como Calcular o Ra no Brunimento Industrial | INACOM",
      description: "Guia técnico sobre definição de Ra, Rz, Rmax; como medir e valores típicos por aplicação industrial.",
      datePublished: "2026-04-12T09:00:00-03:00",
      articleSection: "Metrologia",
      keywords: "calcular Ra brunimento, rugosidade superficial, Ra honing"
    }
  },
  {
    slug: "reducao-custo-liga-vitrificada-brunimento",
    title: "Redução de Custo por Peça: O Impacto da Liga Vitrificada",
    category: "Gestão Industrial",
    date: "2026-04-08",
    dateDisplay: "08 Abr, 2026",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5feeec52?auto=format&fit=crop&q=80&w=800",
    excerpt: "Descubra como a escolha entre liga vitrificada e resinóide impacta diretamente a vida útil da pedra abrasiva e a economia na linha de produção...",
    keywords: ["custo por peça brunimento", "liga vitrificada abrasivo", "gestão industrial"],
    schema: {
      headline: "Como a liga vitrificada reduz o custo por peça no brunimento industrial",
      description: "Análise técnica do impacto da liga abrasiva no custo operacional e eficiência de produção.",
      datePublished: "2026-04-08T09:00:00-03:00",
      articleSection: "Gestão Industrial",
      keywords: "custo por peça brunimento, liga vitrificada, abrasivos"
    }
  },
  {
    slug: "diferenca-brunimento-retificacao",
    title: "Brunimento vs Retificação: Quando Usar Cada Processo?",
    category: "Processos",
    date: "2026-03-24",
    dateDisplay: "24 Mar, 2026",
    image: "https://images.unsplash.com/photo-1565158223933-2868ff1c944d?auto=format&fit=crop&q=80&w=800",
    excerpt: "Entenda as diferenças técnicas, aplicações ideais e custos entre o brunimento (honing) e a retificação (grinding) para peças de alta precisão...",
    keywords: ["diferença brunimento retificação", "honing vs grinding", "brunimento industrial"],
    schema: {
      headline: "Brunimento vs Retificação: Quando Usar Cada Processo | INACOM",
      description: "Comparativo técnico entre brunimento e retificação: rugosidade, precisão e eficiência.",
      datePublished: "2026-03-24T09:00:00-03:00",
      articleSection: "Processos",
      keywords: "brunimento vs retificação, honing vs grinding, processos industriais"
    }
  }
];

export function BlogArticles() {
  return (
    <section className="bg-white py-20 md:py-32 px-4 sm:px-6 md:px-12" id="blog">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40 block mb-4">Blog Técnico & Insights</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-monolith leading-tight">
              Expertise em <span className="text-primary tracking-monolith">Brunimento.</span>
            </h2>
          </div>
          <button className="text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-2 border-b-2 border-primary pb-2 hover:text-primary transition-colors">
            Ver todos os artigos <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link 
              to={`/blog/${post.slug}`}
              key={post.slug}
              className="group cursor-pointer block"
              itemScope 
              itemType="https://schema.org/Article"
            >
              <meta itemProp="datePublished" content={post.schema.datePublished} />
              <meta itemProp="keywords" content={post.schema.keywords} />
              <meta itemProp="description" content={post.schema.description} />
              <meta itemProp="author" content="Equipe Técnica INACOM" />
              <meta itemProp="publisher" content="INACOM Indústria de Abrasivos" />
              
              <div className="aspect-[16/10] bg-surface-container-high mb-6 ghost-border relative overflow-hidden">
                <div className="absolute inset-0 bg-monolith/40 group-hover:bg-monolith/0 transition-all duration-500 z-10"></div>
                <img 
                  src={post.image} 
                  alt={`Artigo técnico sobre brunimento: ${post.title}`}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  width="800"
                  height="500"
                />
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <span 
                  className="text-[8px] font-black px-2 py-1 bg-primary text-white uppercase tracking-widest"
                  itemProp="articleSection"
                >
                  {post.category}
                </span>
                <time 
                   className="text-[10px] text-outline font-bold tracking-tight"
                  dateTime={post.date}
                  itemProp="datePublished"
                >
                  {post.dateDisplay}
                </time>
              </div>
              
              <h3 
                className="text-lg font-black uppercase leading-tight tracking-monolith group-hover:text-primary transition-colors"
                itemProp="headline"
              >
                {post.title}
              </h3>
              <p className="text-sm font-light text-on-surface-variant mt-4 line-clamp-2" itemProp="abstract">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
