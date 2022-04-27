import type { HTMLElementEvent } from "~/utils/types";

interface Props {
  handleNavigation: (
    e: HTMLElementEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  limit: string;
  offset: string;
}
export default function Navigation({ handleNavigation, offset, limit }: Props) {
  return (
    <div className="navigation">
      <button onClick={handleNavigation} data-nav-operation="previous">
        Previous
      </button>
      <button onClick={handleNavigation} data-nav-operation="next">
        Next
      </button>
    </div>
  );
}
