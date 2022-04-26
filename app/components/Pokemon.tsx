export default function Pokemon() {
  return (
    <div className="detail__container">
      <div className="avatar__container">
        <img src="" alt="" className="avatar" />
      </div>
      <div className="detail">
        <h1 className="detail">Pokemon name</h1>
        <p>Peso</p>
        <p>Altura</p>
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
