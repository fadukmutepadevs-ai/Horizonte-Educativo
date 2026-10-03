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

export default function App() {
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState<DisciplinaSlug | 'todas'>('todas');
  const [backendModalAberto, setBackendModalAberto] = useState<boolean>(false);

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
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-950">
      {/* Header com Navegação e Aviso de Baixo Consumo */}
      <Header
        onOpenBackendModal={() => setBackendModalAberto(true)}
        onSelectDisciplina={handleSelectDisciplina}
      />

      <main className="flex-1">
        {/* 1. Hero com Título, Descrição, Botão Central que Recarrega a Página de Verdade */}
        <Hero onComecarEstudar={handleComecarEstudar} />

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
