const QuoteBanner = () => (
  <section className="relative bg-slate-900 py-20 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-orange-950/60" />
    <div className="absolute top-1/2 -translate-y-1/2 -right-24 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />

    <div className="relative max-w-4xl mx-auto px-6 text-center">
      <p className="text-2xl sm:text-4xl font-extrabold text-white italic leading-snug">
        "Let's Shop Beyond Boundaries"
      </p>
      <p className="text-slate-400 mt-4 text-sm">
        Quality products, trusted sellers, delivered to your door.
      </p>
    </div>
  </section>
);

export default QuoteBanner;