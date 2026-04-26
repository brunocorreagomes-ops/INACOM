import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { 
  ChevronRight, 
  CheckCircle2, 
  Truck, 
  Cpu, 
  Zap, 
  Settings, 
  HelpCircle,
  VolumeX,
  AlertCircle,
  FileText
} from "lucide-react";
import { ProductCatalog } from "../components/ProductCatalog";
import { AboutUs } from "../components/AboutUs";
import { SeoHead } from "../components/SeoHead";
import { GlossarioSection } from "../components/GlossarioSection";
import { BlogArticles } from "../components/BlogArticles";
import { useState, useMemo, ChangeEvent, FormEvent, useEffect } from "react";

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

export function HomePage() {
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
  const [player, setPlayer] = useState<any>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

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
    setTouched((prev) => ({ ...prev, [name]: true }));
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  useEffect(() => {
    let interval: any;
    const initPlayer = () => {
      if ((window as any).YT && (window as any).YT.Player) {
        try {
          const playerEl = document.getElementById('youtube-player');
          if (playerEl) {
            new (window as any).YT.Player('youtube-player', {
              videoId: 'uESr_l5TUfg',
              playerVars: { autoplay: 0, mute: 1, controls: 1, rel: 0, modestbranding: 1, enablejsapi: 1 },
              events: { 'onReady': (event: any) => setPlayer(event.target) }
            });
            clearInterval(interval);
          }
        } catch (e) {
          clearInterval(interval);
        }
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

  const renderError = (name: string) => {
    if (touched[name] && errors[name]) {
      return (
        <motion.div 
          role="alert"
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
    <>
      <SeoHead />
      <main>
        {/* Hero Section */}
        <section 
          className="relative h-[70vh] sm:h-[80vh] md:h-[870px] w-full flex items-center overflow-hidden" 
          id="inicio"
          aria-label="Solução INACOM para brunimento industrial de precisão" 
          itemScope 
          itemType="https://schema.org/Service"
        >
          <div className="absolute inset-0 z-0">
            <img 
              alt="Máquina de brunimento industrial de alta precisão - INACOM Abrasivos" 
              className="w-full h-full object-cover grayscale brightness-50" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuABt0P2haWD3372L9QIejYj2V0KJm6vzTyU8a6kKHCX7SkuWyb1lnMrLkJH_lvOF9IQmkZV1S7ytUyvItS-bcqCI1Nmi0O57vsniWv0A0XBMCReMP4AMMoaGrVY96LNY2P4l1w48iqmlFxJJJPJHvXe_jaKZrA4kAv8t_J2t_sPewdJsL8400oQfGtAa-gcSUrWrf64ibgXGAwAtS8AdZSduyuW2TKzRURz7Fuc14PZyvCFtbGe3JkiwYNr3u_sGLMtVYGjGgcNq4hh"
              referrerPolicy="no-referrer"
              loading="eager"
              width="1920"
              height="870"
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
              <h1 className="text-white text-3xl sm:text-5xl md:text-7xl font-black leading-[1] md:leading-[0.9] tracking-monolith mb-6 md:mb-8 uppercase" itemProp="name">
                Domínio Absoluto em Brunimento Industrial
              </h1>
              <p className="text-on-primary text-sm sm:text-base md:text-xl font-light mb-8 md:mb-12 max-w-xl border-l-2 border-primary pl-10 leading-relaxed" itemProp="description">
                Abrasivos de alta precisão para estabilidade de processo, alcance exato de rugosidade e redução de custo por peça.
              </p>
              <Link to="/#pedido-orcamento" className="btn-machined text-white px-10 py-6 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] inline-flex items-center gap-4 group">
                Solicitar Kit Try-Out
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Authority Section */}
        <section className="bg-surface py-20 px-4">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-0 border-t border-outline-variant/15">
            <article className="p-12 border-b lg:border-b-0 lg:border-r border-outline-variant/15 bg-white group hover:bg-surface-container transition-all" itemScope itemType="https://schema.org/Service">
              <Cpu size={36} className="text-primary mb-8" />
              <h3 className="text-xl font-black uppercase mb-6" itemProp="name">Precisão Extrema</h3>
              <p className="text-on-surface-variant font-light leading-relaxed text-sm" itemProp="description">
                Abrasivos customizados para atingir o Ra e Rz exatos do desenho técnico, garantindo conformidade total.
              </p>
            </article>
            <article className="p-12 border-b lg:border-b-0 lg:border-r border-outline-variant/15 bg-surface group hover:bg-surface-container-high transition-all" itemScope itemType="https://schema.org/Service">
              <Zap size={36} className="text-primary mb-8" />
              <h3 className="text-xl font-black uppercase mb-6" itemProp="name">Estabilidade</h3>
              <p className="text-on-surface-variant font-light leading-relaxed text-sm" itemProp="description">
                Fórmula consistente que evita empastamento prematuro, mantendo a produtividade máxima.
              </p>
            </article>
            <article className="p-12 bg-surface-container-low group hover:bg-surface-variant transition-all" itemScope itemType="https://schema.org/Service">
              <Truck size={36} className="text-primary mb-8" />
              <h3 className="text-xl font-black uppercase mb-6" itemProp="name">Logística Ágil</h3>
              <p className="text-on-surface-variant font-light leading-relaxed text-sm" itemProp="description">
                Sede estratégica em Indaiatuba-SP para entrega rápida nos principais polos industriais do país.
              </p>
            </article>
          </div>
        </section>

        <AboutUs />
        <ProductCatalog />

        {/* Process Section with HowTo Schema */}
        <section className="bg-surface-container-high py-32 px-4" id="protocolo" itemScope itemType="https://schema.org/HowTo">
          <div className="max-w-[1440px] mx-auto">
             <h2 className="text-4xl md:text-6xl font-black uppercase mb-20 tracking-monolith" itemProp="name">Nosso Processo em 3 Passos.</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                <div itemProp="step" itemScope itemType="https://schema.org/HowToStep">
                  <span className="text-6xl font-black text-primary/20 block mb-8">01</span>
                  <h4 className="text-xl font-black uppercase mb-4" itemProp="name">Raio-X Técnico</h4>
                  <p className="text-on-surface-variant font-light" itemProp="text">Mapeamento integral do processo e identificação de gargalos produtivos.</p>
                </div>
                <div itemProp="step" itemScope itemType="https://schema.org/HowToStep">
                  <span className="text-6xl font-black text-primary/20 block mb-8">02</span>
                  <h4 className="text-xl font-black uppercase mb-4" itemProp="name">Try-Out Orientado</h4>
                  <p className="text-on-surface-variant font-light" itemProp="text">Envio de kit abrasivo customizado com parâmetros de corte otimizados.</p>
                </div>
                <div itemProp="step" itemScope itemType="https://schema.org/HowToStep">
                  <span className="text-6xl font-black text-primary/20 block mb-8">03</span>
                  <h4 className="text-xl font-black uppercase mb-4" itemProp="name">Validação</h4>
                  <p className="text-on-surface-variant font-light" itemProp="text">Relatório técnico provando redução real no custo por peça usinada.</p>
                </div>
             </div>
          </div>
        </section>

        <BlogArticles />
        <GlossarioSection />

        {/* FAQ with Schema */}
        <section className="bg-surface py-24 px-4" itemScope itemType="https://schema.org/FAQPage">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black uppercase mb-16 text-center">F.A.Q Técnico</h2>
            <div className="space-y-8">
               {[
                 {
                   q: "As pedras INACOM servem em máquinas Sunnen ou Gehring?",
                   a: "Sim. Nossas pedras são 100% intercambiáveis com máquinas Sunnen, Gehring e Nagel, mantendo a geometria original das ferramentas."
                 },
                 {
                   q: "Qual a rugosidade Ra mínima atingível?",
                   a: "Com nossa linha Microcristal MC-X1, atingimos Ra de 0.02μm com tolerância de circularidade de 0.001mm em aços de alta liga."
                 }
               ].map((faq, i) => (
                 <div key={i} className="border-b border-outline-variant/20 pb-8" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                    <h4 className="text-sm font-black uppercase mb-4 cursor-pointer hover:text-primary transition-all" itemProp="name">{faq.q}</h4>
                    <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                       <p className="text-on-surface-variant font-light text-sm" itemProp="text">{faq.a}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="bg-white py-32 px-4" id="pedido-orcamento">
           <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
             <div>
               <h2 className="text-4xl md:text-6xl font-black uppercase mb-12 tracking-monolith">Cote seu projeto industrial.</h2>
               <div className="space-y-6">
                  <div className="flex items-center gap-6 py-6 border-b border-outline-variant/20">
                    <CheckCircle2 size={24} className="text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Acompanhamento Técnico in-loco</span>
                  </div>
                  <div className="flex items-center gap-6 py-6 border-b border-outline-variant/20">
                    <CheckCircle2 size={24} className="text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Garantia de Ra Especificado</span>
                  </div>
               </div>
             </div>
             
             <div className="bg-surface p-12 ghost-border">
               {isSubmitted ? (
                 <div className="text-center py-20">
                    <h3 className="text-2xl font-black uppercase text-primary">Email enviado</h3>
                    <p className="text-on-surface-variant mt-4 font-light">Retornaremos com sua análise técnica em até 24h.</p>
                 </div>
               ) : (
                 <form className="space-y-8" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <input name="nome" placeholder="NOME" className="bg-transparent border-0 border-b border-outline-variant outline-none p-2 text-xs focus:border-primary" onChange={handleChange} required />
                      <input name="email" placeholder="EMAIL" className="bg-transparent border-0 border-b border-outline-variant outline-none p-2 text-xs focus:border-primary" onChange={handleChange} required />
                      <input name="whatsapp" placeholder="WHATSAPP" className="bg-transparent border-0 border-b border-outline-variant outline-none p-2 text-xs focus:border-primary" onChange={handleChange} required />
                      <input name="empresa" placeholder="EMPRESA" className="bg-transparent border-0 border-b border-outline-variant outline-none p-2 text-xs focus:border-primary" onChange={handleChange} required />
                    </div>
                    <button className="w-full bg-primary text-white py-5 font-black uppercase tracking-widest hover:bg-primary-container transition-all">Solicitar Consultoria</button>
                 </form>
               )}
             </div>
           </div>
        </section>
      </main>
    </>
  );
}
