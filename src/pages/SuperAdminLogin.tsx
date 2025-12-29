import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, Shield } from "lucide-react";
import logo from "@/assets/logo.png";
import { toast } from "@/hooks/use-toast";

const SUPERADMIN_EMAIL = "modulusclasses01@gmail.com";
const SUPERADMIN_PASSWORD = "superadmin@123321";

const SuperAdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (formData.email === SUPERADMIN_EMAIL && formData.password === SUPERADMIN_PASSWORD) {
        localStorage.setItem("superAdminAuth", "true");
        toast({ title: "Login Successful", description: "Welcome to Super Admin Dashboard" });
        navigate("/superadmin/dashboard");
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
          <div className="bg-gradient-to-r from-slate-800 to-purple-800 p-8 text-center">
            <img
              src={logo}
              alt="Modulus Classes"
              className="h-20 w-auto mx-auto mb-4 bg-white rounded-xl p-2"
            />
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="w-6 h-6 text-purple-300" />
              <h1 className="text-2xl font-bold text-white">
                Super Admin Portal
              </h1>
            </div>
            <p className="text-purple-200/80 text-sm">
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
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  className="w-full pl-12 pr-12 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-purple-200/60 text-sm mt-6">
          © 2024 Modulus Classes. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SuperAdminLogin;
