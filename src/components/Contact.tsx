import { useEffect, useRef, useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", course: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 md:py-28 bg-background relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-60 h-60 bg-secondary/5 rounded-full blur-3xl" />
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
            Get In Touch
          </p>
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 ${
              isVisible ? "animate-fade-in-up animation-delay-100" : "opacity-0"
            }`}
          >
            Contact Us
          </h2>
          <p
            className={`text-lg text-muted-foreground max-w-3xl mx-auto ${
              isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"
            }`}
          >
            Ready to start your journey with Modulus Classes? Reach out to us
            today and take the first step towards your dream career!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div
            className={`space-y-8 ${
              isVisible ? "animate-fade-in-left animation-delay-300" : "opacity-0"
            }`}
          >
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                    <a
                      href="tel:+919999861338"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +91 87009 46839
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Email</h4>
                    <a
                      href="mailto:abhinav.asus.01@gmail.com"
                      className="text-muted-foreground hover:text-primary transition-colors break-all"
                    >
                      abhinav.asus.01@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Class Timings
                    </h4>
                    <p className="text-muted-foreground">
                      Mon - Sat: 9:00 AM - 8:00 PM
                      <br />
                      Sunday: By Appointment
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Location
                    </h4>
                    <p className="text-muted-foreground">
                      Live Online Classes
                      <br />
                      Join from anywhere!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick CTA */}
            <div className="bg-gradient-to-r from-primary to-navy-light rounded-2xl p-8 text-primary-foreground">
              <h3 className="text-xl font-bold mb-2">
                Ready to Join?
              </h3>
              <p className="text-primary-foreground/80 mb-4">
                Get a free demo class and see our teaching methodology in action!
              </p>
              <a
                href="tel:+919999861338"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-xl font-semibold hover:bg-orange transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>Call Now</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`${
              isVisible ? "animate-fade-in-right animation-delay-400" : "opacity-0"
            }`}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-2xl p-8 shadow-lg border border-border space-y-6"
            >
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Send us a Message
              </h3>
              <p className="text-muted-foreground mb-6">
                Fill out the form below and we'll get back to you shortly.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Select Course *
                </label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none"
                >
                  <option value="">Choose a course</option>
                  <option value="class11">Class 11 (PCM/PCB)</option>
                  <option value="class12">Class 12 (PCM/PCB)</option>
                  <option value="iitjee">IIT-JEE (Physics, Chemistry, Maths)</option>
                  <option value="neet">NEET (Physics, Chemistry, Biology)</option>
                  <option value="ai-python">AI & Python Programming</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about your requirements..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
