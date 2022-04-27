import { Link } from "@remix-run/react";

export interface ErrorProps {
  error: Error;
}

export default function ErrorComponent({ error }: ErrorProps) {
  return (
    <div className="error__container">
      <div>
        <h1 className="error__title">Erro!</h1>
        <h3 className="error__text">{error.message}</h3>
        <Link to="/pokemons">Voltar</Link>
      </div>
    </div>
  );
}
