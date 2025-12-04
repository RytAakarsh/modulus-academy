import { useEffect, useRef, useState } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "IIT Delhi - CSE",
    rating: 5,
    text: "The Physics coaching at Modulus Classes was exceptional. The way concepts were explained made even the most difficult topics easy to understand. I cleared JEE Advanced with a great rank!",
    image: "RS",
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "AIIMS Delhi",
    rating: 5,
    text: "The NEET Physics preparation here was top-notch. The faculty's approach to problem-solving and concept clarity helped me score 180+ in Physics. Highly recommended!",
    image: "PP",
  },
  {
    id: 3,
    name: "Amit Kumar",
    role: "NIT Trichy - ECE",
    rating: 5,
    text: "From Class 11 basics to JEE level problems, the journey at Modulus Classes was incredible. The personalized attention and doubt sessions were game-changers for me.",
    image: "AK",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    role: "JIPMER",
    rating: 5,
    text: "The study materials and test series provided were extremely helpful. The faculty understood exactly what NEET requires and prepared us accordingly. Thank you Modulus Classes!",
    image: "SR",
  },
  {
    id: 5,
    name: "Vikash Singh",
    role: "IIT Bombay - ME",
    rating: 5,
    text: "The dedication of the teachers and the quality of teaching is unmatched. They made Physics my strongest subject. Forever grateful to the entire team!",
    image: "VS",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
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

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-background relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-60 h-60 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
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
            Testimonials
          </p>
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 ${
              isVisible ? "animate-fade-in-up animation-delay-100" : "opacity-0"
            }`}
          >
            Reviews From Happy Learners
          </h2>
          <p
            className={`text-lg text-muted-foreground max-w-3xl mx-auto ${
              isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"
            }`}
          >
            Hear from our successful students who have achieved their dreams with
            Modulus Classes. Their inspiring stories reflect the quality of
            education and expert guidance they received.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div
          className={`relative max-w-4xl mx-auto ${
            isVisible ? "animate-fade-in-up animation-delay-300" : "opacity-0"
          }`}
        >
          {/* Main Testimonial Card */}
          <div className="bg-card rounded-3xl shadow-2xl border border-border p-8 md:p-12 relative overflow-hidden">
            {/* Quote Icon */}
            <Quote className="absolute top-6 right-6 w-20 h-20 text-primary/10" />

            {/* Content */}
            <div className="relative z-10">
              {/* Stars */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-secondary text-secondary"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 italic">
                "{testimonials[currentIndex].text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-navy-light flex items-center justify-center text-primary-foreground font-bold text-xl">
                  {testimonials[currentIndex].image}
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-lg">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-primary font-medium">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? "w-8 h-2 bg-primary"
                      : "w-2 h-2 bg-border hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
