import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

const SLIDES = [
  {
    tag: "Big Fashion Sale",
    heading: "Limited Time Offer! Up to 50% OFF",
    subtext: "Redefine your everyday style.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
  },
  {
    tag: "New Arrivals",
    heading: "Fresh Styles, Just Landed",
    subtext: "Be the first to shop this week's drops.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
  },
  {
    tag: "Free Delivery",
    heading: "Shop More, Pay Less on Shipping",
    subtext: "Free delivery on every order, every day.",
    image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800",
  },
];

const Hero = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[active];

  return (
    <section className="relative overflow-hidden bg-slate-900">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-orange-950" />
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-10 sm:py-12">
        <div className="grid lg:grid-cols-2 items-center gap-8">
          {/* Left */}
          <div className="text-white">
            <span className="inline-block bg-orange-500/15 text-orange-400 border border-orange-500/30 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
              {slide.tag}
            </span>

            <h1 className="text-3xl sm:text-4xl font-extrabold mt-4 leading-tight tracking-tight">
              {slide.heading}
            </h1>

            <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-md">
              {slide.subtext}
            </p>

            <Link
              to="/products"
              className="group inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold text-sm mt-6 transition"
            >
              Shop Now
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right */}
          <div className="relative hidden lg:block h-56">
            <img
              src={slide.image}
              alt={slide.heading}
              className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        {/* Dots */}
        <div className="flex gap-2 mt-8">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-8 bg-orange-500" : "w-4 bg-white/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;