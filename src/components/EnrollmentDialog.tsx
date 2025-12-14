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
];

const EnrollmentDialog = ({ 
  isOpen, 
  onClose, 
  selectedCourse = "", 
  formType = 'enrollment',
  subject = "",
  chapter = ""
}: EnrollmentDialogProps) => {
  const [step, setStep] = useState<'form' | 'email-otp' | 'phone-otp' | 'success'>('form');
  const [formData, setFormData] = useState({
    fullName: "",
    course: selectedCourse,
    email: "",
    phone: "",
  });
  const [emailOtp, setEmailOtp] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

  const handleSendEmailOtp = async () => {
    if (!formData.email) {
      toast({ title: "Please enter email", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    
    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    
    await supabase.from('otp_verifications').insert({
      identifier: formData.email,
      otp_code: otp,
      type: 'email',
      expires_at: expiresAt.toISOString(),
    });
    
    // For demo, show OTP in toast (in production, send via email)
    toast({ 
      title: "OTP Sent!", 
      description: `Demo OTP for ${formData.email}: ${otp}` 
    });
    
    setIsLoading(false);
    setStep('email-otp');
  };

  const handleVerifyEmailOtp = async () => {
    setIsLoading(true);
    
    const { data } = await supabase
      .from('otp_verifications')
      .select('*')
      .eq('identifier', formData.email)
      .eq('otp_code', emailOtp)
      .eq('type', 'email')
      .eq('verified', false)
      .gte('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    
    if (data) {
      await supabase
        .from('otp_verifications')
        .update({ verified: true })
        .eq('id', data.id);
      
      setEmailVerified(true);
      toast({ title: "Email Verified!" });
      setStep('phone-otp');
      handleSendPhoneOtp();
    } else {
      toast({ title: "Invalid OTP", variant: "destructive" });
    }
    
    setIsLoading(false);
  };

  const handleSendPhoneOtp = async () => {
    if (!formData.phone) {
      toast({ title: "Please enter phone number", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    
    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    
    await supabase.from('otp_verifications').insert({
      identifier: formData.phone,
      otp_code: otp,
      type: 'phone',
      expires_at: expiresAt.toISOString(),
    });
    
    toast({ 
      title: "OTP Sent!", 
      description: `Demo OTP for ${formData.phone}: ${otp}` 
    });
    
    setIsLoading(false);
  };

  const handleVerifyPhoneOtp = async () => {
    setIsLoading(true);
    
    const { data } = await supabase
      .from('otp_verifications')
      .select('*')
      .eq('identifier', formData.phone)
      .eq('otp_code', phoneOtp)
      .eq('type', 'phone')
      .eq('verified', false)
      .gte('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    
    if (data) {
      await supabase
        .from('otp_verifications')
        .update({ verified: true })
        .eq('id', data.id);
      
      setPhoneVerified(true);
      toast({ title: "Phone Verified!" });
      await handleSubmit();
    } else {
      toast({ title: "Invalid OTP", variant: "destructive" });
    }
    
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    await supabase.from('form_submissions').insert({
      submission_type: formType,
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      course: formData.course,
      subject: subject || null,
      chapter: chapter || null,
      email_verified: true,
      phone_verified: true,
    });
    
    setIsLoading(false);
    setStep('success');
  };

  const handleClose = () => {
    setStep('form');
    setFormData({ fullName: "", course: selectedCourse, email: "", phone: "" });
    setEmailOtp("");
    setPhoneOtp("");
    setEmailVerified(false);
    setPhoneVerified(false);
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
                {step === 'form' && "Fill in your details to get started"}
                {step === 'email-otp' && "Verify your email address"}
                {step === 'phone-otp' && "Verify your phone number"}
              </p>
            </div>

            <div className="p-6">
              {step === 'form' && (
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
                    onClick={handleSendEmailOtp}
                    disabled={!formData.fullName || !formData.course || !formData.email || formData.phone.length !== 10 || isLoading}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                    Continue
                  </button>
                </div>
              )}

              {step === 'email-otp' && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    We've sent a verification code to <strong>{formData.email}</strong>
                  </p>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      value={emailOtp}
                      onChange={(e) => setEmailOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-center text-2xl tracking-widest"
                      placeholder="000000"
                      maxLength={6}
                    />
                  </div>
                  <button
                    onClick={handleVerifyEmailOtp}
                    disabled={emailOtp.length !== 6 || isLoading}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                    Verify Email
                  </button>
                  <button
                    onClick={handleSendEmailOtp}
                    className="w-full text-primary text-sm hover:underline"
                  >
                    Resend OTP
                  </button>
                </div>
              )}

              {step === 'phone-otp' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-green-600 text-sm mb-2">
                    <Check className="w-4 h-4" />
                    Email verified successfully
                  </div>
                  <p className="text-sm text-muted-foreground">
                    We've sent a verification code to <strong>+91 {formData.phone}</strong>
                  </p>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      value={phoneOtp}
                      onChange={(e) => setPhoneOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-center text-2xl tracking-widest"
                      placeholder="000000"
                      maxLength={6}
                    />
                  </div>
                  <button
                    onClick={handleVerifyPhoneOtp}
                    disabled={phoneOtp.length !== 6 || isLoading}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                    Verify & Submit
                  </button>
                  <button
                    onClick={handleSendPhoneOtp}
                    className="w-full text-primary text-sm hover:underline"
                  >
                    Resend OTP
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EnrollmentDialog;
