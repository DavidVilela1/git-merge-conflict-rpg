/**
 * Barra lateral que lista os itens ganhos. Estilizada como um painel
 * "Explorer" de um editor de código.
 */
export default function Inventory({ itens, t }) {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-l border-ide-line bg-ide-panel lg:flex">
      <div className="border-b border-ide-line px-4 py-3 text-xs uppercase tracking-wider text-ide-dim">
        {t.inventarioTitulo}
        <span className="ml-2 rounded bg-ide-line px-1.5 py-0.5 text-ide-text">
          {itens.length}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-2">
        {itens.length === 0 ? (
          <p className="px-2 py-4 text-xs italic text-ide-dim">{t.inventarioVazio}</p>
        ) : (
          <ul className="flex flex-col gap-1">
            {itens.map((item, i) => (
              <li
                key={i}
                className="flex animate-fade-in items-center gap-2 rounded px-2 py-1.5 text-sm text-ide-text hover:bg-ide-gutter"
              >
                <span aria-hidden="true" className="text-ide-keyword">
                  ▸
                </span>
                <span className="min-w-0 truncate">{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-t border-ide-line px-4 py-2 text-[10px] text-ide-dim">
        git-merge-conflict · v1.0
      </div>
    </aside>
  )
}
