import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "success" | "danger" | "warning";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-[#D2B07A] text-black hover:brightness-110",
  secondary:
    "bg-white/10 text-white hover:bg-white/20",
  success:
    "bg-green-500/20 text-green-300 hover:bg-green-500/30",
  danger:
    "bg-red-500/20 text-red-300 hover:bg-red-500/30",
  warning:
    "bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30",
};

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`rounded-full px-5 py-3 text-sm font-medium transition-all ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}