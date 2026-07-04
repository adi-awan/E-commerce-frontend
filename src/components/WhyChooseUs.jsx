import { Truck, ShieldCheck, RotateCcw, Star } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free delivery on all orders above Rs. 2,000.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "100% secure payments with trusted gateways.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "7-day hassle-free return policy.",
  },
  {
    icon: Star,
    title: "Premium Quality",
    description: "Only genuine and high-quality products.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-orange-600">
            Our Promise
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            Why Choose ShopHub?
          </h2>
          <p className="text-slate-500 mt-3">
            Everything you need for a great shopping experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-orange-50 flex items-center justify-center">
                  <Icon size={30} className="text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mt-6 text-slate-900">
                  {feature.title}
                </h3>
                <p className="text-slate-500 mt-3 text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;