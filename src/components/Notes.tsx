import { useState, useEffect, useRef } from "react";
import { ChevronDown, BookOpen, FileText } from "lucide-react";
import EnrollmentDialog from "./EnrollmentDialog";

const notesData = [
  {
    id: "class11",
    title: "Class 11",
    color: "bg-green-500",
    subjects: [
      {
        name: "Physics",
        chapters: [
          "Physical World", "Units and Measurements", "Motion in a Straight Line",
          "Motion in a Plane", "Laws of Motion", "Work, Energy and Power",
          "System of Particles and Rotational Motion", "Gravitation",
          "Mechanical Properties of Solids", "Mechanical Properties of Fluids",
          "Thermal Properties of Matter", "Thermodynamics", "Kinetic Theory",
          "Oscillations", "Waves"
        ],
      },
      {
        name: "Chemistry",
        chapters: [
          "Some Basic Concepts of Chemistry", "Structure of Atom",
          "Classification of Elements", "Chemical Bonding", "States of Matter",
          "Thermodynamics", "Equilibrium", "Redox Reactions", "Hydrogen",
          "s-Block Elements", "p-Block Elements", "Organic Chemistry",
          "Hydrocarbons", "Environmental Chemistry"
        ],
      },
      {
        name: "Mathematics",
        chapters: [
          "Sets", "Relations and Functions", "Trigonometric Functions",
          "Principle of Mathematical Induction", "Complex Numbers",
          "Linear Inequalities", "Permutations and Combinations",
          "Binomial Theorem", "Sequences and Series", "Straight Lines",
          "Conic Sections", "Introduction to 3D Geometry", "Limits and Derivatives",
          "Mathematical Reasoning", "Statistics", "Probability"
        ],
      },
      {
        name: "Biology",
        chapters: [
          "The Living World", "Biological Classification", "Plant Kingdom",
          "Animal Kingdom", "Morphology of Flowering Plants",
          "Anatomy of Flowering Plants", "Structural Organisation in Animals",
          "Cell: The Unit of Life", "Biomolecules", "Cell Cycle and Cell Division",
          "Transport in Plants", "Mineral Nutrition", "Photosynthesis",
          "Respiration in Plants", "Plant Growth and Development",
          "Digestion and Absorption", "Breathing and Exchange of Gases",
          "Body Fluids and Circulation", "Excretory Products",
          "Locomotion and Movement", "Neural Control", "Chemical Coordination"
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
          "Electric Charges and Fields", "Electrostatic Potential and Capacitance",
          "Current Electricity", "Moving Charges and Magnetism",
          "Magnetism and Matter", "Electromagnetic Induction",
          "Alternating Current", "Electromagnetic Waves",
          "Ray Optics and Optical Instruments", "Wave Optics",
          "Dual Nature of Radiation and Matter", "Atoms", "Nuclei",
          "Semiconductor Electronics"
        ],
      },
      {
        name: "Chemistry",
        chapters: [
          "The Solid State", "Solutions", "Electrochemistry",
          "Chemical Kinetics", "Surface Chemistry", "General Principles of Isolation",
          "p-Block Elements", "d and f Block Elements", "Coordination Compounds",
          "Haloalkanes and Haloarenes", "Alcohols, Phenols and Ethers",
          "Aldehydes, Ketones and Carboxylic Acids", "Amines", "Biomolecules",
          "Polymers", "Chemistry in Everyday Life"
        ],
      },
      {
        name: "Mathematics",
        chapters: [
          "Relations and Functions", "Inverse Trigonometric Functions",
          "Matrices", "Determinants", "Continuity and Differentiability",
          "Application of Derivatives", "Integrals", "Application of Integrals",
          "Differential Equations", "Vector Algebra", "Three Dimensional Geometry",
          "Linear Programming", "Probability"
        ],
      },
      {
        name: "Biology",
        chapters: [
          "Reproduction in Organisms", "Sexual Reproduction in Flowering Plants",
          "Human Reproduction", "Reproductive Health",
          "Principles of Inheritance and Variation", "Molecular Basis of Inheritance",
          "Evolution", "Human Health and Disease",
          "Strategies for Enhancement in Food Production",
          "Microbes in Human Welfare", "Biotechnology: Principles and Processes",
          "Biotechnology and Its Applications", "Organisms and Populations",
          "Ecosystem", "Biodiversity and Conservation",
          "Environmental Issues"
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
          "Mechanics (Advanced)", "Fluid Mechanics", "Thermal Physics",
          "SHM and Waves", "Electrostatics", "Current Electricity & Magnetism",
          "Electromagnetic Induction", "Optics (Geometrical & Wave)",
          "Modern Physics", "Error Analysis & Experiments"
        ],
      },
      {
        name: "Chemistry",
        chapters: [
          "Physical Chemistry - Mole Concept", "Atomic Structure",
          "Chemical Equilibrium", "Ionic Equilibrium", "Electrochemistry",
          "Chemical Kinetics", "Thermodynamics", "Solutions",
          "Inorganic Chemistry - Periodic Table", "Coordination Compounds",
          "Organic Chemistry - GOC", "Hydrocarbons", "Organic Reactions"
        ],
      },
      {
        name: "Mathematics",
        chapters: [
          "Algebra - Quadratic Equations", "Progressions", "Permutations",
          "Complex Numbers", "Matrices & Determinants", "Calculus - Limits",
          "Continuity", "Differentiation", "Integration", "Differential Equations",
          "Coordinate Geometry", "Vector & 3D", "Trigonometry", "Probability"
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
          "Mechanics", "Properties of Matter", "Heat and Thermodynamics",
          "Oscillations and Waves", "Electrostatics", "Current Electricity",
          "Magnetic Effects of Current", "EMI and AC", "Optics", "Modern Physics",
          "Electronic Devices"
        ],
      },
      {
        name: "Chemistry",
        chapters: [
          "Basic Concepts", "Atomic Structure", "Chemical Bonding",
          "States of Matter", "Thermodynamics", "Solutions", "Electrochemistry",
          "Chemical Kinetics", "Coordination Compounds", "Organic Chemistry",
          "Biomolecules"
        ],
      },
      {
        name: "Biology",
        chapters: [
          "Diversity in Living World", "Structural Organisation",
          "Cell Structure and Function", "Plant Physiology", "Human Physiology",
          "Reproduction", "Genetics and Evolution", "Biology and Human Welfare",
          "Biotechnology", "Ecology and Environment"
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
          "Introduction to Python", "Variables and Data Types",
          "Control Flow", "Functions", "Lists and Tuples",
          "Dictionaries and Sets", "File Handling", "Exception Handling",
          "Object-Oriented Programming", "Modules and Packages"
        ],
      },
      {
        name: "Data Science",
        chapters: [
          "NumPy Fundamentals", "Pandas for Data Analysis",
          "Data Visualization with Matplotlib", "Seaborn for Statistical Plots",
          "Data Cleaning and Preprocessing", "Exploratory Data Analysis"
        ],
      },
      {
        name: "Machine Learning",
        chapters: [
          "Introduction to ML", "Supervised Learning", "Unsupervised Learning",
          "Linear Regression", "Logistic Regression", "Decision Trees",
          "Random Forests", "Neural Networks Basics", "Deep Learning Introduction"
        ],
      },
    ],
  },
  {
    id: "bdesign",
    title: "B-Design (NATA)",
    color: "bg-cyan-500",
    subjects: [
      {
        name: "Drawing & Sketching",
        chapters: [
          "Freehand Drawing", "Perspective Drawing", "Object Drawing",
          "Landscape & Composition", "Memory Based Drawing", "3D Visualization"
        ],
      },
      {
        name: "Design Aptitude",
        chapters: [
          "Visual Perception", "Space Visualization", "Pattern Recognition",
          "Color Theory", "Design Principles", "Creative Thinking"
        ],
      },
      {
        name: "Architecture Basics",
        chapters: [
          "Architectural Concepts", "Building Elements", "Scale & Proportion",
          "Famous Architects", "Sustainable Design", "Urban Planning Basics"
        ],
      },
    ],
  },
];

