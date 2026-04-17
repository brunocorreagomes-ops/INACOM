import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronRight, 
  CheckCircle2, 
  Truck, 
  Cpu, 
  Zap, 
  Phone, 
  Mail, 
  Building2,
  Menu,
  X,
  AlertCircle,
  Instagram,
  Linkedin,
  MapPin,
  Play
} from "lucide-react";
import { useState, useMemo, ChangeEvent, FormEvent } from "react";

interface FormData {
  nome: string;
  empresa: string;
  whatsapp: string;
  email: string;
  material: string;
  marcaMaquina: string;
  rugosidade: string;
  desafio: string;
  outroDesafio: string;
}

interface FormErrors {
  [key: string]: string | undefined;
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    empresa: "",
    whatsapp: "",
    email: "",
    material: "Ferro Fundido",
    marcaMaquina: "",
    rugosidade: "",
    desafio: "Reduzir custo por peça",
    outroDesafio: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (name: string, value: string): string | undefined => {
    switch (name) {
      case "nome":
        if (!value.trim()) return "Nome é obrigatório";
        if (value.trim().length < 3) return "Nome muito curto";
        return undefined;
      case "empresa":
        if (!value.trim()) return "Empresa é obrigatória";
        return undefined;
      case "whatsapp":
        if (!value.trim()) return "WhatsApp é obrigatório";
        if (!/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(value)) return "Formato inválido: (00) 00000-0000";
        return undefined;
      case "email":
        if (!value.trim()) return "E-mail é obrigatório";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "E-mail inválido";
        return undefined;
      case "marcaMaquina":
        if (!value.trim()) return "Marca da máquina é obrigatória";
        return undefined;
      case "rugosidade":
        if (!value.trim()) return "Especificação de rugosidade é obrigatória";
        return undefined;
      case "outroDesafio":
        if (formData.desafio === "Outro desafio. Especificar") {
          if (!value.trim()) return "Descreva o seu desafio";
        }
        return undefined;
      default:
        return undefined;
    }
  };

