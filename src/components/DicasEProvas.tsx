import React from 'react';
import { FileText, Building2, Clock, CheckSquare2 } from 'lucide-react';
import { UNIVERSIDADES, DICAS_PREPARACAO } from '../data/universidades';

export const DicasEProvas: React.FC = () => {
  return (
    <section id="dicas" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Cabeçalho */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-blue-900 tracking-wider uppercase mb-1.5">
            Orientações aos Candidatos
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Normas Oficiais e Instruções para o Dia do Exame
          </h2>
          <p className="text-slate-600 text-sm mt-1 leading-relaxed">
            Recomendações técnicas baseadas nos regulamentos das comissões de exames de admissão da UEM, UP e polos universitários.
          </p>
        </div>

        {/* Grade de 4 Instruções Oficiais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {DICAS_PREPARACAO.map((dica) => (
            <div
              key={dica.id}
              className="p-6 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <CheckSquare2 className="w-4 h-4 text-blue-900 shrink-0" />
                  <h3 className="font-bold text-base text-slate-900">
                    {dica.titulo}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {dica.conteudo}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200 text-xs font-semibold text-blue-900">
                Diretriz: {dica.destaque}
              </div>
            </div>
          ))}
        </div>

        {/* Quadro Institucional das Universidades Públicas em Moçambique */}
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Quadro de Universidades Públicas Homologadas
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Especificidades de concorrência e estrutura de provas por instituição.
              </p>
            </div>
            <div className="text-xs text-slate-600 font-mono">
              Inscrições: Novembro · Provas: Janeiro
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {UNIVERSIDADES.map((uni) => (
              <div
                key={uni.id}
                className="bg-white p-5 rounded border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold text-blue-950 text-base">{uni.sigla}</span>
                    <span className="text-[10px] text-slate-500 font-medium">{uni.cidade}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mb-2 leading-snug">
                    {uni.nome}
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed mb-4">
                    {uni.detalhes}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 text-[10px] text-slate-500 leading-normal">
                  <strong className="text-slate-700">Aviso da comissão:</strong> {uni.dicaExame}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
