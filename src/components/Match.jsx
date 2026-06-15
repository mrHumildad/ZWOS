import React from 'react';

const Match = ({ selectedMatch, setTab, data }) => {
  return (
    <div>
      {selectedMatch ? (
        <div>
          <h2>Match Details</h2>
          <p>
            {data.zodiacs[selectedMatch.home_team]?.symbol} {selectedMatch.home_team} vs{' '}
            {data.zodiacs[selectedMatch.away_team]?.symbol} {selectedMatch.away_team}
          </p>
          <button onClick={() => setTab('league')}>Back to League</button>
        </div>
      ) : (
        <p>No match selected.</p>
      )}
    </div>
  );
};

export default Match;

