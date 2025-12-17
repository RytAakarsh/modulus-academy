import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Courses from "@/components/Courses";
import Syllabus from "@/components/Syllabus";
import Notes from "@/components/Notes";
import Approach from "@/components/Approach";
import Testimonials from "@/components/Testimonials";
import Stats from "@/components/Stats";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <Helmet>
        <title>Modulus Classes | Expert Coaching for IIT-JEE, NEET, Class 11 & 12, AI & Python</title>
        <meta
          name="description"
          content="Join Modulus Classes for expert coaching in Physics, Chemistry, Maths, Biology. We offer courses for Class 11, Class 12, IIT-JEE, NEET, and AI & Python programming."
        />
        <meta
          name="keywords"
          content="IIT-JEE coaching, NEET preparation, Class 11, Class 12, Physics, Chemistry, Maths, Biology, AI Python course, online classes"
        />
        <meta name="author" content="Modulus Classes" />
        <link rel="canonical" href="https://modulusclasses.com" />
      </Helmet>

      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      <main className={`min-h-screen bg-background ${showSplash ? 'opacity-0' : 'animate-fade-in'}`}>
        <Navbar />
        <Hero />
        <About />
        <Courses />
        <Syllabus />
        <Notes />
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
