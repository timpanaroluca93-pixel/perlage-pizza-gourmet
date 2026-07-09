type HeaderProps = {
  title: string;
  subtitle?: string;
};

export default function Header({
  title,
  subtitle,
}: HeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-2">
      <p className="text-xs uppercase tracking-[0.35em] text-white/40">
        Perlage OS
      </p>

      <h1 className="text-4xl font-light text-[#D2B07A]">
        {title}
      </h1>

      {subtitle && (
        <p className="text-white/50">
          {subtitle}
        </p>
      )}
    </div>
  );
}