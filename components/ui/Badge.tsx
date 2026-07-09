import { ReactNode } from "react";

type Variant =
  | "gold"
  | "green"
  | "red"
  | "yellow"
  | "blue"
  | "gray";

type BadgeProps = {
  children: ReactNode;
  variant?: Variant;
};

const variants: Record<Variant, string> = {
  gold: "bg-[#D2B07A]/20 text-[#D2B07A]",
  green: "bg-green-500/20 text-green-300",
  red: "bg-red-500/20 text-red-300",
  yellow: "bg-yellow-500/20 text-yellow-300",
  blue: "bg-blue-500/20 text-blue-300",
  gray: "bg-white/10 text-white/70",
};

export default function Badge({
  children,
  variant = "gray",
}: BadgeProps) {
  return (
    <span
      className={`rounded-full px-4 py-2 text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
}