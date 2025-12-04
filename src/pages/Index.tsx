import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Courses from "@/components/Courses";
import Syllabus from "@/components/Syllabus";
import Mentors from "@/components/Mentors";
import Approach from "@/components/Approach";
import Testimonials from "@/components/Testimonials";
import Stats from "@/components/Stats";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Modulus Classes | Expert Physics Coaching for IIT-JEE, NEET, Class 11 & 12</title>
        <meta
          name="description"
          content="Join Modulus Classes for expert Physics coaching. We offer specialized courses for Class 11, Class 12, IIT-JEE, and NEET preparation with experienced faculty and proven results."
        />
        <meta
          name="keywords"
          content="Physics coaching, IIT-JEE preparation, NEET Physics, Class 11 Physics, Class 12 Physics, online Physics classes, competitive exam preparation"
        />
        <meta name="author" content="Modulus Classes" />
        <link rel="canonical" href="https://modulusclasses.com" />
      </Helmet>

      <main className="min-h-screen bg-background">
        <Navbar />
        <Hero />
        <About />
        <Courses />
        <Syllabus />
        <Mentors />
        <Approach />
        <Testimonials />
        <Stats />
        <Contact />
        <Footer />
      </main>
    </>
  );
};

export default Index;
