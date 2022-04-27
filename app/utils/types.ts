import type React from "react";

export type PokemonsProps = {
  next?: string;
  previous?: string;
  results: { name: string; url: string }[];
};

export type ResponseAbility = {
  data?: {
    effect_entries: {
      effect: string;
      language: {
        name: string;
        url: string;
      };
      short_effect: string;
    }[];
  };
  errors?: Array<{ message: string }>;
};

export type PokemonsResponseData = {
  next?: string;
  previous?: string;
  data?: {
    id: number;
    name: string;
    sprites: {
      other: {
        dream_world: {
          front_default: string;
        };
      };
    };
    types: {
      slot: number;
      type: {
        name: PokemonTypes;
        url: string;
      };
    }[];
    captured?: boolean;
    color: string;
  };
};

export type PokemonsFormatted = {
  next?: string;
  previous?: string;
  pokemons: {
    id?: number;
    name?: string;
    image?: string;
    captured: boolean;
    typeName?: PokemonTypes;
    color: string;
  }[];
};

export type HTMLElementEvent<T extends HTMLElement, U> = React.MouseEvent<
  T,
  U
> & {
  target: T;
};

export type PokemonTypes =
  | "rock"
  | "ghost"
  | "electric"
  | "bug"
  | "poison"
  | "normal"
  | "fairy"
  | "fire"
  | "grass"
  | "water"
  | "ground";

export type Pokemon = {
  order: number;
  name: string;
  weight: number;
  height: number;
  types: {
    slot: string;
    type: {
      name: PokemonTypes;
      url: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  captured?: boolean;
};

//just playing!!!
type ExtractedStats = Pokemon["stats"];

export type ExtractedStat = ExtractedStats[number];

export type PokemonFormatted = {
  name: string;
  abilities: {
    ability: string;
    effect?: string;
  }[];
  captured: boolean;
  image: string;
  color: string;
  height: string;
  weight: number;
  stats: {
    hp?: number;
    attack?: number;
    defense?: number;
    specialAttack?: number;
    specialDefense?: number;
    speed?: number;
  };
  types: {
    name: string;
    url: string;
    color: string;
  }[];
};
