/**
 * Skeleton animado para las tarjetas de producto.
 * Se muestra mientras se cargan los datos desde Supabase.
 */
export default function ProductSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          {/* Imagen */}
          <div className="relative h-48 bg-white/5 overflow-hidden">
            <div className="absolute inset-0 skeleton-shimmer" />
            {/* Tag placeholder */}
            <div className="absolute top-3 left-3 w-20 h-5 rounded-full bg-white/10 overflow-hidden">
              <div className="absolute inset-0 skeleton-shimmer" />
            </div>
          </div>

          {/* Info */}
          <div className="p-4 flex flex-col gap-3">
            {/* Brand */}
            <div className="w-14 h-3 rounded-full bg-white/10 overflow-hidden relative">
              <div className="absolute inset-0 skeleton-shimmer" />
            </div>
            {/* Name */}
            <div className="w-3/4 h-4 rounded-full bg-white/10 overflow-hidden relative">
              <div className="absolute inset-0 skeleton-shimmer" />
            </div>
            {/* Stars */}
            <div className="flex gap-1">
              {[...Array(5)].map((_, j) => (
                <div key={j} className="w-3 h-3 rounded-full bg-white/10 overflow-hidden relative">
                  <div className="absolute inset-0 skeleton-shimmer" />
                </div>
              ))}
            </div>
            {/* Price + button row */}
            <div className="flex items-center justify-between mt-1">
              <div className="w-16 h-6 rounded-full bg-white/10 overflow-hidden relative">
                <div className="absolute inset-0 skeleton-shimmer" />
              </div>
              <div className="w-20 h-7 rounded-full bg-white/10 overflow-hidden relative">
                <div className="absolute inset-0 skeleton-shimmer" />
              </div>
            </div>
          </div>
        </div>
      ))}

      <style>{`
        .skeleton-shimmer {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,255,255,0.06) 50%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
      `}</style>
    </div>
  )
}
