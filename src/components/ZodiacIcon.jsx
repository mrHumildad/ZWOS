const ZodiacIcon = ({ sign, size = 24 }) => {
  const s = size;
  const h = s / 2;

  const icons = {
    Aries: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path
          d="M6 4C6 4 8 10 12 10C16 10 18 4 18 4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M6 20C6 20 8 14 12 14C16 14 18 20 18 20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    Taurus: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="2" />
        <path
          d="M6 18C6 18 8 14 12 14C16 14 18 18 18 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    Gemini: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <line x1="9" y1="4" x2="9" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="15" y1="4" x2="15" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M9 8H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M9 16H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    Cancer: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <circle cx="8" cy="10" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="16" cy="14" r="4" stroke="currentColor" strokeWidth="2" />
        <path d="M4 10C4 10 4 18 8 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M20 14C20 14 20 6 16 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    Leo: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
        <path
          d="M8 12C8 12 6 18 10 20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M16 12C16 12 18 18 14 20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M12 4C12 4 14 2 16 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    Virgo: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path d="M8 4V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 4V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 14C8 18 12 20 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    Libra: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <line x1="4" y1="8" x2="20" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M6 8V12C6 14 8 16 12 16C16 16 18 14 18 12V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M4 20H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 16V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    Scorpio: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path d="M6 4V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 4V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M6 14C6 18 10 20 14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 18L18 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 18L14 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    Sagittarius: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <line x1="4" y1="20" x2="20" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 4H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="8" cy="16" r="1.5" fill="currentColor" />
      </svg>
    ),
    Capricorn: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path
          d="M6 4C6 4 6 10 10 10C14 10 14 4 14 4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M10 10V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path
          d="M10 16C10 20 14 20 18 16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M18 12V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    Aquarius: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path
          d="M4 8C6 4 8 8 10 8C12 8 14 4 16 8C18 8 20 4 20 8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M4 16C6 12 8 16 10 16C12 16 14 12 16 16C18 16 20 12 20 16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    Pisces: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 4C12 4 8 10 8 14C8 18 12 20 12 20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M12 4C12 4 16 10 16 14C16 18 12 20 12 20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  };

  return (
    <span
      className="zw-zodiac-icon"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: s,
        height: s,
      }}
    >
      {icons[sign] || null}
    </span>
  );
};

export default ZodiacIcon;
