import type { PokemonFormatted } from "~/utils/types";

interface Props {
  pokemon: PokemonFormatted;
}

export default function Pokemon({ pokemon }: Props) {
  return (
    <div className="detail__container">
      <div className="avatar__container">
        <img src={pokemon.image} alt="Avatar" className="avatar" />
      </div>
      <div className="detail">
        <h1 className="detail">{pokemon.name}</h1>
        <p>Peso: {pokemon.weight}</p>
        <p>Altura: {pokemon.height}</p>
        <p>
          <button className="badge">Grass</button>
        </p>
        <div className="stats__container">
          <progress value="43" max="100"></progress>
          <progress value="10" max="100"></progress>
          <progress value="80" max="100"></progress>
        </div>
        <button className="button__danger">Remover</button>
      </div>
    </div>
  );
}
