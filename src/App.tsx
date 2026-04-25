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
  Play,
  Volume2,
  VolumeX,
  Settings,
  MessageCircle,
  HelpCircle,
  BarChart3,
  Globe,
  ArrowUp,
  FileText
} from "lucide-react";
import { useState, useMemo, ChangeEvent, FormEvent, useEffect, useRef } from "react";

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
  outroMaterial: string;
}

interface FormErrors {
  [key: string]: string | undefined;
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [player, setPlayer] = useState<any>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
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
    outroMaterial: "",
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
        if (!value.trim()) return "E-mail corporativo é obrigatório";
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value.trim())) return "Por favor, insira um e-mail válido";
        return undefined;
      case "marcaMaquina":
        if (!value.trim()) return "Marca da máquina é obrigatória";
        return undefined;
      case "rugosidade":
        if (!value.trim()) return "Especificação de rugosidade é obrigatória";
        return undefined;
      case "outroDesafio":
        if (formData.desafio === "Outro desafio. Especificar" && !value.trim()) {
          return "Descreva o seu desafio";
        }
        return undefined;
      case "outroMaterial":
        if (formData.material === "Outros") {
          if (!value.trim()) return "Descreva o material";
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

    // Ativa a validação em tempo real para dar feedback imediato enquanto o usuário digita
    const realTimeFields = ["whatsapp", "email", "nome", "empresa", "marcaMaquina", "rugosidade", "outroDesafio", "outroMaterial"];
    if (realTimeFields.includes(name)) {
      setTouched((prev) => ({ ...prev, [name]: true }));
    }

    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      // Limpa os campos 'outro' e reseta o estado 'touched' se a opção selecionada for alterada
      if (name === "desafio" && value !== "Outro desafio. Especificar") {
        newData.outroDesafio = "";
        setTouched(prevTouched => ({ ...prevTouched, outroDesafio: false }));
      }
      if (name === "material" && value !== "Outros") {
        newData.outroMaterial = "";
        setTouched(prevTouched => ({ ...prevTouched, outroMaterial: false }));
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

  useEffect(() => {
    let interval: any;
    const initPlayer = () => {
      if ((window as any).YT && (window as any).YT.Player) {
        new (window as any).YT.Player('youtube-player', {
          videoId: 'uESr_l5TUfg',
          playerVars: {
            autoplay: 0,
            mute: 1,
            controls: 1,
            rel: 0,
            modestbranding: 1,
            enablejsapi: 1
          },
          events: {
            'onReady': (event: any) => {
              setPlayer(event.target);
            }
          }
        });
        clearInterval(interval);
      }
    };

    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      interval = setInterval(initPlayer, 100);
    } else {
      initPlayer();
    }
    
    return () => clearInterval(interval);
  }, []);

  const handleUnmute = () => {
    if (player) {
      player.unMute();
      setIsMuted(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToForm = () => {
    document.getElementById("pedido-orcamento")?.scrollIntoView({ behavior: "smooth" });
  };

  const renderError = (name: string) => {
    if (touched[name] && errors[name]) {
      return (
        <motion.div 
          id={`${name}-error`}
          role="alert"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-error text-[10px] font-bold uppercase tracking-widest mt-2"
        >
          <AlertCircle size={12} aria-hidden="true" />
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
          <a href="#inicio" className="flex flex-col items-start leading-none group">
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <img 
                src="https://i.ibb.co/s9z8M4jb/Chat-GPT-Image-16-de-abr-de-2026-16-23-25.png" 
                alt="INACOM - Precisão que se mede" 
                className="h-7 sm:h-8 md:h-10 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="text-xl sm:text-2xl font-black tracking-tighter text-primary">
                INACOM
              </span>
            </div>
            <span className="text-[7px] sm:text-[9px] font-black tracking-[0.3em] uppercase text-primary/60 ml-[36px] sm:ml-[44px] mt-1 group-hover:text-primary transition-colors">
              Precisão que se mede
            </span>
          </a>
          
          <div className="hidden lg:flex items-center gap-8 xl:gap-12" role="list">
            <a className="text-primary font-bold border-b-2 border-primary pb-1 transition-all" href="#inicio" aria-current="page">Início</a>
            <a className="text-outline hover:text-primary transition-colors uppercase text-xs font-bold tracking-widest" href="#protocolo">Protocolo de Homologação</a>
            <a className="text-outline hover:text-primary transition-colors uppercase text-xs font-bold tracking-widest" href="#contato">Contato</a>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              className="hidden sm:block bg-primary text-white px-4 md:px-6 py-2.5 md:py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary-container transition-colors shrink-0"
              aria-label="Acessar Portal Técnico"
            >
              Technical Portal
            </button>
            <button 
              className="lg:hidden p-2 text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMenuOpen}
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
              <button 
                onClick={scrollToForm}
                className="btn-machined text-white px-8 md:px-12 py-4 md:py-6 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] inline-flex items-center gap-4 group"
              >
                Solicitar Kit Try-Out
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* Authority Section */}
        <section className="bg-surface py-16 md:py-24 px-4 sm:px-6 md:px-12" aria-labelledby="authority-title">
          <h2 id="authority-title" className="sr-only">Nossos Pilares de Autoridade</h2>
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
                  src="https://i.ibb.co/0W9pcKz/INACOM-NOVA-FACHADA.webp" 
                  alt="Fachada moderna da sede da INACOM com letreiro da empresa" 
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
                alt="Close-up em alta resolução de pedras abrasivas de precisão INACOM" 
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
                <div className="text-5xl sm:text-7xl lg:text-[8rem] font-black text-outline/40 leading-none absolute -top-8 sm:-top-16 -left-2 sm:-left-4 select-none z-0">01</div>
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
                <div className="text-5xl sm:text-7xl lg:text-[8rem] font-black text-outline/40 leading-none absolute -top-8 sm:-top-16 -left-2 sm:-left-4 select-none z-0">02</div>
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
                <div className="text-5xl sm:text-7xl lg:text-[8rem] font-black text-outline/40 leading-none absolute -top-8 sm:-top-16 -left-2 sm:-left-4 select-none z-0">03</div>
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
            
            <motion.div 
              onViewportEnter={() => player?.playVideo()}
              onViewportLeave={() => player?.pauseVideo()}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative w-full max-w-5xl mx-auto aspect-video ghost-border overflow-hidden bg-surface-container"
            >
              <div 
                id="youtube-player" 
                className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${!isHovered && !isMuted ? 'pointer-events-none' : 'pointer-events-auto'}`}
              ></div>
              {isMuted && player && (
                <div 
                  onClick={handleUnmute}
                  className="absolute inset-0 z-20 cursor-pointer flex flex-col items-center justify-center bg-black/10 group transition-colors hover:bg-black/20"
                >
                  <div className="bg-primary/90 p-4 sm:p-6 rounded-full text-white backdrop-blur-md shadow-2xl transform transition-all group-hover:scale-110 flex items-center gap-3">
                    <VolumeX size={24} />
                    <span className="text-[10px] sm:text-xs uppercase font-black tracking-[0.2em]">Ativar Som</span>
                  </div>
                  <p className="text-white text-[9px] uppercase tracking-widest mt-6 opacity-60 font-bold group-hover:opacity-100 transition-opacity">Vídeo em Autoplay Ativado</p>
                </div>
              )}
            </motion.div>
            
            <div className="mt-8 text-center">
              <p className="text-on-surface-variant font-light italic text-sm sm:text-base">
                Conheça nossa linha completa de produtos e soluções para brunimento industrial.
              </p>
            </div>
          </div>
        </section>

        {/* Application Sectors Section */}
        <section className="bg-monolith py-20 md:py-32 px-4 sm:px-6 md:px-12 text-white border-b border-white/5">
          <div className="max-w-[1440px] mx-auto">
            <div className="mb-16 md:mb-24">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary block mb-4">Setores de Atuação</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-monolith leading-tight">
                Onde a Precisão é <span className="text-white/40 text-monolith">Indispensável.</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  sector: "Automotivo",
                  task: "Brunimento de Cilindros e Bielas",
                  desc: "Atingimos tolerâncias sub-mícron para garantir vedação perfeita e redução de atrito em motores de alta performance.",
                  icon: <Cpu size={24} />
                },
                {
                  sector: "Hidráulico & Pneumático",
                  task: "Camisas de Pistão e Válvulas",
                  desc: "Acabamento espelhado (Ra 0.05 - 0.15) para evitar vazamentos e prolongar a vida útil de vedações elastoméricas.",
                  icon: <Settings size={24} />
                },
                {
                  sector: "Linha Branca",
                  task: "Compressores de Refrigeração",
                  desc: "Alta produtividade em grandes lotes, mantendo a geometria perfeita para redução de ruído e vibração.",
                  icon: <Zap size={24} />
                }
              ].map((item, idx) => (
                <div key={idx} className="p-8 md:p-10 bg-white/5 border border-white/10 group hover:bg-primary transition-all duration-500">
                  <div className="mb-8 p-4 bg-white/10 inline-block group-hover:bg-white group-hover:text-primary transition-colors">
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-black uppercase mb-4 text-monolith group-hover:text-white transition-colors">{item.sector}</h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary group-hover:text-white/80 mb-6">{item.task}</p>
                  <p className="text-white/60 font-light text-sm leading-relaxed group-hover:text-white/90 transition-colors">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Provas Técnicas e Métricas Section */}
        <section className="bg-surface py-20 md:py-32 px-4 sm:px-6 md:px-12 border-b border-outline-variant/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-surface-container-high -skew-x-12 translate-x-1/2"></div>
          <div className="max-w-[1440px] mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40 block mb-4">Métricas de Performance</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-monolith leading-tight mb-8">
                  Dados que validam a nossa <span className="text-primary text-monolith">Engenharia.</span>
                </h2>
                <div className="grid grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-2">
                    <div className="text-4xl sm:text-5xl font-black text-primary">0.02μm</div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Rugosidade Ra Mínima</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-4xl sm:text-5xl font-black text-primary">35%</div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Redução média de ciclo</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-4xl sm:text-5xl font-black text-primary">0.001mm</div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Tolerância de Circularidade</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-4xl sm:text-5xl font-black text-primary">4x</div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Mais vida útil vs. Padrão</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 md:p-12 ghost-border shadow-xl">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-10 text-primary border-b border-primary/20 pb-4">Especificações do Abrasivo</h4>
                <div className="space-y-6">
                  {[
                    { label: "Material da Liga", value: "Cerâmica/Metálica Vitrificada" },
                    { label: "Granulometria Disponível", value: "#60 até #2500" },
                    { label: "Dureza de Trabalho", value: "Escala K até T (Padronizada)" },
                    { label: "Compatibilidade de Máquina", value: "Sunnen, Gehring, Nagel, Inacom" },
                    { label: "Vida Útil Estimada", value: "850+ ciclos por jogo (Média)" }
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between items-center text-sm border-b border-outline-variant/10 pb-4">
                      <span className="text-on-surface-variant font-light">{row.label}</span>
                      <span className="font-bold uppercase tracking-tight text-monolith">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies / Testimonials Section */}
        <section className="bg-monolith py-20 md:py-32 px-4 sm:px-6 md:px-12 text-white">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-16 md:mb-24">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary block mb-4">Cases de Sucesso</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-monolith mb-6">Resultados Reais em Linhas Reais.</h2>
              <p className="text-white/60 max-w-2xl mx-auto font-light">Não entregamos apenas pedras, entregamos redução de custo operacional e ganho de qualidade final homologado.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {[
                {
                  company: "Tier 1 Automotive Supplier",
                  metric: "32% Redução de Custos",
                  context: "Brunimento de Bloco de Motor",
                  result: "Troca de abrasivos importados por liga Microcristal INACOM. Estabilização de rugosidade Ra 0.40 sem variação em lote de 5.000 peças.",
                  author: "Eng. Ricardo M. - Gerente de Produção"
                },
                {
                  company: "Fabricante de Sistemas Hidráulicos",
                  metric: "Ra 0.08 Homologado",
                  context: "Haste de Amortecedor Industrial",
                  result: "Eliminação de micro-riscos longitudinais que causavam fadiga em retentores. Aumento de 2.5x na vida útil da pedra abrasiva.",
                  author: "Carlos Alberto S. - Especialista de Processos"
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/5 p-8 md:p-12 flex flex-col justify-between border-l-4 border-primary hover:bg-white/[0.08] transition-colors">
                  <div>
                    <h5 className="text-2xl font-black text-monolith mb-2 text-primary">{item.metric}</h5>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-8">{item.company}</p>
                    <p className="text-white/80 font-light leading-relaxed mb-6">
                      <span className="font-bold block mb-2 uppercase text-xs tracking-tight text-primary">Contexto: {item.context}</span>
                      "{item.result}"
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-8 pt-8 border-t border-white/10">
                    <div className="w-12 h-12 bg-primary flex items-center justify-center text-white font-black text-xl">
                      {item.author[0]}
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-white/80">{item.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Blog / Insights Section */}
        <section className="bg-white py-20 md:py-32 px-4 sm:px-6 md:px-12">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
              <div className="max-w-xl">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40 block mb-4">Blog Técnico & Insights</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-monolith leading-tight">Expertise em <span className="text-primary text-monolith">Brunimento.</span></h2>
              </div>
              <button className="text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-2 border-b-2 border-primary pb-2 hover:text-primary transition-colors">
                Ver todos os artigos <ChevronRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Pedra de brunimento para cilindro: Como escolher a granulometria em SP?",
                  cat: "Guia Técnico",
                  date: "12 Abr, 2026"
                },
                {
                  title: "Redução de custo por peça usinada: O impacto da liga vitrificada no brunimento.",
                  cat: "Gestão Industrial",
                  date: "08 Abr, 2026"
                },
                {
                  title: "Diferença entre Ra, Rz e Rpk: O guia definitivo para rugosidade em brunimento.",
                  cat: "Metrologia",
                  date: "24 Mar, 2026"
                }
              ].map((post, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="aspect-[16/10] bg-surface-container-high mb-6 ghost-border relative overflow-hidden">
                    <div className="absolute inset-0 bg-monolith/40 group-hover:bg-monolith/0 transition-all duration-500"></div>
                    <img 
                      src={`https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800`} 
                      alt={post.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[8px] font-black px-2 py-1 bg-primary text-white uppercase tracking-widest">{post.cat}</span>
                    <span className="text-[10px] text-outline font-bold tracking-tight">{post.date}</span>
                  </div>
                  <h4 className="text-lg font-black uppercase leading-tight text-monolith group-hover:text-primary transition-colors">{post.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section Improved */}
        <section className="bg-surface py-20 md:py-32 px-4 sm:px-6 md:px-12 border-t border-outline-variant/10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-monolith mb-12 text-center">F.A.Q Técnico</h2>
            <div className="space-y-6">
              {[
                {
                  q: "As pedras INACOM servem em máquinas Sunnen ou Gehring?",
                  a: "Sim. Desenvolvemos nossos abrasivos para serem 100% intercambiáveis com os principais cabeçotes de brunimento do mercado, mantendo a geometria original das ferramentas."
                },
                {
                  q: "Qual o prazo de entrega para lotes customizados?",
                  a: "Como temos fábrica em Indaiatuba-SP, nossos prazos são reduzidos. Lotes padrão em estoque têm entrega imediata; fórmulas customizadas levam entre 10 a 15 dias úteis."
                },
                {
                  q: "Vocês realizam o acompanhamento técnico do Try-Out?",
                  a: "Sim. Nossos engenheiros de aplicação acompanham o teste in-loco para garantir o ajuste fino de rotação, avanço e pressão, validando a performance prometida."
                },
                {
                  q: "Como garantir a repetitividade da rugosidade Ra entre diferentes lotes?",
                  a: "Utilizamos ligas padronizadas com controle rigoroso de granulometria e dureza em laboratório próprio. Cada lote é acompanhado de um certificado de conformidade da liga."
                }
              ].map((faq, i) => (
                <div key={i} className="border-b border-outline-variant/20 pb-6 group">
                  <h4 className="text-sm font-black uppercase text-monolith mb-3 flex items-center justify-between cursor-pointer group-hover:text-primary transition-colors">
                    {faq.q}
                    <HelpCircle size={16} className="text-outline-variant group-hover:text-primary" />
                  </h4>
                  <p className="text-sm text-on-surface-variant font-light leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="bg-white py-20 md:py-32 px-4 sm:px-6 md:px-12" id="pedido-orcamento">
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
                      <label htmlFor="nome" className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-2">Nome</label>
                      <input 
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        onBlur={() => handleBlur("nome")}
                        aria-invalid={touched.nome && !!errors.nome}
                        aria-describedby={touched.nome && errors.nome ? "nome-error" : undefined}
                        required
                        className={`bg-transparent border-0 border-b ${touched.nome && errors.nome ? 'border-error' : 'border-outline-variant'} focus:ring-0 focus:border-primary transition-all p-2 text-sm placeholder:text-outline-variant/50 outline-none`}
                        placeholder="Seu nome completo" 
                        type="text" 
                      />
                      {renderError("nome")}
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="empresa" className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-2">Empresa</label>
                      <input 
                        id="empresa"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleChange}
                        onBlur={() => handleBlur("empresa")}
                        aria-invalid={touched.empresa && !!errors.empresa}
                        aria-describedby={touched.empresa && errors.empresa ? "empresa-error" : undefined}
                        required
                        className={`bg-transparent border-0 border-b ${touched.empresa && errors.empresa ? 'border-error' : 'border-outline-variant'} focus:ring-0 focus:border-primary transition-all p-2 text-sm outline-none`}
                        placeholder="Nome da organização" 
                        type="text" 
                      />
                      {renderError("empresa")}
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="whatsapp" className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-2">WhatsApp</label>
                      <input 
                        id="whatsapp"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        onBlur={() => handleBlur("whatsapp")}
                        aria-invalid={touched.whatsapp && !!errors.whatsapp}
                        aria-describedby={touched.whatsapp && errors.whatsapp ? "whatsapp-error" : undefined}
                        required
                        className={`bg-transparent border-0 border-b ${touched.whatsapp && errors.whatsapp ? 'border-error' : 'border-outline-variant'} focus:ring-0 focus:border-primary transition-all p-2 text-sm outline-none`}
                        placeholder="(00) 00000-0000" 
                        type="tel" 
                      />
                      {renderError("whatsapp")}
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-2">E-mail Corporativo</label>
                      <input 
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={() => handleBlur("email")}
                        aria-invalid={touched.email && !!errors.email}
                        aria-describedby={touched.email && errors.email ? "email-error" : undefined}
                        required
                        className={`bg-transparent border-0 border-b ${touched.email && errors.email ? 'border-error' : 'border-outline-variant'} focus:ring-0 focus:border-primary transition-all p-2 text-sm outline-none`}
                        placeholder="email@empresa.com.br" 
                        type="email" 
                      />
                      {renderError("email")}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    <div className="flex flex-col">
                      <label htmlFor="material" className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-2">Material usinado</label>
                      <select 
                        id="material"
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

                    {formData.material === "Outros" && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="flex flex-col"
                      >
                        <label htmlFor="outroMaterial" className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-2">Especifique o material</label>
                        <input 
                          id="outroMaterial"
                          name="outroMaterial"
                          value={formData.outroMaterial}
                          onChange={handleChange}
                          onBlur={() => handleBlur("outroMaterial")}
                          aria-invalid={touched.outroMaterial && !!errors.outroMaterial}
                          aria-describedby={touched.outroMaterial && errors.outroMaterial ? "outroMaterial-error" : undefined}
                          className={`bg-transparent border-0 border-b ${touched.outroMaterial && errors.outroMaterial ? 'border-error' : 'border-outline-variant'} focus:ring-0 focus:border-primary transition-all p-2 text-sm outline-none`}
                          placeholder="Qual material você usa?" 
                          type="text" 
                        />
                        {renderError("outroMaterial")}
                      </motion.div>
                    )}

                    <div className="flex flex-col">
                      <label htmlFor="marcaMaquina" className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-2">Marca da máquina</label>
                      <input 
                        id="marcaMaquina"
                        name="marcaMaquina"
                        value={formData.marcaMaquina}
                        onChange={handleChange}
                        onBlur={() => handleBlur("marcaMaquina")}
                        aria-invalid={touched.marcaMaquina && !!errors.marcaMaquina}
                        aria-describedby={touched.marcaMaquina && errors.marcaMaquina ? "marcaMaquina-error" : undefined}
                        required
                        className={`bg-transparent border-0 border-b ${touched.marcaMaquina && errors.marcaMaquina ? 'border-error' : 'border-outline-variant'} focus:ring-0 focus:border-primary transition-all p-2 text-sm outline-none`}
                        placeholder="Ex: Sunnen, Gehring, Nagel" 
                        type="text" 
                      />
                      {renderError("marcaMaquina")}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="rugosidade" className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-2">Rugosidade Ra/Rz</label>
                    <input 
                      id="rugosidade"
                      name="rugosidade"
                      value={formData.rugosidade}
                      onChange={handleChange}
                      onBlur={() => handleBlur("rugosidade")}
                      aria-invalid={touched.rugosidade && !!errors.rugosidade}
                      aria-describedby={touched.rugosidade && errors.rugosidade ? "rugosidade-error" : undefined}
                      required
                      className={`bg-transparent border-0 border-b ${touched.rugosidade && errors.rugosidade ? 'border-error' : 'border-outline-variant'} focus:ring-0 focus:border-primary transition-all p-2 text-sm outline-none`}
                      placeholder="Especificação técnica do desenho" 
                      type="text" 
                    />
                    {renderError("rugosidade")}
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="desafio" className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-2">Principal desafio</label>
                    <select 
                      id="desafio"
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
                      <label htmlFor="outroDesafio" className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-2">Descreva seu desafio</label>
                      <input 
                        id="outroDesafio"
                        name="outroDesafio"
                        value={formData.outroDesafio}
                        onChange={handleChange}
                        onBlur={() => handleBlur("outroDesafio")}
                        aria-invalid={touched.outroDesafio && !!errors.outroDesafio}
                        aria-describedby={touched.outroDesafio && errors.outroDesafio ? "outroDesafio-error" : undefined}
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
            <div className="flex flex-col items-start leading-none">
              <div className="flex items-center gap-3 sm:gap-4">
                <img 
                  src="https://i.ibb.co/s9z8M4jb/Chat-GPT-Image-16-de-abr-de-2026-16-23-25.png" 
                  alt="INACOM - Precisão que se mede" 
                  className="h-8 sm:h-10 w-auto object-contain invert brightness-0"
                  referrerPolicy="no-referrer"
                />
                <span className="text-2xl sm:text-3xl font-black text-white">INACOM</span>
              </div>
              <span className="text-[8px] sm:text-[10px] font-black tracking-[0.3em] uppercase text-white/50 ml-[44px] sm:ml-[56px] mt-1">
                Precisão que se mede
              </span>
            </div>
            <p className="text-outline-variant text-sm font-light normal-case">
              Performance em Corte Industrial. Especialistas em brunimento e abrasivos de alta precisão com tecnologia aplicada ao mercado brasileiro.
            </p>
            <div className="flex flex-col gap-4 text-[10px] sm:text-xs tracking-widest uppercase">
              <span className="flex items-center gap-3"><Phone size={14} className="text-outline-variant" /> +55 (19) 3935 4487</span>
              <span className="flex items-center gap-3"><Mail size={14} className="text-outline-variant" /> tech@inacom.com.br</span>
              <span className="flex items-center gap-3"><MapPin size={14} className="text-outline-variant" /> R. Pérola, 783 - Indaiatuba, SP</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 sm:gap-16">
            <div className="flex flex-col gap-4 sm:gap-6">
              <h5 className="text-white font-black text-xs uppercase tracking-widest border-b border-white/10 pb-4">Social</h5>
              <div className="flex flex-col gap-4 text-[10px] text-outline-variant uppercase tracking-widest">
                <a href="#" className="flex items-center gap-2 hover:text-white transition-colors" aria-label="Acessar o perfil da INACOM no Instagram">
                  <Instagram size={14} />
                  <span>Instagram</span>
                </a>
                <a href="#" className="flex items-center gap-2 hover:text-white transition-colors" aria-label="Acessar o perfil da INACOM no LinkedIn">
                  <Linkedin size={14} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:gap-6">
              <h5 className="text-white font-black text-xs uppercase tracking-widest border-b border-white/10 pb-4">Legal</h5>
              <div className="flex flex-col gap-4 text-[10px] text-outline-variant uppercase tracking-widest">
                <a className="hover:text-white transition-colors" href="#">Privacy Policy</a>
                <a className="hover:text-white transition-colors" href="#">Terms of Service</a>
                <a className="hover:text-white transition-colors" href="#">Compliance</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-[1440px] mx-auto w-full pt-12 md:pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between gap-6 items-center text-[10px] text-outline/50 uppercase tracking-[0.2em] font-bold text-center md:text-left">
          <p>
            © 2026 INACOM. DESENVOLVIDO POR <a href="https://www.orvalia.com.br" className="text-[#40E0D0] hover:brightness-110 transition-all font-black" target="_blank" rel="noopener noreferrer">ORVALIA STUDIO</a>
            <span className="block md:inline md:ml-2">ALL RIGHTS RESERVED</span>
          </p>
        </div>
      </footer>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-4 items-end pointer-events-none">
        {/* Scroll to Top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={scrollToHero}
              className="p-4 bg-monolith text-white shadow-2xl hover:bg-primary transition-all pointer-events-auto"
              aria-label="Voltar ao topo"
            >
              <ArrowUp size={20} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Fixed Sticky Call to Action (Bottom Bar) */}
      <div className="fixed bottom-0 left-0 w-full bg-monolith/95 backdrop-blur-md border-t border-white/10 p-4 z-[55] flex justify-between items-center lg:hidden">
        <div className="flex flex-col">
          <span className="text-[8px] font-black uppercase tracking-widest text-primary">Solicite Agora</span>
          <span className="text-[10px] font-bold text-white uppercase tracking-tight">Kit Try-Out Industrial</span>
        </div>
        <button 
          onClick={scrollToForm}
          className="bg-primary text-white px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary-container"
          aria-label="Solicitar Orçamento de Kit Try-Out"
        >
          Solicitar
        </button>
      </div>

      {/* Desktop Fixed Side CTA */}
      <div className="hidden lg:block fixed bottom-8 left-8 z-[55]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToForm}
          className="bg-primary text-white p-6 md:p-8 shadow-2xl flex flex-col items-center gap-2 group border border-white/20"
          aria-label="Solicitar Orçamento de Kit Try-Out"
        >
          <Zap size={24} className="group-hover:animate-pulse" aria-hidden="true" />
          <span className="text-[9px] font-black uppercase tracking-[0.3em] vertical-text">Try-Out</span>
        </motion.button>
      </div>
    </div>
  );
}
