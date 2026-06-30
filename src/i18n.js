/**
 * i18n.js
 * ------------------------------------------------------------------
 * Textos da interface (não da história — essa vive nos ficheiros
 * story.pt.json / story.en.json). Os dias são guardados no estado como
 * chaves neutras (mon..fri) e traduzidos aqui, para que mudar de idioma
 * a meio do jogo não parta o seguimento.
 */

export const IDIOMAS = [
  { codigo: 'pt', etiqueta: 'PT' },
  { codigo: 'en', etiqueta: 'EN' },
]

export const UI = {
  pt: {
    titulo: 'Git Merge Conflict — O RPG do Desenvolvedor',
    prompt: 'dev@merge-conflict:~$',
    comandoCena: 'cat cena_atual.txt',
    atributos: {
      energia: 'Energia (Café)',
      codigo: 'Código Escrito',
      paciencia: 'Paciência do Gestor',
    },
    impactoNomes: { energia: 'café', codigo: 'código', paciencia: 'gestor' },
    inventarioTitulo: 'Inventário',
    inventarioVazio: '// vazio. As tuas escolhas vão preencher isto.',
    abaSufixo: '.jsx',
    exitVitoria: 'exit code 0',
    exitDerrota: 'exit code 1',
    resumo: { energia: 'Café', codigo: 'Código', paciencia: 'Gestor', itens: 'Itens' },
    botaoReiniciar: '> git checkout -b nova-tentativa',
    rotuloIdioma: 'Idioma',
    dias: {
      mon: 'Segunda',
      tue: 'Terça',
      wed: 'Quarta',
      thu: 'Quinta',
      fri: 'Sexta',
      '?': '???',
    },
  },
  en: {
    titulo: 'Git Merge Conflict — The Developer RPG',
    prompt: 'dev@merge-conflict:~$',
    comandoCena: 'cat current_scene.txt',
    atributos: {
      energia: 'Energy (Coffee)',
      codigo: 'Code Written',
      paciencia: "Manager's Patience",
    },
    impactoNomes: { energia: 'coffee', codigo: 'code', paciencia: 'manager' },
    inventarioTitulo: 'Inventory',
    inventarioVazio: '// empty. Your choices will fill this up.',
    abaSufixo: '.jsx',
    exitVitoria: 'exit code 0',
    exitDerrota: 'exit code 1',
    resumo: { energia: 'Coffee', codigo: 'Code', paciencia: 'Manager', itens: 'Items' },
    botaoReiniciar: '> git checkout -b new-attempt',
    rotuloIdioma: 'Language',
    dias: {
      mon: 'Monday',
      tue: 'Tuesday',
      wed: 'Wednesday',
      thu: 'Thursday',
      fri: 'Friday',
      '?': '???',
    },
  },
}
