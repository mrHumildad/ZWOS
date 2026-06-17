import { useState } from 'react';
import zodiacTeams from '../../data/updatedZTeams.json';
import { getFlagFromFifaCode } from '../logic/getBest11';

const ZWC26 = () => {
  const zTeams = zodiacTeams;
  const [selectedTeam, setSelectedTeam] = useState(null);
  const signColor = selectedTeam ? `var(--${selectedTeam.name.toLowerCase()})` : 'var(--cosmic-blue)';
  return (
    <div className="zw-section">
      {selectedTeam ? (
        <div className="zw-card" style={{ padding: '24px', borderLeftColor: signColor }}>
          <h3 style={{ fontSize: '18px', color: 'var(--gold)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: signColor }}>{selectedTeam.symbol}</span>
            <span>{selectedTeam.name}</span>
          </h3>
          {['GK', 'DF', 'MF', 'FW'].map((pos) => {
            const players = selectedTeam.players.filter(p => p.pos === pos);
            if (!players.length) return null;
            return (
              <div key={pos} style={{ marginBottom: '12px' }}>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    color: 'var(--text-secondary)',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                  }}
                >
                  {pos}
                </div>
                <ul style={{ display: 'grid', gap: '4px', listStyle: 'none', padding: 0, margin: 0 }}>
                  {players.map((player, index) => {
                    const { flag, name } = getFlagFromFifaCode(player.fifa_code);
                    return (
                    <li
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '6px 8px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, .02)',
                        fontSize: '13px',
                      }}
                    >
                      <span style={{ color: 'var(--text-secondary)', fontSize: '12px', width: '22px', textAlign: 'right' }}>{player.number}.</span>
                      <span style={{ flex: 1 }}>{player.name}</span>
                      <span style={{ cursor: 'pointer' }} title={name}>{flag}</span>
                    </li>
                    )
                  })}
                </ul>
              </div>
            );
          })}
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button onClick={() => setSelectedTeam(null)} className="zw-btn">Back to all teams</button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '12px' }}>
          {zTeams.map((team, index) => (
            <div
              key={index}
              className="zw-card"
              style={{ padding: '18px 20px', cursor: 'pointer', borderLeftColor: `var(--${team.name.toLowerCase()})` }}
              onClick={() => setSelectedTeam(team)}
            >
              <h3 style={{ fontSize: '17px', color: 'var(--gold)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: `var(--${team.name.toLowerCase()})` }}>{team.symbol}</span>
                <span>{team.name}</span>
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '8px' }}>
                {['GK', 'DF', 'MF', 'FW'].map((pos) => (
                  <div
                    key={pos}
                    style={{
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                      background: 'rgba(255,255,255,.05)',
                      padding: '6px 8px',
                      borderRadius: '8px',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: '10px', letterSpacing: '0.1em', opacity: 0.7, marginBottom: '2px' }}>{pos}</div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{team.players.filter(player => player.pos === pos).length}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ZWC26;
