import type { PokemonsFormatted } from "~/utils/types";
import pokeball from "~/assets/ball.png";

interface Props {
  pokemon: PokemonsFormatted["pokemons"][number];
}

export default function PokemonCard({ pokemon }: Props) {
  const { name, image, captured, color, typeName } = pokemon;
  return (
    <div className="pokemon__container" style={{ backgroundColor: color }}>
      <img src={image} alt="Pokemon" className="avatar" />
      <h4 className="title">{name}</h4>
      <p className="subtitle">{typeName}</p>
      {captured ? (
        <img src={pokeball} alt="Pokeball" className="pokeball" />
      ) : null}
    </div>
  );
}