  const errors = useMemo(() => {
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validate(key, formData[key as keyof FormData]);
      if (error) newErrors[key] = error;
    });
    return newErrors;
  }, [formData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      // Limpa o campo 'outroDesafio' se a opção selecionada for alterada
      if (name === "desafio" && value !== "Outro desafio. Especificar") {
        newData.outroDesafio = "";
      }
      return newData;
    });
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(allTouched);

    if (Object.keys(errors).length === 0) {
      setIsSubmitted(true);
      // Logic for sending data would go here
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  const renderError = (name: string) => {
    if (touched[name] && errors[name]) {
      return (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-error text-[10px] font-bold uppercase tracking-widest mt-2"
        >
          <AlertCircle size={12} />
          {errors[name]}
        </motion.div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen selection:bg-primary selection:text-white">
      {/* Header Section */}
      <header className="bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant/10">
        <nav className="flex justify-between items-center w-full px-4 md:px-12 py-4 md:py-5 max-w-[1440px] mx-auto">
          <a href="#inicio" className="flex items-center gap-2 sm:gap-3 shrink-0">
            <img 
              src="https://i.ibb.co/s9z8M4jb/Chat-GPT-Image-16-de-abr-de-2026-16-23-25.png" 
              alt="INACOM Industrial Precision" 
              className="h-7 sm:h-8 md:h-10 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <span className="text-xl sm:text-2xl font-black tracking-tighter text-primary">
              INACOM
            </span>
          </a>
          
          <div className="hidden lg:flex items-center gap-8 xl:gap-12">
            <a className="text-primary font-bold border-b-2 border-primary pb-1 transition-all" href="#inicio">Início</a>
            <a className="text-outline hover:text-primary transition-colors uppercase text-xs font-bold tracking-widest" href="#protocolo">Protocolo de Homologação</a>
            <a className="text-outline hover:text-primary transition-colors uppercase text-xs font-bold tracking-widest" href="#contato">Contato</a>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="hidden sm:block bg-primary text-white px-4 md:px-6 py-2.5 md:py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary-container transition-colors shrink-0">
              Technical Portal
            </button>
            <button 
              className="lg:hidden p-2 text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-background border-b border-outline-variant/10 px-6 py-8 flex flex-col gap-6 overflow-hidden"
            >
              <a className="text-xl font-bold" href="#inicio" onClick={() => setIsMenuOpen(false)}>Início</a>
              <a className="text-xl font-bold text-outline" href="#protocolo" onClick={() => setIsMenuOpen(false)}>Protocolo de Homologação</a>
              <a className="text-xl font-bold text-outline" href="#contato" onClick={() => setIsMenuOpen(false)}>Contato</a>
              <button className="sm:hidden bg-primary text-white w-full py-4 font-bold uppercase tracking-widest mt-4">
                Technical Portal
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative h-[70vh] sm:h-[80vh] md:h-[870px] w-full flex items-center overflow-hidden" id="inicio">
          <div className="absolute inset-0 z-0">
            <img 
              alt="Industrial Precision Machine" 
              className="w-full h-full object-cover grayscale brightness-50" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuABt0P2haWD3372L9QIejYj2V0KJm6vzTyU8a6kKHCX7SkuWyb1lnMrLkJH_lvOF9IQmkZV1S7ytUyvItS-bcqCI1Nmi0O57vsniWv0A0XBMCReMP4AMMoaGrVY96LNY2P4l1w48iqmlFxJJJPJHvXe_jaKZrA4kAv8t_J2t_sPewdJsL8400oQfGtAa-gcSUrWrf64ibgXGAwAtS8AdZSduyuW2TKzRURz7Fuc14PZyvCFtbGe3JkiwYNr3u_sGLMtVYGjGgcNq4hh"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-16 w-full">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <h1 className="text-white text-3xl sm:text-5xl md:text-7xl font-black leading-[1] md:leading-[0.9] text-monolith mb-6 md:mb-8 uppercase">
                Domínio Absoluto em Brunimento Industrial
              </h1>
              <p className="text-on-primary text-sm sm:text-base md:text-xl font-light mb-8 md:mb-12 max-w-xl border-l-2 border-primary-fixed-dim pl-6 md:pl-8 leading-relaxed">
                Ferramentas abrasivas de alta precisão desenhadas para estabilidade de processo, alcance exato de rugosidade e redução de custo por peça.
              </p>
              <button className="btn-machined text-white px-8 md:px-12 py-4 md:py-6 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] inline-flex items-center gap-4 group">
                Solicitar Kit Try-Out
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* Authority Section */}
        <section className="bg-surface py-16 md:py-24 px-4 sm:px-6 md:px-12">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-0 border-t border-outline-variant/15">
            <div className="p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-outline-variant/15 flex flex-col items-start bg-white group hover:bg-surface-container transition-colors duration-500">
              <div className="p-4 bg-surface-container-low mb-6 sm:mb-8 group-hover:bg-white transition-colors">
                <Cpu size={32} sm:size={36} className="text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight mb-4 sm:mb-6">Precisão Extrema</h3>
              <p className="text-on-surface-variant font-light leading-relaxed text-sm">
                Abrasivos desenvolvidos para atingir o Ra e Rz exatos exigidos pelo seu desenho técnico, eliminando retrabalhos e garantindo conformidade total.
              </p>
            </div>
            <div className="p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-outline-variant/15 flex flex-col items-start bg-surface group hover:bg-surface-container-high transition-colors duration-500">
              <div className="p-4 bg-white mb-6 sm:mb-8 group-hover:bg-surface-container-high transition-colors">
                <Zap size={32} sm:size={36} className="text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight mb-4 sm:mb-6">Estabilidade de Processo</h3>
              <p className="text-on-surface-variant font-light leading-relaxed text-sm">
                Fórmula de liga consistente desenvolvida para evitar empastamento prematuro, mantendo a produtividade máxima e previsibilidade na linha.
              </p>
            </div>
            <div className="p-8 sm:p-12 flex flex-col items-start bg-surface-container-low group hover:bg-surface-variant transition-colors duration-500">
              <div className="p-4 bg-white mb-6 sm:mb-8 group-hover:bg-surface-container transition-colors">
                <Truck size={32} sm:size={36} className="text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight mb-4 sm:mb-6">Logística Estratégica</h3>
              <p className="text-on-surface-variant font-light leading-relaxed text-sm">
                Produção e estoque centralizado em Indaiatuba-SP. Garantimos entrega ágil para os principais polos industriais, mitigando riscos de máquina parada.
              </p>
            </div>
          </div>
        </section>

        {/* Institucional / About Section */}
        <section className="bg-white py-20 md:py-32 px-4 sm:px-6 md:px-12">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40 block mb-4">Excelência Industrial</span>
              <div className="mb-10 ghost-border overflow-hidden aspect-video">
                <img 
                  src="https://i.ibb.co/zT4JTfv8/Captura-de-tela-2026-04-16-203650.png" 
                  alt="A Empresa INACOM" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-monolith mb-8 leading-tight">
                Qualidade excepcional e inovação constante.
              </h2>
              <div className="space-y-6 text-on-surface-variant font-light leading-relaxed text-base md:text-lg">
                <p>
                  A INACOM é uma fábrica de abrasivos focada em produtos para brunimento. Reconhecida pela qualidade excepcional de seus itens e pela constante inovação, a empresa se destaca no mercado industrial.
                </p>
                <p>
                  Com anos de experiência e um compromisso sólido com a excelência, a INACOM oferece abrasivos de alto desempenho desenhados para os desafios mais rigorosos da usinagem moderna.
                </p>
              </div>
            </motion.div>
            <div className="relative aspect-square lg:aspect-video ghost-border overflow-hidden">
               <img 
                src="https://i.ibb.co/zHsJMftt/Captura-de-tela-2026-04-16-195954.png" 
                alt="INACOM Abrasivos" 
                className="w-full h-full object-cover transition-all duration-700"
                referrerPolicy="no-referrer"
               />
               <div className="absolute bottom-0 left-0 bg-primary text-white p-6 md:p-10 max-w-xs">
                 <p className="text-xs font-black uppercase tracking-widest leading-relaxed">
                   "A qualidade de nossos abrasivos falam por si só."
                 </p>
               </div>
            </div>
          </div>
        </section>

        {/* Materials & Advantages Section */}
        <section className="bg-surface py-20 md:py-32 px-4 sm:px-6 md:px-12 border-y border-outline-variant/10">
          <div className="max-w-[1440px] mx-auto">
            <div className="mb-20 md:mb-32">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40 block mb-4">Engenharia de Materiais</span>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase text-monolith leading-tight mb-12">
                Quais materiais usamos?
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: "Microcristal", code: "MC-X1", desc: "Alta durabilidade e acabamento ultrafino." },
                  { name: "Carboneto de Silício Verde", code: "CS-G8", desc: "Ideal para materiais não-ferrosos e metal duro." },
                  { name: "Óxido de Alumínio", code: "AL-O2", desc: "Especialmente eficiente em aços de alta liga." },
                  { name: "Carboneto de Silício Preto", code: "CS-B4", desc: "Máxima agressividade para desbastes pesados." }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-8 border border-outline-variant/20 hover:border-primary transition-colors group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-5">
                      <Cpu size={64} />
                    </div>
                    <span className="font-mono text-[9px] text-primary mb-4 block tracking-widest">{item.code}</span>
                    <h4 className="font-black uppercase text-sm mb-3 tracking-tight group-hover:text-primary transition-colors">{item.name}</h4>
                    <p className="text-[11px] text-on-surface-variant font-light leading-relaxed">
                      {item.desc}
                    </p>
                    <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="h-px w-4 bg-primary"></div>
                      <span className="text-[8px] font-bold uppercase tracking-widest text-primary">Especificação Técnica</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
              <div>
                <h3 className="text-2xl font-black uppercase mb-8 flex items-center gap-4">
                  <span className="h-0.5 w-12 bg-primary"></span>
                  Vantagens Competitivas
                </h3>
                <div className="space-y-8">
                  <p className="text-on-surface-variant font-light leading-relaxed italic border-l-2 border-outline-variant/30 pl-8">
                    "Nossas pedras abrasivas oferecem o melhor custo/benefício do mercado, garantindo repetitividade constante em velocidade padronizada."
                  </p>
                  <p className="text-on-surface-variant font-light leading-relaxed">
                    Com precisão excepcional, nossas pedras realizam ranhuras na parede da peça sem falhas, eliminando os riscos de sobrecargas na máquina. Além disso, proporcionam maior concentricidade no movimento realizado.
                  </p>
                  <p className="text-on-surface-variant font-light leading-relaxed font-bold">
                    Resultando em operações precisas tanto na geometria da peça quanto no diâmetro do furo. Conte conosco para obter resultados de alta qualidade e eficiência em seus processos de brunimento.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-surface-container-low p-8 flex flex-col justify-end ghost-border group">
                  <div className="text-4xl font-black text-primary/20 group-hover:text-primary transition-colors mb-4">01</div>
                  <p className="text-[10px] font-black uppercase tracking-widest">Repetitividade Constante</p>
                </div>
                <div className="aspect-square bg-white p-8 flex flex-col justify-end ghost-border group mt-8">
                  <div className="text-4xl font-black text-primary/20 group-hover:text-primary transition-colors mb-4">02</div>
                  <p className="text-[10px] font-black uppercase tracking-widest">Precisão Geométrica</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Homologation Protocol Section */}
        <section className="bg-surface-container-high py-20 md:py-32 px-4 sm:px-6 md:px-12 overflow-hidden" id="protocolo">
          <div className="max-w-[1440px] mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 md:mb-24"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40 block mb-4">Protocolo Operacional</span>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase text-monolith leading-tight md:leading-none">
                Homologue sem Risco.<br />
                <span className="text-primary">Nosso processo em 3 passos.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16 lg:gap-20">
              {/* Step 1 */}
              <div className="relative">
                <div className="text-6xl sm:text-8xl lg:text-[10rem] font-black text-outline/40 leading-none absolute -top-12 sm:-top-24 -left-3 sm:-left-6 select-none z-0">01</div>
                <div className="relative z-10 pt-4">
                  <h4 className="text-lg sm:text-xl font-black mb-4 sm:mb-6 uppercase tracking-tighter flex items-center gap-4">
                    <span className="h-0.5 w-6 sm:w-8 bg-primary"></span>
                    Raio-X Técnico
                  </h4>
                  <p className="text-on-surface-variant leading-relaxed font-light text-sm sm:text-base">
                    Mapeamos integralmente seu processo, especificações de máquinas e os gargalos técnicos que impedem sua performance máxima.
                  </p>
                </div>
              </div>
              {/* Step 2 */}
              <div className="relative">
                <div className="text-6xl sm:text-8xl lg:text-[10rem] font-black text-outline/40 leading-none absolute -top-12 sm:-top-24 -left-3 sm:-left-6 select-none z-0">02</div>
                <div className="relative z-10 pt-4">
                  <h4 className="text-lg sm:text-xl font-black mb-4 sm:mb-6 uppercase tracking-tighter flex items-center gap-4">
                    <span className="h-0.5 w-6 sm:w-8 bg-primary"></span>
                    Try-Out Orientado
                  </h4>
                  <p className="text-on-surface-variant leading-relaxed font-light text-sm sm:text-base">
                    Enviamos o Kit Try-Out com abrasivos customizados para seu material, acompanhado de parâmetros de corte calculados por nossos engenheiros.
                  </p>
                </div>
              </div>
              {/* Step 3 */}
              <div className="relative md:col-span-2 lg:col-span-1">
                <div className="text-6xl sm:text-8xl lg:text-[10rem] font-black text-outline/40 leading-none absolute -top-12 sm:-top-24 -left-3 sm:-left-6 select-none z-0">03</div>
                <div className="relative z-10 pt-4">
                  <h4 className="text-lg sm:text-xl font-black mb-4 sm:mb-6 uppercase tracking-tighter flex items-center gap-4">
                    <span className="h-0.5 w-6 sm:w-8 bg-primary"></span>
                    Validação Matemática
                  </h4>
                  <p className="text-on-surface-variant leading-relaxed font-light text-sm sm:text-base">
                    Acompanhamos o teste in-loco e entregamos um relatório técnico detalhado provando a redução real no custo por peça usinada.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Presentation Section */}
        <section className="bg-white py-20 md:py-32 px-4 sm:px-6 md:px-12">
          <div className="max-w-[1440px] mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-monolith mb-4">Nossa Linha</h2>
              <div className="h-1 w-24 bg-primary mx-auto"></div>
            </motion.div>
            
            <div className="relative w-full max-w-5xl mx-auto aspect-video ghost-border overflow-hidden bg-surface-container">
              <iframe 
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/uESr_l5TUfg" 
                title="Apresentação INACOM" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-on-surface-variant font-light italic text-sm sm:text-base">
                Conheça nossa linha completa de produtos e soluções para brunimento industrial.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="bg-white py-20 md:py-32 px-4 sm:px-6 md:px-12">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-monolith mb-8 md:mb-12">Solicite orçamento personalizado para seu projeto.</h2>
              <p className="text-on-surface-variant mb-8 md:mb-12 text-base sm:text-lg font-light leading-relaxed">
                Nosso compromisso é com você, atendimento 100% personalizado para garantir a solução exata para sua linha de produção industrial.
              </p>
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-4 sm:gap-6 py-4 sm:py-6 border-b border-outline-variant/20">
                  <CheckCircle2 size={24} className="text-primary flex-shrink-0" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Análise de Rugosidade Gratuita</span>
                </div>
                <div className="flex items-center gap-4 sm:gap-6 py-4 sm:py-6 border-b border-outline-variant/20">
                  <CheckCircle2 size={24} className="text-primary flex-shrink-0" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Cálculo de Custo por Peça</span>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-low p-6 sm:p-8 md:p-12 ghost-border">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-16 sm:py-20"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary text-white flex items-center justify-center mb-8">
                    <CheckCircle2 size={40} sm:size={48} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black uppercase mb-4">Protocolo Iniciado</h3>
                  <p className="text-on-surface-variant font-light text-sm sm:text-base">Seus dados foram enviados com sucesso.<br />Nossa engenharia entrará em contato em breve.</p>
                </motion.div>
              ) : (
                <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    <div className="flex flex-col">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-2">Nome</label>
                      <input 
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        onBlur={() => handleBlur("nome")}
                        className={`bg-transparent border-0 border-b ${touched.nome && errors.nome ? 'border-error' : 'border-outline-variant'} focus:ring-0 focus:border-primary transition-all p-2 text-sm placeholder:text-outline-variant/50 outline-none`}
                        placeholder="Seu nome completo" 
                        type="text" 
                      />
                      {renderError("nome")}
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-2">Empresa</label>
                      <input 
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleChange}
                        onBlur={() => handleBlur("empresa")}
                        className={`bg-transparent border-0 border-b ${touched.empresa && errors.empresa ? 'border-error' : 'border-outline-variant'} focus:ring-0 focus:border-primary transition-all p-2 text-sm outline-none`}
                        placeholder="Nome da organização" 
                        type="text" 
                      />
                      {renderError("empresa")}
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-2">WhatsApp</label>
                      <input 
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        onBlur={() => handleBlur("whatsapp")}
                        className={`bg-transparent border-0 border-b ${touched.whatsapp && errors.whatsapp ? 'border-error' : 'border-outline-variant'} focus:ring-0 focus:border-primary transition-all p-2 text-sm outline-none`}
                        placeholder="(00) 00000-0000" 
                        type="tel" 
                      />
                      {renderError("whatsapp")}
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-2">E-mail Corporativo</label>
                      <input 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={() => handleBlur("email")}
                        className={`bg-transparent border-0 border-b ${touched.email && errors.email ? 'border-error' : 'border-outline-variant'} focus:ring-0 focus:border-primary transition-all p-2 text-sm outline-none`}
                        placeholder="email@empresa.com.br" 
                        type="email" 
                      />
                      {renderError("email")}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    <div className="flex flex-col">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-2">Material usinado</label>
                      <select 
                        name="material"
                        value={formData.material}
                        onChange={handleChange}
                        className="bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary transition-all p-2 text-sm appearance-none cursor-pointer outline-none"
                      >
                        <option>Ferro Fundido</option>
                        <option>Aço Temperado</option>
                        <option>Alumínio</option>
                        <option>Outros</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-2">Marca da máquina</label>
                      <input 
                        name="marcaMaquina"
                        value={formData.marcaMaquina}
                        onChange={handleChange}
                        onBlur={() => handleBlur("marcaMaquina")}
                        className={`bg-transparent border-0 border-b ${touched.marcaMaquina && errors.marcaMaquina ? 'border-error' : 'border-outline-variant'} focus:ring-0 focus:border-primary transition-all p-2 text-sm outline-none`}
                        placeholder="Ex: Sunnen, Gehring, Nagel" 
                        type="text" 
                      />
                      {renderError("marcaMaquina")}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-2">Rugosidade Ra/Rz</label>
                    <input 
                      name="rugosidade"
                      value={formData.rugosidade}
                      onChange={handleChange}
                      onBlur={() => handleBlur("rugosidade")}
                      className={`bg-transparent border-0 border-b ${touched.rugosidade && errors.rugosidade ? 'border-error' : 'border-outline-variant'} focus:ring-0 focus:border-primary transition-all p-2 text-sm outline-none`}
                      placeholder="Especificação técnica do desenho" 
                      type="text" 
                    />
                    {renderError("rugosidade")}
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-2">Principal desafio</label>
                    <select 
                      name="desafio"
                      value={formData.desafio}
                      onChange={handleChange}
                      className="bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary transition-all p-2 text-sm appearance-none cursor-pointer outline-none"
                    >
                      <option>Reduzir custo por peça</option>
                      <option>Aumentar vida útil do abrasivo</option>
                      <option>Garantir rugosidade constante</option>
                      <option>Melhorar tempo de ciclo</option>
                      <option>Outro desafio. Especificar</option>
                    </select>
                  </div>

                  {formData.desafio === "Outro desafio. Especificar" && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="flex flex-col"
                    >
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-2">Descreva seu desafio</label>
                      <input 
                        name="outroDesafio"
                        value={formData.outroDesafio}
                        onChange={handleChange}
                        onBlur={() => handleBlur("outroDesafio")}
                        className={`bg-transparent border-0 border-b ${touched.outroDesafio && errors.outroDesafio ? 'border-error' : 'border-outline-variant'} focus:ring-0 focus:border-primary transition-all p-2 text-sm outline-none`}
                        placeholder="Digite aqui o desafio técnico da sua linha" 
                        type="text" 
                      />
                      {renderError("outroDesafio")}
                    </motion.div>
                  )}

                  <button 
                    type="submit"
                    className="w-full btn-machined text-white py-5 sm:py-6 font-bold uppercase tracking-[0.2em] mt-4 md:mt-8 group flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Solicitar orçamento
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-primary text-white w-full px-4 sm:px-6 md:px-12 py-16 md:py-24 flex flex-col gap-16 md:gap-24 font-sans tracking-tight" id="contato">
        <div className="max-w-[1440px] mx-auto w-full flex flex-col md:flex-row justify-between items-start gap-12 sm:gap-16">
          <div className="space-y-6 sm:space-y-8 max-w-sm">
            <div className="flex items-center gap-3 sm:gap-4">
              <img 
                src="https://i.ibb.co/s9z8M4jb/Chat-GPT-Image-16-de-abr-de-2026-16-23-25.png" 
                alt="INACOM Industrial Precision" 
                className="h-8 sm:h-10 w-auto object-contain invert brightness-0"
                referrerPolicy="no-referrer"
              />
              <span className="text-2xl sm:text-3xl font-black text-white">INACOM</span>
            </div>
            <p className="text-outline-variant text-sm font-light normal-case">
              Performance em Corte Industrial. Especialistas em brunimento e abrasivos de alta precisão com tecnologia alemã aplicada ao mercado brasileiro.
            </p>
            <div className="flex flex-col gap-4 text-[10px] sm:text-xs tracking-widest uppercase">
              <span className="flex items-center gap-3"><Phone size={14} className="text-outline-variant" /> +55 (19) 3935 4487</span>
              <span className="flex items-center gap-3"><Mail size={14} className="text-outline-variant" /> tech@inacom.com.br</span>
              <span className="flex items-center gap-3"><MapPin size={14} className="text-outline-variant" /> R. Pérola, 783 - Indaiatuba, SP</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 sm:gap-16">
            <div className="flex flex-col gap-4 sm:gap-6">
              <h5 className="text-white font-black text-xs uppercase tracking-widest border-b border-white/10 pb-4">Legal</h5>
              <div className="flex flex-col gap-4 text-[10px] text-outline-variant uppercase tracking-widest">
                <a className="hover:text-white transition-colors" href="#">Privacy Policy</a>
                <a className="hover:text-white transition-colors" href="#">Terms of Service</a>
                <a className="hover:text-white transition-colors" href="#">Compliance</a>
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:gap-6">
              <h5 className="text-white font-black text-xs uppercase tracking-widest border-b border-white/10 pb-4">Empresa</h5>
              <div className="flex flex-col gap-4 text-[10px] text-outline-variant uppercase tracking-widest">
                <div className="flex flex-col gap-1">
                  <span className="text-white/40">Localização</span>
                  <span className="normal-case font-light">R. Pérola, 783 - Recreio Campestre Jóia</span>
                  <span className="normal-case font-light">Indaiatuba - SP, 13347-150</span>
                </div>
                <a className="hover:text-white transition-colors" href="#">Support</a>
                <a className="hover:text-white transition-colors" href="#">Protocolos</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-[1440px] mx-auto w-full pt-12 md:pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between gap-6 items-center text-[10px] text-outline/50 uppercase tracking-[0.2em] font-bold text-center md:text-left">
          <p>© 2024 INACOM INDUSTRIAL LOGIC. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6 sm:gap-8">
            <a href="#" className="flex items-center gap-2 hover:text-white transition-colors" aria-label="Acessar o perfil da INACOM no Instagram">
              <Instagram size={14} />
              <span className="underline underline-offset-4">Instagram</span>
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-white transition-colors" aria-label="Acessar o perfil da INACOM no LinkedIn">
              <Linkedin size={14} />
              <span className="underline underline-offset-4">LinkedIn</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
