import { BookOpen, Users, Award, Target } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    icon: BookOpen,
    title: "Expert Physics Faculty",
    description:
      "Learn from experienced educators who simplify complex physics concepts for competitive exam success.",
  },
  {
    icon: Users,
    title: "Personalized Attention",
    description:
      "Small batch sizes ensure every student receives individualized guidance and support.",
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description:
      "Our students consistently excel in IIT-JEE, NEET, and board examinations year after year.",
  },
  {
    icon: Target,
    title: "Comprehensive Curriculum",
    description:
      "From Class 11 to advanced competitive preparation, we cover it all with precision.",
  },
];

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 md:py-28 bg-background relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-muted/50 -skew-x-12 translate-x-1/4" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className={`w-16 h-1.5 bg-accent rounded-full mx-auto mb-6 ${
              isVisible ? "animate-scale-in" : "opacity-0"
            }`}
          />
          <p
            className={`text-accent font-semibold text-lg mb-2 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            About Modulus Classes
          </p>
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 ${
              isVisible ? "animate-fade-in-up animation-delay-100" : "opacity-0"
            }`}
          >
            Why Choose Us
          </h2>
          <p
            className={`text-lg text-muted-foreground max-w-3xl mx-auto ${
              isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"
            }`}
          >
            At Modulus Classes, we're dedicated to nurturing the next generation
            of scientists and engineers. Our focused approach to Physics
            education has helped hundreds of students achieve their dreams.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - About Text */}
          <div
            className={`space-y-6 ${
              isVisible ? "animate-fade-in-left animation-delay-300" : "opacity-0"
            }`}
          >
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Making Things Positive
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Founded with a vision to make quality Physics education
                accessible, Modulus Classes has been guiding students towards
                success in competitive examinations. We specialize in providing
                expert coaching for Class 11 Physics, Class 12 Physics, IIT-JEE
                Physics, and NEET Physics.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our institute is entirely focused on competitive-oriented
                coaching, including preparation for board exams, JEE Mains, JEE
                Advanced, and NEET. With comprehensive study materials and
                expert faculty guidance, we help students enhance their thinking
                abilities, confidence levels, and intellectual skills.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Thanks to our rigorous coaching programs, many of our students
                have successfully cleared IIT-JEE and NEET exams, setting them
                on a path to successful careers in engineering and medicine.
              </p>
            </div>

            <button
              onClick={() => {
                const element = document.querySelector("#courses");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              Explore Our Courses
            </button>
          </div>

          {/* Right - Feature Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`bg-card rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group ${
                  isVisible
                    ? `animate-fade-in-up animation-delay-${(index + 3) * 100}`
                    : "opacity-0"
                }`}
                style={{
                  animationDelay: isVisible ? `${(index + 3) * 100}ms` : "0ms",
                }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
