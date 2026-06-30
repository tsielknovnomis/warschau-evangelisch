import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aubergine focus-visible:ring-offset-2 disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-coral text-white hover:bg-coral-600",
  secondary:
    "border border-aubergine text-aubergine hover:bg-aubergine-50",
  ghost: "text-aubergine hover:bg-aubergine-50",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3 text-lg",
};

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  href?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  href,
  ...rest
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (typeof href === "string") {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
