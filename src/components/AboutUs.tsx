import { motion } from "motion/react";
import { Award, ShieldCheck, History, Target } from "lucide-react";

export function AboutUs() {
  return (
    <section className="bg-monolith py-24 md:py-32 px-4 sm:px-6 md:px-12 relative overflow-hidden" id="sobre" itemScope itemType="https://schema.org/AboutPage">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="grid grid-cols-12 h-full">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-r border-white h-full"></div>
          ))}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16 md:mb-24 rounded-sm overflow-hidden ghost-border"
        >
          <img 
            src="https://i.ibb.co/PH9n07H/fachada-2-inacom.webp" 
            alt="Fachada INACOM - Unidade Industrial Indaiatuba" 
            className="w-full h-[300px] md:h-[500px] lg:h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            loading="lazy"
          />
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.3em] block mb-6">Tradição & Excelência</span>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-monolith leading-tight mb-8">
              A Força da <br />
              <span className="text-white font-outline text-transparent">Precisão</span> Industrial.
            </h2>
            <div className="space-y-6 text-white/90 font-light text-lg leading-relaxed">
              <p>
                Fundada com a visão de revolucionar o mercado de brunimento no Brasil, a <span className="text-white font-bold">INACOM</span> consolidou-se como referência em tecnologia de abrasivos e superabrasivos.
              </p>
              <p>
                Nossa história é pautada pelo compromisso incessante com a qualidade e a inovação. Ao longo das décadas, desenvolvemos soluções que atendem aos mais rigorosos padrões da indústria automotiva e mecânica pesada.
              </p>
              <p>
                Não fornecemos apenas ferramentas; entregamos confiabilidade. Cada pedra vitrificada e régua de diamante que sai de nossa fábrica carrega o selo de uma tradição que entende que, na mecânica de precisão, cada mícron conta.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-12">
              <div className="border-l-2 border-white/30 pl-6">
                <span className="block text-3xl font-black text-white mb-2">25+</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Anos de Mercado</span>
              </div>
              <div className="border-l-2 border-white/30 pl-6">
                <span className="block text-3xl font-black text-white mb-2">100%</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Engenharia Nacional</span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: <Award className="text-white" size={32} />,
                title: "Qualidade Premium",
                desc: "Abrasivos produzidos com as melhores matérias-primas mundiais."
              },
              {
                icon: <ShieldCheck className="text-white" size={32} />,
                title: "Confiabilidade",
                desc: "Processos certificados que garantem repetibilidade em larga escala."
              },
              {
                icon: <History className="text-white" size={32} />,
                title: "Tradição",
                desc: "Décadas de know-how acumulado no desenvolvimento de ligas."
              },
              {
                icon: <Target className="text-white" size={32} />,
                title: "Alta Precisão",
                desc: "Foco total no acabamento superficial e geometria perfeita."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 p-8 border border-white/10 hover:border-primary/50 transition-colors group"
              >
                <div className="mb-6 group-hover:scale-110 transition-transform origin-left">{item.icon}</div>
                <h3 className="text-white font-black uppercase text-sm mb-3 tracking-widest">{item.title}</h3>
                <p className="text-white/70 text-xs leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
