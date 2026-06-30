import Image from "next/image";

/**
 * The parish emblem — the original Luther rose artwork (PNG).
 * Pass a Tailwind size via className (e.g. "h-12 w-12"). Set alt="" for
 * decorative use next to a text wordmark.
 */
export function Lutherrose({
  className = "",
  alt = "Lutherrose",
}: {
  className?: string;
  alt?: string;
}) {
  return (
    <Image
      src="/brand/lutherrose.png"
      alt={alt}
      width={128}
      height={128}
      className={className}
      priority
    />
  );
}
