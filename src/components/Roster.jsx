import React from 'react';

const Roster = ({ selectedTeam, setTab }) => {
  if (!selectedTeam) return <div className="zw-section">Select a team</div>;
  const team = selectedTeam;
  const signColor = `var(--${team.name.toLowerCase()})`;

  const renderSection = (title, players) => (
    <div style={{ marginBottom: '14px' }}>
      <div
        style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.14em',
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          marginBottom: '8px',
          paddingLeft: '4px',
        }}
      >
        {title}
      </div>
      <div className="zw-card" style={{ padding: '10px 12px', borderLeftColor: signColor }}>
        <div style={{ display: 'grid', gap: '4px' }}>
          {players.map((player, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '6px 8px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, .02)',
              }}
            >
              <span style={{ color: 'var(--text-secondary)', fontSize: '12px', width: '22px', textAlign: 'right' }}>{player.number}.</span>
              <span style={{ flex: 1, fontSize: '13px' }}>{player.name}</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>[{player.fifa_code}]</span>
              {player.matches?.day1?.overallRating && (
                <span style={{ marginLeft: 'auto', color: 'var(--gold-light)', fontWeight: 600, fontSize: '13px' }}>
                  {player.matches.day1.overallRating}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="zw-section">
      <div className="zw-card zw-card-glow" style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '22px', color: 'var(--gold)', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ color: signColor }}>{team.symbol}</span>
          <span>{team.name}</span>
        </h2>
        {renderSection('Goalkeepers', team.players.filter(p => p.pos === 'GK'))}
        {renderSection('Defenders', team.players.filter(p => p.pos === 'DF'))}
        {renderSection('Midfielders', team.players.filter(p => p.pos === 'MF'))}
        {renderSection('Forwards', team.players.filter(p => p.pos === 'FW'))}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button onClick={() => setTab('league')} className="zw-btn">Back to all teams</button>
        </div>
      </div>
    </div>
  );
};

export default Roster;
