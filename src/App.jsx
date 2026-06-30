import { useState } from 'react'
import historiaPt from './data/story.pt.json'
import historiaEn from './data/story.en.json'
import { UI, IDIOMAS } from './i18n'
import {
  criarEstadoInicial,
  escolherOpcao,
  obterNo,
  reiniciar,
} from './engine/gameEngine'

import StatusBar from './components/StatusBar'
import StoryText from './components/StoryText'
import Choices from './components/Choices'
import Inventory from './components/Inventory'
import GameOver from './components/GameOver'

const HISTORIAS = { pt: historiaPt, en: historiaEn }

export default function App() {
  const [idioma, setIdioma] = useState('pt')
  const historia = HISTORIAS[idioma]
  const t = UI[idioma]

  const [estado, setEstado] = useState(() => criarEstadoInicial(historia))

  // Os ids dos nós e as chaves dos dias são partilhados entre idiomas,
  // por isso mudar de idioma a meio do jogo mantém o progresso.
  const no = obterNo(historia, estado.noAtual)

  function handleEscolher(indice) {
    setEstado((atual) => escolherOpcao(historia, atual, indice))
  }

  function handleReiniciar() {
    setEstado(reiniciar(historia))
  }

  return (
    <div className="flex h-full flex-col bg-ide-bg text-ide-text">
      {/* Barra de título da "janela" do editor */}
      <div className="flex items-center gap-2 border-b border-ide-line bg-ide-panel px-4 py-2">
        <span className="h-3 w-3 rounded-full bg-ide-danger/80" />
        <span className="h-3 w-3 rounded-full bg-ide-cafe/80" />
        <span className="h-3 w-3 rounded-full bg-ide-codigo/80" />
        <span className="ml-3 hidden truncate text-xs text-ide-dim sm:inline">
          {t.titulo}
        </span>

        {/* Seletor de idioma */}
        <div
          className="ml-auto flex items-center gap-1 rounded-md border border-ide-line bg-ide-bg p-0.5"
          role="group"
          aria-label={t.rotuloIdioma}
        >
          {IDIOMAS.map(({ codigo, etiqueta }) => {
            const ativo = codigo === idioma
            return (
              <button
                key={codigo}
                type="button"
                onClick={() => setIdioma(codigo)}
                aria-pressed={ativo}
                className={`rounded px-2 py-1 text-xs font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ide-codigo ${
                  ativo
                    ? 'bg-ide-codigo/15 text-ide-codigo'
                    : 'text-ide-dim hover:text-ide-text'
                }`}
              >
                {etiqueta}
              </button>
            )
          })}
        </div>
      </div>

      <StatusBar estado={estado} t={t} dias={historia.config.dias} />

      <div className="flex min-h-0 flex-1">
        <main className="flex min-h-0 min-w-0 flex-1 flex-col">
          {estado.terminado ? (
            <GameOver no={no} estado={estado} onReiniciar={handleReiniciar} t={t} />
          ) : (
            <>
              <StoryText
                key={`${idioma}-${estado.noAtual}`}
                texto={no.texto}
                prompt={t.prompt}
                comando={t.comandoCena}
              />
              <Choices
                opcoes={no.opcoes ?? []}
                onEscolher={handleEscolher}
                desativado={false}
                nomesImpacto={t.impactoNomes}
              />
            </>
          )}
        </main>

        <Inventory itens={estado.inventario} t={t} />
      </div>
    </div>
  )
}
