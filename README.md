# Git Merge Conflict — O RPG do Desenvolvedor

Um *text-based RPG* satírico onde assumes o papel de um **programador júnior** no primeiro dia de trabalho. O objetivo: **sobreviver à semana de lançamento** sem desmaiar nem ser despedido — e escrever código suficiente até sexta-feira.

Construído com **React + Vite + Tailwind CSS**, num visual *dark mode* estilo IDE/terminal. **Disponível em português e inglês** (botão PT / EN no topo).

---

## Como jogar

Geres três atributos a cada escolha:

| Atributo | Começa em | Game Over |
| --- | --- | --- |
| ☕ **Energia (Café)** | 100% | desmaias a 0% |
| ⌨ **Código Escrito** | 0% | precisas de 100% na sexta para vencer |
| ⏳ **Paciência do Gestor** | 50% | és despedido a 0% |

Cada decisão muda os atributos e revela novos itens no inventário. Há vários finais. Boa sorte — e não faças deploy à sexta.

---

## Arquitetura

O projeto separa a história, a lógica e a interface, e é bilingue (PT/EN):

```
src/
├── data/
│   ├── story.pt.json      # narrativa em português
│   └── story.en.json      # narrativa em inglês (mesmos ids e ligações)
├── i18n.js                # textos da interface + rótulos dos dias (PT/EN)
├── engine/gameEngine.js   # lógica pura de estado e condições de fim
├── components/            # UI em React + Tailwind
│   ├── StatusBar.jsx      # barras de atributos + dias da semana
│   ├── StoryText.jsx      # texto da história (efeito terminal)
│   ├── Choices.jsx        # botões de escolha
│   ├── Inventory.jsx      # barra lateral do inventário
│   └── GameOver.jsx       # ecrã de fim de jogo
├── App.jsx                # orquestra estado, idioma e UI
└── main.jsx               # ponto de entrada
```

O botão **PT / EN** no canto superior direito troca de idioma a qualquer momento — como
os dois ficheiros de história partilham os mesmos `id` de cena e as mesmas chaves de dia
(`mon`..`fri`), mudar de idioma a meio do jogo mantém o progresso.

Para adicionar conteúdo, editas os ficheiros em `src/data/` (um por idioma) — sem tocar no código.

### Estrutura de um nó da história

```jsonc
"id_do_no": {
  "id": "id_do_no",
  "dia": "Terça",
  "tipo": "cena",                 // "cena" | "avaliacao" | "fim"
  "texto": "Descrição da situação...",
  "opcoes": [
    {
      "texto": "Texto do botão",
      "proximoNo": "id_seguinte",
      "impacto": { "energia": -10, "codigo": 5, "paciencia": 0 },
      "item": "Café Expresso"       // opcional: adiciona ao inventário
    }
  ]
}
```

---

## Desenvolvimento local

Precisas de [Node.js](https://nodejs.org) 18+.

```bash
npm install      # instalar dependências
npm run dev      # servidor de desenvolvimento (http://localhost:5173)
npm run build    # build de produção para a pasta dist/
npm run preview  # pré-visualizar o build
```

---

## Deploy no Vercel

1. Cria um repositório no GitHub e faz push deste projeto:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Git Merge Conflict RPG"
   git branch -M main
   git remote add origin https://github.com/O-TEU-UTILIZADOR/git-merge-conflict-rpg.git
   git push -u origin main
   ```
2. Em [vercel.com](https://vercel.com), clica em **Add New → Project** e importa o repositório.
3. O Vercel deteta o Vite automaticamente. Mantém os valores por defeito:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Clica em **Deploy**. Em poucos segundos o jogo fica online.

---

## Licença

Projeto de portfólio — usa, adapta e diverte-te.
