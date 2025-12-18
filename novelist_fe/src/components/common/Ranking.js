export default function RankIcon({
  rank = 1,
  size = 40,
  color = "text-slate-300",
  scaleByRank = false,
}) {
  const scale = scaleByRank ? 1 / rank : 1;
  const finalSize = size * scale;

  return (
    <div
      className={`relative flex items-center justify-center ${color}`}
      style={{ width: finalSize, height: finalSize }}
    >

      {/* 🌟 Shine overlay */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <div
          className="
            absolute top-0 left-0
            w-[45%] h-full
            bg-white/100
            blur-lg
            animate-shine-smooth
          "
        />
      </div>

      {/* ICON */}
      <svg
        viewBox="0 0 100 100"
        fill="currentColor"
        width={finalSize}
        height={finalSize}
      >
        <path d="M50 5l6 12 13 2-9 10 2 14-12-7-12 7 2-14-9-10 13-2z" />
        <path d="M20 40c-4 10-2 24 8 33 10 10 24 12 34 8-12-3-22-10-28-20-6-9-8-18-6-26z" />
        <path d="M80 40c4 10 2 24-8 33-10 10-24 12-34 8 12-3 22-10 28-20 6-9 8-18 6-26z" />
        <text
          x="50"
          y="65"
          textAnchor="middle"
          fontSize="32"
          fontWeight="700"
          fill="currentColor"
        >
          {rank}
        </text>
      </svg>
    </div>
  );
}
