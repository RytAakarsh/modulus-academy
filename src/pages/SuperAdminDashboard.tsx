import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LogOut, Video, FileText, Upload, Trash2, 
  ExternalLink, Loader2, X, BookOpen, Plus,
  Radio, MessageSquare, Send, UserPlus, Users, Eye, EyeOff
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";
import { toast } from "@/hooks/use-toast";

const courses = [
  { id: "class11", name: "Class 11", color: "bg-green-500" },
  { id: "class12", name: "Class 12", color: "bg-orange-500" },
  { id: "iitjee", name: "IIT-JEE", color: "bg-primary" },
  { id: "neet", name: "NEET", color: "bg-accent" },
  { id: "aipython", name: "AI & Python", color: "bg-purple-600" },
  { id: "bdesign", name: "B-Design (NATA)", color: "bg-cyan-500" },
];

interface Note {
  id: string;
  course_id: string;
  title: string;
  file_url: string;
  file_name: string;
  uploaded_at: string;
}

interface Lecture {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  video_url: string | null;
  lecture_type: string;
  created_at: string;
}

interface CourseMessage {
  id: string;
  course_id: string;
  message: string;
  message_type: string;
  created_at: string;
}

interface StudentAccount {
  id: string;
  student_name: string;
  course_id: string;
  email: string;
  password: string;
  created_at: string;
}

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'golive' | 'notes' | 'lectures' | 'messages' | 'accounts'>('golive');
  const [notes, setNotes] = useState<Note[]>([]);
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [messages, setMessages] = useState<CourseMessage[]>([]);
  const [students, setStudents] = useState<StudentAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showLectureModal, setShowLectureModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showStudentPwd, setShowStudentPwd] = useState<Record<string, boolean>>({});
  const [accountForm, setAccountForm] = useState({ studentName: "", courseId: "", email: "", password: "" });
  const [showFormPwd, setShowFormPwd] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [lectureForm, setLectureForm] = useState({ title: "", description: "", videoUrl: "", courseId: "" });
  const [messageForm, setMessageForm] = useState({ message: "", courseId: "", messageType: "general" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const isAuth = localStorage.getItem("superAdminAuth");
    if (!isAuth) {
      navigate("/superadmin");
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    setIsLoading(true);
    const [notesRes, lecturesRes, messagesRes, studentsRes] = await Promise.all([
      supabase.from('course_notes').select('*').order('uploaded_at', { ascending: false }),
      supabase.from('course_lectures').select('*').order('created_at', { ascending: false }),
      supabase.from('course_messages').select('*').order('created_at', { ascending: false }),
      supabase.from('student_accounts').select('*').order('created_at', { ascending: false })
    ]);
    if (notesRes.data) setNotes(notesRes.data);
    if (lecturesRes.data) setLectures(lecturesRes.data);
    if (messagesRes.data) setMessages(messagesRes.data);
    if (studentsRes.data) setStudents(studentsRes.data);
    setIsLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("superAdminAuth");
    navigate("/superadmin");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedCourse || !noteTitle.trim()) {
      toast({ title: "Please select a course and enter a title", variant: "destructive" });
      return;
    }
    if (file.type !== 'application/pdf') {
      toast({ title: "Only PDF files are allowed", variant: "destructive" });
      return;
    }
    setIsUploading(true);
    try {
      const fileName = `${selectedCourse}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage.from('course-notes').upload(fileName, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from('course-notes').getPublicUrl(fileName);
      const { error: dbError } = await supabase.from('course_notes').insert({
        course_id: selectedCourse,
        title: noteTitle.trim(),
        file_url: publicUrl,
        file_name: file.name,
        file_size: file.size
      });
      if (dbError) throw dbError;
      toast({ title: "Notes uploaded successfully!" });
      setShowUploadModal(false);
      setSelectedCourse(null);
      setNoteTitle("");
      fetchData();
    } catch (error: any) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDeleteNote = async (id: string, fileUrl: string) => {
    if (!confirm("Are you sure you want to delete this note?")) return;
    try {
      const urlParts = fileUrl.split('/course-notes/');
      if (urlParts.length > 1) {
        await supabase.storage.from('course-notes').remove([urlParts[1]]);
      }
      await supabase.from('course_notes').delete().eq('id', id);
      toast({ title: "Note deleted successfully" });
      fetchData();
    } catch (error: any) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    }
  };

  const handleAddLecture = async () => {
    if (!lectureForm.title || !lectureForm.courseId) {
      toast({ title: "Please fill required fields", variant: "destructive" });
      return;
    }
    try {
      const { error } = await supabase.from('course_lectures').insert({
        course_id: lectureForm.courseId,
        title: lectureForm.title,
        description: lectureForm.description || null,
        video_url: lectureForm.videoUrl || null,
        lecture_type: 'recorded'
      });
      if (error) throw error;
      toast({ title: "Lecture added successfully!" });
      setShowLectureModal(false);
      setLectureForm({ title: "", description: "", videoUrl: "", courseId: "" });
      fetchData();
    } catch (error: any) {
      toast({ title: "Failed to add lecture", description: error.message, variant: "destructive" });
    }
  };

  const handleDeleteLecture = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lecture?")) return;
    try {
      await supabase.from('course_lectures').delete().eq('id', id);
      toast({ title: "Lecture deleted successfully" });
      fetchData();
    } catch (error: any) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    }
  };

  const handleSendMessage = async () => {
    if (!messageForm.message.trim() || !messageForm.courseId) {
      toast({ title: "Please select a course and enter a message", variant: "destructive" });
      return;
    }
    try {
      const { error } = await supabase.from('course_messages').insert({
        course_id: messageForm.courseId,
        message: messageForm.message.trim(),
        message_type: messageForm.messageType
      });
      if (error) throw error;
      toast({ title: "Message sent successfully!" });
      setShowMessageModal(false);
      setMessageForm({ message: "", courseId: "", messageType: "general" });
      fetchData();
    } catch (error: any) {
      toast({ title: "Failed to send message", description: error.message, variant: "destructive" });
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      await supabase.from('course_messages').delete().eq('id', id);
      toast({ title: "Message deleted successfully" });
      fetchData();
    } catch (error: any) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    }
  };

  const handleCreateAccount = async () => {
    const { studentName, courseId, email, password } = accountForm;
    if (!studentName.trim() || !courseId || !email.trim() || !password.trim()) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }
    try {
      const { error } = await supabase.from('student_accounts').insert({
        student_name: studentName.trim(),
        course_id: courseId,
        email: email.trim().toLowerCase(),
        password: password,
      });
      if (error) throw error;
      toast({ title: "Student account created!", description: `${studentName} can now log in to ${getCourseName(courseId)}` });
      setShowAccountModal(false);
      setAccountForm({ studentName: "", courseId: "", email: "", password: "" });
      fetchData();
    } catch (error: any) {
      toast({
        title: "Failed to create account",
        description: error.message?.includes("duplicate") ? "An account with this email already exists for this course." : error.message,
        variant: "destructive"
      });
    }
  };

  const handleDeleteAccount = async (id: string) => {
    if (!confirm("Delete this student account? They will no longer be able to log in.")) return;
    try {
      await supabase.from('student_accounts').delete().eq('id', id);
      toast({ title: "Student account deleted" });
      fetchData();
    } catch (error: any) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    }
  };

  const getCourseName = (courseId: string) => courses.find(c => c.id === courseId)?.name || courseId;
  const getCourseColor = (courseId: string) => courses.find(c => c.id === courseId)?.color || 'bg-gray-500';

  const messageTypeLabels: Record<string, { label: string; color: string }> = {
    general: { label: "General", color: "bg-blue-100 text-blue-700" },
    live_class: { label: "Live Class Link", color: "bg-red-100 text-red-700" },
    announcement: { label: "Announcement", color: "bg-yellow-100 text-yellow-700" },
    important: { label: "Important", color: "bg-orange-100 text-orange-700" },
  };

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-gradient-to-r from-slate-800 to-purple-800 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-12 w-auto bg-white rounded-lg p-1" />
            <div>
              <h1 className="text-white font-bold text-lg">Super Admin Dashboard</h1>
              <p className="text-purple-200/70 text-xs">Modulus Classes</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-all">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <Radio className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">Go Live</p>
                <p className="text-sm text-muted-foreground">Start session</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{notes.length}</p>
                <p className="text-sm text-muted-foreground">Total Notes</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Video className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{lectures.length}</p>
                <p className="text-sm text-muted-foreground">Total Lectures</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{messages.length}</p>
                <p className="text-sm text-muted-foreground">Messages</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-6">
          {[
            { key: 'golive' as const, icon: Radio, label: 'Go Live' },
            { key: 'notes' as const, icon: FileText, label: 'Manage Notes' },
            { key: 'lectures' as const, icon: Video, label: 'Manage Lectures' },
            { key: 'messages' as const, icon: MessageSquare, label: 'Direct Messages' },
            { key: 'accounts' as const, icon: UserPlus, label: 'Student Accounts' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg'
                  : 'bg-card text-foreground border border-border'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
          </div>
        ) : activeTab === 'golive' ? (
          <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6 flex items-center gap-4">
              <Radio className="w-8 h-8 text-white" />
              <div>
                <h3 className="text-xl font-bold text-white">Go Live</h3>
                <p className="text-white/80 text-sm">Start a live session with your students</p>
              </div>
            </div>
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <a href="https://zoom.us/start/videomeeting" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 p-6 bg-blue-50 rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all group">
                  <div className="w-16 h-16 rounded-xl bg-blue-500 flex items-center justify-center">
                    <Video className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-blue-800">Start Zoom Meeting</h4>
                    <p className="text-blue-600 text-sm">Create a new Zoom meeting instantly</p>
                  </div>
                  <ExternalLink className="w-6 h-6 text-blue-400 group-hover:text-blue-600 transition-colors" />
                </a>
                <a href="https://meet.google.com/new" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 p-6 bg-green-50 rounded-xl border-2 border-green-200 hover:border-green-400 hover:shadow-lg transition-all group">
                  <div className="w-16 h-16 rounded-xl bg-green-500 flex items-center justify-center">
                    <Video className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-green-800">Start Google Meet</h4>
                    <p className="text-green-600 text-sm">Create a new Google Meet instantly</p>
                  </div>
                  <ExternalLink className="w-6 h-6 text-green-400 group-hover:text-green-600 transition-colors" />
                </a>
              </div>
            </div>
          </div>
        ) : activeTab === 'notes' ? (
          <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <FileText className="w-8 h-8 text-white" />
                <div>
                  <h3 className="text-xl font-bold text-white">Manage Notes</h3>
                  <p className="text-white/80 text-sm">Upload and manage course notes</p>
                </div>
              </div>
              <button onClick={() => setShowUploadModal(true)} className="flex items-center gap-2 bg-white text-purple-700 px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
                <Upload className="w-5 h-5" />
                Upload Notes
              </button>
            </div>
            {notes.length === 0 ? (
              <div className="p-12 text-center">
                <FileText className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">No notes uploaded yet</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {notes.map((note) => (
                  <div key={note.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl ${getCourseColor(note.course_id)}/20 flex items-center justify-center`}>
                        <FileText className={`w-6 h-6 ${getCourseColor(note.course_id).replace('bg-', 'text-')}`} />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{note.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getCourseColor(note.course_id)} text-white`}>{getCourseName(note.course_id)}</span>
                          <span className="text-xs text-muted-foreground">{new Date(note.uploaded_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a href={note.file_url} target="_blank" rel="noopener noreferrer" className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                        <ExternalLink className="w-5 h-5" />
                      </a>
                      <button onClick={() => handleDeleteNote(note.id, note.file_url)} className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : activeTab === 'lectures' ? (
          <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Video className="w-8 h-8 text-white" />
                <div>
                  <h3 className="text-xl font-bold text-white">Manage Lectures</h3>
                  <p className="text-white/80 text-sm">Add and manage video lectures</p>
                </div>
              </div>
              <button onClick={() => setShowLectureModal(true)} className="flex items-center gap-2 bg-white text-purple-700 px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
                <Plus className="w-5 h-5" />
                Add Lecture
              </button>
            </div>
            {lectures.length === 0 ? (
              <div className="p-12 text-center">
                <Video className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">No lectures added yet</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {lectures.map((lecture) => (
                  <div key={lecture.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl ${getCourseColor(lecture.course_id)}/20 flex items-center justify-center`}>
                        <Video className={`w-6 h-6 ${getCourseColor(lecture.course_id).replace('bg-', 'text-')}`} />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{lecture.title}</p>
                        {lecture.description && <p className="text-sm text-muted-foreground line-clamp-1">{lecture.description}</p>}
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getCourseColor(lecture.course_id)} text-white`}>{getCourseName(lecture.course_id)}</span>
                          <span className="text-xs text-muted-foreground">{new Date(lecture.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {lecture.video_url && (
                        <a href={lecture.video_url} target="_blank" rel="noopener noreferrer" className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                      <button onClick={() => handleDeleteLecture(lecture.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : activeTab === 'messages' ? (
          /* Messages Tab */
          <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <MessageSquare className="w-8 h-8 text-white" />
                <div>
                  <h3 className="text-xl font-bold text-white">Direct Messages</h3>
                  <p className="text-white/80 text-sm">Send messages, meet links & announcements to students</p>
                </div>
              </div>
              <button onClick={() => setShowMessageModal(true)} className="flex items-center gap-2 bg-white text-purple-700 px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </div>
            {messages.length === 0 ? (
              <div className="p-12 text-center">
                <MessageSquare className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">No messages sent yet</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {messages.map((msg) => {
                  const typeInfo = messageTypeLabels[msg.message_type] || messageTypeLabels.general;
                  return (
                    <div key={msg.id} className="p-4 flex items-start justify-between hover:bg-muted/50 transition-colors">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`w-12 h-12 rounded-xl ${getCourseColor(msg.course_id)}/20 flex items-center justify-center flex-shrink-0`}>
                          <MessageSquare className={`w-6 h-6 ${getCourseColor(msg.course_id).replace('bg-', 'text-')}`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-foreground whitespace-pre-wrap">{msg.message}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${getCourseColor(msg.course_id)} text-white`}>{getCourseName(msg.course_id)}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${typeInfo.color}`}>{typeInfo.label}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(msg.created_at).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => handleDeleteMessage(msg.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors flex-shrink-0">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* Student Accounts Tab */
          <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-4">
                <Users className="w-8 h-8 text-white" />
                <div>
                  <h3 className="text-xl font-bold text-white">Student Accounts</h3>
                  <p className="text-white/80 text-sm">Create & manage individual student logins</p>
                </div>
              </div>
              <button onClick={() => setShowAccountModal(true)} className="flex items-center gap-2 bg-white text-purple-700 px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
                <UserPlus className="w-5 h-5" />
                Create Account
              </button>
            </div>
            {students.length === 0 ? (
              <div className="p-12 text-center">
                <Users className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">No student accounts created yet</p>
                <p className="text-sm text-muted-foreground mt-2">Click "Create Account" to add your first student</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {students.map((s) => (
                  <div key={s.id} className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className={`w-12 h-12 rounded-xl ${getCourseColor(s.course_id)}/20 flex items-center justify-center flex-shrink-0`}>
                        <UserPlus className={`w-6 h-6 ${getCourseColor(s.course_id).replace('bg-', 'text-')}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-foreground truncate">{s.student_name}</p>
                        <p className="text-sm text-muted-foreground truncate">{s.email}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getCourseColor(s.course_id)} text-white`}>{getCourseName(s.course_id)}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-mono flex items-center gap-1">
                            {showStudentPwd[s.id] ? s.password : "•".repeat(Math.min(s.password.length, 10))}
                            <button onClick={() => setShowStudentPwd(p => ({ ...p, [s.id]: !p[s.id] }))} className="ml-1 hover:text-foreground">
                              {showStudentPwd[s.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                            </button>
                          </span>
                          <span className="text-xs text-muted-foreground">{new Date(s.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => handleDeleteAccount(s.id)} className="self-end sm:self-center p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors flex-shrink-0">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowUploadModal(false)} />
          <div className="relative bg-card rounded-2xl shadow-2xl border border-border w-full max-w-lg mx-4 overflow-hidden">
            <button onClick={() => setShowUploadModal(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><X className="w-6 h-6" /></button>
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6">
              <h3 className="text-xl font-bold text-white">Upload Notes</h3>
              <p className="text-white/80 text-sm">Select a course and upload PDF notes</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Note Title *</label>
                <input type="text" value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter note title" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Select Course *</label>
                <div className="grid grid-cols-2 gap-2">
                  {courses.map((course) => (
                    <button key={course.id} onClick={() => setSelectedCourse(course.id)}
                      className={`p-3 rounded-xl text-left transition-all ${selectedCourse === course.id ? `${course.color} text-white shadow-lg` : 'bg-muted text-foreground hover:bg-muted/80'}`}>
                      <p className="font-medium text-sm">{course.name}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Upload PDF *</label>
                <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileUpload} disabled={!selectedCourse || !noteTitle.trim() || isUploading}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white file:font-medium file:cursor-pointer disabled:opacity-50" />
              </div>
              {isUploading && (
                <div className="flex items-center justify-center gap-2 text-purple-600">
                  <Loader2 className="w-5 h-5 animate-spin" /><span>Uploading...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lecture Modal */}
      {showLectureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowLectureModal(false)} />
          <div className="relative bg-card rounded-2xl shadow-2xl border border-border w-full max-w-lg mx-4 overflow-hidden">
            <button onClick={() => setShowLectureModal(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><X className="w-6 h-6" /></button>
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6">
              <h3 className="text-xl font-bold text-white">Add Lecture</h3>
              <p className="text-white/80 text-sm">Add a new video lecture for students</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Lecture Title *</label>
                <input type="text" value={lectureForm.title} onChange={(e) => setLectureForm({ ...lectureForm, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter lecture title" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                <textarea value={lectureForm.description} onChange={(e) => setLectureForm({ ...lectureForm, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none" placeholder="Enter lecture description" rows={3} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Video URL</label>
                <input type="url" value={lectureForm.videoUrl} onChange={(e) => setLectureForm({ ...lectureForm, videoUrl: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="https://youtube.com/watch?v=..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Select Course *</label>
                <div className="grid grid-cols-2 gap-2">
                  {courses.map((course) => (
                    <button key={course.id} onClick={() => setLectureForm({ ...lectureForm, courseId: course.id })}
                      className={`p-3 rounded-xl text-left transition-all ${lectureForm.courseId === course.id ? `${course.color} text-white shadow-lg` : 'bg-muted text-foreground hover:bg-muted/80'}`}>
                      <p className="font-medium text-sm">{course.name}</p>
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={handleAddLecture} disabled={!lectureForm.title || !lectureForm.courseId}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50">
                Add Lecture
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowMessageModal(false)} />
          <div className="relative bg-card rounded-2xl shadow-2xl border border-border w-full max-w-lg mx-4 overflow-hidden">
            <button onClick={() => setShowMessageModal(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><X className="w-6 h-6" /></button>
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6">
              <h3 className="text-xl font-bold text-white">Send Message</h3>
              <p className="text-white/80 text-sm">Send a message, meet link or announcement to students</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Select Course *</label>
                <div className="grid grid-cols-2 gap-2">
                  {courses.map((course) => (
                    <button key={course.id} onClick={() => setMessageForm({ ...messageForm, courseId: course.id })}
                      className={`p-3 rounded-xl text-left transition-all ${messageForm.courseId === course.id ? `${course.color} text-white shadow-lg` : 'bg-muted text-foreground hover:bg-muted/80'}`}>
                      <p className="font-medium text-sm">{course.name}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Message Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(messageTypeLabels).map(([key, val]) => (
                    <button key={key} onClick={() => setMessageForm({ ...messageForm, messageType: key })}
                      className={`p-2 rounded-xl text-sm font-medium transition-all ${messageForm.messageType === key ? 'bg-purple-600 text-white shadow-lg' : 'bg-muted text-foreground hover:bg-muted/80'}`}>
                      {val.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Message *</label>
                <textarea value={messageForm.message} onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none" placeholder="Enter your message, meet link, or announcement..." rows={4} />
              </div>
              <button onClick={handleSendMessage} disabled={!messageForm.message.trim() || !messageForm.courseId}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Account Modal */}
      {showAccountModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAccountModal(false)} />
          <div className="relative bg-card rounded-2xl shadow-2xl border border-border w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowAccountModal(false)} className="absolute top-4 right-4 text-white/80 hover:text-white z-10"><X className="w-6 h-6" /></button>
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6">
              <div className="flex items-center gap-3">
                <UserPlus className="w-7 h-7 text-white" />
                <div>
                  <h3 className="text-xl font-bold text-white">Create Student Account</h3>
                  <p className="text-white/80 text-sm">Set login credentials for a student</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Student Name *</label>
                <input type="text" value={accountForm.studentName} onChange={(e) => setAccountForm({ ...accountForm, studentName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="e.g. Rahul Sharma" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Batch / Course *</label>
                <div className="grid grid-cols-2 gap-2">
                  {courses.map((course) => (
                    <button key={course.id} type="button" onClick={() => setAccountForm({ ...accountForm, courseId: course.id })}
                      className={`p-3 rounded-xl text-left transition-all ${accountForm.courseId === course.id ? `${course.color} text-white shadow-lg` : 'bg-muted text-foreground hover:bg-muted/80'}`}>
                      <p className="font-medium text-sm">{course.name}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email ID *</label>
                <input type="email" value={accountForm.email} onChange={(e) => setAccountForm({ ...accountForm, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="student@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Password *</label>
                <div className="relative">
                  <input type={showFormPwd ? "text" : "password"} value={accountForm.password} onChange={(e) => setAccountForm({ ...accountForm, password: e.target.value })}
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Min 6 characters" />
                  <button type="button" onClick={() => setShowFormPwd(!showFormPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showFormPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Student will use this email + password to log in to their course portal.</p>
              </div>
              <button onClick={handleCreateAccount}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <UserPlus className="w-5 h-5" />
                Create Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminDashboard;
