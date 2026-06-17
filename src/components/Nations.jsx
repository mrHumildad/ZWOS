import { useState } from 'react';
import zodiacTeams from '../../data/updatedZTeams.json' with { type: 'json' };

const getTeamZodiacs = (team) => {
  const zodiacs = {};
  team.players.forEach(player => {
    if (!zodiacs[player.zodiac]) {
      zodiacs[player.zodiac] = 0;
    }
    zodiacs[player.zodiac]++;
  });
  return zodiacs;
};

const ZODIAC_ORDER = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

const Nations = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedSing, setSelectedSing] = useState('Aries');

  if (selectedTeam) {
    const zodiacs = getTeamZodiacs(selectedTeam);
    return (
      <div className="zw-section">
        <div className="zw-card" style={{ padding: '22px', borderLeftColor: `var(--${selectedTeam.name.toLowerCase()})` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '14px' }}>
            <h3 style={{ color: 'var(--gold)', margin: 0, fontSize: '17px' }}>{selectedTeam.name}</h3>
            <button onClick={() => setSelectedTeam(null)} className="zw-btn">Back</button>
          </div>
          <table className="zw-table">
            <thead>
              <tr>
                <th>Zodiac</th>
                <th style={{ textAlign: 'right' }}>Players</th>
              </tr>
            </thead>
            <tbody>
              {ZODIAC_ORDER.map((z) => (
                <tr key={z} style={{ cursor: 'pointer' }} onClick={() => setSelectedSing(z)}>
                  <td style={{ fontFamily: "'Signika', sans-serif", fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: `var(--${z.toLowerCase()})` }}>●</span>
                    <span>{z}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>{zodiacs[z] || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="zw-section">
      <div className="zw-card" style={{ padding: '18px', overflowX: 'auto' }}>
        <table className="zw-table">
          <thead>
            <tr>
              <th>Team</th>
              {ZODIAC_ORDER.map((z) => (
                <th key={z} onClick={() => setSelectedSing(z)} style={{ cursor: 'pointer', textAlign: 'center' }}>
                  <span style={{ color: `var(--${z.toLowerCase()})` }}>●</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {zodiacTeams
              .slice()
              .sort((a, b) => {
                const countA = a.players.filter(p => p.zodiac === selectedSing).length;
                const countB = b.players.filter(p => p.zodiac === selectedSing).length;
                return countB - countA;
              })
              .map((team) => {
                const zodiacs = getTeamZodiacs(team);
                return (
                  <tr key={team.fifa_code} style={{ cursor: 'pointer' }} onClick={() => setSelectedTeam(team)}>
                    <td style={{ fontFamily: "'Signika', sans-serif", fontWeight: 600 }}>
                      <span style={{ color: `var(--${team.name.toLowerCase()})` }}>●</span>
                      <span style={{ marginLeft: '10px' }}>{team.name}</span>
                    </td>
                    {ZODIAC_ORDER.map((z) => (
                      <td key={z} style={{ textAlign: 'center' }}>
                        {zodiacs[z] || 0}
                      </td>
                    ))}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Nations;

