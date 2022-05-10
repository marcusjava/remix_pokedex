import type { Pokemon } from "@prisma/client";
import { Link } from "@remix-run/react";

interface Props {
  captured?: Pokemon;
}

export default function DropdownItem({ captured }: Props) {
  return (
    <Link to={`/pokemons/${captured?.name}`}>
      <div className="dropdown__item">
        <div className="dropdown__avatar__container">
          <img src={captured?.image} alt="Avatar" className="drop_avatar" />
        </div>
        <div className="dropdown__item__description">
          <span>{captured?.name}</span>
        </div>
      </div>
    </Link>
  );
}
