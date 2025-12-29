import { useState } from "react";
import { X, Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface EnrollmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCourse?: string;
  formType?: 'enrollment' | 'notes_request';
  subject?: string;
  chapter?: string;
}

const courses = [
  { value: "class11", label: "Class 11 (PCM/PCB)" },
  { value: "class12", label: "Class 12 (PCM/PCB)" },
  { value: "iitjee", label: "IIT-JEE (Physics, Chemistry, Maths)" },
  { value: "neet", label: "NEET (Physics, Chemistry, Biology)" },
  { value: "ai-python", label: "AI & Python Programming" },
  { value: "bdesign", label: "B-Design (B.Arch & NATA)" },
];

const EnrollmentDialog = ({ 
  isOpen, 
  onClose, 
  selectedCourse = "", 
  formType = 'enrollment',
  subject = "",
  chapter = ""
}: EnrollmentDialogProps) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    fullName: "",
    course: selectedCourse,
    email: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.fullName || !formData.course || !formData.email || formData.phone.length !== 10) {
      toast({ title: "Please fill all fields correctly", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    
    const { error } = await supabase.from('form_submissions').insert({
      submission_type: formType,
      full_name: formData.fullName,
      email: formData.email,
      phone: `+91${formData.phone}`,
      course: formData.course,
      subject: subject || null,
      chapter: chapter || null,
      email_verified: false,
      phone_verified: false,
    });

    if (error) {
      toast({ title: "Submission failed", description: "Please try again.", variant: "destructive" });
      setIsLoading(false);
      return;
    }
    
    setIsLoading(false);
    setStep('success');
  };

  const handleClose = () => {
    setStep('form');
    setFormData({ fullName: "", course: selectedCourse, email: "", phone: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />
      
      <div className="relative bg-card rounded-2xl shadow-2xl border border-border w-full max-w-md mx-4 overflow-hidden animate-scale-in">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {step === 'success' ? (
          <div className="p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Thank You!</h3>
            <p className="text-muted-foreground mb-6">
              Our team will contact you soon to assist you further.
            </p>
            <button
              onClick={handleClose}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="bg-gradient-to-r from-primary to-navy-light p-6 text-primary-foreground">
              <h3 className="text-xl font-bold">
                {formType === 'notes_request' ? 'Access Study Notes' : 'Enroll Now'}
              </h3>
              <p className="text-primary-foreground/80 text-sm mt-1">
                Fill in your details to get started
              </p>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Select Course *
                  </label>
                  <select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Choose a course</option>
                    {courses.map((course) => (
                      <option key={course.value} value={course.value}>
                        {course.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Mobile Number * (India)
                  </label>
                  <div className="flex gap-2">
                    <span className="px-4 py-3 rounded-xl border border-border bg-muted text-muted-foreground">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                      className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="XXXXXXXXXX"
                      maxLength={10}
                      required
                    />
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!formData.fullName || !formData.course || !formData.email || formData.phone.length !== 10 || isLoading}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                  Submit
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EnrollmentDialog;
