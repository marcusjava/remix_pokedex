import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import ball from "~/assets/ball.png";
import type { AppLoaderData } from "~/root";
import DropdownItems from "./Dropdown-items";

interface Props {
  userId?: string;
}

export default function Dropdown({ userId }: Props) {
  const [open, setOpen] = useState<Boolean>(false);
  const { captured } = useLoaderData<AppLoaderData>();
  //console.log(captured);

  return (
    <>
      <div
        className="dropdown__container"
        onClick={() => setOpen((open) => !open)}
      >
        <img src={ball} alt="Pokeball" className="icon" />
        <div className="count__container">
          <span className="count">{captured?.length || 0}</span>
        </div>
      </div>
      {open ? <DropdownItems captured={captured} /> : null}
    </>
  );
}
