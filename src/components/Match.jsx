import "./Match.css";

import { rating2goals } from "../logic/rating2goals";
import { getBest11, getFantaRating, getShortName, getFlagFromFifaCode } from "../logic/getBest11";
import zodiacTeams from "../../data/updatedZTeams.json" with { type: "json" };

const Match = ({ selectedMatch, setTab }) => {
  const homeTeam = zodiacTeams.find(
    (team) => team.name === selectedMatch.home_team,
  );

  const awayTeam = zodiacTeams.find(
    (team) => team.name === selectedMatch.away_team,
  );

  const home11 = getBest11(homeTeam);
  const away11 = getBest11(awayTeam);

  const renderPlayer = (player, team) => {
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
        <div className="player-rating">{getFantaRating(player)}</div>
        <div className="player-info">
          <span className="player-shirt">{player.number}</span>
          <span className="player-flag">{flag}</span>
        </div>
      </div>
    );
  };
  if (selectedMatch.status === "scheduled") {
    return (
      <div className="zw-section">
        <div className="zw-card">
          <h2>Match Scheduled</h2>
          <p>
            {selectedMatch.home_team} vs {selectedMatch.away_team}
          </p>
        </div>
      </div>
    );
  }

  const homeGoals = rating2goals(
    home11.reduce((sum, p) => sum + getFantaRating(p), 0),
  );

  const awayGoals = rating2goals(
    away11.reduce((sum, p) => sum + getFantaRating(p), 0),
  );

  return (
    <div className="match-page">
      <div className="match-header">
        <div className="team-side">
          <div className="team-symbol">
            <span
              className="zw-symbol"
              style={{
                color: `var(--${homeTeam?.name.toLowerCase()})`,
                textShadow: `0 0 10px var(--${homeTeam?.name.toLowerCase()}-glow)`,
              }}
            >
              {homeTeam?.symbol}
            </span>
          </div>

          <div className="team-name">{homeTeam?.name}</div>
        </div>

        <div className="score-board">
          <span>{homeGoals}</span>
          <span className="score-separator">:</span>
          <span>{awayGoals}</span>
        </div>

        <div className="team-side">
          <div className="team-symbol">
            <span
              className="zw-symbol"
              style={{
                color: `var(--${awayTeam?.name.toLowerCase()})`,
                textShadow: `0 0 10px var(--${awayTeam?.name.toLowerCase()}-glow)`,
              }}
            >
              {awayTeam?.symbol}
            </span>
          </div>

          <div className="team-name">{awayTeam?.name}</div>
        </div>
      </div>

      <div className="astral-pitch">
        <div className="field-row away-gk">
          {away11.filter((p) => p.pos === "GK").map((p) => renderPlayer(p, awayTeam))}
        </div>

        <div className="field-row away-df">
          {away11.filter((p) => p.pos === "DF").map((p) => renderPlayer(p, awayTeam))}
        </div>

        <div className="field-row away-mf">
          {away11.filter((p) => p.pos === "MF").map((p) => renderPlayer(p, awayTeam))}
        </div>

        <div className="field-row away-fw">
          {away11.filter((p) => p.pos === "FW").map((p) => renderPlayer(p, awayTeam))}
        </div>

        <div className="field-midline">
          <div className="center-circle" />
        </div>

        <div className="field-row home-fw">
          {home11.filter((p) => p.pos === "FW").map((p) => renderPlayer(p, homeTeam))}
        </div>

        <div className="field-row home-mf">
          {home11.filter((p) => p.pos === "MF").map((p) => renderPlayer(p, homeTeam))}
        </div>

        <div className="field-row home-df">
          {home11.filter((p) => p.pos === "DF").map((p) => renderPlayer(p, homeTeam))}
        </div>

        <div className="field-row home-gk">
          {home11.filter((p) => p.pos === "GK").map((p) => renderPlayer(p, homeTeam))}
        </div>
      </div>
      <div className="back-row">
        <button className="zw-btn" onClick={() => setTab("league")}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Match;
