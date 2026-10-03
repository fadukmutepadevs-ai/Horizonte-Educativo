import React from 'react';
import { Calculator, BookOpen, Zap, FlaskConical, Dna, Globe, ArrowRight } from 'lucide-react';
import { DISCIPLINAS } from '../data/disciplinas';
import { DisciplinaSlug } from '../types';

interface DisciplinasSectionProps {
  onSelectDisciplina: (slug: DisciplinaSlug) => void;
}

const ICONES_MAP: Record<string, React.FC<{ className?: string }>> = {
  Calculator,
  BookOpen,
  Zap,
  FlaskConical,
  Dna,
  Globe,
};

export const DisciplinasSection: React.FC<DisciplinasSectionProps> = ({ onSelectDisciplina }) => {
  return (
    <section id="disciplinas" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs font-semibold text-blue-900 tracking-wider uppercase mb-1.5">
              Grade Curricular Homologada
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Disciplinas dos Exames de Admissão
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              Conteúdos programáticos organizados segundo os editais oficiais das universidades públicas moçambicanas.
            </p>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Provas de 2018 a 2024 catalogadas
          </div>
        </div>

        {/* Grade das 6 Disciplinas com Visual Profissional em Azul e Cinza */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DISCIPLINAS.map((disc) => {
            const IconeComponent = ICONES_MAP[disc.icone] || BookOpen;

            return (
              <div
                key={disc.id}
                className="rounded-lg border border-slate-200 bg-white p-6 hover:border-blue-500 transition-all flex flex-col justify-between shadow-xs hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-md bg-blue-900 text-white flex items-center justify-center">
                      <IconeComponent className="w-5 h-5 text-blue-200" />
                    </div>
                    <span className="text-xs font-mono font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded tabular-nums">
                      {disc.totalQuestoes} questões
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {disc.nome}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                    {disc.descricao}
                  </p>

                  <div className="mb-5">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Principais eixos de avaliação:
                    </div>
                    <ul className="space-y-1.5">
                      {disc.topicosPrincipais.slice(0, 3).map((topico, i) => (
                        <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                          <span className="text-blue-700 font-bold shrink-0">―</span>
                          <span className="leading-snug">{topico}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 truncate max-w-[190px]" title={disc.pesoTipico}>
                    {disc.pesoTipico}
                  </span>
                  <a
                    href="#simulados"
                    onClick={() => onSelectDisciplina(disc.slug)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-900 hover:text-blue-700 transition-colors"
                  >
                    <span>Praticar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
