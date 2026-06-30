/**
 * Ecrã de fim de jogo. Muda de cor e mensagem consoante o resultado.
 */
export default function GameOver({ no, estado, onReiniciar, t }) {
  const venceu = no.resultado === 'vitoria'

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-10">
      <div className="mx-auto w-full max-w-xl animate-fade-in text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-ide-dim">
          {venceu ? t.exitVitoria : t.exitDerrota}
        </p>

        <h2
          className={`mb-5 text-2xl font-bold sm:text-3xl ${
            venceu ? 'text-ide-codigo' : 'text-ide-danger'
          }`}
        >
          {venceu ? '✓ ' : '✗ '}
          {no.titulo}
        </h2>

        <pre className="mb-7 whitespace-pre-wrap text-left font-mono text-[15px] leading-relaxed text-ide-text">
          {no.texto}
        </pre>

        {/* Resumo final dos atributos */}
        <div className="mb-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          <span className="text-ide-cafe">
            {t.resumo.energia}: {estado.energia}%
          </span>
          <span className="text-ide-codigo">
            {t.resumo.codigo}: {estado.codigo}%
          </span>
          <span className="text-ide-gestor">
            {t.resumo.paciencia}: {estado.paciencia}%
          </span>
          <span className="text-ide-dim">
            {t.resumo.itens}: {estado.inventario.length}
          </span>
        </div>

        <button
          type="button"
          onClick={onReiniciar}
          className="rounded-md border border-ide-codigo/60 bg-ide-codigo/10 px-6 py-3 text-sm font-bold text-ide-codigo transition-colors hover:bg-ide-codigo/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-ide-codigo"
        >
          {t.botaoReiniciar}
        </button>
      </div>
    </div>
  )
}
