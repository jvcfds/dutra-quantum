import HeroSkull from "./HeroSkull";

function SectionTitle({ k, t, sub }: { k?: string; t: string; sub?: string }) {
  return (
    <div className="text-center py-6 md:py-10">
      {k ? (
        <p className="tracking-[0.35em] text-xs text-qblue/70 mb-2">{k}</p>
      ) : null}
      <h2 className="font-display text-3xl md:text-5xl tracking-wide">{t}</h2>
      {sub ? (
        <p className="mt-3 text-sm md:text-base text-white/70">{sub}</p>
      ) : null}
    </div>
  );
}

function Stat({
  big,
  top,
  bottom,
}: {
  big: string;
  top: string;
  bottom: string;
}) {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-semibold">{big}</div>
      <div className="mt-2 text-[11px] md:text-xs tracking-[0.25em] text-white/80">
        {top}
      </div>
      <div className="mt-1 text-[10px] md:text-xs text-white/50">{bottom}</div>
    </div>
  );
}

export default function App() {
  return (
    <main className="bg-page text-white overflow-x-hidden">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-black/35 border-b border-white/5">
        <nav className="max-w-6xl mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-qblue/30 ring-1 ring-qblue/50" />
            <span className="font-display tracking-[0.35em] text-xs">
              DUTRA&nbsp;QUANTUM
            </span>
          </div>
          <ul className="hidden md:flex items-center gap-8 text-[12px] tracking-[0.2em]">
            <li className="nav-link">QUANTUM ANALYTICS</li>
            <li className="nav-link">METODOLOGIAS</li>
            <li className="nav-link">PROJETOS</li>
            <li className="nav-link">LIVROS</li>
            <li className="nav-link">FILMES &amp; SÉRIES</li>
          </ul>
        </nav>
      </header>

      {/* HERO com caveira */}
      <div id="top" className="pt-14 md:pt-16">
        <HeroSkull />
      </div>

      {/* Títulos hero + subtítulo + números + CTA */}
      <section className="-mt-44 md:-mt-56 relative z-30">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-white text-[8vw] font-extralight tracking-widest uppercase">
  DUTRA<br />QUANTUM
</h1>
          <div className="mt-2 md:mt-3 font-display tracking-[0.35em] text-qblue/80 text-sm md:text-xl">
            TECHNOLOGY
          </div>

          <p className="mt-6 md:mt-8 text-sm md:text-lg text-white/80">
            Transformando dados em decisões estratégicas através de{" "}
            <b className="text-white">algoritmos</b> de{" "}
            <b className="text-white">machine learning</b> e análise
            quantitativa autônoma
          </p>

          <div className="grid grid-cols-3 gap-6 md:gap-10 mt-10 md:mt-14">
            <Stat
              big="45+"
              top="TÉCNICAS AVANÇADAS"
              bottom="ALGORITMOS PROPRIETÁRIOS"
            />
            <Stat
              big="99.7%"
              top="ACURÁCIA COMPROVADA"
              bottom="PRECISÃO PREDITIVA"
            />
            <Stat
              big="3.2M"
              top="PONTOS DE DADOS"
              bottom="PROCESSAMENTO DIÁRIO"
            />
          </div>

          <div className="mt-10 md:mt-12">
            <a href="#metodologias" className="btn-primary">
              EXPLORAR METODOLOGIAS
            </a>
          </div>

          <div className="mt-6 md:mt-8 text-[11px] tracking-[0.35em] text-white/60">
            ANÁLISE QUANTITATIVA DE NÍVEL INSTITUCIONAL
          </div>
        </div>
      </section>

      {/* Seções principais */}
      {/* 1. Expertise / Metodologias */}
      <section id="metodologias" className="sec">
        <SectionTitle
          k="EXPERTISE QUANTITATIVA"
          t="METODOLOGIAS PROPRIETÁRIAS"
          sub="Arsenal completo de técnicas quantitativas desenvolvidas para análise financeira de nível institucional"
        />

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto px-4 md:px-6">
          {[
            "Machine Learning Financeiro",
            "Análise Quantitativa Avançada",
            "Modelagem Estatística",
            "Python Quant Development",
          ].map((t) => (
            <div key={t} className="card">
              <h3 className="card-title">{t}</h3>
              <ul className="list">
                {[
                  "Redes Neurais para Reversão de Mercado",
                  "Isolation Forest para Detecção de Anomalias",
                  "Algoritmos Genéticos para Otimização",
                  "Word Embeddings em Análise de COPOM",
                  "Tensores de Dados Multidimensionais",
                  "Métodos de Kernel Aplicados",
                  "Transformada de Fourier em Séries Temporais",
                  "Geometria Fractal e Coeficiente de Hurst",
                  "Processos de Markov e Modelos Bayesianos",
                  "Análise de Componentes Principais",
                  "Regressão Logística e Linear",
                  "Desenvolvimento de Indicadores Proprietários",
                  "Simulação de Monte Carlo",
                  "Backtesting Frameworks",
                  "APIs de Trading Algorítmico",
                ].map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Arsenal Quantitativo */}
      <section className="sec">
        <SectionTitle k="ARSENAL QUANTITATIVO" t="45+ TÉCNICAS DOMINADAS" />
        <div className="max-w-5xl mx-auto px-4 md:px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            ["Neural & Deep Learning", "12 técnicas"],
            ["Métodos Matemáticos", "8 técnicas"],
            ["Análise de Mercado", "10 técnicas"],
            ["Machine Learning Clássico", "15 técnicas"],
          ].map(([a, b]) => (
            <div key={a} className="pill">
              <div className="font-medium">{a}</div>
              <div className="text-white/60">{b}</div>
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 mt-8 grid md:grid-cols-3 gap-6">
          {[
            "Indicador de Reversão com Redes Neurais (Bitcoin)",
            "Word Embeddings para Análise de Sentimento",
            "Embeddings Textuais com PCA",
            "Modelagem de Tópicos",
            "Álgebra Linear Aplicada",
            "Tensores de Dados",
            "Kernels e Métodos de Kernel",
            "Geometria Fractal",
            "Volatilidade e Coeficiente de Hurst",
            "Fronteira Eficiente",
            "Correlação com PCA e Clusterização",
            "Estacionariedade de Séries",
            "Árvores de Decisão",
            "SVM (Support Vector Machines)",
            "Programação Genética",
            "Detecção de Outliers",
          ].map((txt) => (
            <div key={txt} className="card">
              {txt}
            </div>
          ))}
        </div>
      </section>

      {/* 3. Frameworks e Metodologias */}
      <section className="sec">
        <SectionTitle
          k="FRAMEWORKS PROPRIETÁRIOS"
          t="METODOLOGIAS AVANÇADAS"
        />
        <div className="max-w-6xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-6">
          {[
            "Quantum Data Processing – Pipeline Proprietário Avançado",
            "Análise de Sentimento Avançada – NLP Financeiro Especializado",
            "Risk Analytics – Gestão de Risco Quantitativa",
            "Previsão da Taxa Selic – Modelo Ensemble para Decisões do COPOM",
          ].map((it) => (
            <div key={it} className="card">
              {it}
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 mt-8 grid md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="card-title">Metodologias</h3>
            <ul className="list">
              <li>Feature Engineering avançado com dados macroeconômicos</li>
              <li>
                Ensemble Methods combinando XGBoost, Random Forest e Neural
                Networks
              </li>
              <li>Validação temporal rigorosa com walk-forward analysis</li>
              <li>
                Incorporação de análise de sentimento das atas do COPOM
              </li>
            </ul>
          </div>
          <div className="card">
            <h3 className="card-title">Métricas (exemplo)</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              {[
                ["87%", "ACCURACY"],
                ["0.91", "PRECISION"],
                ["0.84", "RECALL"],
                ["0.87", "F1 SCORE"],
              ].map(([v, k]) => (
                <div key={k} className="metric-box">
                  <div className="text-3xl md:text-4xl">{v}</div>
                  <div className="text-[11px] tracking-[0.25em] text-white/60">
                    {k}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Portfólio de Projetos */}
      <section className="sec">
        <SectionTitle k="PORTFÓLIO DE PROJETOS" t="PROJETOS DESENVOLVIDOS" />
        <div className="max-w-6xl mx-auto px-4 md:px-6 grid md:grid-cols-3 gap-6">
          {[
            "Cursos Online – Desenvolvimento Full-stack de plataformas de ensino",
            "Kart Motor Gasolina – Engenharia Mecânica",
            "Robô Humanoide com IA – Robótica e Inteligência Artificial",
            "Exoesqueleto – Biomecânica e Robótica",
            "Visão de Máquina Industrial – Automação Industrial",
          ].map((p) => (
            <div key={p} className="card">
              {p}
            </div>
          ))}
        </div>
      </section>

      {/* 5. Resultados, Certificações, Especialidades, Setores */}
      <section className="sec">
        <SectionTitle
          k="RESULTADOS COMPROVADOS"
          t="PERFORMANCE INSTITUCIONAL"
        />
        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4 md:px-6">
          {[
            "99.7% Precisão de Modelos",
            "15+ Clientes Institucionais",
            "50+ Projetos Concluídos",
            "23% ROI Médio",
          ].map((r) => (
            <div key={r} className="card text-center">
              {r}
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 mt-8 grid md:grid-cols-4 gap-6">
          {[
            "CQF Certified",
            "Python Institute",
            "AWS ML Specialty",
            "FRM Certified",
          ].map((c) => (
            <div key={c} className="pill text-center">
              {c}
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 mt-8 grid md:grid-cols-4 gap-6">
          {[
            "Machine Learning Financeiro",
            "Análise Quantitativa Avançada",
            "Modelagem Estatística",
            "Python Quant Development",
          ].map((s) => (
            <div key={s} className="card text-center">
              {s}
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 mt-8 grid md:grid-cols-4 gap-6">
          {[
            "Gestão de Ativos Institucionais",
            "Fundos Quantitativos",
            "Bancos de Investimento",
            "Seguradoras e Previdência",
          ].map((s) => (
            <div key={s} className="card text-center">
              {s}
            </div>
          ))}
        </div>
      </section>

      {/* 6. CTA Final */}
      <section className="sec">
        <SectionTitle
          t="DUTRA QUANTUM TECHNOLOGY"
          sub="Análise quantitativa e machine learning para mercados financeiros institucionais. Metodologias proprietárias desenvolvidas com rigor científico e precisão matemática."
        />
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <div className="grid grid-cols-3 gap-6 md:gap-10 mb-8">
            <Stat big="45+" top="TÉCNICAS AVANÇADAS" bottom="" />
            <Stat big="99.7%" top="ACURÁCIA COMPROVADA" bottom="" />
            <Stat big="3.2M" top="DADOS DIÁRIOS" bottom="" />
          </div>
          <div className="flex items-center justify-center gap-6">
            <a href="#" className="link">
              GitHub
            </a>
            <a href="#" className="link">
              Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-white/10 text-center text-xs text-white/60">
        <p>
          © 2018 DUTRA QUANTUM TECHNOLOGY. PROPRIEDADE INTELECTUAL PROTEGIDA.
        </p>
        <p className="mt-2 tracking-[0.25em]">
          ANÁLISE QUANTITATIVA • MACHINE LEARNING • METODOLOGIAS PROPRIETÁRIAS
        </p>
      </footer>
    </main>
  );
}
