/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta inspirada num tema de editor real (estilo "Tokyo Night"),
        // não o verde-fosforescente genérico de terminal.
        ide: {
          bg: '#11141c', // fundo da janela do editor
          panel: '#161a24', // painéis (status, sidebar)
          line: '#1f2430', // linhas / divisórias
          gutter: '#2a3040', // gutter / hover
          text: '#c0caf5', // texto principal
          dim: '#565f89', // comentários / texto secundário
          cafe: '#e0af68', // âmbar — Energia (Café)
          codigo: '#9ece6a', // verde sintaxe — Código Escrito
          gestor: '#7aa2f7', // azul — Paciência do Gestor
          danger: '#f7768e', // vermelho/rosa — perigo
          string: '#9ece6a',
          keyword: '#bb9af7',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        'fade-in': 'fade-in 0.4s ease-out',
      },
    },
  },
  plugins: [],
}
