import React, { useState, useEffect, useMemo } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  RotateCcw, 
  Award, 
  ChevronRight, 
  ChevronLeft, 
  Smartphone,
  History,
  Check,
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';
import { QUESTOES_BANCO } from '../data/questoes';
import { DISCIPLINAS } from '../data/disciplinas';
import { DisciplinaSlug, Questao, UniversidadeCode, HistoricoSimulado } from '../types';
import { ApiService } from '../services/api';

interface SimuladoInterativoProps {
  disciplinaFiltroInicial?: DisciplinaSlug | 'todas';
}

export const SimuladoInterativo: React.FC<SimuladoInterativoProps> = ({ 
  disciplinaFiltroInicial = 'todas' 
}) => {
  // Filtros
  const [disciplinaAtiva, setDisciplinaAtiva] = useState<DisciplinaSlug | 'todas'>(disciplinaFiltroInicial);
  const [universidadeAtiva, setUniversidadeAtiva] = useState<UniversidadeCode | 'todas'>('todas');
  const [modo, setModo] = useState<'treino' | 'exame'>('treino');

  // Estado do simulado
  const [indiceAtual, setIndiceAtual] = useState<number>(0);
  const [respostasUsuario, setRespostasUsuario] = useState<Record<string, 'A' | 'B' | 'C' | 'D' | 'E'>>({});
  const [simuladoFinalizado, setSimuladoFinalizado] = useState<boolean>(false);
  const [tempoSegundos, setTempoSegundos] = useState<number>(0);
  const [abaHistorico, setAbaHistorico] = useState<boolean>(false);
  const [historicoLocal, setHistoricoLocal] = useState<HistoricoSimulado[]>([]);

  // Sincronizar filtro se mudar externamente
  useEffect(() => {
    if (disciplinaFiltroInicial) {
      setDisciplinaAtiva(disciplinaFiltroInicial);
      reiniciarSimulado();
    }
  }, [disciplinaFiltroInicial]);

  // Carregar histórico local
  useEffect(() => {
    setHistoricoLocal(ApiService.getHistoricoLocal());
  }, [simuladoFinalizado]);

  // Cronômetro para Modo Exame Real
  useEffect(() => {
    let intervalo: any = null;
    if (modo === 'exame' && !simuladoFinalizado) {
      intervalo = setInterval(() => {
        setTempoSegundos((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (intervalo) clearInterval(intervalo);
    };
  }, [modo, simuladoFinalizado]);

  // Questões filtradas
  const questoesFiltradas = useMemo(() => {
    let lista = QUESTOES_BANCO;
    if (disciplinaAtiva !== 'todas') {
      lista = lista.filter((q) => q.disciplinaId === disciplinaAtiva);
    }
    if (universidadeAtiva !== 'todas') {
      lista = lista.filter((q) => q.universidade === universidadeAtiva);
    }
    return lista;
  }, [disciplinaAtiva, universidadeAtiva]);

  const questaoAtual: Questao | undefined = questoesFiltradas[indiceAtual];
  const respostaDada = questaoAtual ? respostasUsuario[questaoAtual.id] : undefined;
  const jaRespondeuAtual = respostaDada !== undefined;

  const handleSelecionarOpcao = (letra: 'A' | 'B' | 'C' | 'D' | 'E') => {
    if (!questaoAtual) return;
    if (modo === 'treino' && jaRespondeuAtual) return;

    setRespostasUsuario((prev) => ({
      ...prev,
      [questaoAtual.id]: letra,
    }));
  };

  const reiniciarSimulado = () => {
    setIndiceAtual(0);
    setRespostasUsuario({});
    setSimuladoFinalizado(false);
    setTempoSegundos(0);
  };

  const handleFinalizarSimulado = () => {
    setSimuladoFinalizado(true);

    let acertos = 0;
    questoesFiltradas.forEach((q) => {
      if (respostasUsuario[q.id] === q.respostaCorreta) {
        acertos++;
      }
    });

    const total = questoesFiltradas.length;
    const porcentagem = total > 0 ? Math.round((acertos / total) * 100) : 0;

    ApiService.salvarTentativa({
      disciplina: disciplinaAtiva === 'todas' ? 'Geral / Mista' : disciplinaAtiva,
      universidade: universidadeAtiva,
      acertos,
      total,
      porcentagem,
      tempoGastoSegundos: tempoSegundos,
    });
  };

  const estatisticas = useMemo(() => {
    let acertos = 0;
    let respondidas = 0;
    questoesFiltradas.forEach((q) => {
      const resp = respostasUsuario[q.id];
      if (resp) {
        respondidas++;
        if (resp === q.respostaCorreta) acertos++;
      }
    });
    const total = questoesFiltradas.length;
    const porcentagem = total > 0 ? Math.round((acertos / total) * 100) : 0;
    return { acertos, respondidas, total, porcentagem };
  }, [questoesFiltradas, respostasUsuario]);

  const formatarTempo = (segundosTotais: number) => {
    const minutos = Math.floor(segundosTotais / 60);
    const segundos = segundosTotais % 60;
    return `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
  };

  return (
    <section id="simulados" className="py-16 md:py-24 bg-slate-100/70 border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Cabeçalho da Seção */}
        <div className="max-w-3xl mb-8">
          <div className="text-xs font-semibold text-blue-900 tracking-wider uppercase mb-1.5">
            Ambiente Oficial de Avaliação
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Exercícios e Simulados de Exame
          </h2>
          <p className="text-slate-600 text-sm mt-1 leading-relaxed">
            Selecione a universidade e a disciplina para praticar com questões homologadas de provas passadas.
          </p>
        </div>

        {/* Barra de Filtros e Modos com Segmented Controls Profissionais */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 mb-6 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Seletor Segmentado de Disciplinas */}
            <div className="flex-1">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Filtrar por Disciplina:
              </label>
              <div className="flex flex-wrap gap-1">
                <button
                  onClick={() => {
                    setDisciplinaAtiva('todas');
                    reiniciarSimulado();
                  }}
                  className={`text-xs px-3 py-1.5 rounded font-medium transition-colors cursor-pointer ${
                    disciplinaAtiva === 'todas'
                      ? 'bg-blue-900 text-white font-semibold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Todas (Mista)
                </button>
                {DISCIPLINAS.map((d) => (
                  <button
                    key={d.slug}
                    onClick={() => {
                      setDisciplinaAtiva(d.slug);
                      reiniciarSimulado();
                    }}
                    className={`text-xs px-3 py-1.5 rounded font-medium transition-colors cursor-pointer ${
                      disciplinaAtiva === d.slug
                        ? 'bg-blue-900 text-white font-semibold'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {d.nome}
                  </button>
                ))}
              </div>
            </div>

            {/* Seletor de Universidade e Modo */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="sm:w-44">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Universidade:
                </label>
                <select
                  value={universidadeAtiva}
                  onChange={(e) => {
                    setUniversidadeAtiva(e.target.value as UniversidadeCode | 'todas');
                    reiniciarSimulado();
                  }}
                  className="w-full text-xs bg-slate-50 border border-slate-300 text-slate-900 rounded p-2 font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none cursor-pointer"
                >
                  <option value="todas">Todas as Instituições</option>
                  <option value="UEM">UEM (Maputo)</option>
                  <option value="UP">UP-Maputo</option>
                  <option value="UniZambeze">UniZambeze</option>
                  <option value="UniLurio">UniLúrio</option>
                </select>
              </div>

              {/* Alternador de Modo */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Modo de Estudo:
                </label>
                <div className="flex bg-slate-100 p-0.5 rounded border border-slate-200">
                  <button
                    onClick={() => {
                      setModo('treino');
                      reiniciarSimulado();
                    }}
                    className={`text-xs px-3 py-1.5 rounded font-medium transition-colors cursor-pointer ${
                      modo === 'treino'
                        ? 'bg-white text-blue-950 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Treino Guiado
                  </button>
                  <button
                    onClick={() => {
                      setModo('exame');
                      reiniciarSimulado();
                    }}
                    className={`text-xs px-3 py-1.5 rounded font-medium transition-colors cursor-pointer ${
                      modo === 'exame'
                        ? 'bg-white text-blue-950 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Exame Oficial
                  </button>
                </div>
              </div>

              {/* Botão de Histórico */}
              <div className="sm:self-end">
                <button
                  onClick={() => setAbaHistorico(!abaHistorico)}
                  className={`text-xs px-3 py-2 rounded font-medium flex items-center justify-center gap-1.5 border transition-colors cursor-pointer w-full sm:w-auto ${
                    abaHistorico
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                  title="Ver histórico de tentativas no telemóvel"
                >
                  <History className="w-3.5 h-3.5" />
                  <span>Histórico</span>
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Gaveta de Histórico Salvo no Aparelho */}
        {abaHistorico && (
          <div className="bg-white rounded-lg border border-slate-300 p-5 mb-6 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-blue-900" />
                <span>Histórico Local de Tentativas (Armazenado no Aparelho)</span>
              </h3>
              <button
                onClick={() => {
                  ApiService.limparHistoricoLocal();
                  setHistoricoLocal([]);
                }}
                className="text-xs text-rose-600 hover:underline cursor-pointer"
              >
                Limpar registros
              </button>
            </div>

            {historicoLocal.length === 0 ? (
              <p className="text-xs text-slate-500 py-3">
                Nenhum simulado finalizado até ao momento. Conclua uma prova para registar a sua evolução.
              </p>
            ) : (
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {historicoLocal.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2.5 rounded bg-slate-50 border border-slate-200 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 capitalize">{item.disciplina}</span>
                      <span className="text-slate-400">/</span>
                      <span className="text-slate-600">{item.universidade}</span>
                      <span className="text-slate-400">/</span>
                      <span className="text-slate-500 text-[11px]">{item.data}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-700 font-medium tabular-nums">
                        {item.acertos} de {item.total} acertos
                      </span>
                      <span
                        className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] tabular-nums ${
                          item.porcentagem >= 70
                            ? 'bg-blue-100 text-blue-900'
                            : item.porcentagem >= 50
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-rose-100 text-rose-900'
                        }`}
                      >
                        {item.porcentagem}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Folha de Exame / Questão Ativa */}
        {questoesFiltradas.length === 0 ? (
          <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
            <h3 className="text-sm font-bold text-slate-800 mb-2">
              Nenhuma questão encontrada para os critérios selecionados
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Tente selecionar "Todas as Instituições" ou outra disciplina.
            </p>
            <button
              onClick={() => {
                setDisciplinaAtiva('todas');
                setUniversidadeAtiva('todas');
                reiniciarSimulado();
              }}
              className="text-xs bg-blue-900 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded cursor-pointer"
            >
              Restaurar todos os exames
            </button>
          </div>
        ) : simuladoFinalizado ? (
          /* TELA DE RESULTADO ANALÍTICO */
          <div className="bg-white rounded-lg border border-blue-900/30 p-6 sm:p-8 shadow-sm">
            <div className="border-b border-slate-200 pb-5 mb-6">
              <span className="text-xs font-semibold text-blue-900 uppercase tracking-wider block mb-1">
                Boletim de Desempenho
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Resultado do Simulado
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {disciplinaAtiva === 'todas' ? 'Simulado Misto' : `Disciplina de ${disciplinaAtiva.toUpperCase()}`} · {universidadeAtiva === 'todas' ? 'Todas as Instituições' : universidadeAtiva}
              </p>
            </div>

            {/* Tabela de Indicadores Numéricos */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="p-4 rounded border border-slate-200 bg-slate-50">
                <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Acertos</span>
                <span className="text-2xl font-black text-blue-900 tabular-nums">{estatisticas.acertos}</span>
              </div>
              <div className="p-4 rounded border border-slate-200 bg-slate-50">
                <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Total de Questões</span>
                <span className="text-2xl font-black text-slate-800 tabular-nums">{estatisticas.total}</span>
              </div>
              <div className="p-4 rounded border border-slate-200 bg-slate-50">
                <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Aproveitamento</span>
                <span className="text-2xl font-black text-blue-900 tabular-nums">{estatisticas.porcentagem}%</span>
              </div>
              <div className="p-4 rounded border border-slate-200 bg-slate-50">
                <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Tempo de Prova</span>
                <span className="text-2xl font-black text-slate-800 tabular-nums">{formatarTempo(tempoSegundos)}</span>
              </div>
            </div>

            <div className="p-4 rounded border border-slate-200 bg-slate-50 mb-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <strong>Diagnóstico Técnico:</strong>{' '}
              {estatisticas.porcentagem >= 75
                ? 'Aproveitamento compatível com a nota de corte dos cursos mais concorridos da UEM e UP. Mantenha a rotina de revisão contínua.'
                : estatisticas.porcentagem >= 50
                ? 'Desempenho intermediário. Revise os itens com erro para consolidar conceitos essenciais e elevar a margem de segurança.'
                : 'Aproveitamento abaixo do limiar de admissão. Recomendamos o estudo focado nos fundamentos teóricos das disciplinas prioritárias.'}
            </div>

            {/* Ações */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={reiniciarSimulado}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs px-5 py-3 rounded transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar este simulado</span>
              </button>
              <button
                onClick={() => {
                  setSimuladoFinalizado(false);
                  setIndiceAtual(0);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs px-5 py-3 rounded transition-colors cursor-pointer"
              >
                <span>Revisar gabarito item a item</span>
              </button>
            </div>
          </div>
        ) : (
          /* FOLHA DA QUESTÃO ATIVA */
          <div className="bg-white rounded-lg border border-slate-200 p-6 sm:p-8 shadow-xs">
            
            {/* Cabeçalho da Folha de Prova */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-200 text-xs">
              <div className="flex items-center gap-2 flex-wrap text-slate-600 font-medium">
                <span className="font-bold text-blue-950 uppercase">
                  {questaoAtual?.universidade}
                </span>
                <span aria-hidden="true" className="text-slate-300">/</span>
                <span className="font-semibold text-slate-800">
                  {questaoAtual?.disciplinaNome}
                </span>
                <span aria-hidden="true" className="text-slate-300">/</span>
                <span className="text-slate-600 tabular-nums">
                  Exame {questaoAtual?.ano}
                </span>
                {questaoAtual?.numeroExame && (
                  <>
                    <span aria-hidden="true" className="text-slate-300">/</span>
                    <span className="text-slate-500 tabular-nums">Item nº {questaoAtual.numeroExame}</span>
                  </>
                )}
                <span aria-hidden="true" className="text-slate-300">/</span>
                <span className="text-slate-500">{questaoAtual?.topico}</span>
              </div>

              {/* Contador de Questões e Cronômetro */}
              <div className="flex items-center gap-3">
                {modo === 'exame' && (
                  <div className="flex items-center gap-1 font-mono text-slate-700 bg-slate-100 px-2.5 py-1 rounded text-xs tabular-nums font-bold">
                    <Clock className="w-3.5 h-3.5 text-blue-900" />
                    <span>{formatarTempo(tempoSegundos)}</span>
                  </div>
                )}
                <span className="font-mono text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded tabular-nums">
                  Item {indiceAtual + 1} de {questoesFiltradas.length}
                </span>
              </div>
            </div>

            {/* Texto de Apoio (se houver) */}
            {questaoAtual?.textoApoio && (
              <div className="mb-5 p-4 bg-slate-50 border-l-2 border-blue-900 text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                {questaoAtual.textoApoio}
              </div>
            )}

            {/* Enunciado do Item */}
            <div className="text-base sm:text-lg font-bold text-slate-900 mb-6 leading-relaxed">
              {questaoAtual?.enunciado}
            </div>

            {/* Alternativas A, B, C, D, E */}
            <div className="space-y-2.5 mb-6">
              {questaoAtual?.opcoes.map((opcao) => {
                const foiSelecionada = respostaDada === opcao.letra;
                const ehCorreta = opcao.letra === questaoAtual.respostaCorreta;
                
                let estiloBorda = 'border-slate-200 hover:border-slate-400 bg-white';
                let estiloLetra = 'bg-slate-100 text-slate-700 border-slate-300';

                if (modo === 'treino' && jaRespondeuAtual) {
                  if (ehCorreta) {
                    estiloBorda = 'border-blue-900 bg-blue-50/60 font-semibold';
                    estiloLetra = 'bg-blue-900 text-white border-blue-900';
                  } else if (foiSelecionada && !ehCorreta) {
                    estiloBorda = 'border-rose-400 bg-rose-50/50';
                    estiloLetra = 'bg-rose-700 text-white border-rose-700';
                  }
                } else if (foiSelecionada) {
                  estiloBorda = 'border-blue-900 bg-blue-50/40 font-semibold';
                  estiloLetra = 'bg-blue-900 text-white border-blue-900';
                }

                return (
                  <button
                    key={opcao.id}
                    onClick={() => handleSelecionarOpcao(opcao.letra)}
                    className={`w-full text-left p-3.5 rounded border transition-colors flex items-start gap-3 cursor-pointer ${estiloBorda}`}
                  >
                    <span
                      className={`w-6 h-6 rounded font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border ${estiloLetra}`}
                    >
                      {opcao.letra}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-800 leading-snug flex-1 pt-0.5">
                      {opcao.texto}
                    </span>
                    {modo === 'treino' && jaRespondeuAtual && ehCorreta && (
                      <CheckCircle2 className="w-5 h-5 text-blue-900 shrink-0 mt-0.5" />
                    )}
                    {modo === 'treino' && jaRespondeuAtual && foiSelecionada && !ehCorreta && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Resolução Comentada no Modo Treino */}
            {modo === 'treino' && jaRespondeuAtual && questaoAtual && (
              <div
                className={`p-4 rounded mb-6 border text-xs sm:text-sm leading-relaxed ${
                  respostaDada === questaoAtual.respostaCorreta
                    ? 'bg-blue-50 border-blue-200 text-blue-950'
                    : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              >
                <div className="font-bold mb-1.5 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-blue-900" />
                  <span>
                    Gabarito Oficial Comentado (Alternativa {questaoAtual.respostaCorreta})
                  </span>
                </div>
                <p className="text-slate-700">{questaoAtual.explicacao}</p>
              </div>
            )}

            {/* Barra de Navegação Inferior */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                onClick={() => setIndiceAtual((prev) => Math.max(0, prev - 1))}
                disabled={indiceAtual === 0}
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed px-3 py-2 rounded cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Item Anterior</span>
              </button>

              <div className="flex items-center gap-2">
                {indiceAtual === questoesFiltradas.length - 1 ? (
                  <button
                    onClick={handleFinalizarSimulado}
                    className="inline-flex items-center gap-1.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded transition-colors cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Finalizar Prova</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIndiceAtual((prev) => Math.min(questoesFiltradas.length - 1, prev + 1))}
                    className="inline-flex items-center gap-1 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded transition-colors cursor-pointer"
                  >
                    <span>Próximo Item</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Indicador de Desempenho Local */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>Processamento no cliente · Sem consumo de megabytes</span>
              <span>Caderno oficial homologado</span>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
