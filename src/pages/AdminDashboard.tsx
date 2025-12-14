import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Users, FileText, Mail, Phone, LogOut, Calendar, 
  TrendingUp, BookOpen, MessageSquare, Download 
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";
import { toast } from "@/hooks/use-toast";

interface Submission {
  id: string;
  submission_type: string;
  full_name: string;
  email: string;
  phone: string;
  course: string | null;
  subject: string | null;
  chapter: string | null;
  message: string | null;
  created_at: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'enrollment' | 'contact' | 'notes_request'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      navigate("/admin");
      return;
    }

    fetchSubmissions();
  }, [navigate]);

  const fetchSubmissions = async () => {
    const { data, error } = await supabase
      .from('form_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: "Error fetching data", variant: "destructive" });
    } else {
      setSubmissions(data || []);
    }
    setIsLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin");
  };

  const filteredSubmissions = activeTab === 'all' 
    ? submissions 
    : submissions.filter(s => s.submission_type === activeTab);

  const enrollmentCount = submissions.filter(s => s.submission_type === 'enrollment').length;
  const contactCount = submissions.filter(s => s.submission_type === 'contact').length;
  const notesCount = submissions.filter(s => s.submission_type === 'notes_request').length;

  const courseStats = submissions.reduce((acc, s) => {
    if (s.course) {
      acc[s.course] = (acc[s.course] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Type', 'Course', 'Subject', 'Chapter', 'Date'];
    const rows = filteredSubmissions.map(s => [
      s.full_name,
      s.email,
      s.phone,
      s.submission_type,
      s.course || '',
      s.subject || '',
      s.chapter || '',
      new Date(s.created_at).toLocaleDateString()
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `submissions-${activeTab}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-primary shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-12 w-auto bg-white rounded-lg p-1" />
            <div>
              <h1 className="text-primary-foreground font-bold text-lg">Admin Dashboard</h1>
              <p className="text-primary-foreground/70 text-xs">Modulus Classes</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">{submissions.length}</p>
                <p className="text-sm text-muted-foreground">Total Submissions</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">{enrollmentCount}</p>
                <p className="text-sm text-muted-foreground">Enrollments</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">{contactCount}</p>
                <p className="text-sm text-muted-foreground">Contact Requests</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">{notesCount}</p>
                <p className="text-sm text-muted-foreground">Notes Requests</p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Distribution */}
        <div className="bg-card rounded-xl p-6 shadow-lg border border-border mb-8">
          <h3 className="text-lg font-bold text-foreground mb-4">Course Distribution</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(courseStats).map(([course, count]) => (
              <div key={course} className="bg-muted rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-primary">{count}</p>
                <p className="text-sm text-muted-foreground capitalize">
                  {course.replace('-', ' ')}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Submissions Table */}
        <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
          <div className="p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {(['all', 'enrollment', 'contact', 'notes_request'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  {tab === 'all' ? 'All' : tab === 'notes_request' ? 'Notes' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-all"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-4 font-semibold text-foreground">Name</th>
                  <th className="text-left p-4 font-semibold text-foreground">Contact</th>
                  <th className="text-left p-4 font-semibold text-foreground">Type</th>
                  <th className="text-left p-4 font-semibold text-foreground">Course</th>
                  <th className="text-left p-4 font-semibold text-foreground">Details</th>
                  <th className="text-left p-4 font-semibold text-foreground">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredSubmissions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-muted-foreground">
                      No submissions found
                    </td>
                  </tr>
                ) : (
                  filteredSubmissions.map((submission) => (
                    <tr key={submission.id} className="hover:bg-muted/50 transition-colors">
                      <td className="p-4">
                        <p className="font-medium text-foreground">{submission.full_name}</p>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="w-4 h-4" />
                            <a href={`mailto:${submission.email}`} className="hover:text-primary">
                              {submission.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="w-4 h-4" />
                            <a href={`tel:+91${submission.phone}`} className="hover:text-primary">
                              +91 {submission.phone}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          submission.submission_type === 'enrollment' 
                            ? 'bg-green-100 text-green-700'
                            : submission.submission_type === 'contact'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          {submission.submission_type === 'notes_request' ? 'Notes' : 
                           submission.submission_type.charAt(0).toUpperCase() + submission.submission_type.slice(1)}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-foreground capitalize">
                          {submission.course?.replace('-', ' ') || '-'}
                        </span>
                      </td>
                      <td className="p-4">
                        {submission.subject && (
                          <p className="text-sm text-muted-foreground">
                            {submission.subject} - {submission.chapter}
                          </p>
                        )}
                        {submission.message && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {submission.message}
                          </p>
                        )}
                        {!submission.subject && !submission.message && '-'}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {new Date(submission.created_at).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
