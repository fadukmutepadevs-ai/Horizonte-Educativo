import React, { useState } from 'react';
import { X, Database, Copy, Check, Server, Terminal } from 'lucide-react';
import { MYSQL_LARAVEL_BLUEPRINT } from '../services/api';

interface BackendModalProps {
  aberto: boolean;
  onFechar: () => void;
}

export const BackendModal: React.FC<BackendModalProps> = ({ aberto, onFechar }) => {
  const [copiado, setCopiado] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState<'mysql' | 'laravel' | 'env'>('mysql');

  if (!aberto) return null;

  const handleCopiar = (texto: string) => {
    navigator.clipboard.writeText(texto);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const laravelControllerCode = `<?php

namespace App\\Http\\Controllers\\Api;

use App\\Http\\Controllers\\Controller;
use App\\Models\\Disciplina;
use App\\Models\\Questao;
use App\\Models\\SimuladoTentativa;
use Illuminate\\Http\\Request;
use Illuminate\\Http\\JsonResponse;

class SimuladoController extends Controller
{
    /**
     * GET /api/disciplinas
     */
    public function getDisciplinas(): JsonResponse
    {
        $disciplinas = Disciplina::withCount('questoes')->where('ativo', true)->get();
        return response()->json($disciplinas);
    }

    /**
     * GET /api/questoes?disciplina=matematica&universidade=UEM&limite=20
     */
    public function getQuestoes(Request $request): JsonResponse
    {
        $query = Questao::with('opcoes')->where('ativo', true);

        if ($request->has('disciplina') && $request->disciplina !== 'todas') {
            $query->whereHas('disciplina', fn($q) => $q->where('slug', $request->disciplina));
        }

        if ($request->has('universidade') && $request->universidade !== 'todas') {
            $query->where('universidade', $request->universidade);
        }

        $limite = $request->input('limite', 30);
        $questoes = $query->inRandomOrder()->take($limite)->get();

        return response()->json($questoes);
    }

    /**
     * POST /api/simulados/tentativas
     */
    public function storeAttempt(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'disciplina' => 'required|string',
            'universidade' => 'required|string',
            'acertos' => 'required|integer',
            'total' => 'required|integer',
            'tempoGastoSegundos' => 'required|integer',
        ]);

        $tentativa = SimuladoTentativa::create([
            'disciplina_slug' => $validated['disciplina'],
            'universidade_codigo' => $validated['universidade'],
            'total_questoes' => $validated['total'],
            'acertos' => $validated['acertos'],
            'tempo_segundos' => $validated['tempoGastoSegundos'],
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'status' => 'sucesso',
            'id' => $tentativa->id,
            'mensagem' => 'Tentativa registrada com sucesso no MySQL',
        ], 201);
    }
}
`;

  const envInstructions = `# CONEXÃO DO FRONTEND COM O BACKEND LARAVEL
# Basta configurar a URL da sua API Laravel no arquivo .env do frontend:

VITE_API_URL="https://api.horizonteeducativo.co.mz/api"

# Quando esta variável está definida, o frontend automaticamente faz:
# - GET /api/disciplinas
# - GET /api/questoes?disciplina={slug}&universidade={code}
# - POST /api/simulados/tentativas
#
# Sem VITE_API_URL, o frontend opera em modo local (Zero Network Cost / 0 KB).
# Nenhuma alteração no código do frontend é necessária!`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-lg border border-slate-300 max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Cabeçalho do Modal */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-blue-900 text-white flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 leading-tight">
                Estrutura de Integração Laravel + MySQL
              </h3>
              <p className="text-xs text-slate-500">
                Arquitetura desacoplada pronta para painéis administrativos (Filament / Nova)
              </p>
            </div>
          </div>
          <button
            onClick={onFechar}
            aria-label="Fechar"
            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Abas */}
        <div className="flex border-b border-slate-200 bg-white px-6 pt-2 gap-2 text-xs font-semibold">
          <button
            onClick={() => setAbaAtiva('mysql')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              abaAtiva === 'mysql'
                ? 'border-blue-900 text-blue-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Schema MySQL (DDL)</span>
          </button>

          <button
            onClick={() => setAbaAtiva('laravel')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              abaAtiva === 'laravel'
                ? 'border-blue-900 text-blue-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>Laravel Controller</span>
          </button>

          <button
            onClick={() => setAbaAtiva('env')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              abaAtiva === 'env'
                ? 'border-blue-900 text-blue-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Configuração .env</span>
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-900 text-slate-200 font-mono text-xs">
          <div className="flex items-center justify-between mb-3 text-slate-400">
            <span className="text-[11px]">
              {abaAtiva === 'mysql' && 'migration_schema_horizonte.sql'}
              {abaAtiva === 'laravel' && 'app/Http/Controllers/Api/SimuladoController.php'}
              {abaAtiva === 'env' && '.env (Frontend configuration)'}
            </span>
            <button
              onClick={() => {
                if (abaAtiva === 'mysql') handleCopiar(MYSQL_LARAVEL_BLUEPRINT);
                else if (abaAtiva === 'laravel') handleCopiar(laravelControllerCode);
                else handleCopiar(envInstructions);
              }}
              className="inline-flex items-center gap-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded border border-slate-700 transition-colors cursor-pointer"
            >
              {copiado ? <Check className="w-3.5 h-3.5 text-blue-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiado ? 'Copiado!' : 'Copiar Código'}</span>
            </button>
          </div>

          <pre className="overflow-x-auto whitespace-pre leading-relaxed">
            {abaAtiva === 'mysql' && MYSQL_LARAVEL_BLUEPRINT.trim()}
            {abaAtiva === 'laravel' && laravelControllerCode.trim()}
            {abaAtiva === 'env' && envInstructions.trim()}
          </pre>
        </div>

        {/* Rodapé do Modal */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
          <span className="text-slate-600">
            Compatível com Laravel 10 / 11 e MySQL 8+.
          </span>
          <button
            onClick={onFechar}
            className="px-4 py-1.5 rounded bg-blue-900 hover:bg-blue-800 text-white font-semibold cursor-pointer"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
