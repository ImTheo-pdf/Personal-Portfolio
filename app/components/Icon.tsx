import type { IconName } from "../content";

// Glossy aqua glyphs in the Frutiger Aero style: a water-blue body with a soft highlight on top.
export default function Icon({ name, className }: { name: IconName; className?: string }) {
  const id = `g-${name}`;
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fe3ff" />
          <stop offset="0.55" stopColor="#2fb4ea" />
          <stop offset="1" stopColor="#1489c8" />
        </linearGradient>
        <linearGradient id={`${id}-shine`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g fill={`url(#${id})`} stroke="#0f7fb8" strokeOpacity="0.35" strokeWidth="1">
        {shapes[name]}
      </g>
      <g fill={`url(#${id}-shine)`}>{shines[name]}</g>
    </svg>
  );
}

const shapes: Record<IconName, React.ReactNode> = {
  person: (
    <>
      <circle cx="32" cy="21" r="11" />
      <path d="M12 55c0-11 9-18 20-18s20 7 20 18z" />
    </>
  ),
  briefcase: (
    <>
      <path
        d="M24 21v-4a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v4"
        fill="none"
        stroke="#2fb4ea"
        strokeOpacity="1"
        strokeWidth="4"
      />
      <rect x="9" y="21" width="46" height="32" rx="8" />
    </>
  ),
  blocks: (
    <>
      <rect x="9" y="33" width="21" height="21" rx="6" />
      <rect x="34" y="33" width="21" height="21" rx="6" />
      <circle cx="32" cy="19" r="10" />
    </>
  ),
  star: (
    <path
      d="M32 8l6.6 14.2 15.4 1.9-11.4 10.6 3 15.3L32 42.4 18.4 50l3-15.3L10 24.1l15.4-1.9z"
      strokeLinejoin="round"
    />
  ),
  camera: (
    <>
      <rect x="22" y="13" width="20" height="10" rx="4" />
      <rect x="7" y="19" width="50" height="34" rx="9" />
      <circle cx="32" cy="36" r="10" fill="#e9f9ff" />
      <circle cx="32" cy="36" r="6" />
    </>
  ),
  document: (
    <>
      <rect x="15" y="8" width="34" height="48" rx="7" />
      <g fill="#e9f9ff" stroke="none">
        <rect x="22" y="20" width="20" height="3.5" rx="1.75" />
        <rect x="22" y="29" width="20" height="3.5" rx="1.75" />
        <rect x="22" y="38" width="13" height="3.5" rx="1.75" />
      </g>
    </>
  ),
  mail: (
    <>
      <rect x="7" y="15" width="50" height="35" rx="8" />
      <path
        d="M11 20l21 15 21-15"
        fill="none"
        stroke="#e9f9ff"
        strokeOpacity="1"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
};

const shines: Record<IconName, React.ReactNode> = {
  person: <ellipse cx="32" cy="16" rx="7" ry="4" />,
  briefcase: <rect x="13" y="23" width="38" height="10" rx="5" />,
  blocks: (
    <>
      <ellipse cx="32" cy="14.5" rx="6" ry="3.5" />
      <rect x="12" y="35" width="15" height="6" rx="3" />
      <rect x="37" y="35" width="15" height="6" rx="3" />
    </>
  ),
  star: <ellipse cx="32" cy="22" rx="8" ry="4" />,
  camera: <rect x="11" y="21" width="42" height="7" rx="3.5" />,
  document: <rect x="18" y="10" width="28" height="6" rx="3" />,
  mail: <rect x="11" y="17" width="42" height="6" rx="3" />,
};
