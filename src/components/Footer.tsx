import { Mail, Phone, MapPin, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-monolith text-white py-20 px-4 md:px-12 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        <div className="lg:col-span-2">
          <div className="flex items-baseline gap-3 mb-8">
            <span className="text-3xl font-black tracking-tighter text-white">INACOM</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/60">Precisão que se mede</span>
          </div>
          <p className="text-white/70 font-light text-sm max-w-sm leading-relaxed mb-10">
            Fabricante líder em abrasivos para brunimento industrial de alta gama. 
            Estabilidade e performance em cada grão.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-3 bg-white/5 hover:bg-primary transition-colors rounded-full" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="#" className="p-3 bg-white/5 hover:bg-primary transition-colors rounded-full" aria-label="Linkedin"><Linkedin size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-8">Soluções</h4>
          <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-white/80">
            <li><Link to="/brunimento-automotivo" className="hover:text-white transition-colors">Setor Automotivo</Link></li>
            <li><Link to="/brunimento-hidraulico" className="hover:text-white transition-colors">Setor Hidráulico</Link></li>
            <li><Link to="/brunimento-pneumatico" className="hover:text-white transition-colors">Setor Pneumático</Link></li>
            <li><Link to="/glossario-brunimento" className="hover:text-white transition-colors">Glossário Técnico</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-8">Contato</h4>
          <address className="not-italic space-y-6" itemScope itemType="https://schema.org/PostalAddress">
            <div className="flex items-start gap-4">
              <Phone size={18} className="text-white/60 mt-1" />
              <span className="text-xs font-bold tracking-widest text-white/80">+55 (19) 3935-4487</span>
            </div>
            <div className="flex items-start gap-4">
              <Mail size={18} className="text-white/60 mt-1" />
              <span className="text-xs font-bold tracking-widest text-white/80" itemProp="email">tech@inacom.com.br</span>
            </div>
            <div className="flex items-start gap-4">
              <MapPin size={18} className="text-white/60 mt-1" />
              <span className="text-xs font-bold leading-loose text-white/80" itemProp="streetAddress">
                R. Pérola, 783 - Indaiatuba, SP<br />CEP 13347-160
              </span>
            </div>
          </address>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col items-center gap-4 text-center">
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">
          © 2026 INACOM INDÚSTRIA DE ABRASIVOS. TODOS OS DIREITOS RESERVADOS.
        </p>
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">
          Desenvolvido por <a href="https://www.orvalia.com.br" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-primary transition-colors">ORVALIA.</a>
        </p>
      </div>

      {/* Floating WhatsApp */}
      <a 
        href="https://wa.me/551939354487" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-[#25D366] text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 flex items-center gap-3 group"
      >
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 font-bold uppercase text-[10px] tracking-widest">Suporte Técnico</span>
        <MessageCircle size={24} />
      </a>
    </footer>
  );
}
