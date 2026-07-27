export default function Manifest({ stop, game }) {
  return (
    <div className="panel">
      <h2>Lost &amp; Found Ledger</h2>
      <ul aria-label="Objects to find">
        {game.selected.map((o) => {
          const found = game.found.has(o.id);
          return (
            <li
              key={o.id}
              className={found ? 'done' : ''}
              aria-label={found ? `${o.name}, found` : o.name}
            >
              <span className="ico" aria-hidden="true">{o.icon}</span>
              <span className="name">{o.name}</span>
            </li>
          );
        })}
      </ul>
      <div className="msg" role="status">{game.message}</div>
      <div className="legend">{stop.legend}</div>
    </div>
  );
}
