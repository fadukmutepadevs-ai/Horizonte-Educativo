import React from 'react';
import { Database, BookmarkCheck } from 'lucide-react';

interface FooterProps {
  onOpenBackendModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBackendModal }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 text-xs border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 pb-8 border-b border-slate-800">
          
          {/* Coluna 1: Marca e Escopo */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded bg-[#143275] text-white flex items-center justify-center font-bold text-xs border border-blue-400/30">
                <svg viewBox="0 0 48 48" className="w-3.5 h-3.5 text-blue-300" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 8.5C15 7.11929 16.1193 6 17.5 6H30.5C31.8807 6 33 7.11929 33 8.5V41.5L24 35L15 41.5V8.5Z" stroke="#93C5FD" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 20.5L23.2 23.8L28.5 17.5" stroke="#93C5FD" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-extrabold text-sm text-white tracking-tight">
                Horizonte<span className="text-blue-400">Educativo</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs mb-3">
              Iniciativa de apoio ao ingresso no Ensino Superior da República de Moçambique. Questões oficiais compiladas para estudo autônomo.
            </p>
            <div className="text-[11px] text-slate-500">
              Disponibilidade garantida sob conexões 3G/4G
            </div>
          </div>

          {/* Coluna 2: Disciplinas */}
          <div>
            <div className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Disciplinas Nucleares
            </div>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li>
                <a href="#simulados" className="hover:text-blue-400 transition-colors">
                  Matemática Aplicada
                </a>
              </li>
              <li>
                <a href="#simulados" className="hover:text-blue-400 transition-colors">
                  Língua Portuguesa & Literatura
                </a>
              </li>
              <li>
                <a href="#simulados" className="hover:text-blue-400 transition-colors">
                  Física Teórica e Experimental
                </a>
              </li>
              <li>
                <a href="#simulados" className="hover:text-blue-400 transition-colors">
                  Química Geral e Orgânica
                </a>
              </li>
              <li>
                <a href="#simulados" className="hover:text-blue-400 transition-colors">
                  Biologia & Ciências da Saúde
                </a>
              </li>
              <li>
                <a href="#simulados" className="hover:text-blue-400 transition-colors">
                  Língua Inglesa Instrumental
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Instituições */}
          <div>
            <div className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Instituições Homologadas
            </div>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li>
                <a href="#dicas" className="hover:text-blue-400 transition-colors">
                  Universidade Eduardo Mondlane (UEM)
                </a>
              </li>
              <li>
                <a href="#dicas" className="hover:text-blue-400 transition-colors">
                  Universidade Pedagógica de Maputo (UP)
                </a>
              </li>
              <li>
                <a href="#dicas" className="hover:text-blue-400 transition-colors">
                  Universidade Púnguè / UniZambeze
                </a>
              </li>
              <li>
                <a href="#dicas" className="hover:text-blue-400 transition-colors">
                  Universidade Lúrio (UniLúrio)
                </a>
              </li>
              <li>
                <a href="#dicas" className="hover:text-blue-400 transition-colors">
                  ISRI / ACIPOL
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Engenharia & Backend */}
          <div>
            <div className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Arquitetura de Dados
            </div>
            <p className="text-slate-400 text-xs leading-relaxed mb-3">
              Frontend desacoplado com serviço REST padronizado para integração nativa com <strong>Laravel + MySQL</strong>.
            </p>
            <button
              onClick={onOpenBackendModal}
              className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded border border-slate-700 transition-colors text-xs font-semibold cursor-pointer"
            >
              <Database className="w-3.5 h-3.5 text-blue-400" />
              <span>Ver Schema MySQL & Laravel API</span>
            </button>
          </div>

        </div>

        {/* Rodapé Inferior */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Horizonte Educativo. Todos os direitos reservados.
          </div>
          <div>
            Plataforma Moçambicana de Exames de Admissão · Alto Desempenho e Consumo Mínimo de Dados
          </div>
        </div>
      </div>
    </footer>
  );
};
