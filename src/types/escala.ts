export interface EscalaValores {
  nao: number;
  pouco: number;
  muito: number;
}

export interface ParametroEscala {
  nome: string;
  multiplicador?: number;
}

export interface CategoriaEscala {
  categoria: string;
  parametros: (string | ParametroEscala)[];
  escala: EscalaValores;
}

export type EscalaDemuca = CategoriaEscala[];
