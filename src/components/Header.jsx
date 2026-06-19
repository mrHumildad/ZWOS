import { useLanguage } from '../i18n/LanguageContext.jsx';

const langLabels = ['EN', 'ES', 'IT'];

const Header = () => {
  const { t, cycleLanguage, langIndex } = useLanguage();

  return (
    <header className="zw-nav">
      <div className="brand">{t('brand')}</div>
      <nav>
        <button className="zw-btn" aria-label="league">{t('league')}</button>
        <button className="zw-btn lang-btn" onClick={cycleLanguage} aria-label="switch language">
          {langLabels[langIndex]}
        </button>
      </nav>
    </header>
  );
};

export default Header;
