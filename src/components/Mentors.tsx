import { useEffect, useRef, useState } from "react";
import { Linkedin, Mail, GraduationCap, Award } from "lucide-react";

const mentors = [
  {
    id: 1,
    name: "Abhinav Sir",
    role: "Founder & Lead Physics Faculty",
    qualification: "Physics Expert",
    experience: "5+ Years",
    specialization: "IIT-JEE & NEET Physics",
    description:
      "Passionate educator dedicated to making Physics concepts crystal clear for competitive exam aspirants.",
    achievements: ["500+ Students Mentored", "95% Success Rate", "Expert Problem Solver"],
    color: "from-primary to-navy-light",
  },
  {
    id: 2,
    name: "Physics Expert",
    role: "Senior Faculty - Mechanics",
    qualification: "M.Sc Physics",
    experience: "8+ Years",
    specialization: "Mechanics & Waves",
    description:
      "Specialist in Mechanics with a unique approach to problem-solving that simplifies complex concepts.",
    achievements: ["IIT-JEE Ranker", "Research Publications", "National Award Winner"],
    color: "from-secondary to-orange",
  },
  {
    id: 3,
    name: "Senior Mentor",
    role: "Faculty - Modern Physics",
    qualification: "PhD Physics",
    experience: "10+ Years",
    specialization: "Modern Physics & Optics",
    description:
      "PhD holder with extensive experience in teaching advanced Physics for competitive examinations.",
    achievements: ["PhD from Premier Institute", "100+ Research Papers", "Expert in Modern Physics"],
    color: "from-accent to-red-light",
  },
  {
    id: 4,
    name: "Expert Faculty",
    role: "Faculty - Electrodynamics",
    qualification: "M.Tech",
    experience: "6+ Years",
    specialization: "Electromagnetism & Current Electricity",
    description:
      "Engineering background combined with teaching expertise makes complex electrical concepts easy to understand.",
    achievements: ["Industry Experience", "Concept Clarity Expert", "Student Favorite"],
    color: "from-green-500 to-green-700",
  },
];

const Mentors = () => {
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
      id="mentors"
      ref={sectionRef}
      className="py-20 md:py-28 bg-muted/30 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>

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
            Our Team
          </p>
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 ${
              isVisible ? "animate-fade-in-up animation-delay-100" : "opacity-0"
            }`}
          >
            Meet Our Mentors
          </h2>
          <p
            className={`text-lg text-muted-foreground max-w-3xl mx-auto ${
              isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"
            }`}
          >
            Learn from the best! Our experienced faculty members are dedicated
            to helping you achieve your academic goals with personalized
            attention and expert guidance.
          </p>
        </div>

        {/* Mentor Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mentors.map((mentor, index) => (
            <div
              key={mentor.id}
              className={`group bg-card rounded-2xl overflow-hidden shadow-lg border border-border hover:shadow-2xl transition-all duration-500 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{
                animationDelay: isVisible ? `${(index + 2) * 100}ms` : "0ms",
              }}
            >
              {/* Profile Header */}
              <div
                className={`h-40 bg-gradient-to-br ${mentor.color} relative flex items-center justify-center`}
              >
                <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30">
                  <span className="text-3xl font-bold text-white">
                    {mentor.name.charAt(0)}
                  </span>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10" />
                <div className="absolute bottom-4 left-4 w-6 h-6 rounded-full bg-white/10" />
              </div>

              {/* Card Body */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {mentor.name}
                </h3>
                <p className="text-primary font-medium text-sm mb-2">
                  {mentor.role}
                </p>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {mentor.description}
                </p>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <GraduationCap className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground truncate">
                      {mentor.qualification}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="w-4 h-4 text-secondary" />
                    <span className="text-muted-foreground">
                      {mentor.experience}
                    </span>
                  </div>
                </div>

                {/* Achievements */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {mentor.achievements.slice(0, 2).map((achievement) => (
                    <span
                      key={achievement}
                      className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
                    >
                      {achievement}
                    </span>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <button className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center text-accent hover:bg-accent hover:text-accent-foreground transition-colors">
                    <Mail className="w-4 h-4" />
                  </button>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {mentor.specialization}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mentors;
