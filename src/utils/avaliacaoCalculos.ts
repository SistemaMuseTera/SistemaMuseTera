import { ESCALA_DEMUCA } from '@/data/escalaDemuca'

export function calcularPorcentagens(avaliacoes: Record<string, string>) {
  if (Object.keys(avaliacoes).length === 0) {
    return {
      habilidades: [
        { name: 'Adquirido', value: 0 },
        { name: 'Não adquirido', value: 100 }
      ],
      categorias: [
        { name: 'Comportamentos Restritivos', value: 0 },
        { name: 'Interação Social', value: 0 },
        { name: 'Exploração Rítmica', value: 0 },
        { name: 'Exploração Sonora', value: 0 },
        { name: 'Exploração Vocal', value: 0 },
        { name: 'Movimentação com a Música', value: 0 }
      ]
    }
  }

  // Calcula porcentagem total de habilidades adquiridas
  let totalRespostas = 0
  let totalPontos = 0

  ESCALA_DEMUCA.forEach(categoria => {
    categoria.parametros.forEach(parametro => {
      const paramNome = typeof parametro === 'string' ? parametro : parametro.nome
      const valor = avaliacoes[paramNome]
      if (valor) {
        totalRespostas++
        if (categoria.categoria === 'Comportamentos restritivos') {
          // Pontuação invertida para comportamentos restritivos
          if (valor === 'muito') totalPontos += 0
          else if (valor === 'pouco') totalPontos += 1
          else if (valor === 'nao') totalPontos += 2
        } else {
          // Pontuação normal para outras categorias
          if (valor === 'muito') totalPontos += 2
          else if (valor === 'pouco') totalPontos += 1
        }
      }
    })
  })

  const porcentagemAdquirida = totalRespostas > 0 
    ? Math.round((totalPontos / (totalRespostas * 2)) * 100)
    : 0

  // Calcula porcentagem por categoria
  const categorias = ESCALA_DEMUCA.map(categoria => {
    let pontosCategoria = 0
    let maxPontosCategoria = 0
    let respostasCategoria = 0

    categoria.parametros.forEach(parametro => {
      const paramNome = typeof parametro === 'string' ? parametro : parametro.nome
      const valor = avaliacoes[paramNome]
      if (valor) {
        respostasCategoria++
        maxPontosCategoria += 2
        
        if (categoria.categoria === 'Comportamentos restritivos') {
          // Pontuação invertida para comportamentos restritivos
          if (valor === 'muito') pontosCategoria += 0
          else if (valor === 'pouco') pontosCategoria += 1
          else if (valor === 'nao') pontosCategoria += 2
        } else {
          // Pontuação normal para outras categorias
          if (valor === 'muito') pontosCategoria += 2
          else if (valor === 'pouco') pontosCategoria += 1
        }
      }
    })

    const porcentagem = respostasCategoria > 0 
      ? Math.round((pontosCategoria / maxPontosCategoria) * 100)
      : 0

    return {
      name: categoria.categoria
        .replace('Percepção / ', '')
        .replace(' / Cognição', ''),
      value: porcentagem
    }
  })

  return {
    habilidades: [
      { name: 'Adquirido', value: porcentagemAdquirida },
      { name: 'Não adquirido', value: 100 - porcentagemAdquirida }
    ],
    categorias
  }
}
