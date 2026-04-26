import { useEffect } from "react";

interface SeoHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
}

export function SeoHead({ 
  title = "INACOM | Pedras para Brunimento Industrial de Precisão | Indaiatuba SP",
  description = "Fabricante brasileira de pedras abrasivas para brunimento industrial. Ra a partir de 0.02μm, tolerância 0.001mm, 35% redução de ciclo. Compatível com Sunnen, Gehring, Nagel.",
  canonical = "https://inacom.com.br/",
  ogImage = "https://inacom.com.br/og-inacom.jpg"
}: SeoHeadProps) {
  
  useEffect(() => {
    // Title
    document.title = title;
    
    // Helper para criar/atualizar meta tags
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        const [attrName, attrValue] = selector.replace('meta[', '').replace(']', '').split('=');
        el.setAttribute(attrName.trim(), attrValue.replace(/"/g, '').trim());
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };
    
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', canonical);
    setMeta('meta[property="og:image"]', 'content', ogImage);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    
    // Canonical
    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.rel = 'canonical';
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.href = canonical;
    
  }, [title, description, canonical, ogImage]);
  
  return null;
}
