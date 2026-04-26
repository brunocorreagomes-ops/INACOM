import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { SeoHead } from "../components/SeoHead";

export function SectorPage({ title, sector, focus, h1, schemaProduct }: { title: string, sector: string, focus: string, h1: string, schemaProduct: string }) {
  return (
    <div className="min-h-screen bg-white">
      <SeoHead title={title} description={`Especialistas em ${h1}. Soluções de brunimento industrial para o setor ${sector}.`} />
      
      <header className="bg-monolith py-24 md:py-32 px-4 shadow-xl">
        <div className="max-w-[1440px] mx-auto text-center">
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-primary text-xs font-bold uppercase tracking-[0.4em] mb-4 block"
          >
            Soluções Setoriais
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-3xl sm:text-5xl md:text-7xl font-black text-white uppercase tracking-monolith leading-tight"
          >
            {h1}
          </motion.h1>
          <p className="text-white/60 mt-8 max-w-2xl mx-auto font-light text-lg">
            A INACOM desenvolve abrasivos sob medida para os desafios críticos do setor {sector.toLowerCase()}, focando em {focus.toLowerCase()}.
          </p>
          <div className="mt-12">
            <a href="#contato" className="bg-primary text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-primary-container transition-colors inline-block">
              Solicitar Try-Out Orientado
            </a>
          </div>
        </div>
      </header>

      <section className="py-24 px-4 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-10 border border-outline-variant/20 hover:border-primary transition-colors">
            <h3 className="text-xl font-black uppercase mb-4">Peças Críticas</h3>
            <p className="text-on-surface-variant font-light leading-relaxed">
              Brunimento de alta precisão em {focus}. Garantia de circularidade e cilindricidade em geometrias complexas.
            </p>
          </div>
          <div className="p-10 border border-outline-variant/20 hover:border-primary transition-colors">
            <h3 className="text-xl font-black uppercase mb-4">Tolerâncias Exigidas</h3>
            <p className="text-on-surface-variant font-light leading-relaxed">
              Alcance rigoroso de Ra 0.05μm a 0.5μm com tolerâncias dimensionais na casa dos microns (0.001mm).
            </p>
          </div>
          <div className="p-10 border border-outline-variant/20 hover:border-primary transition-colors">
            <h3 className="text-xl font-black uppercase mb-4">Materiais Comuns</h3>
            <p className="text-on-surface-variant font-light leading-relaxed">
              Especialistas em ferro fundido, aço cromo, titânio e ligas aeroespaciais de alta dureza.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface py-24 px-4">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="text-3xl font-black uppercase mb-12 border-l-4 border-primary pl-8">Solução Recomendada: {schemaProduct}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-on-surface-variant font-light text-lg">
              <p>
                Para o setor {sector.toLowerCase()}, nossa linha de pedras {schemaProduct} oferece a estabilidade necessária para produção em larga escala com zero rejeição.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                  Redução de 30% no tempo de ciclo
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                  Vida útil estendida em até 400%
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                  Repetitividade garantida lote a lote
                </li>
              </ul>
            </div>
            <div className="aspect-video bg-white ghost-border">
              <img 
                src="https://images.unsplash.com/photo-1504917595217-d4dc5feeec52?auto=format&fit=crop&q=80&w=800" 
                alt={`Aplicação industrial no setor ${sector}`}
                className="w-full h-full object-cover grayscale opacity-80"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 max-w-[1440px] mx-auto">
        <h2 className="text-3xl font-black uppercase mb-12">Especificações Técnicas Típicas</h2>
        <div className="overflow-x-auto ghost-border">
          <table className="w-full text-left border-collapse" itemScope itemType="https://schema.org/Table">
             <thead className="bg-monolith text-white">
               <tr>
                 <th className="p-6 uppercase text-[10px] tracking-widest font-black">Peça</th>
                 <th className="p-6 uppercase text-[10px] tracking-widest font-black">Material</th>
                 <th className="p-6 uppercase text-[10px] tracking-widest font-black">Ra Recomendado</th>
                 <th className="p-6 uppercase text-[10px] tracking-widest font-black">Pedra INACOM</th>
               </tr>
             </thead>
             <tbody className="text-sm font-light text-on-surface-variant">
               <tr className="border-b border-outline-variant/10">
                 <td className="p-6">Componente Estrutural</td>
                 <td className="p-6">Aço Liga 4140/4340</td>
                 <td className="p-6">0.2–0.4μm</td>
                 <td className="p-6 font-bold text-primary">{schemaProduct}</td>
               </tr>
               <tr className="border-b border-outline-variant/10">
                 <td className="p-6">Corpo de Válvula</td>
                 <td className="p-6">Ferro Fundido GG25</td>
                 <td className="p-6">0.4–0.6μm</td>
                 <td className="p-6 font-bold text-primary">Microcristalin (Custom)</td>
               </tr>
             </tbody>
          </table>
        </div>
      </section>

      <div className="bg-monolith py-20 text-center">
        <h3 className="text-white text-2xl font-black uppercase mb-8">Precisa de um Try-Out para este setor?</h3>
        <a href="#contato" className="border-2 border-primary text-primary px-10 py-4 font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
          Agendar Consultoria Técnica
        </a>
      </div>
    </div>
  );
}
