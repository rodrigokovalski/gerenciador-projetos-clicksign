export type SearchHighlightSegment = {
  text: string;
  highlight: boolean;
};

export function splitTextBySearchHighlight(
  text: string,
  searchQuery: string,
): SearchHighlightSegment[] {
  const busca = searchQuery.trim();
  if (!busca) {
    return [{ text, highlight: false }];
  }

  const textoMinusculo = text.toLowerCase();
  const buscaMinuscula = busca.toLowerCase();
  const trechos: SearchHighlightSegment[] = [];
  let index = 0;

  while (index < text.length) {
    const inicioDestaque = textoMinusculo.indexOf(buscaMinuscula, index);
    if (inicioDestaque === -1) {
      trechos.push({
        text: text.slice(index),
        highlight: false,
      });
      return trechos;
    }

    if (inicioDestaque > index) {
      trechos.push({
        text: text.slice(index, inicioDestaque),
        highlight: false,
      });
    }

    const fimDestaque = inicioDestaque + busca.length;
    trechos.push({
      text: text.slice(inicioDestaque, fimDestaque),
      highlight: true,
    });
    index = fimDestaque;
  }

  return trechos;
}
