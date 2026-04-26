import { motion, AnimatePresence } from "motion/react";
import { 
  FileText, 
  ChevronRight, 
  Settings, 
  Zap, 
  Cpu, 
  BarChart3, 
  CheckCircle2, 
  Download,
  Info,
  ArrowUpDown,
  Share2,
  Mail,
  Copy,
  MessageCircle
} from "lucide-react";
import { useState, useMemo, useRef } from "react";

interface TechnicalSpec {
  label: string;
  value: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  specs: TechnicalSpec[];
  applications: string[];
  tdsLink: string;
}

const products: Product[] = [
  {
    id: "pedra-vitrificada",
    name: "Pedras de Brunimento Vitrificadas",
    category: "Abrasivos Convencionais",
    description: "Ideal para brunimento de acabamento em aços e ferros fundidos.",
    longDescription: "Nossas pedras vitrificadas são formuladas com ligas de alta performance que garantem uma remoção de material consistente e uma rugosidade controlada. O processo de sinterização a altas temperaturas cria uma estrutura porosa que facilita a refrigeração e evita o empastamento.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
    specs: [
      { label: "Ligante", value: "Cerâmico Vitrificado" },
      { label: "Granulometria", value: "#60 - #1200" },
      { label: "Dureza", value: "Escala I até P" },
      { label: "Abrasivo", value: "Óxido de Alumínio / Carboneto de Silício" }
    ],
    applications: [
      "Camisas de cilindro automotivo",
      "Blocos de motor",
      "Engrenagens de precisão",
      "Tubos hidráulicos"
    ],
    tdsLink: "https://example.com/tds-vitrified-honing-stone.pdf"
  },
  {
    id: "superabrasivo-cbn",
    name: "Réguas Superabrasivas CBN",
    category: "Superabrasivos",
    description: "Máxima durabilidade para brunimento de aços endurecidos.",
    longDescription: "O Nitreto de Boro Cúbico (CBN) é o segundo material mais duro conhecido. Nossas réguas de CBN oferecem uma vida útil até 100x superior aos abrasivos convencionais em aços tratados termicamente, reduzindo drasticamente o tempo de setup.",
    image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80&w=800",
    specs: [
      { label: "Concentração", value: "C50 - C150" },
      { label: "Granulometria", value: "B46 - B252" },
      { label: "Ligante", value: "Metálico / Resinoide" },
      { label: "Vida Útil", value: "Altíssima performance" }
    ],
    applications: [
      "Aço ferramenta endurecido",
      "Bielas",
      "Compressores de refrigeração",
      "Pistões hidráulicos"
    ],
    tdsLink: "https://example.com/tds-cbn-honing-sticks.pdf"
  },
  {
    id: "superabrasivo-diamante",
    name: "Réguas de Diamante",
    category: "Superabrasivos",
    description: "Excelente para brunimento de ferro fundido e materiais não-ferrosos.",
    longDescription: "Desenvolvidas para alta produtividade, as réguas de diamante INACOM garantem uma geometria perfeita e repetitividade mícron após mícron. Ideais para linhas de produção em massa onde a parada de máquina deve ser minimizada.",
    image: "https://images.unsplash.com/photo-1504198453319-5ce911baf2ea?auto=format&fit=crop&q=80&w=800",
    specs: [
      { label: "Concentração", value: "C75 - C125" },
      { label: "Granulometria", value: "D46 - D181" },
      { label: "Ligante", value: "Metálico" },
      { label: "Performance", value: "Alta taxa de remoção" }
    ],
    applications: [
      "Ferro fundido cinzento e nodular",
      "Boring de precisão",
      "Válvulas hidráulicas",
      "Cerâmicas técnicas"
    ],
    tdsLink: "https://example.com/tds-diamond-honing-sticks.pdf"
  },
  {
    id: "bastao-acabamento",
    name: "Bastões de Acabamento (Honing Stones)",
    category: "Acessórios",
    description: "Ajuste fino manual ou semi-automático para pequenos reparos.",
    longDescription: "Bastões abrasivos portáteis para operações de ajuste fino que exigem sensibilidade e precisão. Disponíveis em diversos tamanhos e fixações para se adaptarem a qualquer necessidade de bancada.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800",
    specs: [
      { label: "Formatos", value: "Retangulares / Quadrados / Cilíndricos" },
      { label: "Comprimento", value: "50mm - 200mm" },
      { label: "Abrasivo", value: "Alumina Zircôna / Rubi" },
      { label: "Uso", value: "Manual ou Máquina" }
    ],
    applications: [
      "Polimento final",
      "Limpeza de arestas",
      "Ajuste de matrizes",
      "Manutenção de ferramentas"
    ],
    tdsLink: "https://example.com/tds-finishing-stones.pdf"
  }
];

