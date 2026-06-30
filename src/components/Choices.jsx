/**
 * Lista de botões de escolha. Cada opção mostra o seu texto e, em hover,
 * uma pré-visualização discreta do impacto nos atributos.
 */

function PreviewImpacto({ impacto, nomes }) {
  if (!impacto) return null
  const entradas = Object.entries(impacto).filter(([, v]) => v !== 0)
  if (entradas.length === 0) return null

  return (
    <span className="hidden shrink-0 items-center gap-2 text-xs sm:flex">
      {entradas.map(([chave, valor]) => (
        <span
          key={chave}
          className={`tabular-nums ${
            valor > 0 ? 'text-ide-codigo' : 'text-ide-danger'
          }`}
        >
          {valor > 0 ? '+' : ''}
          {valor} {nomes[chave]}
        </span>
      ))}
    </span>
  )
}

export default function Choices({ opcoes, onEscolher, desativado, nomesImpacto }) {
  return (
    <div className="border-t border-ide-line bg-ide-panel px-4 py-4 sm:px-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-2">
        {opcoes.map((opcao, indice) => (
          <button
            key={indice}
            type="button"
            disabled={desativado}
            onClick={() => onEscolher(indice)}
            className="group flex items-center justify-between gap-3 rounded-md border border-ide-line bg-ide-bg px-4 py-3 text-left text-sm text-ide-text transition-colors hover:border-ide-codigo/50 hover:bg-ide-gutter focus:outline-none focus-visible:ring-2 focus-visible:ring-ide-codigo disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span className="flex min-w-0 items-center gap-3">
              <span className="select-none font-bold text-ide-codigo transition-transform group-hover:translate-x-0.5">
                {'>'}
              </span>
              <span className="min-w-0">{opcao.texto}</span>
            </span>
            <PreviewImpacto impacto={opcao.impacto} nomes={nomesImpacto} />
          </button>
        ))}
      </div>
    </div>
  )
}
