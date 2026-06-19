import { useMemo } from "react";
import "./Match.css";

import { rating2goals } from "../logic/rating2goals";
import { getBest11, getFantaRating } from "../logic/getBest11";
import rawZodiacTeams from "../../data/updatedZTeams.json" with { type: "json" };
import ZodiacIcon from "./ZodiacIcon";
import Player from "./Player";

const Match = ({ selectedMatch, setTab }) => {
  const zodiacTeams = useMemo(() => Array.isArray(rawZodiacTeams) ? rawZodiacTeams : Object.values(rawZodiacTeams), [rawZodiacTeams]);

  const homeTeam = zodiacTeams.find(
    (team) => team.name === selectedMatch.home_team,
  );

  const awayTeam = zodiacTeams.find(
    (team) => team.name === selectedMatch.away_team,
  );

  const home11 = getBest11(homeTeam, selectedMatch.turn);
  const away11 = getBest11(awayTeam, selectedMatch.turn);


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

  if (selectedMatch.status === "ongoing") {
    return (
      <div className="zw-section">
        <div className="zw-card zw-card-blue">
          <h2 style={{ color: "var(--cosmic-blue)" }}>LIVE</h2>
          <p>
            {selectedMatch.home_team} vs {selectedMatch.away_team}
          </p>
        </div>
      </div>
    );
  }

  const homeGoals = rating2goals(
    home11.reduce((sum, p) => sum + getFantaRating(p, selectedMatch.turn), 0),
  );

  const awayGoals = rating2goals(
    away11.reduce((sum, p) => sum + getFantaRating(p, selectedMatch.turn), 0),
  );

  const homeTotalRating = home11.reduce((sum, p) => sum + getFantaRating(p, selectedMatch.turn), 0);
  const awayTotalRating = away11.reduce((sum, p) => sum + getFantaRating(p, selectedMatch.turn), 0);

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
              <ZodiacIcon sign={homeTeam?.name} size={48} />
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
              <ZodiacIcon sign={awayTeam?.name} size={48} />
            </span>
          </div>

          <div className="team-name">{awayTeam?.name}</div>
        </div>
      </div>

      <div className="match-ratings">
        <span>({homeTotalRating.toFixed(1)})</span>
        <span className="rating-separator">:</span>
        <span>({awayTotalRating.toFixed(1)})</span>
      </div>

      <div className="astral-pitch" style={{"--home-sign-color": `var(--${homeTeam?.name.toLowerCase()})`, "--away-sign-color": `var(--${awayTeam?.name.toLowerCase()})`}}>
        <div className="home-zodiac-bg">
          <ZodiacIcon sign={homeTeam?.name} size={320} />
        </div>
        <div className="away-zodiac-bg">
          <ZodiacIcon sign={awayTeam?.name} size={320} />
        </div>
        <div className="field-row away-gk">
          {away11.filter((p) => p.pos === "GK").map((p) => <Player key={p.id || p.name} player={p} team={awayTeam} turn={selectedMatch.turn} />)}
        </div>

        <div className="field-row away-df">
          {away11.filter((p) => p.pos === "DF").map((p) => <Player key={p.id || p.name} player={p} team={awayTeam} turn={selectedMatch.turn} />)}
        </div>

        <div className="field-row away-mf">
          {away11.filter((p) => p.pos === "MF").map((p) => <Player key={p.id || p.name} player={p} team={awayTeam} turn={selectedMatch.turn} />)}
        </div>

        <div className="field-row away-fw">
          {away11.filter((p) => p.pos === "FW").map((p) => <Player key={p.id || p.name} player={p} team={awayTeam} turn={selectedMatch.turn} />)}
        </div>

        <div className="field-midline">
          <div className="center-circle" />
        </div>

        <div className="field-row home-fw">
          {home11.filter((p) => p.pos === "FW").map((p) => <Player key={p.id || p.name} player={p} team={homeTeam} turn={selectedMatch.turn} />)}
        </div>

        <div className="field-row home-mf">
          {home11.filter((p) => p.pos === "MF").map((p) => <Player key={p.id || p.name} player={p} team={homeTeam} turn={selectedMatch.turn} />)}
        </div>

        <div className="field-row home-df">
          {home11.filter((p) => p.pos === "DF").map((p) => <Player key={p.id || p.name} player={p} team={homeTeam} turn={selectedMatch.turn} />)}
        </div>

        <div className="field-row home-gk">
          {home11.filter((p) => p.pos === "GK").map((p) => <Player key={p.id || p.name} player={p} team={homeTeam} turn={selectedMatch.turn} />)}
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
