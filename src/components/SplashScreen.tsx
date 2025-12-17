import { useState, useEffect } from "react";
import logoImg from "@/assets/logo.png";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out after 2 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    // Complete and unmount after fade animation (2s + 0.8s fade)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-background transition-opacity duration-800 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      
      {/* Animated circles in background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-accent/10 rounded-full blur-2xl animate-pulse delay-1000" />
      </div>

      {/* Logo container */}
      <div className="relative flex flex-col items-center gap-8">
        {/* Logo with scale animation */}
        <div className="animate-scale-in">
          <img
            src={logoImg}
            alt="Modulus Classes"
            className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 object-contain drop-shadow-2xl"
          />
        </div>

        {/* Brand name with fade-in */}
        <div className="animate-fade-in animation-delay-300">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-foreground tracking-wide">
            <span className="text-primary">Modulus</span>{" "}
            <span className="text-secondary">Classes</span>
          </h1>
        </div>

        {/* Tagline */}
        <div className="animate-fade-in animation-delay-600">
          <p className="text-base md:text-xl lg:text-2xl text-muted-foreground font-medium">
            Making Things Positive
          </p>
        </div>

        {/* Loading indicator */}
        <div className="animate-fade-in animation-delay-900 mt-4">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
