export type DisciplinaSlug = 
  | 'matematica' 
  | 'portugues' 
  | 'fisica' 
  | 'quimica' 
  | 'biologia' 
  | 'ingles';

export type UniversidadeCode = 'UEM' | 'UP' | 'UniZambeze' | 'UniLurio' | 'ISRI' | 'Geral';

export interface Disciplina {
  id: string;
  slug: DisciplinaSlug;
  nome: string;
  descricao: string;
  icone: string;
  cor: {
    bg: string;
    border: string;
    text: string;
    badge: string;
  };
  totalQuestoes: number;
  topicosPrincipais: string[];
  anosDisponiveis: number[];
  pesoTipico: string;
}

export interface OpcaoResposta {
  id: string;
  letra: 'A' | 'B' | 'C' | 'D' | 'E';
  texto: string;
}

export interface Questao {
  id: string;
  disciplinaId: DisciplinaSlug;
  disciplinaNome: string;
  universidade: UniversidadeCode;
  ano: number;
  numeroExame?: number;
  enunciado: string;
  textoApoio?: string;
  opcoes: OpcaoResposta[];
  respostaCorreta: 'A' | 'B' | 'C' | 'D' | 'E';
  explicacao: string;
  dificuldade: 'Fácil' | 'Médio' | 'Difícil';
  topico: string;
}

export interface SimuladoConfig {
  disciplina?: DisciplinaSlug | 'todas';
  universidade?: UniversidadeCode | 'todas';
  modo: 'treino' | 'exame'; // treino = resposta imediata; exame = cronometrado e nota final
  quantidade: number;
}

export interface HistoricoSimulado {
  id: string;
  data: string;
  disciplina: string;
  universidade: string;
  acertos: number;
  total: number;
  porcentagem: number;
  tempoGastoSegundos: number;
}
