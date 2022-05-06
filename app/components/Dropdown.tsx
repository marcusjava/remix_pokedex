import { useState } from "react";
import ball from "~/assets/ball.png";
import DropdownItems from "./Dropdown-items";

export default function Dropdown() {
  const [open, setOpen] = useState<Boolean>(false);
  return (
    <>
      <div
        className="dropdown__container"
        onClick={() => setOpen((open) => !open)}
      >
        <img src={ball} alt="Pokeball" className="icon" />
        <div className="count__container">
          <span className="count">0</span>
        </div>
      </div>
      {open ? <DropdownItems /> : null}
    </>
  );
}
