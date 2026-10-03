export interface UniversidadeInfo {
  id: string;
  codigo: string;
  nome: string;
  sigla: string;
  cidade: string;
  provasComuns: string[];
  detalhes: string;
  dicaExame: string;
}

export const UNIVERSIDADES: UniversidadeInfo[] = [
  {
    id: 'uem',
    codigo: 'UEM',
    nome: 'Universidade Eduardo Mondlane',
    sigla: 'UEM',
    cidade: 'Maputo',
    provasComuns: ['Matemática', 'Português', 'Física', 'Química', 'Biologia', 'Inglês', 'História', 'Geografia'],
    detalhes: 'A universidade pública mais antiga e prestigiada de Moçambique, fundada em 1962.',
    dicaExame: 'Exige pontualidade rigorosa e documento de identificação original (BI/Passaporte). Provas com 5 alternativas por questão.',
  },
  {
    id: 'up',
    codigo: 'UP',
    nome: 'Universidade Pedagógica de Maputo',
    sigla: 'UP',
    cidade: 'Maputo e Delegações',
    provasComuns: ['Português', 'Matemática', 'Física', 'Química', 'Biologia', 'Inglês'],
    detalhes: 'Referência nacional em formação de professores, ciências sociais, exatas e humanidades.',
    dicaExame: 'Foco em domínio pedagógico, interpretação textual aprofundada e raciocínio lógico.',
  },
  {
    id: 'unizambeze',
    codigo: 'UniZambeze',
    nome: 'Universidade Púnguè / UniZambeze',
    sigla: 'UniZambeze',
    cidade: 'Beira / Chimoio / Tete',
    provasComuns: ['Matemática', 'Física', 'Química', 'Biologia', 'Português'],
    detalhes: 'Polo universitário chave da zona centro do país, forte em engenharias, agronomia e saúde.',
    dicaExame: 'Provas práticas e contextualizadas aos recursos económicos e industriais do centro do país.',
  },
  {
    id: 'unilurio',
    codigo: 'UniLurio',
    nome: 'Universidade Lúrio',
    sigla: 'UniLúrio',
    cidade: 'Nampula / Pemba / Niassa',
    provasComuns: ['Biologia', 'Química', 'Matemática', 'Física'],
    detalhes: 'Principal universidade pública do norte de Moçambique com foco em Ciências de Saúde, Engenharias e Ciências Naturais.',
    dicaExame: 'Forte concorrência nos cursos de Medicina Geral, Farmácia e Engenharia Informática.',
  },
];

export interface DicaExameItem {
  id: string;
  titulo: string;
  categoria: 'preparacao' | 'dia_exame' | 'gestao_tempo' | 'estrategia';
  conteudo: string;
  destaque: string;
}

export const DICAS_PREPARACAO: DicaExameItem[] = [
  {
    id: '1',
    titulo: 'Regra dos 2 Minutos por Questão',
    categoria: 'gestao_tempo',
    conteudo: 'A maioria dos exames da UEM e UP possui cerca de 40 a 60 questões para 120 minutos. Não passe mais de 2 minutos numa questão difícil: marque para rever e passe logo para a próxima.',
    destaque: 'Garanta primeiro as questões fáceis que valem os mesmos pontos!',
  },
  {
    id: '2',
    titulo: 'Documentos e Material Obrigatório',
    categoria: 'dia_exame',
    conteudo: 'Tenha consigo o Bilhete de Identidade (BI) ou Passaporte válido, comprovativo de inscrição impresso, duas canetas esferográficas (azul ou preta transparente) e lápis HB com borracha para rascunho.',
    destaque: 'Não é permitido usar telemóveis nem calculadoras programáveis.',
  },
  {
    id: '3',
    titulo: 'Resolução das Provas dos Últimos 5 Anos',
    categoria: 'preparacao',
    conteudo: 'Os padrões dos exames de admissão moçambicanos repetem estruturas essenciais de raciocínio. Praticar com exames passados de 2019 a 2024 é a técnica mais eficaz comprovada.',
    destaque: 'O Horizonte Educativo disponibiliza questões alinhadas a esse formato.',
  },
  {
    id: '4',
    titulo: 'Preenchimento da Folha de Respostas Óptica',
    categoria: 'estrategia',
    conteudo: 'Reserve os últimos 15 a 20 minutos exclusivamente para pintar a folha de respostas óptica com calma. Uma bolha mal preenchida ou rasura pode invalidar a questão na máquina de leitura.',
    destaque: 'Preencha de forma completa e uniforme sem ultrapassar os limites da elipse.',
  },
];
