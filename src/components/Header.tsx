import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant/10">
      <nav className="flex justify-between items-center w-full px-4 md:px-12 py-4 md:py-5 max-w-[1440px] mx-auto">
        <Link to="/" className="flex flex-col items-start leading-none group">
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <img 
              src="https://i.ibb.co/s9z8M4jb/Chat-GPT-Image-16-de-abr-de-2026-16-23-25.png" 
              alt="INACOM - Precisão que se mede" 
              className="h-7 sm:h-8 md:h-10 w-auto object-contain"
            />
            <span className="text-xl sm:text-2xl font-black tracking-tighter text-primary">INACOM</span>
          </div>
          <span className="text-[7px] sm:text-[9px] font-black tracking-[0.3em] uppercase text-primary/60 ml-[36px] sm:ml-[44px] mt-1 group-hover:text-primary transition-colors">
            Precisão que se mede
          </span>
        </Link>
        
        <div className="hidden lg:flex items-center gap-8 xl:gap-12">
          <Link className="text-outline hover:text-primary transition-colors uppercase text-xs font-bold tracking-widest" to="/">Início</Link>
          <Link className="text-outline hover:text-primary transition-colors uppercase text-xs font-bold tracking-widest" to="/#sobre">Empresa</Link>
          <Link className="text-outline hover:text-primary transition-colors uppercase text-xs font-bold tracking-widest" to="/#produtos">Produtos</Link>
          <Link className="text-outline hover:text-primary transition-colors uppercase text-xs font-bold tracking-widest" to="/#protocolo">Protocolo</Link>
          <Link className="text-outline hover:text-primary transition-colors uppercase text-xs font-bold tracking-widest" to="/blog">Blog</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/#pedido-orcamento" className="hidden sm:block bg-primary text-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-primary-container transition-colors">
            Cotação Rápida
          </Link>
          <button 
            className="lg:hidden p-2 text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-outline-variant/10 px-6 py-8 flex flex-col gap-6"
          >
            <Link className="text-xl font-bold" to="/" onClick={() => setIsMenuOpen(false)}>Início</Link>
            <Link className="text-xl font-bold text-outline" to="/#sobre" onClick={() => setIsMenuOpen(false)}>Empresa</Link>
            <Link className="text-xl font-bold text-outline" to="/#produtos" onClick={() => setIsMenuOpen(false)}>Produtos</Link>
            <Link className="text-xl font-bold text-outline" to="/blog" onClick={() => setIsMenuOpen(false)}>Blog</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
