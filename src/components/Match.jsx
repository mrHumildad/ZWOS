import { rating2goals } from '../logic/rating2goals';
import { getBest11, getFantaRating } from '../logic/getBest11';
import zodiacTeams from '../../data/updatedZTeams.json' with { type: 'json' };

const Match = ({ selectedMatch, setTab }) => {
  const homeTeam = zodiacTeams.find(team => team.name === selectedMatch.home_team);
  const awayTeam = zodiacTeams.find(team => team.name === selectedMatch.away_team);
  const home11 = getBest11(homeTeam);
  const away11 = getBest11(awayTeam);

  const renderRating = (p) => {
    const goals = Number(p?.matches?.day1?.stats?.goals ?? 0);
    const assists = Number(p?.matches?.day1?.stats?.assists ?? 0);
    return (
      <span style={{ color: 'var(--gold-light)', fontWeight: 600 }}>
        {'⚽'.repeat(goals)}
        {'½'.repeat(assists)}
        {' '}
        <span style={{ color: 'var(--text-secondary)' }}>({getFantaRating(p)})</span>
      </span>
    );
  };

  const renderSquad = (squad, label, signColor) => (
    <div className="zw-card" style={{ padding: '20px', marginBottom: '16px', borderLeftColor: signColor }}>
      <h3 style={{ fontFamily: "'Cinzel', serif", color: 'var(--gold)', marginBottom: '14px', fontSize: '16px', letterSpacing: '0.12em' }}>
        {label}
      </h3>
      {['GK', 'DF', 'MF', 'FW'].map((pos) => {
        const players = squad.filter((p) => p.pos === pos);
        if (!players.length) return null;
        return (
          <div key={pos} style={{ marginBottom: '14px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '6px' }}>
              {pos}
            </div>
            <div style={{ display: 'grid', gap: '6px' }}>
              {players.map((p, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, .03)',
                    transition: 'background 400ms ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,.06)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,.03)')}
                >
                  <span style={{ color: 'var(--text-secondary)', fontSize: '12px', width: '22px', textAlign: 'right' }}>{p.number}.</span>
                  <span style={{ flex: 1, fontSize: '13px' }}>{p.name}</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>[{p.fifa_code}]</span>
                  <span style={{ marginLeft: 'auto', fontSize: '13px' }}>{renderRating(p)}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
      <div className="zw-divider" />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
        <span style={{ color: 'var(--text-secondary)' }}>Total:</span>
        <span style={{ fontWeight: 600 }}>{squad.reduce((sum, p) => sum + getFantaRating(p), 0)}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginTop: '6px' }}>
        <span style={{ color: 'var(--text-secondary)' }}>Goals:</span>
        <span style={{ fontWeight: 600, color: 'var(--gold)' }}>{rating2goals(squad.reduce((sum, p) => sum + getFantaRating(p), 0))}</span>
      </div>
    </div>
  );

  if (selectedMatch.status === 'scheduled') {
    return (
      <div className="zw-section">
        <div className="zw-card" style={{ padding: '32px', textAlign: 'center', maxWidth: '520px', margin: '0 auto' }}>
          <h2 style={{ color: 'var(--gold)', marginBottom: '16px' }}>Match Scheduled</h2>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            {selectedMatch.home_team} vs {selectedMatch.away_team}
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>Date: {selectedMatch.date}</p>
          <button onClick={() => setTab('league')} className="zw-btn">Back to League</button>
        </div>
      </div>
    );
  }

  return (
    <div className="zw-section">
      <div style={{ display: 'grid', gap: '16px' }}>
        {renderSquad(home11, `${homeTeam?.symbol} ${homeTeam?.name}`, `var(--${homeTeam?.name.toLowerCase()})`)}
        {renderSquad(away11, `${awayTeam?.symbol} ${awayTeam?.name}`, `var(--${awayTeam?.name.toLowerCase()})`)}
      </div>
      <div style={{ textAlign: 'center', marginTop: '8px' }}>
        <button onClick={() => setTab('league')} className="zw-btn">Back to League</button>
      </div>
    </div>
  );
};

export default Match;
