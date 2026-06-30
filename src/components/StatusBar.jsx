import { ATRIBUTOS } from '../engine/gameEngine'

const CORES_BARRA = {
  cafe: 'bg-ide-cafe',
  codigo: 'bg-ide-codigo',
  gestor: 'bg-ide-gestor',
}

const CORES_TEXTO = {
  cafe: 'text-ide-cafe',
  codigo: 'text-ide-codigo',
  gestor: 'text-ide-gestor',
}

function BarraAtributo({ etiqueta, valor, cor, icone }) {
  // Abaixo de 25% pinta de vermelho para sinalizar perigo.
  const perigo = valor <= 25
  const corBarra = perigo ? 'bg-ide-danger' : CORES_BARRA[cor]
  const corTexto = perigo ? 'text-ide-danger' : CORES_TEXTO[cor]

  return (
    <div className="min-w-0">
      <div className="mb-1 flex items-center justify-between gap-2 text-xs">
        <span className="truncate text-ide-dim">
          <span aria-hidden="true" className="mr-1">
            {icone}
          </span>
          {etiqueta}
        </span>
        <span className={`font-bold tabular-nums ${corTexto}`}>{valor}%</span>
      </div>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-ide-line"
        role="progressbar"
        aria-label={etiqueta}
        aria-valuenow={valor}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${corBarra} ${
            perigo ? 'animate-blink' : ''
          }`}
          style={{ width: `${valor}%` }}
        />
      </div>
    </div>
  )
}

export default function StatusBar({ estado, t, dias }) {
  return (
    <header className="border-b border-ide-line bg-ide-panel">
      {/* Linha de "abas" do editor com os dias da semana */}
      <div className="flex items-stretch overflow-x-auto border-b border-ide-line text-xs">
        {dias.map((diaChave) => {
          const ativo = diaChave === estado.dia
          const rotulo = t.dias[diaChave] ?? diaChave
          return (
            <div
              key={diaChave}
              className={`flex items-center gap-2 whitespace-nowrap border-r border-ide-line px-4 py-2 ${
                ativo ? 'bg-ide-bg text-ide-text' : 'text-ide-dim hover:text-ide-text/70'
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  ativo ? 'bg-ide-codigo' : 'bg-ide-gutter'
                }`}
              />
              {rotulo.toLowerCase()}
              {t.abaSufixo}
            </div>
          )
        })}
      </div>

      {/* As três barras de atributos */}
      <div className="grid grid-cols-1 gap-4 px-4 py-3 sm:grid-cols-3 sm:px-6">
        {ATRIBUTOS.map((attr) => (
          <BarraAtributo
            key={attr.chave}
            etiqueta={t.atributos[attr.chave]}
            valor={estado[attr.chave]}
            cor={attr.cor}
            icone={attr.icone}
          />
        ))}
      </div>
    </header>
  )
}
