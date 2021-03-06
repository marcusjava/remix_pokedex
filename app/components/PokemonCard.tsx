import type { PokemonsFormatted } from "~/utils/types";
import pokeball from "~/assets/ball.png";
import { Link } from "@remix-run/react";

interface Props {
  pokemon: PokemonsFormatted["pokemons"][number];
}

export default function PokemonCard({ pokemon }: Props) {
  const { name, image, captured, color, typeName } = pokemon;

  return (
    <Link to={`/pokemons/${name}`}>
      <div className="pokemon__container" style={{ backgroundColor: color }}>
        <img src={image} alt="Pokemon" className="avatar" />
        <h2 className="title">{name}</h2>
        <p className="subtitle">{typeName}</p>
        {captured ? (
          <img src={pokeball} alt="Pokeball" className="pokeball" />
        ) : null}
      </div>
    </Link>
  );
}
