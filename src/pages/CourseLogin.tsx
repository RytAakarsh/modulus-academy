import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, BookOpen } from "lucide-react";
import logo from "@/assets/logo.png";
import { toast } from "@/hooks/use-toast";

const COURSE_EMAIL = "modulusclasses01@gmail.com";

const courseConfig: Record<string, { name: string; password: string; color: string }> = {
  "class11": { name: "Class 11", password: "class11@123321", color: "from-green-500 to-green-600" },
  "class12": { name: "Class 12", password: "class12@123321", color: "from-orange-500 to-orange-600" },
  "iitjee": { name: "IIT-JEE", password: "iitjee@123321", color: "from-primary to-navy-light" },
  "neet": { name: "NEET", password: "neet@123321", color: "from-accent to-red-500" },
  "ai-python": { name: "AI & Python", password: "aipython@123321", color: "from-purple-500 to-purple-700" },
  "aipython": { name: "AI & Python", password: "aipython@123321", color: "from-purple-500 to-purple-700" },
  "bdesign": { name: "B-Design (NATA)", password: "bdesign@123321", color: "from-cyan-500 to-teal-600" },
};

const CourseLogin = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const course = courseId ? courseConfig[courseId] : null;

  if (!course) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Course Not Found</h1>
          <button
            onClick={() => navigate("/")}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (formData.email === COURSE_EMAIL && formData.password === course.password) {
        localStorage.setItem(`courseAuth_${courseId}`, "true");
        toast({ title: "Login Successful", description: `Welcome to ${course.name} Portal` });
        navigate(`/course/${courseId}/dashboard`);
      } else {
        toast({ 
          title: "Login Failed", 
          description: "Invalid email or password",
          variant: "destructive" 
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${course.color} flex items-center justify-center p-4`}>
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
          <div className={`bg-gradient-to-r ${course.color} p-8 text-center`}>
            <img
              src={logo}
              alt="Modulus Classes"
              className="h-20 w-auto mx-auto mb-4 bg-white rounded-xl p-2"
            />
            <div className="flex items-center justify-center gap-2 mb-2">
              <BookOpen className="w-6 h-6 text-white" />
              <h1 className="text-2xl font-bold text-white">
                {course.name} Portal
              </h1>
            </div>
            <p className="text-white/80 text-sm">
              Access your course materials & lectures
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-12 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r ${course.color} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50`}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-white/60 text-sm mt-6">
          © 2024 Modulus Classes. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default CourseLogin;
