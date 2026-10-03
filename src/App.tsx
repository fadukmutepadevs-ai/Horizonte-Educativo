/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ComoFunciona } from './components/ComoFunciona';
import { DisciplinasSection } from './components/DisciplinasSection';
import { SimuladoInterativo } from './components/SimuladoInterativo';
import { DicasEProvas } from './components/DicasEProvas';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { BackendModal } from './components/BackendModal';
import { DisciplinaSlug } from './types';
import { CheckCircle2, RotateCw } from 'lucide-react';

export default function App() {
  const [appKey, setAppKey] = useState<number>(0);
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState<DisciplinaSlug | 'todas'>('todas');
  const [backendModalAberto, setBackendModalAberto] = useState<boolean>(false);
  
  // Estado de Atualização Visual e Funcional
  const [emAtualizacao, setEmAtualizacao] = useState<boolean>(false);
  const [progresso, setProgresso] = useState<number>(0);
  const [mensagemSucesso, setMensagemSucesso] = useState<string | null>(null);

  // Executa uma atualização real, rápida e com resultado visual perceptível
  const handleRecarregarPagina = () => {
    if (emAtualizacao) return;

    setEmAtualizacao(true);
    setProgresso(20);
    setMensagemSucesso(null);

    // Passo 1: Progresso rápido e rolagem suave
    setTimeout(() => {
      setProgresso(65);
    }, 100);

    // Passo 2: Reset de dados, remontagem e confirmação
    setTimeout(() => {
      setProgresso(100);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setDisciplinaSelecionada('todas');
      setAppKey((prev) => prev + 1);

      const agora = new Date().toLocaleTimeString('pt-MZ', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setMensagemSucesso(`Página e banco de questões atualizados com sucesso (${agora})`);
      setEmAtualizacao(false);

      // Limpar notificação após 3.5 segundos
      setTimeout(() => {
        setProgresso(0);
      }, 400);

      setTimeout(() => {
        setMensagemSucesso(null);
      }, 4000);
    }, 350);
  };

  const handleForcarRecargaBrowser = () => {
    window.location.reload();
  };

  const handleSelectDisciplina = (slug: DisciplinaSlug | string) => {
    setDisciplinaSelecionada(slug as DisciplinaSlug);
    const el = document.getElementById('simulados');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleComecarEstudar = () => {
    const el = document.getElementById('simulados');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div key={appKey} className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-950 relative">
      
      {/* Barra de Progresso Superior Ultra-Rápida */}
      {progresso > 0 && (
        <div className="fixed top-0 left-0 w-full h-1 z-50 bg-blue-950">
          <div
            className="h-full bg-blue-500 transition-all duration-150 ease-out shadow-xs shadow-blue-400"
            style={{ width: `${progresso}%` }}
          />
        </div>
      )}

      {/* Notificação Flutuante de Confirmação da Atualização */}
      {(emAtualizacao || mensagemSucesso) && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-auto max-w-md px-4 pointer-events-auto transition-all animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="bg-slate-900 text-white px-4 py-2.5 rounded-lg border border-blue-500/40 shadow-xl flex items-center gap-3 text-xs">
            {emAtualizacao ? (
              <>
                <RotateCw className="w-4 h-4 text-blue-400 animate-spin shrink-0" />
                <span className="font-medium text-slate-200">A atualizar a página e a renovar dados...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-medium text-slate-200">{mensagemSucesso}</span>
                <button
                  onClick={handleForcarRecargaBrowser}
                  className="ml-2 text-[11px] text-blue-400 hover:text-white underline font-semibold shrink-0 cursor-pointer"
                  title="Fazer recarga completa do navegador"
                >
                  Recarga total
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Header com Navegação e Aviso de Baixo Consumo */}
      <Header
        onOpenBackendModal={() => setBackendModalAberto(true)}
        onSelectDisciplina={handleSelectDisciplina}
      />

      <main className="flex-1">
        {/* 1. Hero com Título, Descrição, Botão Central e Recarregamento Instantâneo */}
        <Hero 
          onComecarEstudar={handleComecarEstudar}
          onRecarregarPagina={handleRecarregarPagina}
          emAtualizacao={emAtualizacao}
        />

        {/* 2. Secção Como Funciona */}
        <ComoFunciona />

        {/* 3. Secção de Disciplinas (Matemática, Português, Física, Química, Biologia, Inglês) */}
        <DisciplinasSection onSelectDisciplina={handleSelectDisciplina} />

        {/* 4. Área de Exercícios e Simulados Interativos */}
        <SimuladoInterativo disciplinaFiltroInicial={disciplinaSelecionada} />

        {/* 5. Guia Rápido, Universidades e Dicas de Exame */}
        <DicasEProvas />

        {/* 6. Chamada Final para Ação (CTA) */}
        <CtaSection onComecar={handleComecarEstudar} />
      </main>

      {/* 7. Footer Simples */}
      <Footer onOpenBackendModal={() => setBackendModalAberto(true)} />

      {/* Modal Técnico para Integração Laravel + MySQL */}
      <BackendModal
        aberto={backendModalAberto}
        onFechar={() => setBackendModalAberto(false)}
      />
    </div>
  );
}
