import React, { useState } from 'react';
import { Menu, X, ChevronRight, Database, BookmarkCheck } from 'lucide-react';

interface HeaderProps {
  onOpenBackendModal: () => void;
  onSelectDisciplina: (slug: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBackendModal }) => {
  const [menuAberto, setMenuAberto] = useState(false);

  const fecharMenu = () => setMenuAberto(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 transition-shadow shadow-xs">
      {/* Barra Institucional Superior */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 font-normal border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            <span className="text-slate-300 text-[11px] sm:text-xs">
              Portal Oficial de Preparação para Exames de Admissão — Moçambique (UEM · UP · UniZambeze · UniLúrio)
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px] text-slate-400">
            <span>Rede Otimizada · Modo Baixo Consumo</span>
            <button
              onClick={onOpenBackendModal}
              className="text-blue-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Database className="w-3 h-3" />
              <span>Painel / Laravel API</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Bar Contract (1 Linha, 3 Zonas) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Zona 1: Brand Wordmark (Elemento único de texto forte) */}
        <a href="#inicio" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-[#143275] text-white flex items-center justify-center font-bold text-lg shadow-xs group-hover:bg-[#1a3d8f] border border-blue-400/30 transition-colors">
            <svg viewBox="0 0 48 48" className="w-5 h-5 text-blue-300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 8.5C15 7.11929 16.1193 6 17.5 6H30.5C31.8807 6 33 7.11929 33 8.5V41.5L24 35L15 41.5V8.5Z" stroke="#93C5FD" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 20.5L23.2 23.8L28.5 17.5" stroke="#93C5FD" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg text-slate-900 tracking-tight leading-tight">
              Horizonte<span className="text-blue-900">Educativo</span>
            </span>
            <span className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">
              Exames do Ensino Superior
            </span>
          </div>
        </a>

        {/* Zona 2: Links de Navegação Textuais e Limpos */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <a href="#inicio" className="hover:text-blue-900 hover:underline underline-offset-8 transition-colors">
            Início
          </a>
          <a href="#como-funciona" className="hover:text-blue-900 hover:underline underline-offset-8 transition-colors">
            Metodologia
          </a>
          <a href="#disciplinas" className="hover:text-blue-900 hover:underline underline-offset-8 transition-colors">
            Disciplinas
          </a>
          <a href="#simulados" className="hover:text-blue-900 hover:underline underline-offset-8 transition-colors font-semibold text-blue-900">
            Simulados
          </a>
          <a href="#dicas" className="hover:text-blue-900 hover:underline underline-offset-8 transition-colors">
            Normas & Dicas
          </a>
        </nav>

        {/* Zona 3: Ação Primária em Azul Escuro Vibrante */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#simulados"
            className="inline-flex items-center gap-1.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-xs transition-colors focus:ring-2 focus:ring-blue-600 focus:outline-none"
          >
            <span>Começar a estudar</span>
            <ChevronRight className="w-3.5 h-3.5 text-blue-200" />
          </a>
        </div>

        {/* Botão de Menu Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href="#simulados"
            className="text-xs bg-blue-900 text-white font-semibold px-3 py-1.5 rounded-md"
          >
            Simulado
          </a>
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            aria-label="Abrir menu"
            className="p-2 rounded-md text-slate-700 hover:bg-slate-100 focus:outline-none"
          >
            {menuAberto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {menuAberto && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-2">
          <a
            href="#inicio"
            onClick={fecharMenu}
            className="block px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
          >
            Início
          </a>
          <a
            href="#como-funciona"
            onClick={fecharMenu}
            className="block px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
          >
            Metodologia de Estudo
          </a>
          <a
            href="#disciplinas"
            onClick={fecharMenu}
            className="block px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
          >
            Disciplinas Oficiais
          </a>
          <a
            href="#simulados"
            onClick={fecharMenu}
            className="block px-3 py-2 text-sm font-semibold text-blue-900 bg-blue-50/60 rounded"
          >
            Simulados e Exercícios
          </a>
          <a
            href="#dicas"
            onClick={fecharMenu}
            className="block px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
          >
            Normas & Calendário dos Exames
          </a>
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                fecharMenu();
                onOpenBackendModal();
              }}
              className="w-full text-left px-3 py-2 text-xs text-slate-500 hover:text-blue-900 flex items-center gap-1.5"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Especificação Técnica Laravel + MySQL</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
