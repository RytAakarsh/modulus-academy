import { useEffect, useRef, useState } from "react";
import { Users, Trophy, BookOpen, Star } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: 1000,
    suffix: "+",
    label: "Students Enrolled",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Trophy,
    value: 95,
    suffix: "%",
    label: "Success Rate",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: BookOpen,
    value: 5,
    suffix: "+",
    label: "Courses",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Star,
    value: 10,
    suffix: "+",
    label: "Years Experience",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
];

const useCountUp = (end: number, duration: number = 2000, start: boolean = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);

  return count;
};

const StatCard = ({
  stat,
  index,
  isVisible,
}: {
  stat: (typeof stats)[0];
  index: number;
  isVisible: boolean;
}) => {
  const count = useCountUp(stat.value, 2000, isVisible);

  return (
    <div
      className={`text-center group ${
        isVisible ? "animate-fade-in-up" : "opacity-0"
      }`}
      style={{
        animationDelay: isVisible ? `${(index + 1) * 150}ms` : "0ms",
      }}
    >
      <div
        className={`w-20 h-20 mx-auto rounded-2xl ${stat.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
      >
        <stat.icon className={`w-10 h-10 ${stat.color}`} />
      </div>
      <div className="text-4xl md:text-5xl font-black text-foreground mb-2">
        {count}
        {stat.suffix}
      </div>
      <p className="text-muted-foreground font-medium">{stat.label}</p>
    </div>
  );
};

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-muted/30 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-20 w-40 h-40 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className={`w-16 h-1.5 bg-accent rounded-full mx-auto mb-6 ${
              isVisible ? "animate-scale-in" : "opacity-0"
            }`}
          />
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            Numbers Speak
          </h2>
          <p
            className={`text-lg text-muted-foreground max-w-2xl mx-auto ${
              isVisible ? "animate-fade-in-up animation-delay-100" : "opacity-0"
            }`}
          >
            Our results reflect our commitment to excellence. Join us and be a
            part of our growing legacy!
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
