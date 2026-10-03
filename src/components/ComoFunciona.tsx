import React from 'react';
import { Target, Layers, FileCheck2, Cpu } from 'lucide-react';

export const ComoFunciona: React.FC = () => {
  const etapas = [
    {
      indice: '01',
      icone: Target,
      titulo: 'Seleção por Universidade e Carreira',
      descricao:
        'Escolha o exame específico da instituição pretendida (UEM, UP, UniZambeze ou UniLúrio) e filtre as disciplinas de maior peso para o seu curso.',
    },
    {
      indice: '02',
      icone: Layers,
      titulo: 'Resolução com Parâmetros Oficiais',
      descricao:
        'Pratique com itens de múltipla escolha idênticos aos cadernos de prova, com enunciados formais e 5 alternativas (A a E).',
    },
    {
      indice: '03',
      icone: FileCheck2,
      titulo: 'Fundamentação Teórica Imediata',
      descricao:
        'Acesse a resolução analítica de cada questão logo após a resposta para identificar lacunas conceituais e fixar o raciocínio correto.',
    },
    {
      indice: '04',
      icone: Cpu,
      titulo: 'Baixo Consumo e Estabilidade Local',
      descricao:
        'A plataforma opera com motor leve no próprio navegador, garantindo fluidez contínua mesmo sob conexões móveis lentas.',
    },
  ];

  return (
    <section id="como-funciona" className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Cabeçalho da Seção */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold text-blue-900 tracking-wider uppercase mb-2">
            Metodologia Pedagógica
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Como funciona a preparação no Horizonte Educativo
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            Um fluxo sequencial estruturado para transformar a resolução de provas anteriores no seu principal instrumento de aprovação.
          </p>
        </div>

        {/* Grade de 4 Etapas com Numeração Editorial Limpa */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {etapas.map((etapa) => {
            const Icone = etapa.icone;
            return (
              <div
                key={etapa.indice}
                className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs hover:border-blue-400 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-blue-900 bg-blue-50 px-2 py-1 rounded">
                      {etapa.indice}
                    </span>
                    <Icone className="w-5 h-5 text-slate-700" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {etapa.titulo}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {etapa.descricao}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
