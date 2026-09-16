import { useEffect, useRef, useState } from "react";
import { MapPin, Sparkles, Zap, Maximize2 } from "lucide-react";
import highwayBg from "../../assets/highway-night.jpg";

const features = [
  {
    icon: MapPin,
    title: "Track in Real-time",
    description: "Monitor your entire network across all touchpoints.",
  },
  {
    icon: Sparkles,
    title: "Predict & Prevent",
    description: "Identify risks before they become delays.",
  },
  {
    icon: Zap,
    title: "Act Faster",
    description: "Take control with intelligent automation.",
  },
  {
    icon: Maximize2,
    title: "Scale Effortlessly",
    description: "Built for growing logistics networks.",
  },
];

function ModernLogisticsSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden border-t border-[#18304A]/60"
    >
      {/* Background Image with Cinematic Highway & Truck */}
      <div className="absolute inset-0 z-0">
        <img
          src={highwayBg}
          alt="Logistics transport network at night"
          className="h-full w-full object-cover object-center opacity-30"
        />
        {/* Gradients for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020812] via-[#020812]/95 to-[#020812]/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020812] via-transparent to-[#020812]/80" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-8 py-24 lg:px-12 lg:py-28">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12 lg:gap-20">
          
          {/* Left Column: Heading & Summary */}
          <div className="lg:col-span-5">
            {/* Eyebrow */}
            <div
              className={`flex items-center gap-3 transition-all duration-700 ease-out ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <span className="text-[11px] font-semibold tracking-[0.2em] text-[#38BDF8]">
                BUILT FOR MODERN LOGISTICS
              </span>
              <span className="h-px w-10 bg-[#38BDF8]/60" />
            </div>

            {/* Headline */}
            <h2
              className={`mt-7 text-3xl font-bold leading-[1.05] tracking-[-0.04em] text-white transition-all delay-100 duration-700 ease-out sm:text-4xl lg:text-[48px] ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <span className="block">Complete visibility.</span>
              <span className="mt-1 block text-[#2196F3]">
                Real-time control.
              </span>
            </h2>

            {/* Description */}
            <p
              className={`mt-7 max-w-[430px] text-[14px] leading-[1.8] text-[#9AAABD] transition-all delay-200 duration-700 ease-out ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              From global supply chains to local deliveries, InMotion gives you
              complete visibility, intelligent insights and the power to act — all
              in one place.
            </p>
          </div>

          {/* Right Column: 4 Feature Pillars */}
          <div
            className="lg:col-span-7"
          >
            <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-x-12">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    style={{ transitionDelay: `${360 + index * 80}ms` }}
                    className={`group flex gap-4 border-t border-[#18304A]/75 py-6 first:border-t-0 transition-all duration-700 ease-out sm:py-7 ${
                      isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    } ${
                      index === 1 ? "sm:border-t-0" : ""
                    }`}
                  >
                    {/* Icon Container */}
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border border-[#1E3A5F] bg-[#071322]/75 text-[#38BDF8] transition-colors duration-200 group-hover:border-[#2196F3]">
                      <Icon size={17} strokeWidth={1.8} />
                    </div>

                    <div>
                      <h3 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition-colors duration-200 group-hover:text-[#38BDF8]">
                        {feature.title.toUpperCase()}
                      </h3>
                      <p className="mt-1.5 max-w-[240px] text-[12px] leading-[1.65] text-[#94A3B8]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ModernLogisticsSection;
