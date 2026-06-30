import { useEffect, useRef, useState } from 'react'

/**
 * Mostra o texto da cena com um efeito de "máquina de escrever" de terminal.
 * Respeita prefers-reduced-motion: nesse caso mostra o texto de imediato.
 * Clicar em qualquer ponto salta a animação para o fim (quality of life).
 */
export default function StoryText({ texto, prompt, comando }) {
  const reduzirMovimento =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  const [exibido, setExibido] = useState(reduzirMovimento ? texto : '')
  const [aEscrever, setAEscrever] = useState(!reduzirMovimento)
  const containerRef = useRef(null)

  useEffect(() => {
    if (reduzirMovimento) {
      setExibido(texto)
      setAEscrever(false)
      return
    }

    setExibido('')
    setAEscrever(true)
    let i = 0
    const velocidade = 14 // ms por caractere
    const intervalo = setInterval(() => {
      i += 1
      setExibido(texto.slice(0, i))
      if (i >= texto.length) {
        clearInterval(intervalo)
        setAEscrever(false)
      }
    }, velocidade)

    return () => clearInterval(intervalo)
  }, [texto, reduzirMovimento])

  // Auto-scroll para acompanhar o texto a aparecer.
  useEffect(() => {
    const el = containerRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [exibido])

  function saltarAnimacao() {
    if (aEscrever) {
      setExibido(texto)
      setAEscrever(false)
    }
  }

  return (
    <div
      ref={containerRef}
      onClick={saltarAnimacao}
      className="flex-1 overflow-y-auto px-4 py-5 sm:px-6"
    >
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 select-none text-xs text-ide-dim">
          <span className="text-ide-codigo">{prompt}</span> {comando}
        </p>
        <pre className="whitespace-pre-wrap font-mono text-[15px] leading-relaxed text-ide-text sm:text-base">
          {exibido}
          {aEscrever && (
            <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-ide-text align-middle" />
          )}
        </pre>
      </div>
    </div>
  )
}
