import { useState, useMemo } from "react";
import zodiacMatches from "../../data/matches.json";
import zodiacTeams from "../../data/updatedZTeams.json" with { type: "json" };
const GROUPS = [
  {
    name: "Cardinal",
    teams: ["Aries", "Cancer", "Libra", "Capricorn"],
  },
  {
    name: "Fixed",
    teams: ["Taurus", "Leo", "Scorpio", "Aquarius"],
  },
  {
    name: "Mutable",
    teams: ["Gemini", "Virgo", "Sagittarius", "Pisces"],
  },
];

export default function League({ setSelectedTeam, setSelectedMatch, setTab }) {
  const schools = zodiacTeams;
  const [groupIndex, setGroupIndex] = useState(0);

  const group = GROUPS[groupIndex];
  const allMatches = useMemo(
    () => Object.values(zodiacMatches).flatMap((day) => day.matches),
    [],
  );

  const groupMatches = useMemo(
    () =>
      allMatches.filter(
        (m) =>
          group.teams.includes(m.home_team) &&
          group.teams.includes(m.away_team),
      ),
    [allMatches, group.teams],
  );

  const standings = useMemo(() => {
    const stats = {};
    for (const team of group.teams) {
      stats[team] = {
        played: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDiff: 0,
        points: 0,
      };
    }
    for (const m of groupMatches) {
      if (m.home_score == null || m.away_score == null) continue;
      const home = m.home_score;
      const away = m.away_score;
      stats[m.home_team].played += 1;
      stats[m.away_team].played += 1;
      stats[m.home_team].goalsFor += home;
      stats[m.home_team].goalsAgainst += away;
      stats[m.away_team].goalsFor += away;
      stats[m.away_team].goalsAgainst += home;
      stats[m.home_team].goalDiff += home - away;
      stats[m.away_team].goalDiff += away - home;
      if (home > away) {
        stats[m.home_team].wins += 1;
        stats[m.home_team].points += 3;
        stats[m.away_team].losses += 1;
      } else if (away > home) {
        stats[m.away_team].wins += 1;
        stats[m.away_team].points += 3;
        stats[m.home_team].losses += 1;
      } else {
        stats[m.home_team].draws += 1;
        stats[m.away_team].draws += 1;
        stats[m.home_team].points += 1;
        stats[m.away_team].points += 1;
      }
    }
    return group.teams
      .map((name) => ({
        name,
        symbol: zodiacTeams.find((t) => t.name === name)?.symbol,
        ...stats[name],
      }))
      .sort(
        (a, b) =>
          b.points - a.points ||
          b.goalDiff - a.goalDiff ||
          b.goalsFor - a.goalsFor,
      );
  }, [groupMatches, group.teams]);

  const handleNextGroup = () => {
    setGroupIndex((prev) => (prev + 1) % GROUPS.length);
  };

  const handlePrevGroup = () => {
    setGroupIndex((prev) => (prev - 1 + GROUPS.length) % GROUPS.length);
  };

  const getPositionBadgeClass = (position) => {
    if (position === 0) return "zw-badge zw-badge-gold";
    if (position === 1) return "zw-badge zw-badge-silver";
    if (position === 2) return "zw-badge zw-badge-bronze";
    return "zw-badge";
  };

  return (
    <div className="zw-section">
      <div className="zw-card zw-card-gold" style={{ padding: "28px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <button onClick={handlePrevGroup} className="zw-btn">
            ← Previous Group
          </button>
          <h2
            style={{
              textAlign: "center",
              fontSize: "24px",
              color: "var(--gold)",
            }}
          >
            {group.name} Group
          </h2>
          <button onClick={handleNextGroup} className="zw-btn">
            Next Group →
          </button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="zw-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Team</th>
                <th>P</th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
                <th>GF</th>
                <th>GA</th>
                <th>GD</th>
                <th>Pts</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((team, index) => {
                const fullTeam = schools.find((s) => s.name === team.name);
                const badgeClass = getPositionBadgeClass(index);
                return (
                  <tr
                    key={team.name}
                    className="clickable"
                    onClick={() => {
                      setSelectedTeam(fullTeam);
                      setTab("roster");
                    }}
                  >
                    <td>
                      <span className={badgeClass}>{index + 1}</span>
                    </td>
                    <td>
                      <span
                        className="zw-symbol"
                        style={{
                          color: `var(--${team.name.toLowerCase()})`,
                          textShadow: `0 0 10px var(--${team.name.toLowerCase()}-glow)`,
                        }}
                      >
                        {team.symbol}
                      </span>
                      <span style={{ marginLeft: "10px" }}>{team.name}</span>
                    </td>
                    <td>{team.played}</td>
                    <td>{team.wins}</td>
                    <td>{team.draws}</td>
                    <td>{team.losses}</td>
                    <td>{team.goalsFor}</td>
                    <td>{team.goalsAgainst}</td>
                    <td>{team.goalDiff}</td>
                    <td style={{ color: "var(--gold)", fontWeight: 600 }}>
                      {team.points}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <h3 style={{ margin: "24px 0 12px", color: "var(--gold)" }}>Matches</h3>
        <div style={{ display: "grid", gap: "10px" }}>
          {groupMatches.map((match, index) => (
            <div
              key={index}
              className="zw-card"
              style={{ padding: "14px 18px", cursor: "pointer" }}
              onClick={() => {
                setSelectedMatch(match);
                setTab("match");
              }}
            >
              <span
                style={{ color: "var(--text-secondary)", fontSize: "13px" }}
              >
                <span
                  className="zw-symbol"
                  style={{
                    color: `var(--${zodiacTeams.find((t) => t.name === match.home_team)?.name.toLowerCase()})`,
                    textShadow: `0 0 10px var(--${zodiacTeams.find((t) => t.name === match.home_team)?.name.toLowerCase()}-glow)`,
                  }}
                >
                  {zodiacTeams.find((t) => t.name === match.home_team)
                    ?.symbol ?? ""}
                </span>{" "}
                {match.home_team}
              </span>
              <span
                style={{
                  color: "var(--gold)",
                  fontWeight: 600,
                  margin: "0 10px",
                }}
              >
                vs
              </span>
              <span
                style={{ color: "var(--text-secondary)", fontSize: "13px" }}
              >
                <span
                  className="zw-symbol"
                  style={{
                    color: `var(--${zodiacTeams.find((t) => t.name === match.away_team)?.name.toLowerCase()})`,
                    textShadow: `0 0 10px var(--${zodiacTeams.find((t) => t.name === match.away_team)?.name.toLowerCase()}-glow)`,
                  }}
                >
                  {zodiacTeams.find((t) => t.name === match.away_team)
                    ?.symbol ?? ""}
                </span>{" "}
                {match.away_team}
              </span>
              <span
                style={{
                  marginLeft: "auto",
                  color: "var(--gold-light)",
                  fontWeight: 600,
                  fontSize: "14px",
                }}
              >
                {match.home_score ?? "-"} - {match.away_score ?? "-"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
