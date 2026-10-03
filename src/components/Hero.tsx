import React, { useState } from 'react';
import { ArrowRight, RotateCw, Sparkles, GraduationCap } from 'lucide-react';

interface HeroProps {
  onComecarEstudar: () => void;
  onRecarregarPagina?: () => void;
  emAtualizacao?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ 
  onComecarEstudar, 
}) => {
  const [recarregando, setRecarregando] = useState(false);

  // Executa o recarregamento REAL da página no navegador (Cloudflare Workers / Web)
  const handleAtualizarPagina = () => {
    setRecarregando(true);
    try {
      window.location.reload();
    } catch {
      window.location.href = window.location.href;
    }
  };

  return (
    <section id="inicio" className="bg-gradient-to-b from-slate-950 via-[#0c1836] to-slate-950 text-white pt-10 pb-16 md:pt-14 md:pb-22 border-b border-slate-800 relative overflow-hidden">
      
      {/* Luz de fundo sutil em azul escuro para dar profundidade sem poluição */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        
        {/* Etiqueta institucional superior */}
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-300 tracking-wider uppercase mb-6 bg-blue-950/70 border border-blue-800/60 px-3.5 py-1.5 rounded-full">
          <GraduationCap className="w-4 h-4 text-blue-400" />
          <span>Portal Nacional de Exames de Admissão — Moçambique</span>
        </div>

        {/* ============================================================== */}
        {/* BLOCO CENTRAL DE DESTAQUE: BOTÃO DE ATUALIZAR + LETRAS         */}
        {/* ============================================================== */}
        <div className="flex flex-col items-center justify-center mb-8">
          
          {/* BOTÃO CENTRAL DE DESTAQUE (Ícone da Imagem - Recarrega a página de verdade) */}
          <div className="relative group mb-6">
            <button
              onClick={handleAtualizarPagina}
              aria-label="Recarregar página"
              title="Recarregar página"
              className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl bg-[#143275] hover:bg-[#1a3d8f] active:bg-[#10275a] border-2 border-blue-400/30 hover:border-blue-300 shadow-xl shadow-blue-950/80 hover:shadow-blue-600/30 flex flex-col items-center justify-center transition-all duration-150 transform hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-500/40"
            >
              {/* Ícone idêntico ao da imagem fornecida: Marcador azul com checkmark */}
              <svg
                viewBox="0 0 48 48"
                className={`w-13 h-13 sm:w-15 sm:h-15 text-blue-300 transition-transform duration-200 ${
                  recarregando ? 'animate-spin scale-110' : 'group-hover:scale-105'
                }`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Formato do Marcador / Bookmark */}
                <path
                  d="M15 8.5C15 7.11929 16.1193 6 17.5 6H30.5C31.8807 6 33 7.11929 33 8.5V41.5L24 35L15 41.5V8.5Z"
                  stroke="#93C5FD"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Visto / Checkmark interno */}
                <path
                  d="M20 20.5L23.2 23.8L28.5 17.5"
                  stroke="#93C5FD"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Mini indicador de atualização no canto inferior */}
              <span className="absolute bottom-1.5 right-1.5 bg-blue-900/90 text-blue-200 p-1 rounded-full border border-blue-500/40 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <RotateCw className={`w-3 h-3 ${recarregando ? 'animate-spin text-white' : ''}`} />
              </span>
            </button>
          </div>

          {/* IMAGEM DE LETRAS (Organizada logo abaixo sem roubar o destaque do botão) */}
          <div className="max-w-2xl px-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-black tracking-tight leading-[1.18] text-white text-balance drop-shadow-xs">
              Preparação rigorosa para os exames de admissão universitária em Moçambique.
            </h1>
          </div>

        </div>

        {/* Descrição de Apoio */}
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto font-normal">
          Banco homologado de provas da <strong className="text-white font-semibold">UEM, UP-Maputo, UniZambeze e UniLúrio</strong>. Gabaritos fundamentados, simulados cronometrados e consumo zero de saldo móvel.
        </p>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12">
          <a
            href="#simulados"
            onClick={onComecarEstudar}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-6 py-3.5 rounded-lg shadow-sm transition-all focus:ring-4 focus:ring-blue-500/30 text-center"
          >
            <span>Começar a estudar</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#disciplinas"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm px-5 py-3.5 rounded-lg border border-slate-700 transition-colors text-center"
          >
            <span>Consultar as 6 disciplinas</span>
          </a>
        </div>

        {/* Indicadores Numéricos */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-8 border-t border-slate-800/80 max-w-3xl mx-auto text-center sm:text-left">
          <div className="bg-slate-900/40 p-3.5 rounded-lg border border-slate-800">
            <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight tabular-nums">
              1.200+ Questões
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Catalogadas com gabarito oficial (2018–2024).
            </div>
          </div>

          <div className="bg-slate-900/40 p-3.5 rounded-lg border border-slate-800">
            <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight tabular-nums">
              0 KB de Tráfego
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Execução local otimizada para redes móveis.
            </div>
          </div>

          <div className="bg-slate-900/40 p-3.5 rounded-lg border border-slate-800">
            <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              6 Disciplinas
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Matemática, Português, Física, Química, Biologia, Inglês.
            </div>
          </div>
        </div>

        {/* Universidades Cobertas */}
        <div className="mt-10 pt-5 border-t border-slate-800/60 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
          <span className="text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
            Cobertura Nacional:
          </span>
          <span className="text-slate-300 font-medium">UEM (Maputo)</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-300 font-medium">UP-Maputo & Delegações</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-300 font-medium">UniZambeze (Centro)</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-300 font-medium">UniLúrio (Norte)</span>
        </div>

      </div>
    </section>
  );
};
