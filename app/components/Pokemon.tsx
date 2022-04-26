import type { PokemonFormatted } from "~/utils/types";

interface Props {
  pokemon: PokemonFormatted;
}

export default function Pokemon({ pokemon }: Props) {
  console.log({ pokemon });
  return (
    <div className="detail__container">
      <div className="avatar__container">
        <img src={pokemon.image} alt="Avatar" className="avatar" />
      </div>
      <div className="detail">
        <h1 className="title">{pokemon.name}</h1>
        <span className="badge" style={{ backgroundColor: pokemon.color }}>
          Grass
        </span>
        <p>Peso: {pokemon.weight}</p>
        <p>Altura: {pokemon.height}</p>

        <div className="stats__container">
          <p className="input-progress">
            <label htmlFor="hp">HP</label>
            <progress id="hp" value="43" max="100"></progress>
          </p>
          <p className="input-progress">
            <label htmlFor="attack">Attack</label>
            <progress id="attack" value="43" max="100"></progress>
          </p>
          <p className="input-progress">
            <label htmlFor="hp">Defense</label>
            <progress id="defense" value="43" max="100"></progress>
          </p>
          <p className="input-progress">
            <label htmlFor="special-attack">Special attack</label>
            <progress id="special-attack" value="43" max="100"></progress>
          </p>
          <p className="input-progress">
            <label htmlFor="special-defense">Special defense</label>
            <progress id="special-defense" value="43" max="100"></progress>
          </p>
          <p className="input-progress">
            <label htmlFor="speed">Speed</label>
            <progress id="speed" value="43" max="100"></progress>
          </p>
        </div>
        <button className="button__danger">Remover</button>
      </div>
    </div>
  );
}
