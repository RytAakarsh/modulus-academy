import { ArrowRight, Clock, Users, Star } from "lucide-react";
import { useState } from "react";
import { useEffect, useRef } from "react";
import EnrollmentDialog from "./EnrollmentDialog";

import courseClass11 from "@/assets/course-class11.png";
import courseClass12 from "@/assets/course-class12.png";
import courseIitjee from "@/assets/course-iitjee.png";
import courseNeet from "@/assets/course-neet.png";
import courseAiPython from "@/assets/course-ai-python.png";
import courseBdesign from "@/assets/course-bdesign.png";

const courses = [
  {
    id: "class11",
    title: "Class 11",
    subtitle: "Foundation Course",
    description:
      "Build a strong foundation with comprehensive coverage of Physics, Chemistry, Mathematics & Biology for Class 11.",
    subjects: ["Physics", "Chemistry", "Maths", "Biology"],
    color: "from-green-400 to-green-600",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    duration: "1 Year",
    students: "100+",
    image: courseClass11,
  },
  {
    id: "class12",
    title: "Class 12",
    subtitle: "Advanced Course",
    description:
      "Master advanced concepts for board exams with expert guidance in Physics, Chemistry, Mathematics & Biology.",
    subjects: ["Physics", "Chemistry", "Maths", "Biology"],
    color: "from-secondary to-orange",
    bgColor: "bg-secondary/10",
    iconColor: "text-secondary",
    duration: "1 Year",
    students: "150+",
    image: courseClass12,
  },
  {
    id: "iitjee",
    title: "IIT-JEE",
    subtitle: "Engineering Excellence",
    description:
      "Intensive preparation for JEE Main and Advanced with problem-solving techniques in Physics, Chemistry & Maths.",
    subjects: ["Physics", "Chemistry", "Maths"],
    color: "from-primary to-navy-light",
    bgColor: "bg-primary/10",
    iconColor: "text-primary",
    duration: "2 Years",
    students: "200+",
    image: courseIitjee,
  },
  {
    id: "neet",
    title: "NEET",
    subtitle: "Medical Entrance",
    description:
      "Specialized coaching for NEET aspirants with focus on NCERT and competitive problem-solving in PCB.",
    subjects: ["Physics", "Chemistry", "Biology"],
    color: "from-accent to-red-light",
    bgColor: "bg-accent/10",
    iconColor: "text-accent",
    duration: "2 Years",
    students: "180+",
    image: courseNeet,
  },
  {
    id: "ai-python",
    title: "AI & Python",
    subtitle: "Future Tech Skills",
    description:
      "Learn Python programming and Artificial Intelligence fundamentals. Perfect for all STEM students looking to build tech skills.",
    subjects: ["Python", "Data Science", "Machine Learning"],
    color: "from-purple-500 to-purple-700",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    duration: "6 Months",
    students: "50+",
    image: courseAiPython,
  },
  {
    id: "bdesign",
    title: "B-Design",
    subtitle: "Architecture & NATA",
    description:
      "Comprehensive preparation for B.Arch and NATA exams with drawing, design aptitude, and creative skills development.",
    subjects: ["Drawing", "Design Aptitude", "Architecture"],
    color: "from-cyan-500 to-teal-600",
    bgColor: "bg-cyan-50",
    iconColor: "text-cyan-600",
    duration: "1 Year",
    students: "40+",
    image: courseBdesign,
  },
];

const Courses = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
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

  const handleEnroll = (courseId: string) => {
    setSelectedCourse(courseId);
    setDialogOpen(true);
  };

  return (
    <section
      id="courses"
      ref={sectionRef}
      className="py-20 md:py-28 bg-muted/30 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl" />
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
            Our Courses
          </p>
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 ${
              isVisible ? "animate-fade-in-up animation-delay-100" : "opacity-0"
            }`}
          >
            Featured Learning Paths
          </h2>
          <p
            className={`text-lg text-muted-foreground max-w-3xl mx-auto ${
              isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"
            }`}
          >
            Choose from our specialized courses covering Physics, Chemistry, Mathematics, 
            Biology, and cutting-edge AI & Python programming for different academic levels.
          </p>
        </div>

        {/* Course Cards Grid - First Row (4 cards) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {courses.slice(0, 6).map((course, index) => (
            <div
              key={course.id}
              className={`group bg-card rounded-2xl overflow-hidden shadow-lg border border-border hover:shadow-2xl transition-all duration-500 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{
                animationDelay: isVisible ? `${(index + 2) * 100}ms` : "0ms",
              }}
            >
              {/* Card Header with Image */}
              <div className="h-40 relative overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${course.color} opacity-60`} />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white/80 text-sm font-medium">
                    {course.subtitle}
                  </p>
                  <h3 className="text-white text-xl font-bold">
                    {course.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Subjects */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.subjects.map((subject) => (
                    <span
                      key={subject}
                      className={`${course.bgColor} ${course.iconColor} text-xs font-medium px-2 py-1 rounded-full`}
                    >
                      {subject}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{course.students}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-secondary text-secondary" />
                    <span>4.9</span>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => handleEnroll(course.id)}
                  className="w-full flex items-center justify-center gap-2 bg-foreground/5 hover:bg-primary hover:text-primary-foreground text-foreground py-3 rounded-xl font-semibold transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
                >
                  <span>Enroll Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Second Row - AI & Python Card (Centered) */}
        <div className="flex justify-center">
          <div
            className={`group bg-card rounded-2xl overflow-hidden shadow-lg border border-border hover:shadow-2xl transition-all duration-500 w-full md:w-1/2 lg:w-1/3 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
            style={{
              animationDelay: isVisible ? "600ms" : "0ms",
            }}
          >
            {/* Card Header with Image */}
            <div className="h-40 relative overflow-hidden">
              <img 
                src={courses[4].image} 
                alt={courses[4].title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${courses[4].color} opacity-60`} />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white/80 text-sm font-medium">
                  {courses[4].subtitle}
                </p>
                <h3 className="text-white text-xl font-bold">
                  {courses[4].title}
                </h3>
              </div>
              {/* NEW Badge */}
              <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-bold">
                NEW
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6">
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {courses[4].description}
              </p>

              {/* Subjects */}
              <div className="flex flex-wrap gap-2 mb-4">
                {courses[4].subjects.map((subject) => (
                  <span
                    key={subject}
                    className={`${courses[4].bgColor} ${courses[4].iconColor} text-xs font-medium px-2 py-1 rounded-full`}
                  >
                    {subject}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{courses[4].duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{courses[4].students}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-secondary text-secondary" />
                  <span>4.9</span>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => handleEnroll(courses[4].id)}
                className="w-full flex items-center justify-center gap-2 bg-foreground/5 hover:bg-primary hover:text-primary-foreground text-foreground py-3 rounded-xl font-semibold transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
              >
                <span>Enroll Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <EnrollmentDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        selectedCourse={selectedCourse}
        formType="enrollment"
      />
    </section>
  );
};

export default Courses;
