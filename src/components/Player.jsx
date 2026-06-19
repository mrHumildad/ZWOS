import { getFantaRating, getShortName, getFlagFromFifaCode } from "../logic/getBest11";

const Player = ({ player, team, turn }) => {
  const { flag } = getFlagFromFifaCode(player.fifa_code);
  return (
    <div key={player.id || player.name} className="player-star">
      <div className="player-name">{getShortName(player.name).toUpperCase()}</div>
      <div
        className="player-core"
        style={{
          background: `var(--${team?.name.toLowerCase()})`,
          boxShadow: `
            0 0 .5rem var(--${team?.name.toLowerCase()}),
            0 0 1rem var(--${team?.name.toLowerCase()}-glow)
          `,
        }}
      />
      <div className="player-rating">{getFantaRating(player, turn)}</div>
      <div className="player-info">
        <span className="player-shirt">{player.number}</span>
        <span className="player-flag">{flag}</span>
      </div>
    </div>
  );
};

export default Player;
