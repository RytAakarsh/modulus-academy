import { useState, useEffect, useRef } from "react";
import { ChevronDown, BookOpen, CheckCircle } from "lucide-react";

const syllabusData = [
  {
    id: "class11",
    title: "Class 11",
    color: "bg-green-500",
    subjects: [
      {
        name: "Physics",
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
        name: "Chemistry",
        chapters: [
          { name: "Some Basic Concepts of Chemistry", topics: 10 },
          { name: "Structure of Atom", topics: 14 },
          { name: "Classification of Elements and Periodicity", topics: 12 },
          { name: "Chemical Bonding and Molecular Structure", topics: 16 },
          { name: "States of Matter", topics: 12 },
          { name: "Thermodynamics", topics: 14 },
          { name: "Equilibrium", topics: 16 },
          { name: "Redox Reactions", topics: 10 },
          { name: "Hydrogen", topics: 8 },
          { name: "s-Block Elements", topics: 12 },
          { name: "p-Block Elements", topics: 14 },
          { name: "Organic Chemistry", topics: 16 },
          { name: "Hydrocarbons", topics: 18 },
          { name: "Environmental Chemistry", topics: 8 },
        ],
      },
      {
        name: "Mathematics",
        chapters: [
          { name: "Sets", topics: 10 },
          { name: "Relations and Functions", topics: 14 },
          { name: "Trigonometric Functions", topics: 16 },
          { name: "Mathematical Induction", topics: 8 },
          { name: "Complex Numbers", topics: 12 },
          { name: "Linear Inequalities", topics: 10 },
          { name: "Permutations and Combinations", topics: 12 },
          { name: "Binomial Theorem", topics: 10 },
          { name: "Sequences and Series", topics: 14 },
          { name: "Straight Lines", topics: 12 },
          { name: "Conic Sections", topics: 16 },
          { name: "3D Geometry Introduction", topics: 10 },
          { name: "Limits and Derivatives", topics: 18 },
          { name: "Statistics", topics: 12 },
          { name: "Probability", topics: 14 },
        ],
      },
      {
        name: "Biology",
        chapters: [
          { name: "The Living World", topics: 8 },
          { name: "Biological Classification", topics: 12 },
          { name: "Plant Kingdom", topics: 14 },
          { name: "Animal Kingdom", topics: 16 },
          { name: "Morphology of Flowering Plants", topics: 14 },
          { name: "Anatomy of Flowering Plants", topics: 12 },
          { name: "Structural Organisation in Animals", topics: 14 },
          { name: "Cell: The Unit of Life", topics: 16 },
          { name: "Biomolecules", topics: 14 },
          { name: "Cell Cycle and Division", topics: 12 },
          { name: "Transport in Plants", topics: 10 },
          { name: "Mineral Nutrition", topics: 8 },
          { name: "Photosynthesis", topics: 14 },
          { name: "Respiration in Plants", topics: 10 },
          { name: "Plant Growth and Development", topics: 12 },
        ],
      },
    ],
  },
  {
    id: "class12",
    title: "Class 12",
    color: "bg-secondary",
    subjects: [
      {
        name: "Physics",
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
        name: "Chemistry",
        chapters: [
          { name: "The Solid State", topics: 12 },
          { name: "Solutions", topics: 14 },
          { name: "Electrochemistry", topics: 16 },
          { name: "Chemical Kinetics", topics: 14 },
          { name: "Surface Chemistry", topics: 10 },
          { name: "Isolation of Elements", topics: 8 },
          { name: "p-Block Elements", topics: 16 },
          { name: "d and f Block Elements", topics: 14 },
          { name: "Coordination Compounds", topics: 14 },
          { name: "Haloalkanes and Haloarenes", topics: 12 },
          { name: "Alcohols, Phenols and Ethers", topics: 14 },
          { name: "Aldehydes, Ketones", topics: 16 },
          { name: "Amines", topics: 12 },
          { name: "Biomolecules", topics: 14 },
        ],
      },
      {
        name: "Mathematics",
        chapters: [
          { name: "Relations and Functions", topics: 16 },
          { name: "Inverse Trigonometric Functions", topics: 12 },
          { name: "Matrices", topics: 14 },
          { name: "Determinants", topics: 14 },
          { name: "Continuity and Differentiability", topics: 16 },
          { name: "Application of Derivatives", topics: 18 },
          { name: "Integrals", topics: 20 },
          { name: "Application of Integrals", topics: 12 },
          { name: "Differential Equations", topics: 14 },
          { name: "Vector Algebra", topics: 14 },
          { name: "Three Dimensional Geometry", topics: 16 },
          { name: "Linear Programming", topics: 10 },
          { name: "Probability", topics: 16 },
        ],
      },
      {
        name: "Biology",
        chapters: [
          { name: "Reproduction in Organisms", topics: 10 },
          { name: "Sexual Reproduction in Plants", topics: 14 },
          { name: "Human Reproduction", topics: 16 },
          { name: "Reproductive Health", topics: 10 },
          { name: "Inheritance and Variation", topics: 18 },
          { name: "Molecular Basis of Inheritance", topics: 16 },
          { name: "Evolution", topics: 14 },
          { name: "Human Health and Disease", topics: 14 },
          { name: "Food Production Enhancement", topics: 10 },
          { name: "Microbes in Human Welfare", topics: 10 },
          { name: "Biotechnology Principles", topics: 12 },
          { name: "Biotechnology Applications", topics: 12 },
          { name: "Organisms and Populations", topics: 12 },
          { name: "Ecosystem", topics: 12 },
        ],
      },
    ],
  },
  {
    id: "iitjee",
    title: "IIT-JEE",
    color: "bg-primary",
    subjects: [
      {
        name: "Physics",
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
        name: "Chemistry",
        chapters: [
          { name: "Physical Chemistry - Mole Concept", topics: 20 },
          { name: "Atomic Structure", topics: 18 },
          { name: "Chemical Equilibrium", topics: 22 },
          { name: "Ionic Equilibrium", topics: 20 },
          { name: "Electrochemistry", topics: 18 },
          { name: "Chemical Kinetics", topics: 16 },
          { name: "Thermodynamics", topics: 22 },
          { name: "Inorganic - Periodic Table", topics: 20 },
          { name: "Coordination Compounds", topics: 18 },
          { name: "Organic - GOC", topics: 25 },
          { name: "Organic Reactions", topics: 30 },
        ],
      },
      {
        name: "Mathematics",
        chapters: [
          { name: "Algebra - Quadratic Equations", topics: 18 },
          { name: "Progressions", topics: 14 },
          { name: "Permutations & Combinations", topics: 16 },
          { name: "Complex Numbers", topics: 20 },
          { name: "Matrices & Determinants", topics: 18 },
          { name: "Calculus - Limits", topics: 16 },
          { name: "Differentiation", topics: 22 },
          { name: "Integration", topics: 28 },
          { name: "Differential Equations", topics: 18 },
          { name: "Coordinate Geometry", topics: 24 },
          { name: "Vector & 3D", topics: 20 },
          { name: "Probability", topics: 18 },
        ],
      },
    ],
  },
  {
    id: "neet",
    title: "NEET",
    color: "bg-accent",
    subjects: [
      {
        name: "Physics",
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
      {
        name: "Chemistry",
        chapters: [
          { name: "Basic Concepts", topics: 14 },
          { name: "Atomic Structure", topics: 16 },
          { name: "Chemical Bonding", topics: 18 },
          { name: "States of Matter", topics: 12 },
          { name: "Thermodynamics", topics: 16 },
          { name: "Solutions", topics: 14 },
          { name: "Electrochemistry", topics: 14 },
          { name: "Chemical Kinetics", topics: 12 },
          { name: "Coordination Compounds", topics: 14 },
          { name: "Organic Chemistry", topics: 24 },
          { name: "Biomolecules", topics: 16 },
        ],
      },
      {
        name: "Biology",
        chapters: [
          { name: "Diversity in Living World", topics: 20 },
          { name: "Structural Organisation", topics: 18 },
          { name: "Cell Structure and Function", topics: 22 },
          { name: "Plant Physiology", topics: 24 },
          { name: "Human Physiology", topics: 30 },
          { name: "Reproduction", topics: 22 },
          { name: "Genetics and Evolution", topics: 26 },
          { name: "Biology and Human Welfare", topics: 18 },
          { name: "Biotechnology", topics: 16 },
          { name: "Ecology and Environment", topics: 20 },
        ],
      },
    ],
  },
  {
    id: "ai-python",
    title: "AI & Python",
    color: "bg-purple-600",
    subjects: [
      {
        name: "Python Basics",
        chapters: [
          { name: "Introduction to Python", topics: 8 },
          { name: "Variables and Data Types", topics: 10 },
          { name: "Control Flow", topics: 12 },
          { name: "Functions", topics: 14 },
          { name: "Lists, Tuples, Dictionaries", topics: 16 },
          { name: "File Handling", topics: 10 },
          { name: "Exception Handling", topics: 8 },
          { name: "OOP in Python", topics: 18 },
          { name: "Modules and Packages", topics: 10 },
        ],
      },
      {
        name: "Data Science",
        chapters: [
          { name: "NumPy Fundamentals", topics: 14 },
          { name: "Pandas for Data Analysis", topics: 18 },
          { name: "Matplotlib Visualization", topics: 12 },
          { name: "Seaborn Statistical Plots", topics: 10 },
          { name: "Data Cleaning", topics: 14 },
          { name: "Exploratory Data Analysis", topics: 16 },
        ],
      },
      {
        name: "Machine Learning",
        chapters: [
          { name: "Introduction to ML", topics: 10 },
          { name: "Supervised Learning", topics: 16 },
          { name: "Unsupervised Learning", topics: 14 },
          { name: "Linear Regression", topics: 12 },
          { name: "Logistic Regression", topics: 12 },
          { name: "Decision Trees", topics: 14 },
          { name: "Random Forests", topics: 12 },
          { name: "Neural Networks Basics", topics: 16 },
          { name: "Deep Learning Introduction", topics: 18 },
        ],
      },
    ],
  },
];

const Syllabus = () => {
  const [activeTab, setActiveTab] = useState("class11");
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);
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
            Complete Course Syllabus
          </h2>
          <p
            className={`text-lg text-muted-foreground max-w-3xl mx-auto ${
              isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"
            }`}
          >
            Explore our comprehensive syllabus coverage for each course. Select a course, 
            then a subject to view the detailed chapter-wise syllabus.
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
              onClick={() => {
                setActiveTab(syllabus.id);
                setExpandedSubject(null);
                setExpandedChapters([]);
              }}
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
                  <h3 className="text-2xl font-bold">{activeSyllabus.title} Syllabus</h3>
                  <p className="text-white/80">
                    {activeSyllabus.subjects.length} Subjects | Select a subject to view chapters
                  </p>
                </div>
              </div>

              {/* Subjects List */}
              <div className="divide-y divide-border">
                {activeSyllabus.subjects.map((subject) => (
                  <div key={subject.name}>
                    <button
                      onClick={() => setExpandedSubject(
                        expandedSubject === subject.name ? null : subject.name
                      )}
                      className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <span className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">
                          {subject.name.charAt(0)}
                        </span>
                        <span className="font-semibold text-foreground text-left">
                          {subject.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                          {subject.chapters.length} chapters
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                            expandedSubject === subject.name ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </button>

                    {/* Expanded Chapters */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        expandedSubject === subject.name ? "max-h-[2000px]" : "max-h-0"
                      }`}
                    >
                      <div className="px-4 pb-4 pl-16 space-y-2">
                        {subject.chapters.map((chapter, index) => (
                          <div
                            key={chapter.name}
                            className="group"
                          >
                            <button
                              onClick={() => toggleChapter(`${subject.name}-${chapter.name}`)}
                              className="w-full flex items-center justify-between p-3 bg-muted/50 hover:bg-muted rounded-lg transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                                  {index + 1}
                                </span>
                                <span className="text-sm font-medium text-foreground text-left">
                                  {chapter.name}
                                </span>
                              </div>
                              <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded">
                                {chapter.topics} topics
                              </span>
                            </button>

                            <div
                              className={`overflow-hidden transition-all duration-200 ${
                                expandedChapters.includes(`${subject.name}-${chapter.name}`)
                                  ? "max-h-20"
                                  : "max-h-0"
                              }`}
                            >
                              <div className="pl-9 py-2">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  <span className="text-xs">
                                    Video lectures, Notes, Practice questions, and Assignments included
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
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
