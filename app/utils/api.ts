import pick from "lodash/pick";
import axios from "axios";

export const api = axios.create({ baseURL: "https://pokeapi.co/api/v2" });

type PokemonsProps = {
  limit?: number;
  offset?: number;
};

export const getPokemons = async ({
  limit = 20,
  offset = 0,
}: PokemonsProps) => {
  const response = await api.get("/pokemons?limit=10");
  console.log(response.data);
};
