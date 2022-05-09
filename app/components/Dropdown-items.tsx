import type { Pokemon } from "@prisma/client";
import DropdownItem from "./Dropdown-Item";

interface Props {
  captured?: Pokemon[];
}

export default function DropdownItems({ captured }: Props) {
  return (
    <div className="dropdown__custom">
      <div className="items">
        {captured && captured.length ? (
          captured.map((item) => <DropdownItem key={item.id} captured={item} />)
        ) : (
          <p className="noitems">Sem items</p>
        )}
      </div>
    </div>
  );
}
