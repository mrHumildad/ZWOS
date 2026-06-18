import matches from './matches.json' with { type: 'json' };
import matchStats from './raw/matchStats.json' with { type: 'json' };
import zodiacTeams from './zodiacTeams.json' with { type: 'json' };
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ZTeams = zodiacTeams;

function getZodiacTeamByPlayerId(playerId) {
  for (const team of ZTeams) {
    const found = team.players.find(p => p.id === playerId);
    if (found) return team.name;
  }
  return null;
}

const processDay = (dayKey) => {
  const dayNumber = dayKey.replace('day', '');
  const dayMatches = matchStats.matches.filter((match) => match.round === dayNumber);
  const dayFinished = dayMatches.filter((match) => match.finished === true);
  const dayToPlay = dayMatches.filter((match) => match.finished === false);
  console.log(`${dayKey} matches:`, dayMatches.length);
  console.log(`${dayKey} finished matches:`, dayFinished.length);
  console.log(`${dayKey} matches to play:`, dayToPlay.length);

  if (dayFinished.length > 0) {
    updatedMatches[dayKey].matches = updatedMatches[dayKey].matches.map((match) => {
      match.status = 'ongoing';

      dayFinished.forEach((finishedMatch) => {
        finishedMatch.players.forEach((player) => {
          console.log(player);
          const zodiacTeam = getZodiacTeamByPlayerId(player.id);
          updatedZteams[zodiacTeam].players = updatedZteams[zodiacTeam].players.map((p) => {
            if (p.id === player.id) {
              p.status = 'played';
              p.matches[dayKey] = {
                matchId: finishedMatch.id,
                homeTeam: finishedMatch.homeTeam.code,
                awayTeam: finishedMatch.awayTeam.code,
                overallRating: player.overallRating,
                stats: player.stats
              };
            }
            return p;
          });
          console.log('Finished match player:', player.id, player.name, player.overallRating, '-> zodiacTeam:', zodiacTeam);
        });
      });
      return match;
    });
  }
  console.log(`Updated ${dayKey} matches:`, updatedMatches[dayKey].matches);
};

const updatedMatches = JSON.parse(JSON.stringify(matches));
const updatedZteams = {};
zodiacTeams.forEach((team) => {
  updatedZteams[team.name] = JSON.parse(JSON.stringify(team));
});

const days = Object.keys(matches);
days.forEach(processDay);

writeFileSync(join(__dirname, 'updatedZTeams.json'), JSON.stringify(updatedZteams, null, 2));
