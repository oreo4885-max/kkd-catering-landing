type IconProps = {
  className?: string;
};

export function DonutIcon({ className = "h-9 w-9" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 64" className={className}>
      <defs>
        <radialGradient id="donut-hole" cx="50%" cy="45%" r="65%">
          <stop offset="0%" stopColor="#fffdfa" />
          <stop offset="65%" stopColor="#fff4df" />
          <stop offset="100%" stopColor="#edd5a7" />
        </radialGradient>
        <linearGradient id="donut-glaze" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffe2ad" />
          <stop offset="45%" stopColor="#dca05c" />
          <stop offset="100%" stopColor="#b96b2f" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="34" rx="24" ry="18" fill="url(#donut-glaze)" />
      <ellipse cx="32" cy="31" rx="22" ry="16" fill="#f7cf95" opacity="0.65" />
      <ellipse cx="32" cy="33" rx="10.5" ry="7.5" fill="url(#donut-hole)" />
      <ellipse cx="24" cy="25" rx="9" ry="4.5" fill="#fff7e8" opacity="0.55" />
      <ellipse cx="44" cy="37" rx="6.5" ry="3.2" fill="#fff0cf" opacity="0.35" />
    </svg>
  );
}

export function DonutCoffeeIcon({ className = "h-9 w-9" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 80 64" className={className}>
      <defs>
        <linearGradient id="coffee-cup" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6b341f" />
          <stop offset="100%" stopColor="#34170f" />
        </linearGradient>
        <linearGradient id="coffee-sleeve" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#dd4a3c" />
          <stop offset="100%" stopColor="#b11f22" />
        </linearGradient>
        <radialGradient id="mini-donut-hole" cx="50%" cy="45%" r="65%">
          <stop offset="0%" stopColor="#fffdfa" />
          <stop offset="65%" stopColor="#fff4df" />
          <stop offset="100%" stopColor="#edd5a7" />
        </radialGradient>
        <linearGradient id="mini-donut-glaze" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffe2ad" />
          <stop offset="45%" stopColor="#dca05c" />
          <stop offset="100%" stopColor="#b96b2f" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="20" rx="15" ry="3.5" fill="#f7f7f5" />
      <path d="M38 20h24l-3 28a4 4 0 0 1-4 3H45a4 4 0 0 1-4-3Z" fill="url(#coffee-cup)" />
      <path d="M35.5 20h29a2.5 2.5 0 0 0 0-5h-29a2.5 2.5 0 1 0 0 5Z" fill="#fbfbf9" />
      <path d="M40 33h20v12H40z" rx="2" fill="url(#coffee-sleeve)" />
      <path d="M62 24h4.5a5.5 5.5 0 0 1 0 11H63" fill="none" stroke="#e9e9e7" strokeWidth="2.4" strokeLinecap="round" />
      <ellipse cx="24" cy="46" rx="15" ry="11.5" fill="url(#mini-donut-glaze)" />
      <ellipse cx="24" cy="44.2" rx="13.6" ry="9.8" fill="#f7cf95" opacity="0.65" />
      <ellipse cx="24" cy="45.5" rx="6.2" ry="4.7" fill="url(#mini-donut-hole)" />
      <ellipse cx="19" cy="39.5" rx="5.5" ry="2.8" fill="#fff7e8" opacity="0.55" />
    </svg>
  );
}
