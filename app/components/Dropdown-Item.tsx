const cardColors = {
  rock: "rgb(148, 81, 81)",
  ghost: "rgb(247, 247, 247)",
  electric: "rgb(255, 255, 161)",
  bug: "#f6d6a7",
  poison: "#e0a7f6",
  normal: "#f4f4f4",
  fairy: "rgba(255, 192, 203, 0.863)",
  fire: "#fbe3df",
  grass: "#e2f9e1",
  water: "#e0f1fd",
  ground: "#C2B232",
};

export default function DropdownItem() {
  return (
    <div className="dropdown__item">
      <div className="avatar__container">
        <img src="" alt="Avatar" className="avatar" />
      </div>
      <div className="dropdown__item__description">
        <span>Item</span>
      </div>
    </div>
  );
}
