import React from 'react';
import { ArrowRight, BookOpen, GraduationCap } from 'lucide-react';

interface CtaSectionProps {
  onComecar: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onComecar }) => {
  return (
    <section className="py-16 md:py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-blue-400 tracking-wider uppercase mb-4">
          <GraduationCap className="w-4 h-4" />
          <span>Acesso Livre à Educação Superior</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4 text-white text-balance">
          Inicie a sua preparação com o banco oficial de questões.
        </h2>

        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
          Pratique de forma direcionada, identifique os pontos de melhoria com antecedência e garanta a pontuação necessária para a sua admissão nos cursos de maior exigência.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8">
          <a
            href="#simulados"
            onClick={onComecar}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-6 py-3.5 rounded-lg shadow-sm transition-colors text-center"
          >
            <span>Iniciar simulado agora</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#disciplinas"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm px-5 py-3.5 rounded-lg border border-slate-700 transition-colors text-center"
          >
            <span>Consultar matrizes por disciplina</span>
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
          <span>Sem necessidade de cadastro prévio</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Otimizado para baixa largura de banda móvel</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Gabaritos fundamentados segundo editais</span>
        </div>

      </div>
    </section>
  );
};
