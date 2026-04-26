import { motion } from "motion/react";
import { SeoHead } from "../components/SeoHead";
import { FileText, Download, CheckCircle2, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductProps {
// ... (omitted for brevity in thinking, but will provide full block)
  name: string;
  desc: string;
  material: string;
  granulometria: string;
  ra: string;
  dureza: string;
  image: string;
  slug: string;
}

export function ProductPage({ name, desc, material, granulometria, ra, dureza, image, slug }: ProductProps) {
  return (
    <div className="min-h-screen bg-white">
      <SeoHead 
        title={`${name} | Pedras para Brunimento INACOM`}
        description={desc}
        canonical={`https://inacom.com.br/produto/${slug}`}
      />
      
      <section className="pt-32 pb-20 px-4 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }}
            className="aspect-square bg-surface ghost-border relative overflow-hidden"
          >
             <img src={image} alt={name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
             <div className="absolute top-0 right-0 p-8">
               <div className="text-[10px] font-black bg-primary text-white px-4 py-2 uppercase tracking-[0.2em] shadow-xl">
                 Original INACOM
               </div>
             </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            itemScope 
            itemType="https://schema.org/Product"
          >
            <meta itemProp="brand" content="INACOM" />
            <meta itemProp="category" content="Abrasivos Industriais > Pedras para Brunimento" />
            
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40 block mb-4">Abrasivo Técnico</span>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-monolith leading-tight mb-8" itemProp="name">
              {name}
            </h1>
            <p className="text-on-surface-variant font-light text-lg leading-relaxed mb-12" itemProp="description">
              {desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
               <div className="border-l-2 border-primary pl-6">
                 <span className="block text-[10px] font-bold uppercase tracking-widest text-outline mb-1">Material Abrasivo</span>
                 <span className="text-xl font-black uppercase text-monolith" itemProp="material">{material}</span>
               </div>
               <div className="border-l-2 border-primary pl-6">
                 <span className="block text-[10px] font-bold uppercase tracking-widest text-outline mb-1">Ra Sugerido</span>
                 <span className="text-xl font-black uppercase text-monolith">{ra}</span>
               </div>
            </div>

            <div className="flex flex-wrap gap-4">
               <Link to="/#pedido-orcamento" className="bg-primary text-white px-10 py-5 font-bold uppercase tracking-widest hover:bg-primary-container transition-colors flex items-center gap-3">
                 Solicitar Orçamento <ChevronRight size={16} />
               </Link>
               <button className="border border-outline-variant text-[10px] font-bold px-10 py-5 uppercase tracking-widest hover:bg-surface transition-colors flex items-center gap-3">
                 Baixar TDS <FileText size={16} />
               </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-surface py-24 px-4">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="text-2xl font-black uppercase mb-16 text-center tracking-widest">Especificações Técnicas de Laboratório</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-outline-variant/20">
             {[
               { label: "Granulometria", value: granulometria },
               { label: "Dureza da Liga", value: dureza },
               { label: "Reach Ra", value: ra },
               { label: "Porosidade", value: "Controlada (Laser)" },
               { label: "Resistência", value: "Alta Tensão Cerâmica" },
               { label: "Conformidade", value: "ISO 9001:2015" }
             ].map((spec, i) => (
               <div key={i} className="p-10 border-b md:border-r border-outline-variant/20 last:border-b-0 md:[&:nth-child(3n)]:border-r-0">
                 <span className="block text-[10px] font-bold uppercase tracking-widest text-primary mb-3">{spec.label}</span>
                 <span className="text-lg font-black uppercase text-monolith">{spec.value}</span>
               </div>
             ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-3xl font-black uppercase mb-8">Vantagens do {name}</h2>
            <div className="space-y-6">
              {[
                "Remoção de material (MRR) superior em até 25%.",
                "Eliminação total de marcas de vibração.",
                "Menor geração de calor durante o ciclo de honing.",
                "Intercambialidade garantida em equipamentos Sunnen/Gehring."
              ].map((adv, i) => (
                <div key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="text-primary mt-1" size={20} />
                  <p className="text-on-surface-variant font-light">{adv}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="ghost-border aspect-video bg-monolith">
             {/* Placeholder for application video */}
             <div className="w-full h-full flex items-center justify-center text-white/20 text-[10px] font-black uppercase tracking-[0.5em]">
               Video de Laboratório
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
