import Voice from './Voice.jsx';

export default function IntroCard({ stop, index, onStart }) {
  return (
    <div className="overlay-screen">
      <div className="card intro-card">
        <div className="eyebrow">
          Stop {index + 1} of 10 · {stop.narrator}'s entry
        </div>
        <h2>{stop.title}</h2>
        <p className="intro-line">
          <Voice text={stop.intro} />
        </p>
        <button className="btn-hint" onClick={onStart} autoFocus>
          START SWEEP
        </button>
      </div>
    </div>
  );
}
