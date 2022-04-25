import type {
  ExtractedStat,
  Pokemon,
  PokemonsProps,
  PokemonsResponseData,
  ResponseAbility,
} from "./types";

export const formatPokemonsData = async ({ next, results }: PokemonsProps) => {
  const promises = [];

  for (let pokemon of results) {
    const response = (await fetch(pokemon.url)) as PokemonsResponseData;

    promises.push({
      id: response.data?.id,
      name: response.data?.name,
      image: response.data?.sprites.other.dream_world.front_default,
      captured: false,
    });
  }

  const pokemons = await Promise.all(promises);

  return { next, pokemons };
};

export const formatPokemonData = async (data: Pokemon) => {
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

  const types = data.types.map(({ type }) => ({
    name: type.name,
    url: type.url,
  }));
  const promises = [];

  for (let item of data.abilities) {
    const response = (await fetch(item.ability.url)) as ResponseAbility;

    const short_effect = response.data?.effect_entries
      .filter((entry) => entry.language.name === "en")
      .map((item) => item.short_effect)[0];

    promises.push({ ability: item.ability.name, effect: short_effect });
  }

  const abilities = await Promise.all(promises);
  console.log("short effect", abilities);

  return {
    ...data,
    types,
    height,
    weight,
    stats: { hp, attack, defense, speed, specialAttack, specialDefense },
    abilities,
    captured: false,
  };
};
