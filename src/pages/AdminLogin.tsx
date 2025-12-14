import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import logo from "@/assets/logo.png";
import { toast } from "@/hooks/use-toast";

const ADMIN_EMAIL = "modulusclasses01@gmail.com";
const ADMIN_PASSWORD = "modulus@123321";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (formData.email === ADMIN_EMAIL && formData.password === ADMIN_PASSWORD) {
        localStorage.setItem("adminAuth", "true");
        toast({ title: "Login Successful", description: "Welcome to Admin Dashboard" });
        navigate("/admin/dashboard");
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
    <div className="min-h-screen bg-gradient-to-br from-primary via-navy-light to-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
          <div className="bg-primary p-8 text-center">
            <img
              src={logo}
              alt="Modulus Classes"
              className="h-20 w-auto mx-auto mb-4 bg-white rounded-xl p-2"
            />
            <h1 className="text-2xl font-bold text-primary-foreground">
              Admin Portal
            </h1>
            <p className="text-primary-foreground/80 text-sm mt-1">
              Modulus Classes Management System
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
                  placeholder="admin@modulusclasses.com"
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
              className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-primary-foreground/60 text-sm mt-6">
          © 2024 Modulus Classes. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