type SortOrder = "name-asc" | "name-desc" | "category";

export function ProductCatalog() {
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  const [activeTab, setActiveTab] = useState<"specs" | "applications" | "guide">("specs");
  const [sortOrder, setSortOrder] = useState<SortOrder>("name-asc");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      if (sortOrder === "name-asc") {
        return a.name.localeCompare(b.name);
      } else if (sortOrder === "name-desc") {
        return b.name.localeCompare(a.name);
      } else if (sortOrder === "category") {
        return a.category.localeCompare(b.category);
      }
      return 0;
    });
  }, [sortOrder]);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    if (detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="bg-white py-20 md:py-32 px-4 sm:px-6 md:px-12 border-t border-outline-variant/10" id="produtos" itemScope itemType="https://schema.org/ItemList">
      <link itemProp="url" href={window.location.origin + "#produtos"} />
      <h2 className="sr-only" itemProp="name">Catálogo de Produtos de Brunimento INACOM</h2>
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 md:mb-24">
          <div className="max-w-2xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40 block mb-4">Catálogo de Produtos</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-monolith leading-tight text-monolith">
              Soluções em <span className="text-primary text-monolith">Abrasivos.</span>
            </h2>
          </div>
          <div className="flex flex-col items-end gap-4 w-full md:w-auto">
            <div className="flex items-center gap-3 bg-surface-container px-4 py-2 ghost-border group">
              <ArrowUpDown size={14} className="text-outline group-hover:text-primary transition-colors" />
              <select 
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                className="bg-transparent text-[10px] font-bold uppercase tracking-widest text-monolith focus:outline-none cursor-pointer"
              >
                <option value="name-asc">Nome (A-Z)</option>
                <option value="name-desc">Nome (Z-A)</option>
                <option value="category">Categoria</option>
              </select>
            </div>
            <div className="flex gap-2">
              <div className="w-12 h-1 bg-primary"></div>
              <div className="w-12 h-1 bg-outline-variant/30"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Sidebar - Product List */}
          <div className="lg:col-span-4 space-y-2">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-outline mb-6 border-b border-outline-variant/20 pb-2">Selecione o Produto</h3>
            <div className="flex flex-col gap-1">
              {sortedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  role="button"
                  tabIndex={0}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ x: 5 }}
                  onClick={() => handleProductSelect(product)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleProductSelect(product);
                    }
                  }}
                  className={`flex flex-col items-start p-6 text-left transition-all duration-300 border-l-4 relative overflow-hidden group cursor-pointer ${
                    selectedProduct.id === product.id 
                      ? "bg-surface-container border-primary" 
                      : "bg-surface hover:bg-surface-container-low border-transparent"
                  }`}
                >
                  {selectedProduct.id === product.id && (
                    <motion.div 
                      layoutId="activeGlow"
                      className="absolute inset-0 bg-primary/5 pointer-events-none"
                    />
                  )}
                  <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${
                    selectedProduct.id === product.id ? "text-primary" : "text-outline"
                  }`}>
                    {product.category}
                  </span>
                  <span className={`text-base font-black uppercase ${
                    selectedProduct.id === product.id ? "text-monolith" : "text-monolith/60"
                  }`}>
                    {product.name}
                  </span>

                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="relative group/mini-share">
                      <button 
                        aria-label={`Compartilhar ${product.name}`}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="p-2 hover:bg-primary/10 text-outline hover:text-primary transition-colors"
                      >
                        <Share2 size={12} />
                      </button>
                      <div className="absolute top-full right-0 mt-1 w-32 bg-white shadow-xl border border-outline-variant/10 opacity-0 invisible group-hover/mini-share:opacity-100 group-hover/mini-share:visible transition-all z-50">
                        <div className="flex flex-col p-1">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              const text = `Confira ${product.name} da INACOM: ${window.location.href}`;
                              window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                            }}
                            className="p-2 text-[8px] font-bold uppercase tracking-tighter text-outline hover:text-primary transition-colors text-left"
                          >
                            WhatsApp
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              navigator.clipboard.writeText(window.location.href);
                              setCopiedId(product.id);
                              setTimeout(() => setCopiedId(null), 2000);
                            }}
                            className="p-2 text-[8px] font-bold uppercase tracking-tighter text-outline hover:text-primary transition-colors text-left"
                          >
                            {copiedId === product.id ? "Copiado!" : "Copiar Link"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Download Catalog Card */}
            <div className="mt-12 p-8 bg-monolith text-white ghost-border relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity translate-x-2 -translate-y-2">
                <Download size={64} />
              </div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-3">Recursos Técnicos</h4>
              <p className="text-xs font-light text-white/60 mb-8 leading-relaxed">
                Acesse o catálogo completo da INACOM com especificações técnicas de toda a nossa linha de abrasivos e superabrasivos.
              </p>
              <a 
                href="/catalogo-inacom.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-primary text-white px-6 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-primary-container transition-all w-full justify-center"
              >
                Baixar Catálogo PDF <Download size={14} />
              </a>
            </div>
          </div>

          {/* Product Detail Area */}
          <div ref={detailsRef} className="lg:col-span-8 bg-surface-container-low ghost-border overflow-hidden scroll-mt-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProduct.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="aspect-square md:aspect-auto overflow-hidden">
                    <img 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover grayscale"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2">{selectedProduct.category}</span>
                    <h3 className="text-2xl md:text-3xl font-black uppercase text-monolith mb-6 leading-tight">{selectedProduct.name}</h3>
                    <p className="text-on-surface-variant font-light text-sm leading-relaxed mb-8">
                      {selectedProduct.description}
                    </p>
                      <div className="flex flex-wrap gap-4 relative">
                        <a 
                          href={selectedProduct.tdsLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-primary text-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-primary-container transition-colors flex items-center gap-2"
                        >
                          Ficha Técnica <FileText size={14} />
                        </a>
                        <button className="border border-outline-variant text-monolith px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors">
                          Solicitar Amostra
                        </button>
                        
                        <div className="relative group/share">
                          <button 
                            className="border border-outline-variant text-monolith px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2"
                          >
                            Compartilhar <Share2 size={14} />
                          </button>
                          
                          <div className="absolute bottom-full mb-2 left-0 w-48 bg-white shadow-2xl border border-outline-variant/20 opacity-0 invisible group-hover/share:opacity-100 group-hover/share:visible transition-all duration-200 z-50">
                            <div className="p-2 flex flex-col">
                              <button 
                                onClick={() => {
                                  const text = `Confira ${selectedProduct.name} da INACOM: ${window.location.href}`;
                                  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                                }}
                                className="flex items-center gap-3 p-3 text-[10px] font-bold uppercase tracking-widest text-outline hover:text-primary hover:bg-surface-container transition-colors text-left"
                              >
                                <MessageCircle size={14} /> WhatsApp
                              </button>
                              <button 
                                onClick={() => {
                                  const subject = encodeURIComponent(`Produto INACOM: ${selectedProduct.name}`);
                                  const body = encodeURIComponent(`Olá,\n\nConfira este produto da INACOM: ${selectedProduct.name}\n\nLink: ${window.location.href}`);
                                  window.location.href = `mailto:?subject=${subject}&body=${body}`;
                                }}
                                className="flex items-center gap-3 p-3 text-[10px] font-bold uppercase tracking-widest text-outline hover:text-primary hover:bg-surface-container transition-colors text-left"
                              >
                                <Mail size={14} /> Email
                              </button>
                              <button 
                                onClick={() => {
                                  navigator.clipboard.writeText(window.location.href);
                                  setCopiedId(selectedProduct.id);
                                  setTimeout(() => setCopiedId(null), 2000);
                                }}
                                className="flex items-center gap-3 p-3 text-[10px] font-bold uppercase tracking-widest text-outline hover:text-primary hover:bg-surface-container transition-colors text-left"
                              >
                                <Copy size={14} /> {copiedId === selectedProduct.id ? "Copiado!" : "Copiar Link"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>

                <div className="border-t border-outline-variant/10">
                  <div className="flex border-b border-outline-variant/10 px-8 md:px-12">
                    {[
                      { id: "specs", label: "Especificações", icon: <Settings size={14} /> },
                      { id: "applications", label: "Aplicações", icon: <Cpu size={14} /> },
                      { id: "guide", label: "Guia de Uso", icon: <Info size={14} /> }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id as any);
                          if (detailsRef.current) {
                            detailsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
                          }
                        }}
                        className={`flex items-center gap-2 py-6 px-4 text-[10px] font-bold uppercase tracking-widest transition-all relative ${
                          activeTab === tab.id ? "text-primary" : "text-outline hover:text-monolith"
                        }`}
                      >
                        {tab.icon}
                        {tab.label}
                        {activeTab === tab.id && (
                          <motion.div 
                            layoutId="activeTab" 
                            className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
                          />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="p-8 md:p-12">
                    {activeTab === "specs" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                        {selectedProduct.specs.map((spec, i) => (
                          <div key={i} className="flex justify-between items-center py-3 border-b border-outline-variant/5">
                            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-outline">{spec.label}</span>
                            <span className="text-sm font-bold text-monolith uppercase">{spec.value}</span>
                          </div>
                        ))}
                        <div className="sm:col-span-2 pt-6">
                          <p className="text-xs text-on-surface-variant font-light leading-relaxed">
                            {selectedProduct.longDescription}
                          </p>
                        </div>
                      </div>
                    )}

                    {activeTab === "applications" && (
                      <div className="space-y-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-outline mb-6">Principais Processos de Homologação:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {selectedProduct.applications.map((app, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 bg-white border border-outline-variant/10">
                              <CheckCircle2 size={16} className="text-primary" />
                              <span className="text-xs font-bold uppercase text-monolith">{app}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === "guide" && (
                      <div className="space-y-8">
                        <div className="flex gap-6 items-start">
                          <div className="bg-primary/10 p-3 text-primary shrink-0">
                            <BarChart3 size={20} />
                          </div>
                          <div>
                            <h4 className="text-[11px] font-black uppercase tracking-widest mb-2 text-monolith">Cálculo de Parâmetros</h4>
                            <p className="text-xs text-on-surface-variant font-light leading-relaxed">
                              Nossos abrasivos performam melhor quando operados sob pressão de contato controlada (2.5 - 5.0 kg/cm²) e velocidade periférica entre 20-35 m/min.
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-6 items-start">
                          <div className="bg-primary/10 p-3 text-primary shrink-0">
                            <Zap size={20} />
                          </div>
                          <div>
                            <h4 className="text-[11px] font-black uppercase tracking-widest mb-2 text-monolith">Sugerido p/ Lote</h4>
                            <p className="text-xs text-on-surface-variant font-light leading-relaxed">
                              Para máxima vida útil, recomendamos o uso de óleo de brunimento com enxofre ativo ou emulsões sintéticas de baixa viscosidade.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
