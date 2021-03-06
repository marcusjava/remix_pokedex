import pick from "lodash/pick";
import axios from "axios";
import type { AxiosResponse } from "axios";
import invariant from "tiny-invariant";
import type { Pokemon } from "./types";

export const api = axios.create({ baseURL: "https://pokeapi.co/api/v2" });

type PokemonsProps = {
  limit: number;
  offset: number;
};

type ReturnPokemons = {
  results: { name: string; url: string }[];
};

export const getPokemons = async ({
  limit,
  offset,
}: PokemonsProps): Promise<ReturnPokemons> => {
  const response = await api.get(`/pokemon?offset=${offset}&limit=${limit}`);

  return {
    results: response.data?.results,
  };
};

export const getPokemon = async (name?: string): Promise<Pokemon> => {
  invariant(name, "Please provide an name as string");
  try {
    const response = await api.get(`/pokemon/${name}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      `Erro ${error.response.status} - Não foi possível carregar os dados do pokemon`
    );
  }
};
