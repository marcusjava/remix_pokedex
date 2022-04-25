import pick from "lodash/pick";

type PokemonsProps = {
  limit?: number;
  offset?: number;
};

export const getPokemons = async ({
  limit = 20,
  offset = 0,
}: PokemonsProps) => {};
