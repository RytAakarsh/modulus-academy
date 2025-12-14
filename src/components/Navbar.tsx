import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Courses", href: "#courses" },
  { name: "Syllabus", href: "#syllabus" },
  { name: "Notes", href: "#notes" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Main Navbar */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? "bg-primary shadow-lg"
            : "bg-primary"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#home");
              }}
              className="flex items-center gap-3"
            >
              <img
                src={logo}
                alt="Modulus Classes Logo"
                className="h-14 w-auto bg-white rounded-lg p-1"
              />
              <div className="hidden sm:block">
                <h1 className="text-primary-foreground font-bold text-xl leading-tight">
                  MODULUS
                </h1>
                <p className="text-secondary text-xs font-medium tracking-wider">
                  CLASSES
                </p>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-primary-foreground font-medium hover:text-secondary transition-colors duration-300 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+919999861338"
                className="flex items-center gap-2 text-primary-foreground hover:text-secondary transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">+91 99998 61338 </span>
              </a>
              <button
                onClick={() => scrollToSection("#contact")}
                className="bg-secondary text-secondary-foreground px-6 py-2.5 rounded-lg font-semibold hover:bg-orange transition-all duration-300 hover:shadow-lg"
              >
                Join Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-primary-foreground p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="container mx-auto px-4 py-4 bg-primary border-t border-primary-foreground/10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="block py-3 text-primary-foreground font-medium hover:text-secondary transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-primary-foreground/10">
              <a
                href="tel:+919999861338"
                className="flex items-center gap-2 text-primary-foreground"
              >
                <Phone className="w-4 h-4" />
                <span>+91 99998 61338 </span>
              </a>
              <a
                href="mailto:modulusclasses01@gmail.com"
                className="flex items-center gap-2 text-primary-foreground"
              >
                <Mail className="w-4 h-4" />
                <span>modulusclasses01@gmail.com</span>
              </a>
              <button
                onClick={() => scrollToSection("#contact")}
                className="bg-secondary text-secondary-foreground px-6 py-2.5 rounded-lg font-semibold mt-2"
              >
                Join Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Scrolling Banner */}
      <div className="bg-accent overflow-hidden">
        <div className="animate-marquee whitespace-nowrap py-2 flex">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="flex items-center mx-8 text-accent-foreground font-medium text-sm">
              <span className="mx-4">//</span>
              Live Online Classes
              <span className="mx-4">//</span>
              +91 99998 61338 || +91 99998 61336
              <span className="mx-4">//</span>
              Expert Faculty for PCM/PCB
              <span className="mx-4">//</span>
              IIT-JEE & NEET Preparation
            </span>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
