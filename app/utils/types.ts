export type PokemonsProps = {
  next?: number;
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
    type: string;
    captured?: boolean;
  };
};

export type PokemonsFormatted = {
  next?: number;
  pokemons?: {
    id: number;
    name: string;
    image: string;
    captured?: boolean;
  }[];
};

export type Pokemon = {
  order: number;
  name: string;
  weight: number;
  height: number;
  types: {
    slot: string;
    type: {
      name: string;
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
  id: number;
  name: string;
  abilities: {
    ability: string;
    effect: string;
  }[];
  base_experience: number;
  captured: boolean;
  forms: {
    name: string;
    url: string;
  }[];
  game_indices: {
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }[];
  height: string;
  weight: number;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  types: {
    name: string;
    url: string;
  }[];
};
