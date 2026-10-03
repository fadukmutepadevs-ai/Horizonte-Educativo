import { DISCIPLINAS } from '../data/disciplinas';
import { QUESTOES_BANCO } from '../data/questoes';
import { Disciplina, DisciplinaSlug, HistoricoSimulado, Questao, UniversidadeCode } from '../types';

/**
 * SERVIÇO DE DADOS PREPARADO PARA LARAVEL + MYSQL
 * 
 * Se VITE_API_URL estiver configurado no .env, este serviço fará requisições HTTP
 * reais para o backend Laravel (ex: https://api.horizonteeducativo.co.mz/api).
 * Caso contrário, opera em modo local (Zero Network Cost / Baixo Consumo de Dados),
 * garantindo velocidade instantânea no dispositivo do estudante moçambicano.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const ApiService = {
  /**
   * Obter lista de disciplinas
   * Laravel Route: Route::get('/disciplinas', [DisciplinaController::class, 'index']);
   */
  async getDisciplinas(): Promise<Disciplina[]> {
    if (API_BASE_URL) {
      try {
        const res = await fetch(`${API_BASE_URL}/disciplinas`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('Falha na API Laravel, usando fallback local offline:', err);
      }
    }
    return DISCIPLINAS;
  },

  /**
   * Obter questões filtradas por disciplina e universidade
   * Laravel Route: Route::get('/questoes', [QuestaoController::class, 'index']);
   */
  async getQuestoes(params?: {
    disciplina?: DisciplinaSlug | 'todas';
    universidade?: UniversidadeCode | 'todas';
    limite?: number;
  }): Promise<Questao[]> {
    if (API_BASE_URL) {
      try {
        const query = new URLSearchParams();
        if (params?.disciplina && params.disciplina !== 'todas') query.append('disciplina', params.disciplina);
        if (params?.universidade && params.universidade !== 'todas') query.append('universidade', params.universidade);
        if (params?.limite) query.append('limite', params.limite.toString());

        const res = await fetch(`${API_BASE_URL}/questoes?${query.toString()}`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('Falha na API Laravel, usando banco local:', err);
      }
    }

    // Filtragem local
    let lista = [...QUESTOES_BANCO];
    if (params?.disciplina && params.disciplina !== 'todas') {
      lista = lista.filter((q) => q.disciplinaId === params.disciplina);
    }
    if (params?.universidade && params.universidade !== 'todas') {
      lista = lista.filter((q) => q.universidade === params.universidade);
    }

    if (params?.limite && params.limite > 0) {
      lista = lista.slice(0, params.limite);
    }

    return lista;
  },

  /**
   * Salvar resultado de simulado
   * Laravel Route: Route::post('/simulados/tentativas', [SimuladoController::class, 'storeAttempt']);
   */
  async salvarTentativa(dados: Omit<HistoricoSimulado, 'id' | 'data'>): Promise<HistoricoSimulado> {
    const novoRegistro: HistoricoSimulado = {
      ...dados,
      id: 'sim-' + Date.now(),
      data: new Date().toLocaleDateString('pt-MZ', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    // Salvar localmente em localStorage para consumo zero de dados
    try {
      const historicoAtual = this.getHistoricoLocal();
      const novoHistorico = [novoRegistro, ...historicoAtual].slice(0, 20); // guarda os últimos 20
      localStorage.setItem('he_historico_simulados', JSON.stringify(novoHistorico));
    } catch {
      // Ignora erro de cota de armazenamento
    }

    // Se conectado à API Laravel, sincroniza em background
    if (API_BASE_URL) {
      try {
        fetch(`${API_BASE_URL}/simulados/tentativas`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(novoRegistro),
        }).catch(() => {});
      } catch {
        // Silencioso
      }
    }

    return novoRegistro;
  },

  /**
   * Recupera histórico de simulados salvos no dispositivo
   */
  getHistoricoLocal(): HistoricoSimulado[] {
    try {
      const salvos = localStorage.getItem('he_historico_simulados');
      if (salvos) {
        return JSON.parse(salvos);
      }
    } catch {
      // Ignora
    }
    return [];
  },

  /**
   * Limpar histórico local
   */
  limparHistoricoLocal(): void {
    try {
      localStorage.removeItem('he_historico_simulados');
    } catch {
      // Ignora
    }
  },
};

/**
 * Esquema de banco de dados MySQL para Laravel migrations
 * Pode ser exibido no modal do painel administrativo
 */
export const MYSQL_LARAVEL_BLUEPRINT = `
-- TABELAS MYSQL PARA O BACKEND LARAVEL DO HORIZONTE EDUCATIVO

CREATE TABLE disciplinas (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(50) UNIQUE NOT NULL,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT,
  icone VARCHAR(50) DEFAULT 'BookOpen',
  peso_tipico VARCHAR(255),
  ativo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
);

CREATE TABLE questoes (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  disciplina_id BIGINT UNSIGNED NOT NULL,
  universidade ENUM('UEM', 'UP', 'UniZambeze', 'UniLurio', 'ISRI', 'Geral') NOT NULL,
  ano INT NOT NULL,
  numero_exame INT NULL,
  texto_apoio TEXT NULL,
  enunciado TEXT NOT NULL,
  resposta_correta CHAR(1) NOT NULL,
  explicacao TEXT,
  dificuldade ENUM('Facil', 'Medio', 'Dificil') DEFAULT 'Medio',
  topico VARCHAR(150),
  ativo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id) ON DELETE CASCADE
);

CREATE TABLE opcoes_resposta (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  questao_id BIGINT UNSIGNED NOT NULL,
  letra CHAR(1) NOT NULL,
  texto TEXT NOT NULL,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  FOREIGN KEY (questao_id) REFERENCES questoes(id) ON DELETE CASCADE
);

CREATE TABLE simulado_tentativas (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  disciplina_slug VARCHAR(50),
  universidade_codigo VARCHAR(50),
  total_questoes INT NOT NULL,
  acertos INT NOT NULL,
  tempo_segundos INT NOT NULL,
  ip_address VARCHAR(45) NULL,
  user_agent VARCHAR(255) NULL,
  created_at TIMESTAMP NULL
);
`;
