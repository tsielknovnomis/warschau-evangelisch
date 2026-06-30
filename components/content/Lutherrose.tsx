import type { SVGProps } from "react";

/**
 * Luther rose — the parish emblem.
 * Geometrically reconstructed as a crisp SVG (5-fold symmetry):
 * gold ring · sky field · five white petals · five green sepals · red heart · black cross.
 * Reference: scraped/assets/images/2015/09/cropped-Lutherrose_small-1.png
 */
export function Lutherrose({
  title = "Lutherrose",
  ...props
}: SVGProps<SVGSVGElement> & { title?: string }) {
  const petals = [0, 72, 144, 216, 288];
  const sepals = [36, 108, 180, 252, 324];
  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>{title}</title>
      {/* gold ring + sky field */}
      <circle cx="100" cy="100" r="96" fill="#e9b824" stroke="#b8881a" strokeWidth="2.5" />
      <circle cx="100" cy="100" r="85" fill="#eaf2fa" stroke="#cdd9e6" strokeWidth="1" />
      {/* green sepals (behind petals) */}
      <g fill="#3f9140" stroke="#2d6b2e" strokeWidth="1">
        {sepals.map((a) => (
          <g key={a} transform={`rotate(${a} 100 100)`}>
            <ellipse cx="100" cy="52" rx="8" ry="24" />
            <circle cx="100" cy="30" r="6" />
          </g>
        ))}
      </g>
      {/* white petals */}
      <g fill="#ffffff" stroke="#c7c7c7" strokeWidth="1.2">
        {petals.map((a) => (
          <g key={a} transform={`rotate(${a} 100 100)`}>
            <ellipse cx="100" cy="55" rx="19" ry="31" />
          </g>
        ))}
      </g>
      {/* red heart */}
      <path
        d="M100 121 C87 108 77 100 77 91 C77 84 83 81 89 81 C94 81 98 84 100 88 C102 84 106 81 111 81 C117 81 123 84 123 91 C123 100 113 108 100 121 Z"
        fill="#e0242b"
        stroke="#a81a20"
        strokeWidth="1"
      />
      {/* black cross */}
      <path
        d="M96 85 h8 v9 h7 v8 h-7 v13 h-8 v-13 h-7 v-8 h7 z"
        fill="#141414"
      />
    </svg>
  );
}
