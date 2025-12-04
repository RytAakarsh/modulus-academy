import { useEffect, useRef, useState } from "react";
import { BookOpen, Users, Brain, Target, Lightbulb, Trophy } from "lucide-react";

const approaches = [
  {
    icon: BookOpen,
    number: "01",
    title: "Advanced Study Materials",
    description:
      "Meticulously curated study materials designed to challenge and broaden your understanding. These resources are tailored to push boundaries and equip you with the knowledge necessary to excel.",
  },
  {
    icon: Users,
    number: "02",
    title: "Expert Guidance",
    description:
      "Learn from seasoned faculty who bring years of expertise. Our educators understand the intricate nuances of competitive exams and provide insights that simplify complex concepts.",
  },
  {
    icon: Brain,
    number: "03",
    title: "Skill Enhancement",
    description:
      "Programs built to improve critical thinking abilities, boost confidence, and sharpen intellectual skills. We help develop a mindset for challenges both inside and outside the exam hall.",
  },
  {
    icon: Target,
    number: "04",
    title: "Personalized Attention",
    description:
      "With small batch sizes, we ensure every student receives the care they deserve. This personalized approach allows us to address individual needs and foster better learning outcomes.",
  },
];

const Approach = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-primary relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="absolute top-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className={`w-16 h-1.5 bg-secondary rounded-full mx-auto mb-6 ${
              isVisible ? "animate-scale-in" : "opacity-0"
            }`}
          />
          <p
            className={`text-secondary font-semibold text-lg mb-2 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            Our Methodology
          </p>
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 ${
              isVisible ? "animate-fade-in-up animation-delay-100" : "opacity-0"
            }`}
          >
            Our Unique Approach to Success
          </h2>
          <p
            className={`text-lg text-primary-foreground/80 max-w-3xl mx-auto ${
              isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"
            }`}
          >
            Our approach focuses on providing advanced study materials, expert
            guidance, and personalized attention to enhance students' skills,
            confidence, and intellectual growth.
          </p>
        </div>

        {/* Approach Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {approaches.map((approach, index) => (
            <div
              key={approach.title}
              className={`group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-secondary/50 transition-all duration-500 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{
                animationDelay: isVisible ? `${(index + 2) * 100}ms` : "0ms",
              }}
            >
              <div className="flex items-start gap-6">
                {/* Number */}
                <div className="relative">
                  <span className="text-6xl font-black text-white/10 group-hover:text-secondary/20 transition-colors">
                    {approach.number}
                  </span>
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center group-hover:bg-secondary group-hover:scale-110 transition-all duration-300">
                    <approach.icon className="w-6 h-6 text-secondary group-hover:text-secondary-foreground transition-colors" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <h3 className="text-xl font-bold text-primary-foreground mb-3 group-hover:text-secondary transition-colors">
                    {approach.title}
                  </h3>
                  <p className="text-primary-foreground/70 leading-relaxed">
                    {approach.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center mt-16 ${
            isVisible ? "animate-fade-in-up animation-delay-600" : "opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-secondary" />
              <span className="text-primary-foreground font-medium">
                Creating an environment where students succeed academically and grow
                personally
              </span>
            </div>
            <Trophy className="w-8 h-8 text-secondary animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Approach;
