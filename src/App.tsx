import { motion } from "motion/react";
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
  X
} from "lucide-react";
import { useState } from "react";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen selection:bg-primary selection:text-white">
      {/* Header Section */}
      <header className="bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant/10">
        <nav className="flex justify-between items-center w-full px-6 md:px-12 py-5 max-w-[1440px] mx-auto">
          <div className="text-2xl font-black tracking-tighter text-primary">
            INACOM
          </div>
          
          <div className="hidden md:flex items-center gap-12">
            <a className="text-primary font-bold border-b-2 border-primary pb-1 transition-all" href="#inicio">Início</a>
            <a className="text-outline hover:text-primary transition-colors uppercase text-xs font-bold tracking-widest" href="#protocolo">Protocolo de Homologação</a>
            <a className="text-outline hover:text-primary transition-colors uppercase text-xs font-bold tracking-widest" href="#contato">Contato</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden sm:block bg-primary text-white px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary-container transition-colors">
              Technical Portal
            </button>
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-background border-b border-outline-variant/10 px-6 py-8 flex flex-col gap-6"
          >
            <a className="text-xl font-bold" href="#inicio" onClick={() => setIsMenuOpen(false)}>Início</a>
            <a className="text-xl font-bold text-outline" href="#protocolo" onClick={() => setIsMenuOpen(false)}>Protocolo de Homologação</a>
            <a className="text-xl font-bold text-outline" href="#contato" onClick={() => setIsMenuOpen(false)}>Contato</a>
            <button className="bg-primary text-white w-full py-4 font-bold uppercase tracking-widest mt-4">
              Technical Portal
            </button>
          </motion.div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative h-[80vh] md:h-[870px] w-full flex items-center overflow-hidden" id="inicio">
          <div className="absolute inset-0 z-0">
            <img 
              alt="Industrial Precision Machine" 
              className="w-full h-full object-cover grayscale brightness-50" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuABt0P2haWD3372L9QIejYj2V0KJm6vzTyU8a6kKHCX7SkuWyb1lnMrLkJH_lvOF9IQmkZV1S7ytUyvItS-bcqCI1Nmi0O57vsniWv0A0XBMCReMP4AMMoaGrVY96LNY2P4l1w48iqmlFxJJJPJHvXe_jaKZrA4kAv8t_J2t_sPewdJsL8400oQfGtAa-gcSUrWrf64ibgXGAwAtS8AdZSduyuW2TKzRURz7Fuc14PZyvCFtbGe3JkiwYNr3u_sGLMtVYGjGgcNq4hh"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-16 w-full">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <h1 className="text-white text-4xl md:text-7xl font-black leading-[0.9] text-monolith mb-8 uppercase">
                Domínio Absoluto em Brunimento Industrial
              </h1>
              <p className="text-on-primary text-base md:text-xl font-light mb-12 max-w-xl border-l-2 border-primary-fixed-dim pl-8 leading-relaxed">
                Ferramentas abrasivas de alta precisão desenhadas para estabilidade de processo, alcance exato de rugosidade e redução de custo por peça.
              </p>
              <button className="btn-machined text-white px-12 py-6 text-xs font-bold uppercase tracking-[0.2em] inline-flex items-center gap-4 group">
                Solicitar Kit Try-Out
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* Authority Section */}
        <section className="bg-surface py-24 px-6 md:px-12">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-outline-variant/15">
            <div className="p-12 border-b md:border-b-0 md:border-r border-outline-variant/15 flex flex-col items-start bg-white group hover:bg-surface-container transition-colors duration-500">
              <div className="p-4 bg-surface-container-low mb-8 group-hover:bg-white transition-colors">
                <Cpu size={36} className="text-primary" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-6">Precisão Extrema</h3>
              <p className="text-on-surface-variant font-light leading-relaxed text-sm">
                Abrasivos desenvolvidos para atingir o Ra e Rz exatos exigidos pelo seu desenho técnico, eliminando retrabalhos e garantindo conformidade total.
              </p>
            </div>
            <div className="p-12 border-b md:border-b-0 md:border-r border-outline-variant/15 flex flex-col items-start bg-surface group hover:bg-surface-container-high transition-colors duration-500">
              <div className="p-4 bg-white mb-8 group-hover:bg-surface-container-high transition-colors">
                <Zap size={36} className="text-primary" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-6">Estabilidade de Processo</h3>
              <p className="text-on-surface-variant font-light leading-relaxed text-sm">
                Fórmula de liga consistente desenvolvida para evitar empastamento prematuro, mantendo a produtividade máxima e previsibilidade na linha.
              </p>
            </div>
            <div className="p-12 flex flex-col items-start bg-surface-container-low group hover:bg-surface-variant transition-colors duration-500">
              <div className="p-4 bg-white mb-8 group-hover:bg-surface-container transition-colors">
                <Truck size={36} className="text-primary" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-6">Logística Estratégica</h3>
              <p className="text-on-surface-variant font-light leading-relaxed text-sm">
                Produção e estoque centralizado em Indaiatuba-SP. Garantimos entrega ágil para os principais polos industriais, mitigando riscos de máquina parada.
              </p>
            </div>
          </div>
        </section>

        {/* Homologation Protocol Section */}
        <section className="bg-surface-container-high py-32 px-6 md:px-12 overflow-hidden" id="protocolo">
          <div className="max-w-[1440px] mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-24"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40 block mb-4">Protocolo Operacional</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase text-monolith leading-none">
                Homologue sem Risco.<br />
                <span className="text-transparent border-text font-outline-2 stroke-primary" style={{ WebkitTextStroke: '1px black' }}>Nosso processo em 3 passos.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
              {/* Step 1 */}
              <div className="relative">
                <div className="text-[10rem] font-black text-white leading-none absolute -top-24 -left-6 select-none z-0 opacity-100">01</div>
                <div className="relative z-10 pt-4">
                  <h4 className="text-xl font-black mb-6 uppercase tracking-tighter flex items-center gap-4">
                    <span className="h-0.5 w-8 bg-primary"></span>
                    Raio-X Técnico
                  </h4>
                  <p className="text-on-surface-variant leading-relaxed font-light">
                    Mapeamos integralmente seu processo, especificações de máquinas e os gargalos técnicos que impedem sua performance máxima.
                  </p>
                </div>
              </div>
              {/* Step 2 */}
              <div className="relative">
                <div className="text-[10rem] font-black text-white leading-none absolute -top-24 -left-6 select-none z-0 opacity-100">02</div>
                <div className="relative z-10 pt-4">
                  <h4 className="text-xl font-black mb-6 uppercase tracking-tighter flex items-center gap-4">
                    <span className="h-0.5 w-8 bg-primary"></span>
                    Try-Out Orientado
                  </h4>
                  <p className="text-on-surface-variant leading-relaxed font-light">
                    Enviamos o Kit Try-Out com abrasivos customizados para seu material, acompanhado de parâmetros de corte calculados por nossos engenheiros.
                  </p>
                </div>
              </div>
              {/* Step 3 */}
              <div className="relative">
                <div className="text-[10rem] font-black text-white leading-none absolute -top-24 -left-6 select-none z-0 opacity-100">03</div>
                <div className="relative z-10 pt-4">
                  <h4 className="text-xl font-black mb-6 uppercase tracking-tighter flex items-center gap-4">
                    <span className="h-0.5 w-8 bg-primary"></span>
                    Validação Matemática
                  </h4>
                  <p className="text-on-surface-variant leading-relaxed font-light">
                    Acompanhamos o teste in-loco e entregamos um relatório técnico detalhado provando a redução real no custo por peça usinada.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="bg-white py-32 px-6 md:px-12">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div>
              <h2 className="text-4xl md:text-5xl font-black uppercase text-monolith mb-12">Raio-X de Processo</h2>
              <p className="text-on-surface-variant mb-12 text-lg font-light leading-relaxed">
                Inicie o protocolo de homologação preenchendo os dados técnicos do seu desafio atual. Nossa equipe de engenharia de aplicação analisará os dados em até 24h.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-6 py-6 border-b border-outline-variant/20">
                  <CheckCircle2 size={24} className="text-primary flex-shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-widest">Análise de Rugosidade Gratuita</span>
                </div>
                <div className="flex items-center gap-6 py-6 border-b border-outline-variant/20">
                  <CheckCircle2 size={24} className="text-primary flex-shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-widest">Cálculo de Custo por Peça</span>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-low p-8 md:p-12 ghost-border">
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline">Nome</label>
                    <input 
                      className="bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary transition-all p-2 text-sm placeholder:text-outline-variant/50" 
                      placeholder="Seu nome completo" 
                      type="text" 
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline">Empresa</label>
                    <input 
                      className="bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary transition-all p-2 text-sm" 
                      placeholder="Nome da organização" 
                      type="text" 
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline">WhatsApp</label>
                    <input 
                      className="bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary transition-all p-2 text-sm" 
                      placeholder="(00) 00000-0000" 
                      type="tel" 
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline">E-mail Corporativo</label>
                    <input 
                      className="bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary transition-all p-2 text-sm" 
                      placeholder="email@empresa.com.br" 
                      type="email" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline">Material usinado</label>
                    <select className="bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary transition-all p-2 text-sm appearance-none cursor-pointer">
                      <option>Ferro Fundido</option>
                      <option>Aço Temperado</option>
                      <option>Alumínio</option>
                      <option>Outros</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline">Marca da máquina</label>
                    <input 
                      className="bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary transition-all p-2 text-sm" 
                      placeholder="Ex: Sunnen, Gehring, Nagel" 
                      type="text" 
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline">Rugosidade Ra/Rz</label>
                  <input 
                    className="bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary transition-all p-2 text-sm" 
                    placeholder="Especificação técnica do desenho" 
                    type="text" 
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline">Principal desafio</label>
                  <select className="bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary transition-all p-2 text-sm appearance-none cursor-pointer">
                    <option>Reduzir custo por peça</option>
                    <option>Aumentar vida útil do abrasivo</option>
                    <option>Garantir rugosidade constante</option>
                    <option>Melhorar tempo de ciclo</option>
                  </select>
                </div>

                <button className="w-full btn-machined text-white py-6 font-bold uppercase tracking-[0.2em] mt-8 group">
                  Enviar para Diagnóstico
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-primary text-white w-full px-6 md:px-12 py-24 flex flex-col gap-24 font-sans tracking-tight" id="contato">
        <div className="max-w-[1440px] mx-auto w-full flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="space-y-8 max-w-sm">
            <div className="text-3xl font-black">INACOM</div>
            <p className="text-outline-variant text-sm font-light normal-case">
              Performance em Corte Industrial. Especialistas em brunimento e abrasivos de alta precisão com tecnologia alemã aplicada ao mercado brasileiro.
            </p>
            <div className="flex flex-col gap-4 text-xs tracking-widest uppercase">
              <span className="flex items-center gap-3"><Phone size={14} className="text-outline-variant" /> +55 (19) 3000-0000</span>
              <span className="flex items-center gap-3"><Mail size={14} className="text-outline-variant" /> tech@inacom.com.br</span>
              <span className="flex items-center gap-3"><Building2 size={14} className="text-outline-variant" /> vendas@inacom.com.br</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24">
            <div className="flex flex-col gap-6">
              <h5 className="text-white font-black text-xs uppercase tracking-widest border-b border-white/10 pb-4">Legal</h5>
              <div className="flex flex-col gap-4 text-xs text-outline-variant uppercase tracking-widest">
                <a className="hover:text-white transition-colors" href="#">Privacy Policy</a>
                <a className="hover:text-white transition-colors" href="#">Terms of Service</a>
                <a className="hover:text-white transition-colors" href="#">Compliance</a>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <h5 className="text-white font-black text-xs uppercase tracking-widest border-b border-white/10 pb-4">Empresa</h5>
              <div className="flex flex-col gap-4 text-xs text-outline-variant uppercase tracking-widest">
                <a className="hover:text-white transition-colors" href="#">Indaiatuba - SP</a>
                <a className="hover:text-white transition-colors" href="#">Global Support</a>
                <a className="hover:text-white transition-colors" href="#">Protocolos</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-[1440px] mx-auto w-full pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4 items-center text-[10px] text-outline/50 uppercase tracking-[0.2em] font-bold">
          <p>© 2024 INACOM INDUSTRIAL LOGIC. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors underline underline-offset-4">Instagram</a>
            <a href="#" className="hover:text-white transition-colors underline underline-offset-4">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
