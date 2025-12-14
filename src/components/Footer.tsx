import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import logo from "@/assets/logo.png";

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Courses", href: "#courses" },
  { name: "Syllabus", href: "#syllabus" },
  { name: "Notes", href: "#notes" },
  { name: "Contact", href: "#contact" },
];

const courses = [
  { name: "Class 11 (PCM/PCB)", href: "#courses" },
  { name: "Class 12 (PCM/PCB)", href: "#courses" },
  { name: "IIT-JEE (PCM)", href: "#courses" },
  { name: "NEET (PCB)", href: "#courses" },
  { name: "AI & Python", href: "#courses" },
];

const Footer = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Modulus Classes Logo"
                className="h-16 w-auto bg-white rounded-lg p-1"
              />
              <div>
                <h3 className="font-bold text-xl">MODULUS</h3>
                <p className="text-secondary text-sm">CLASSES</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Making Things Positive. Expert coaching for Class 11, Class
              12, IIT-JEE, NEET, and AI & Python. Join us to achieve your academic
              dreams!
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-secondary">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-secondary">Our Courses</h4>
            <ul className="space-y-3">
              {courses.map((course) => (
                <li key={course.name}>
                  <a
                    href={course.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(course.href);
                    }}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors"
                  >
                    {course.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-secondary">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <a
                  href="tel:+919999861338"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  +91 99998 61338
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <a
                  href="mailto:modulusclasses01@gmail.com"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors break-all"
                >
                  modulusclasses01@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80">
                  Live Online Classes
                  <br />
                  Join from anywhere!
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/70">
            <p>© 2024 Modulus Classes. All rights reserved.</p>
            <p>Making Things Positive</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
