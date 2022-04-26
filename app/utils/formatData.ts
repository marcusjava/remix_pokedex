import type {
  ExtractedStat,
  Pokemon,
  PokemonFormatted,
  PokemonsFormatted,
  PokemonsProps,
  PokemonsResponseData,
  ResponseAbility,
} from "./types";
import axios from "axios";
import type { AxiosResponse } from "axios";
const cardColors = {
  rock: "rgb(148, 81, 81)",
  ghost: "rgb(247, 247, 247)",
  electric: "rgb(255, 255, 161)",
  bug: "#f6d6a7",
  poison: "#e0a7f6",
  normal: "#f4f4f4",
  fairy: "rgba(255, 192, 203, 0.863)",
  fire: "#fbe3df",
  grass: "#e2f9e1",
  water: "#e0f1fd",
  ground: "#C2B232",
};

export const formatPokemonsData = async ({
  next = 0,
  results,
}: PokemonsProps): Promise<PokemonsFormatted> => {
  const promises = [];

  for (let pokemon of results) {
    const response = await axios.get<
      AxiosResponse,
      Omit<PokemonsResponseData, "color" | "captured">
    >(pokemon.url);
    promises.push({
      id: response.data?.id,
      name: response.data?.name,
      image: response.data?.sprites.other.dream_world.front_default,
      typeName: response.data?.types[0].type.name,
      captured: false,
      color: cardColors[response.data?.types[0].type.name || "normal"],
    });
  }

  const pokemons = await Promise.all(promises);

  return { next, pokemons };
};

export const formatPokemonData = async (
  data: Pokemon
): Promise<PokemonFormatted> => {
  let hp, attack, defense, speed, specialAttack, specialDefense;

  data.stats.forEach((item: ExtractedStat) => {
    switch (item.stat.name) {
      case "hp":
        hp = item["base_stat"];
        break;
      case "attack":
        attack = item["base_stat"];
        break;
      case "defense":
        defense = item["base_stat"];
        break;
      case "speed":
        speed = item["base_stat"];
        break;
      case "special-attack":
        specialAttack = item["base_stat"];
        break;
      case "special-defense":
        specialDefense = item["base_stat"];
        break;
      default:
        return item.stat.name;
    }
  });

  //convertendo altura em decimetro para metros
  const height = (data.height * 0.1).toFixed(2);
  //convertendo para kg
  const weight = data.weight / 10;

  const image = data.sprites.other.dream_world.front_default;

  const types = data.types.map(({ type }) => ({
    name: type.name,
    url: type.url,
    color: cardColors[type.name || "normal"],
  }));

  const color = cardColors[types[0].name || "normal"];
  const promises = [];

  for (let item of data.abilities) {
    const response = await axios.get<AxiosResponse, ResponseAbility>(
      item.ability.url
    );

    const short_effect = response.data?.effect_entries
      .filter((entry) => entry.language.name === "en")
      .map((item) => item.short_effect)[0];

    promises.push({ ability: item.ability.name, effect: short_effect });
  }

  const abilities = await Promise.all(promises);

  return {
    name: data.name,
    image,
    types,
    color,
    height,
    weight,
    stats: { hp, attack, defense, speed, specialAttack, specialDefense },
    abilities,
    captured: false,
  };
};
