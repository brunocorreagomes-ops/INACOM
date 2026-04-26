const termos = [
  {
    id: "brunimento",
    termo: "Brunimento (Honing)",
    definicao: "Processo de usinagem por abrasão que remove material em camadas extremamente finas (0.005mm a 0.05mm) usando pedras abrasivas com movimento combinado de rotação e oscilação axial. Produz textura cruzada (crosshatch) ideal para retenção de lubrificante em cilindros. Diferente da retificação, preserva a geometria da peça e não gera tensões residuais elevadas.",
    relacionados: ["Ra", "Rz", "granulometria", "crosshatch"]
  },
  {
    id: "ra",
    termo: "Ra — Rugosidade Aritmética Média",
    definicao: "Parâmetro de rugosidade superficial que representa a média aritmética dos desvios absolutos do perfil em relação à linha média, medido em micrômetros (μm). É o parâmetro mais usado em especificações de brunimento. Valores típicos em cilindros automotivos: Ra 0.4–0.8μm; em cilindros hidráulicos de alta pressão: Ra 0.1–0.4μm.",
    relacionados: ["Rz", "Rmax", "brunimento", "rugosímetro"]
  },
  {
    id: "rz",
    termo: "Rz — Rugosidade Média dos Picos e Vales",
    definicao: "Média das 5 maiores alturas de pico mais as 5 maiores profundidades de vale em um comprimento de medição. Rz é mais sensível a defeitos isolados do que Ra, sendo preferido em aplicações críticas como cilindros hidráulicos, onde um único risco pode comprometer a vedação.",
    relacionados: ["Ra", "Rmax", "cilindro hidráulico"]
  },
  {
    id: "granulometria",
    termo: "Granulometria",
    definicao: "Classificação do tamanho dos grãos abrasivos de uma pedra de brunimento. Granulometrias grossas (#60–#180) para desbaste e remoção de material; médias (#220–#400) para semi-acabamento; finas (#600–#1200) para acabamento; ultrafinas (#1500–#2500) para espelhos e superfícies de ultra-precisão. A escolha correta evita empastamento e garante Ra dentro da especificação.",
    relacionados: ["brunimento", "Ra", "liga vitrificada"]
  },
  {
    id: "crosshatch",
    termo: "Textura Crosshatch (Cruzada)",
    definicao: "Padrão de ranhuras cruzadas produzido pelo brunimento, formado pelos movimentos simultâneos de rotação e oscilação da pedra abrasiva. O ângulo de cruzamento (tipicamente 30°–60°) determina a capacidade de retenção de lubrificante e a resistência ao desgaste da superfície brunida. É obrigatário em cilindros de motor, bombas e atuadores hidráulicos.",
    relacionados: ["brunimento", "lubrificação", "cilindro de motor"]
  },
  {
    id: "liga-vitrificada",
    termo: "Liga Vitrificada",
    definicao: "Tipo de ligante usado em pedras abrasivas para brunimento onde os grãos abrasivos são unidos por material cerâmico vitrificado em alta temperatura. Oferece maior resistência térmica, estrutura porosa que facilita evacuação de cavacos e menor empastamento comparado a ligas resinóides. Ideal para brunimento a altas velocidades e com fluido corte.",
    relacionados: ["granulometria", "empastamento", "brunimento"]
  },
  {
    id: "empastamento",
    termo: "Empastamento",
    definicao: "Fenômeno onde os poros da pedra abrasiva ficam obstruídos por cavacos metálicos fundidos ou compactados, reduzindo drasticamente a capacidade de corte. Causa marcas na peça, aumento de temperatura e quebra prematura da pedra. Prevenido pela seleção correta de granulometria, dureza da liga e fluido de corte.",
    relacionados: ["liga vitrificada", "fluido de corte", "vida útil da pedra"]
  },
  {
    id: "mrr",
    termo: "Taxa de Remoção de Material (MRR)",
    definicao: "Volume de material removido por unidade de tempo durante o brunimento, medido em mm³/min. MRR elevado reduz o tempo de ciclo mas pode comprometer o Ra final. O equilíbrio entre MRR, Ra e vida útil da pedra é o parâmetro central na otimização de um ciclo de brunimento industrial.",
    relacionados: ["ciclo de brunimento", "Ra", "custo por peça"]
  }
];

export function GlossarioSection() {
  return (
    <section 
      className="bg-white py-20 md:py-32 px-4 sm:px-6 md:px-12 border-t border-outline-variant/10"
      id="glossario"
      aria-labelledby="glossario-title"
      itemScope
      itemType="https://schema.org/DefinedTermSet"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-12 md:mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40 block mb-4">
            Base de Conhecimento Técnico
          </span>
          <h2 
            id="glossario-title"
            className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-monolith leading-tight"
            itemProp="name"
          >
            Glossário de <span className="text-primary">Brunimento.</span>
          </h2>
          <p className="text-on-surface-variant font-light mt-4 max-w-2xl">
            Terminologia técnica essencial para especificação e processo de brunimento industrial. 
            Referência para engenheiros de processo, compradores técnicos e gestores de qualidade.
          </p>
        </div>

        <dl className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {termos.map((item) => (
            <div 
              key={item.id}
              id={item.id}
              className="border border-outline-variant/20 p-6 hover:border-primary transition-colors group"
              itemScope
              itemProp="definedTerm"
              itemType="https://schema.org/DefinedTerm"
            >
              <dt 
                className="text-sm font-black uppercase tracking-monolith mb-3 group-hover:text-primary transition-colors"
                itemProp="name"
              >
                {item.termo}
              </dt>
              <dd 
                className="text-sm text-on-surface-variant font-light leading-relaxed"
                itemProp="description"
              >
                {item.definicao}
              </dd>
              {item.relacionados.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.relacionados.map((rel) => (
                    <a 
                      key={rel}
                      href={`#${rel.toLowerCase().replace(/\s/g, '-')}`}
                      className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 bg-surface-container text-outline hover:bg-primary hover:text-white transition-colors"
                    >
                      {rel}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
