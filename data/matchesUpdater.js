import fs from "fs";
import { rating2goals } from "../src/logic/rating2goals.js";
import { getBest11, getFantaRating } from "../src/logic/getBest11.js";
import zodiacTeams from "./updatedZTeams.json" with { type: "json" };
import matches from "./matches.json" with { type: "json" };

const processMatch = (match) => {
  if (match.status === "completed" && !match.home_goals && !match.away_goals) {
    const homeTeam = zodiacTeams[match.home_team];
    const awayTeam = zodiacTeams[match.away_team];
    const dayN = match.turn;

    const home11 = getBest11(homeTeam, dayN);
    const away11 = getBest11(awayTeam, dayN);

    const homeGoals = rating2goals(
      home11.reduce((sum, p) => sum + getFantaRating(p, dayN), 0),
    );

    const awayGoals = rating2goals(
      away11.reduce((sum, p) => sum + getFantaRating(p, dayN), 0),
    );

    return {
      ...match,
      home_goals: homeGoals,
      away_goals: awayGoals,
      home11: home11,
      away11: away11,
    };
  }
  return match;
};

const updatedMatches = {
  ...matches,
  day1: {
    ...matches.day1,
    matches: matches.day1.matches.map(processMatch),
  },
  day2: {
    ...matches.day2,
    matches: matches.day2.matches.map(processMatch),
  },
  day3: {
    ...matches.day3,
    matches: matches.day3.matches.map(processMatch),
  },
};

fs.writeFileSync("./data/updatedMatches.json", JSON.stringify(updatedMatches, null, 2));
console.log("Updated matches saved to ./data/updatedMatches.json");