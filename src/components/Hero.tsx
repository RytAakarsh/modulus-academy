import { ArrowRight, Play, Star } from "lucide-react";
import hero3dStudent from "@/assets/hero-3d-student.png";

const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen pt-32 pb-16 relative overflow-hidden bg-gradient-hero"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm px-4 py-2 rounded-full border border-secondary/30 animate-fade-in-down">
              <Star className="w-4 h-4 text-secondary fill-secondary" />
              <span className="text-sm font-medium text-foreground">
                Empowering Future Scientists & Engineers
              </span>
            </div>

            {/* Red accent line */}
            <div className="w-16 h-1.5 bg-accent rounded-full animate-fade-in-left" />

            {/* Tagline */}
            <p className="text-lg md:text-xl text-muted-foreground font-medium animate-fade-in-up opacity-0 animation-delay-100">
              Master Science with Expert Guidance
            </p>

            {/* Main Heading */}
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground animate-fade-in-up opacity-0 animation-delay-200">
                WELCOME TO
              </h2>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black">
                <span className="text-primary animate-fade-in-up opacity-0 animation-delay-300 inline-block">
                  MODULUS
                </span>
                <br />
                <span className="text-accent animate-fade-in-up opacity-0 animation-delay-400 inline-block">
                  CLASSES
                </span>
              </h1>
            </div>

            {/* Courses */}
            <p className="text-xl md:text-2xl font-bold text-foreground animate-fade-in-up opacity-0 animation-delay-500">
              CLASS 11 | CLASS 12 | IIT-JEE | NEET | AI & PYTHON
            </p>

            {/* Description */}
            <p className="text-muted-foreground text-lg max-w-xl animate-fade-in-up opacity-0 animation-delay-600">
              At Modulus Classes, we provide comprehensive coaching for Class 11, 
              Class 12, IIT-JEE, NEET, and AI & Python programming. Our expert faculty 
              and personalized approach help students achieve their dreams in Science, Engineering & Technology.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-fade-in-up opacity-0 animation-delay-600">
              <button
                onClick={() => scrollToSection("#courses")}
                className="group bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <span>Our Courses</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection("#about")}
                className="group bg-foreground/10 backdrop-blur-sm text-foreground px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:bg-foreground/20 transition-all duration-300 border border-foreground/20"
              >
                <Play className="w-5 h-5" />
                <span>Our Story</span>
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4 animate-fade-in-up opacity-0 animation-delay-600">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">500+</p>
                <p className="text-sm text-muted-foreground">Students</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-accent">95%</p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-secondary">5+</p>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
            </div>
          </div>

          {/* Right Content - 3D Student Illustration */}
          <div className="relative h-[500px] lg:h-[600px] hidden md:flex items-center justify-center">
            <div className="relative animate-fade-in-right opacity-0 animation-delay-300">
              <img 
                src={hero3dStudent} 
                alt="3D Student with educational elements" 
                className="w-full max-w-lg h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
              
              {/* Floating decorative elements */}
              <div className="absolute -bottom-4 -left-8 w-20 h-20 rounded-full bg-accent/20 animate-float blur-sm" />
              <div className="absolute top-10 -right-4 w-12 h-12 rounded-full bg-secondary/30 animate-float animation-delay-300" />
              <div className="absolute -top-8 left-1/4 w-16 h-16 rounded-full bg-primary/20 animate-float animation-delay-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
