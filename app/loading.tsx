export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center overflow-hidden bg-[#050505]">
      <div className="relative flex flex-col items-center">
        <div className="absolute h-40 w-40 rounded-full border border-[#D2B07A]/20" />

        <div className="absolute h-56 w-56 animate-pulse rounded-full border border-[#D2B07A]/10" />

        <div className="relative">
          <h1 className="text-center text-5xl font-light tracking-[0.35em] text-[#D2B07A] md:text-7xl">
            PERLAGE
          </h1>

          <div className="mt-6 h-px w-full overflow-hidden bg-white/10">
            <div className="loading-line h-full w-1/2 bg-[#D2B07A]" />
          </div>

          <p className="mt-6 text-center text-xs uppercase tracking-[0.45em] text-white/40">
            Pizza & Restaurant
          </p>
        </div>
      </div>
    </main>
  );
}