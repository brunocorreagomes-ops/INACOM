import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { SectorPage } from "./pages/SectorPage";
import { ProductPage } from "./pages/ProductPage";
import { BlogPage } from "./pages/BlogPage";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            {/* Setores */}
            <Route 
              path="/brunimento-automotivo" 
              element={<SectorPage 
                title="Brunimento para Indústria Automotiva | INACOM"
                sector="Automotivo"
                focus="Cilindros de Motor e Bielas"
                h1="Brunimento Industrial Automotivo"
                schemaProduct="Microcristal MC-X1"
              />} 
            />
            <Route 
              path="/brunimento-hidraulico" 
              element={<SectorPage 
                title="Brunimento de Cilindros Hidráulicos | INACOM"
                sector="Hidráulico"
                focus="Cilindros e Válvulas de Pressão"
                h1="Brunimento para Sistemas Hidráulicos"
                schemaProduct="Carboneto de Silício Verde"
              />} 
            />
            <Route 
              path="/brunimento-pneumatico" 
              element={<SectorPage 
                title="Brunimento para Sistemas Pneumáticos | INACOM"
                sector="Pneumático"
                focus="Coros de Compressores e Atuadores"
                h1="Brunimento Industrial Pneumático"
                schemaProduct="Óxido de Alumínio"
              />} 
            />
            <Route 
              path="/brunimento-aeroespacial" 
              element={<SectorPage 
                title="Brunimento Aeroespacial de Alta Precisão | INACOM"
                sector="Aeroespacial"
                focus="Componentes de Titânio e Ligas Especiais"
                h1="Brunimento Aeroespacial"
                schemaProduct="Microcristal de Alta Pureza"
              />} 
            />
            <Route 
              path="/brunimento-agricola" 
              element={<SectorPage 
                title="Brunimento para Máquinas Agrícolas | INACOM"
                sector="Agrícola"
                focus="Cilindros de Tratores e Colheitadeiras"
                h1="Brunimento Industrial Agrícola"
                schemaProduct="Carboneto de Silício Preto"
              />} 
            />

            {/* Produtos */}
            <Route 
              path="/pedra-microcristalina" 
              element={<ProductPage 
                name="Pedra Microcristalina MC-X1"
                slug="pedra-microcristalina"
                desc="Abrasivo de alto desempenho com grãos microcristalinos que garantem corte constante e acabamento ultrafino (Ra < 0.1μm)."
                material="Céramica Vitrificada"
                granulometria="#400 a #2500"
                ra="0.02 - 0.20μm"
                dureza="K a M"
                image="https://images.unsplash.com/photo-1565439396343-a60cd4205436?fm=webp&q=80&w=800"
              />} 
            />
            <Route 
              path="/carboneto-silicio-verde" 
              element={<ProductPage 
                name="Carboneto de Silício Verde CS-G8"
                slug="carboneto-silicio-verde"
                desc="Ideal para brunimento de materiais não-ferrosos, inox e metal duro. Alta pureza de grão para evitar contaminação."
                material="SiC Verde"
                granulometria="#60 a #1200"
                ra="0.10 - 0.60μm"
                dureza="L a P"
                image="https://images.unsplash.com/photo-1590422749458-1f4bf39eb4b1?fm=webp&q=80&w=800"
              />} 
            />
            <Route 
              path="/oxido-aluminio" 
              element={<ProductPage 
                name="Óxido de Alumínio AL-O2"
                slug="oxido-aluminio"
                desc="Abrasivo versátil para aços de alta liga e tratamento térmico. Excelente taxa de remoção com estabilidade."
                material="Al2O3"
                granulometria="#80 a #800"
                ra="0.15 - 0.40μm"
                dureza="M a R"
                image="https://images.unsplash.com/photo-1504307651254-35680f356f87?fm=webp&q=80&w=800"
              />} 
            />
            <Route 
              path="/carboneto-silicio-preto" 
              element={<ProductPage 
                name="Carboneto de Silício Preto CS-B4"
                slug="carboneto-silicio-preto"
                desc="Máxima agressividade para desbastes pesados e remoção rápida de material em peças brutas."
                material="SiC Preto"
                granulometria="#36 a #400"
                ra="0.40 - 1.20μm"
                dureza="N a T"
                image="https://images.unsplash.com/photo-1611079830811-865bf4d28471?fm=webp&q=80&w=800"
              />} 
            />

            {/* Blog */}
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPage />} />
            
            {/* Glossário */}
            <Route path="/glossario-brunimento" element={<HomePage />} /> {/* Placeholder since it's a section on home */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
