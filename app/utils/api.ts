import pick from "lodash/pick";
import axios from "axios";

export const api = axios.create({ baseURL: "https://pokeapi.co/api/v2" });

type PokemonsProps = {
  limit?: number;
  offset?: number;
};

type ReturnPokemons = { name: string; url: string }[];
export const getPokemons = async ({
  limit = 20,
  offset = 0,
}: PokemonsProps): Promise<ReturnPokemons> => {
  const response = await api.get("/pokemon?limit=10");

  return response.data?.results;
};
