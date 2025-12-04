import { ArrowRight, Clock, Users, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const courses = [
  {
    id: 1,
    title: "Class 11 Physics",
    subtitle: "Foundation Course",
    description:
      "Build a strong foundation in Physics with comprehensive coverage of Class 11 NCERT and competitive exam preparation.",
    features: ["Mechanics", "Thermodynamics", "Waves", "Live Classes"],
    color: "from-green-400 to-green-600",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    duration: "1 Year",
    students: "100+",
  },
  {
    id: 2,
    title: "Class 12 Physics",
    subtitle: "Advanced Course",
    description:
      "Master advanced Physics concepts for board exams and competitive preparations with expert guidance.",
    features: ["Electrodynamics", "Optics", "Modern Physics", "Board Prep"],
    color: "from-secondary to-orange",
    bgColor: "bg-secondary/10",
    iconColor: "text-secondary",
    duration: "1 Year",
    students: "150+",
  },
  {
    id: 3,
    title: "IIT-JEE Physics",
    subtitle: "Competitive Excellence",
    description:
      "Intensive preparation for JEE Main and Advanced with problem-solving techniques and concept clarity.",
    features: ["JEE Main", "JEE Advanced", "Mock Tests", "Doubt Sessions"],
    color: "from-primary to-navy-light",
    bgColor: "bg-primary/10",
    iconColor: "text-primary",
    duration: "2 Years",
    students: "200+",
  },
  {
    id: 4,
    title: "NEET Physics",
    subtitle: "Medical Entrance",
    description:
      "Specialized Physics coaching for NEET aspirants with focus on NCERT and competitive problem-solving.",
    features: ["NCERT Based", "NEET Pattern", "Previous Years", "Test Series"],
    color: "from-accent to-red-light",
    bgColor: "bg-accent/10",
    iconColor: "text-accent",
    duration: "2 Years",
    students: "180+",
  },
];

const Courses = () => {
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
      id="courses"
      ref={sectionRef}
      className="py-20 md:py-28 bg-muted/30 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl" />
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
            Our Courses
          </p>
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 ${
              isVisible ? "animate-fade-in-up animation-delay-100" : "opacity-0"
            }`}
          >
            Featured Learning Paths
          </h2>
          <p
            className={`text-lg text-muted-foreground max-w-3xl mx-auto ${
              isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"
            }`}
          >
            Choose from our specialized Physics courses designed for different
            academic levels and competitive examinations.
          </p>
        </div>

        {/* Course Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <div
              key={course.id}
              className={`group bg-card rounded-2xl overflow-hidden shadow-lg border border-border hover:shadow-2xl transition-all duration-500 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{
                animationDelay: isVisible ? `${(index + 2) * 100}ms` : "0ms",
              }}
            >
              {/* Card Header with Gradient */}
              <div
                className={`h-32 bg-gradient-to-br ${course.color} relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white/80 text-sm font-medium">
                    {course.subtitle}
                  </p>
                  <h3 className="text-white text-xl font-bold">
                    {course.title}
                  </h3>
                </div>
                {/* Decorative circle */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
              </div>

              {/* Card Body */}
              <div className="p-6">
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {course.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.features.map((feature) => (
                    <span
                      key={feature}
                      className={`${course.bgColor} ${course.iconColor} text-xs font-medium px-2 py-1 rounded-full`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{course.students}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-secondary text-secondary" />
                    <span>4.9</span>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => {
                    const element = document.querySelector("#contact");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-foreground/5 hover:bg-primary hover:text-primary-foreground text-foreground py-3 rounded-xl font-semibold transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
                >
                  <span>Enroll Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
