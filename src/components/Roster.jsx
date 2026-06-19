import { getAverageRating, getFlagFromFifaCode } from '../logic/getBest11';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import Player from './Player';

const Roster = ({ selectedTeam, setTab }) => {
  const { t } = useLanguage();

  if (!selectedTeam) return <div className="zw-section">{t('selectTeam')}</div>;
  const team = selectedTeam;
  const signColor = `var(--${team.name.toLowerCase()})`;

  const gkCount = team.players.filter(p => p.pos === 'GK').length;
  const dfCount = team.players.filter(p => p.pos === 'DF').length;
  const mfCount = team.players.filter(p => p.pos === 'MF').length;
  const fwCount = team.players.filter(p => p.pos === 'FW').length;

  const nationalityCounts = {};
  team.players.forEach(p => {
    const code = p.fifa_code;
    nationalityCounts[code] = (nationalityCounts[code] || 0) + 1;
  });
  const topNationalities = Object.entries(nationalityCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([code, count]) => `${getFlagFromFifaCode(code).flag} (${count})`)
    .join(' ');

  const ages = team.players
    .filter(p => p.date_of_birth)
    .map(p => {
      const dob = new Date(p.date_of_birth);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) age--;
      return age;
    });
  const avgAge = ages.length > 0 ? (ages.reduce((sum, a) => sum + a, 0) / ages.length).toFixed(1) : '-';

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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '8px' }}>
          {players.map((player) => (
            <Player key={player.id || player.name} player={player} team={team} averageRating={getAverageRating(player)} />
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
        <div style={{ display: 'flex', gap: '24px', marginBottom: '18px', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', fontSize: '13px' }}>
          <div><strong>GK:</strong> {gkCount}</div>
          <div><strong>DF:</strong> {dfCount}</div>
          <div><strong>MF:</strong> {mfCount}</div>
          <div><strong>FW:</strong> {fwCount}</div>
          <div><strong>{t('topNationalities')}:</strong> <span style={{ fontSize: '16px' }}>{topNationalities}</span></div>
          <div><strong>{t('averageAge')}:</strong> {avgAge}</div>
        </div>
        {renderSection(t('goalkeepers'), team.players.filter(p => p.pos === 'GK'))}
        {renderSection(t('defenders'), team.players.filter(p => p.pos === 'DF'))}
        {renderSection(t('midfielders'), team.players.filter(p => p.pos === 'MF'))}
        {renderSection(t('forwards'), team.players.filter(p => p.pos === 'FW'))}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button onClick={() => setTab('league')} className="zw-btn">{t('backToTeams')}</button>
        </div>
      </div>
    </div>
  );
};

export default Roster;
