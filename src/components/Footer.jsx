import { useLanguage } from '../i18n/LanguageContext.jsx';

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="zw-footer">
      <div>{t('footer')}</div>
    </footer>
  );
};

export default Footer;
