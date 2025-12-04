import { useState, useEffect, useRef } from "react";
import { ChevronDown, BookOpen, CheckCircle } from "lucide-react";

const syllabusData = [
  {
    id: "class11",
    title: "Class 11 Physics",
    color: "bg-green-500",
    chapters: [
      { name: "Physical World", topics: 8 },
      { name: "Units and Measurements", topics: 12 },
      { name: "Motion in a Straight Line", topics: 15 },
      { name: "Motion in a Plane", topics: 14 },
      { name: "Laws of Motion", topics: 18 },
      { name: "Work, Energy and Power", topics: 16 },
      { name: "System of Particles and Rotational Motion", topics: 20 },
      { name: "Gravitation", topics: 14 },
      { name: "Mechanical Properties of Solids", topics: 10 },
      { name: "Mechanical Properties of Fluids", topics: 12 },
      { name: "Thermal Properties of Matter", topics: 14 },
      { name: "Thermodynamics", topics: 16 },
      { name: "Kinetic Theory", topics: 10 },
      { name: "Oscillations", topics: 14 },
      { name: "Waves", topics: 16 },
    ],
  },
  {
    id: "class12",
    title: "Class 12 Physics",
    color: "bg-secondary",
    chapters: [
      { name: "Electric Charges and Fields", topics: 14 },
      { name: "Electrostatic Potential and Capacitance", topics: 16 },
      { name: "Current Electricity", topics: 18 },
      { name: "Moving Charges and Magnetism", topics: 16 },
      { name: "Magnetism and Matter", topics: 12 },
      { name: "Electromagnetic Induction", topics: 14 },
      { name: "Alternating Current", topics: 12 },
      { name: "Electromagnetic Waves", topics: 10 },
      { name: "Ray Optics and Optical Instruments", topics: 18 },
      { name: "Wave Optics", topics: 14 },
      { name: "Dual Nature of Radiation and Matter", topics: 12 },
      { name: "Atoms", topics: 10 },
      { name: "Nuclei", topics: 12 },
      { name: "Semiconductor Electronics", topics: 16 },
    ],
  },
  {
    id: "iitjee",
    title: "IIT-JEE Physics",
    color: "bg-primary",
    chapters: [
      { name: "Mechanics (Advanced)", topics: 45 },
      { name: "Fluid Mechanics", topics: 20 },
      { name: "Thermal Physics", topics: 25 },
      { name: "SHM and Waves", topics: 22 },
      { name: "Electrostatics", topics: 28 },
      { name: "Current Electricity & Magnetism", topics: 30 },
      { name: "Electromagnetic Induction", topics: 18 },
      { name: "Optics (Geometrical & Wave)", topics: 24 },
      { name: "Modern Physics", topics: 26 },
      { name: "Error Analysis & Experiments", topics: 15 },
    ],
  },
  {
    id: "neet",
    title: "NEET Physics",
    color: "bg-accent",
    chapters: [
      { name: "Mechanics", topics: 35 },
      { name: "Properties of Matter", topics: 18 },
      { name: "Heat and Thermodynamics", topics: 22 },
      { name: "Oscillations and Waves", topics: 18 },
      { name: "Electrostatics", topics: 20 },
      { name: "Current Electricity", topics: 18 },
      { name: "Magnetic Effects of Current", topics: 16 },
      { name: "EMI and AC", topics: 14 },
      { name: "Optics", topics: 20 },
      { name: "Modern Physics", topics: 18 },
      { name: "Electronic Devices", topics: 12 },
    ],
  },
];

const Syllabus = () => {
  const [activeTab, setActiveTab] = useState("class11");
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);
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

  const toggleChapter = (chapterName: string) => {
    setExpandedChapters((prev) =>
      prev.includes(chapterName)
        ? prev.filter((c) => c !== chapterName)
        : [...prev, chapterName]
    );
  };

  const activeSyllabus = syllabusData.find((s) => s.id === activeTab);

  return (
    <section
      id="syllabus"
      ref={sectionRef}
      className="py-20 md:py-28 bg-background relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-40 right-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl" />
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
            Chase The Syllabus
          </p>
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 ${
              isVisible ? "animate-fade-in-up animation-delay-100" : "opacity-0"
            }`}
          >
            Complete Physics Syllabus
          </h2>
          <p
            className={`text-lg text-muted-foreground max-w-3xl mx-auto ${
              isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"
            }`}
          >
            Explore our comprehensive syllabus coverage for each course. We
            ensure thorough preparation with chapter-wise planning and topic
            mastery.
          </p>
        </div>

        {/* Tab Navigation */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-12 ${
            isVisible ? "animate-fade-in-up animation-delay-300" : "opacity-0"
          }`}
        >
          {syllabusData.map((syllabus) => (
            <button
              key={syllabus.id}
              onClick={() => setActiveTab(syllabus.id)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === syllabus.id
                  ? `${syllabus.color} text-white shadow-lg scale-105`
                  : "bg-card text-foreground border border-border hover:border-primary"
              }`}
            >
              {syllabus.title}
            </button>
          ))}
        </div>

        {/* Syllabus Content */}
        {activeSyllabus && (
          <div
            className={`max-w-4xl mx-auto ${
              isVisible ? "animate-fade-in-up animation-delay-400" : "opacity-0"
            }`}
          >
            <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
              {/* Header */}
              <div
                className={`${activeSyllabus.color} p-6 text-white flex items-center gap-4`}
              >
                <BookOpen className="w-8 h-8" />
                <div>
                  <h3 className="text-2xl font-bold">{activeSyllabus.title}</h3>
                  <p className="text-white/80">
                    {activeSyllabus.chapters.length} Chapters |{" "}
                    {activeSyllabus.chapters.reduce(
                      (acc, ch) => acc + ch.topics,
                      0
                    )}{" "}
                    Topics
                  </p>
                </div>
              </div>

              {/* Chapters List */}
              <div className="divide-y divide-border">
                {activeSyllabus.chapters.map((chapter, index) => (
                  <div
                    key={chapter.name}
                    className="group"
                  >
                    <button
                      onClick={() => toggleChapter(chapter.name)}
                      className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
                          {index + 1}
                        </span>
                        <span className="font-medium text-foreground text-left">
                          {chapter.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                          {chapter.topics} topics
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                            expandedChapters.includes(chapter.name)
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </div>
                    </button>

                    {/* Expanded content */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        expandedChapters.includes(chapter.name)
                          ? "max-h-40"
                          : "max-h-0"
                      }`}
                    >
                      <div className="px-4 pb-4 pl-16">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm">
                            Video lectures, Notes, Practice questions, and
                            Assignments included
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Syllabus;