const Notes = () => {
  const [activeTab, setActiveTab] = useState("class11");
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState({ subject: "", chapter: "", course: "" });
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

  const activeNotes = notesData.find((n) => n.id === activeTab);

  const handleAccessNotes = (subject: string, chapter: string) => {
    setSelectedNote({ subject, chapter, course: activeTab });
    setDialogOpen(true);
  };

  return (
    <section
      id="notes"
      ref={sectionRef}
      className="py-20 md:py-28 bg-muted/30 relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
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
            Study Materials
          </p>
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 ${
              isVisible ? "animate-fade-in-up animation-delay-100" : "opacity-0"
            }`}
          >
            Access Study Notes
          </h2>
          <p
            className={`text-lg text-muted-foreground max-w-3xl mx-auto ${
              isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"
            }`}
          >
            Get comprehensive study notes and materials for all subjects. 
            Register to access chapter-wise notes prepared by our expert faculty.
          </p>
        </div>

        <div
          className={`flex flex-wrap justify-center gap-4 mb-12 ${
            isVisible ? "animate-fade-in-up animation-delay-300" : "opacity-0"
          }`}
        >
          {notesData.map((notes) => (
            <button
              key={notes.id}
              onClick={() => {
                setActiveTab(notes.id);
                setExpandedSubject(null);
              }}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === notes.id
                  ? `${notes.color} text-white shadow-lg scale-105`
                  : "bg-card text-foreground border border-border hover:border-primary"
              }`}
            >
              {notes.title}
            </button>
          ))}
        </div>

        {activeNotes && (
          <div
            className={`max-w-4xl mx-auto ${
              isVisible ? "animate-fade-in-up animation-delay-400" : "opacity-0"
            }`}
          >
            <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
              <div
                className={`${activeNotes.color} p-6 text-white flex items-center gap-4`}
              >
                <FileText className="w-8 h-8" />
                <div>
                  <h3 className="text-2xl font-bold">{activeNotes.title} Notes</h3>
                  <p className="text-white/80">
                    {activeNotes.subjects.length} Subjects Available
                  </p>
                </div>
              </div>

              <div className="divide-y divide-border">
                {activeNotes.subjects.map((subject) => (
                  <div key={subject.name}>
                    <button
                      onClick={() =>
                        setExpandedSubject(
                          expandedSubject === subject.name ? null : subject.name
                        )
                      }
                      className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <BookOpen className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-foreground">
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

                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        expandedSubject === subject.name
                          ? "max-h-[1000px]"
                          : "max-h-0"
                      }`}
                    >
                      <div className="px-4 pb-4 space-y-2">
                        {subject.chapters.map((chapter, idx) => (
                          <div
                            key={chapter}
                            className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                                {idx + 1}
                              </span>
                              <span className="text-sm text-foreground">
                                {chapter}
                              </span>
                            </div>
                            <button
                              onClick={() => handleAccessNotes(subject.name, chapter)}
                              className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-lg font-medium hover:shadow-md transition-all"
                            >
                              Access Notes
                            </button>
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

      <EnrollmentDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        selectedCourse={selectedNote.course}
        formType="notes_request"
        subject={selectedNote.subject}
        chapter={selectedNote.chapter}
      />
    </section>
  );
};

export default Notes;
