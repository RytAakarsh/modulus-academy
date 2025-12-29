import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  FileText, Video, LogOut, Download, BookOpen, 
  Play, Calendar, Clock, Loader2 
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";
import { toast } from "@/hooks/use-toast";

const courseConfig: Record<string, { name: string; color: string; bgColor: string }> = {
  "class11": { name: "Class 11", color: "from-green-500 to-green-600", bgColor: "bg-green-500" },
  "class12": { name: "Class 12", color: "from-orange-500 to-orange-600", bgColor: "bg-orange-500" },
  "iitjee": { name: "IIT-JEE", color: "from-primary to-navy-light", bgColor: "bg-primary" },
  "neet": { name: "NEET", color: "from-accent to-red-500", bgColor: "bg-accent" },
  "ai-python": { name: "AI & Python", color: "from-purple-500 to-purple-700", bgColor: "bg-purple-600" },
  "bdesign": { name: "B-Design (NATA)", color: "from-cyan-500 to-teal-600", bgColor: "bg-cyan-500" },
};

interface Note {
  id: string;
  title: string;
  file_url: string;
  file_name: string;
  uploaded_at: string;
}

interface Lecture {
  id: string;
  title: string;
  description: string | null;
  video_url: string | null;
  lecture_type: string;
  scheduled_at: string | null;
  created_at: string;
}

const CourseDashboard = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'notes' | 'lectures'>('notes');
  const [notes, setNotes] = useState<Note[]>([]);
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const course = courseId ? courseConfig[courseId] : null;

  useEffect(() => {
    const isAuth = localStorage.getItem(`courseAuth_${courseId}`);
    if (!isAuth) {
      navigate(`/course/${courseId}`);
      return;
    }

    fetchData();
  }, [courseId, navigate]);

  const fetchData = async () => {
    setIsLoading(true);
    
    const [notesRes, lecturesRes] = await Promise.all([
      supabase.from('course_notes').select('*').eq('course_id', courseId).order('uploaded_at', { ascending: false }),
      supabase.from('course_lectures').select('*').eq('course_id', courseId).order('created_at', { ascending: false })
    ]);

    if (notesRes.data) setNotes(notesRes.data);
    if (lecturesRes.data) setLectures(lecturesRes.data);
    
    setIsLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem(`courseAuth_${courseId}`);
    navigate(`/course/${courseId}`);
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <p className="text-foreground">Course not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className={`bg-gradient-to-r ${course.color} shadow-lg sticky top-0 z-50`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-12 w-auto bg-white rounded-lg p-1" />
            <div>
              <h1 className="text-white font-bold text-lg">{course.name} Portal</h1>
              <p className="text-white/70 text-xs">Modulus Classes</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${course.bgColor}/20 flex items-center justify-center`}>
                <FileText className={`w-6 h-6 ${course.bgColor.replace('bg-', 'text-')}`} />
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">{notes.length}</p>
                <p className="text-sm text-muted-foreground">Study Notes</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${course.bgColor}/20 flex items-center justify-center`}>
                <Video className={`w-6 h-6 ${course.bgColor.replace('bg-', 'text-')}`} />
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">{lectures.length}</p>
                <p className="text-sm text-muted-foreground">Lectures</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('notes')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'notes'
                ? `bg-gradient-to-r ${course.color} text-white shadow-lg`
                : 'bg-card text-foreground border border-border hover:border-primary'
            }`}
          >
            <FileText className="w-5 h-5" />
            Study Notes
          </button>
          <button
            onClick={() => setActiveTab('lectures')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'lectures'
                ? `bg-gradient-to-r ${course.color} text-white shadow-lg`
                : 'bg-card text-foreground border border-border hover:border-primary'
            }`}
          >
            <Video className="w-5 h-5" />
            Lectures
          </button>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : activeTab === 'notes' ? (
          <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
            <div className={`bg-gradient-to-r ${course.color} p-6 flex items-center gap-4`}>
              <BookOpen className="w-8 h-8 text-white" />
              <div>
                <h3 className="text-xl font-bold text-white">Study Notes</h3>
                <p className="text-white/80 text-sm">Download and study at your own pace</p>
              </div>
            </div>

            {notes.length === 0 ? (
              <div className="p-12 text-center">
                <FileText className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">No notes uploaded yet</p>
                <p className="text-sm text-muted-foreground/70 mt-1">Check back later for study materials</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {notes.map((note) => (
                  <div key={note.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl ${course.bgColor}/10 flex items-center justify-center`}>
                        <FileText className={`w-6 h-6 ${course.bgColor.replace('bg-', 'text-')}`} />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{note.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(note.uploaded_at).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <a
                      href={note.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 bg-gradient-to-r ${course.color} text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all`}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
            <div className={`bg-gradient-to-r ${course.color} p-6 flex items-center gap-4`}>
              <Video className="w-8 h-8 text-white" />
              <div>
                <h3 className="text-xl font-bold text-white">Video Lectures</h3>
                <p className="text-white/80 text-sm">Watch recorded and live lectures</p>
              </div>
            </div>

            {lectures.length === 0 ? (
              <div className="p-12 text-center">
                <Video className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">No lectures available yet</p>
                <p className="text-sm text-muted-foreground/70 mt-1">Check back later for video content</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {lectures.map((lecture) => (
                  <div key={lecture.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl ${course.bgColor}/10 flex items-center justify-center`}>
                        <Play className={`w-6 h-6 ${course.bgColor.replace('bg-', 'text-')}`} />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{lecture.title}</p>
                        {lecture.description && (
                          <p className="text-sm text-muted-foreground line-clamp-1">{lecture.description}</p>
                        )}
                        <div className="flex items-center gap-4 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            lecture.lecture_type === 'live' 
                              ? 'bg-red-100 text-red-600' 
                              : 'bg-blue-100 text-blue-600'
                          }`}>
                            {lecture.lecture_type === 'live' ? 'Live' : 'Recorded'}
                          </span>
                          {lecture.scheduled_at && (
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              {new Date(lecture.scheduled_at).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {lecture.video_url && (
                      <a
                        href={lecture.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 bg-gradient-to-r ${course.color} text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all`}
                      >
                        <Play className="w-4 h-4" />
                        Watch
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default CourseDashboard;
