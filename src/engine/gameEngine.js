/**
 * gameEngine.js
 * ------------------------------------------------------------------
 * Lógica pura do jogo, totalmente separada da interface (React).
 * Não conhece o DOM nem o React — só recebe estado + história e
 * devolve estado novo. Isto torna o motor fácil de testar e reutilizar.
 *
 * Atributos do jogador:
 *   energia   (0-100) — o "Café". A 0 → desmaio (Game Over).
 *   codigo    (0-100) — "Código Escrito". Precisa de 100 na Sexta para vencer.
 *   paciencia (0-100) — "Paciência do Gestor". A 0 → despedido (Game Over).
 *   inventario (array de strings)
 *   dia       (string: Segunda..Sexta)
 */

const MIN = 0
const MAX = 100

/** Limita um valor ao intervalo [0, 100]. */
function limitar(valor) {
  return Math.max(MIN, Math.min(MAX, valor))
}

/**
 * Cria o estado inicial do jogo a partir da configuração da história.
 * @param {object} historia - O objeto importado de story.json.
 * @returns {object} estado inicial do jogador + cena atual.
 */
export function criarEstadoInicial(historia) {
  const base = historia.config.estadoInicial
  return {
    energia: base.energia,
    codigo: base.codigo,
    paciencia: base.paciencia,
    dia: base.dia,
    inventario: [...base.inventario],
    noAtual: historia.config.noInicial,
    terminado: false,
    resultado: null, // "vitoria" | "derrota" | null
  }
}

/**
 * Devolve o objeto da cena (nó) correspondente a um id.
 * @returns {object|null}
 */
export function obterNo(historia, idNo) {
  return historia.nos[idNo] ?? null
}

/**
 * Aplica o impacto de uma opção aos atributos, limitando ao intervalo [0,100],
 * e adiciona um eventual item ao inventário.
 * @returns {object} novos atributos { energia, codigo, paciencia, inventario }
 */
function aplicarImpacto(estado, opcao) {
  const impacto = opcao.impacto ?? {}
  const inventario = [...estado.inventario]

  if (opcao.item && !inventario.includes(opcao.item)) {
    inventario.push(opcao.item)
  }

  return {
    energia: limitar(estado.energia + (impacto.energia ?? 0)),
    codigo: limitar(estado.codigo + (impacto.codigo ?? 0)),
    paciencia: limitar(estado.paciencia + (impacto.paciencia ?? 0)),
    inventario,
  }
}

/**
 * Verifica as condições de fim de jogo POR ESGOTAMENTO de atributos.
 * Estas têm prioridade sobre qualquer transição de cena normal.
 * @returns {string|null} id do nó de fim, ou null se o jogo continua.
 */
function verificarGameOver(atributos) {
  if (atributos.energia <= MIN) return 'fim_desmaio'
  if (atributos.paciencia <= MIN) return 'fim_despedido'
  return null
}

/**
 * Resolve um nó do tipo "avaliacao" (a verificação final de Sexta-feira):
 * decide se o jogador atingiu a meta de código.
 * @returns {string} id do nó de fim apropriado.
 */
function resolverAvaliacao(historia, no, atributos) {
  const meta = historia.config.metaCodigo
  return atributos.codigo >= meta
    ? no.avaliacao.seCodigoCompleto
    : no.avaliacao.seCodigoIncompleto
}

/**
 * Função central: o jogador escolheu uma opção numa cena.
 * Calcula o novo estado completo, incluindo:
 *   1. aplicar o impacto aos atributos;
 *   2. verificar Game Over por energia/paciência;
 *   3. avançar para o próximo nó (resolvendo avaliações);
 *   4. atualizar o dia da semana e marcar fim de jogo quando for o caso.
 *
 * @param {object} historia - story.json
 * @param {object} estado - estado atual do jogo
 * @param {number} indiceOpcao - índice da opção escolhida na cena atual
 * @returns {object} novo estado do jogo
 */
export function escolherOpcao(historia, estado, indiceOpcao) {
  const noAtual = obterNo(historia, estado.noAtual)
  if (!noAtual || estado.terminado) return estado

  const opcao = noAtual.opcoes?.[indiceOpcao]
  if (!opcao) return estado

  // 1. Aplicar impacto.
  const atributos = aplicarImpacto(estado, opcao)

  // 2. Game Over por esgotamento tem prioridade.
  const idGameOver = verificarGameOver(atributos)
  let proximoNoId = idGameOver ?? opcao.proximoNo

  // 3. Se o próximo nó for uma avaliação, resolvê-la para um fim concreto.
  let proximoNo = obterNo(historia, proximoNoId)
  if (proximoNo && proximoNo.tipo === 'avaliacao') {
    proximoNoId = resolverAvaliacao(historia, proximoNo, atributos)
    proximoNo = obterNo(historia, proximoNoId)
  }

  // 4. Determinar fim de jogo e dia.
  const terminado = proximoNo?.tipo === 'fim'
  const resultado = terminado ? proximoNo.resultado : null
  const dia = proximoNo?.dia && proximoNo.dia !== '?' ? proximoNo.dia : estado.dia

  return {
    ...atributos,
    dia,
    noAtual: proximoNoId,
    terminado,
    resultado,
  }
}

/**
 * Reinicia o jogo para o estado inicial.
 */
export function reiniciar(historia) {
  return criarEstadoInicial(historia)
}

/**
 * Definição visual dos atributos (independente de idioma). As etiquetas
 * de texto vêm do módulo i18n; aqui ficam só chave, cor e ícone.
 */
export const ATRIBUTOS = [
  { chave: 'energia', cor: 'cafe', icone: '☕' },
  { chave: 'codigo', cor: 'codigo', icone: '⌨' },
  { chave: 'paciencia', cor: 'gestor', icone: '⏳' },
]
