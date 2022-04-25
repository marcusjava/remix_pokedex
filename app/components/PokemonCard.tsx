import type { PokemonsFormatted } from "~/utils/types";

interface Props {
  pokemon: PokemonsFormatted["pokemons"][number];
}

export default function PokemonCard({ pokemon }: Props) {
  const { name, image, captured, color } = pokemon;
  return (
    <div className="pokemon__container" style={{ backgroundColor: color }}>
      <img src={image} alt="Pokemon" className="avatar" />
      <h4 className="title">{name}</h4>
      {captured ? <img src="" alt="" className="pokeball" /> : null}
    </div>
  );
}
