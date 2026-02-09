import React, { useState, useEffect, useRef } from 'react';
import { 
  Briefcase, 
  User, 
  PlusCircle, 
  Search, 
  MapPin, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  ExternalLink,
  Menu,
  X,
  Building2,
  Trophy,
  Mail,
  Phone,
  LogIn,
  LogOut,
  Send,
  UserCheck,
  ChevronDown,
  Settings,
  LayoutDashboard,
  Pencil,
  Plus,
  Trash2,
  Globe,
  Camera,
  Smartphone,
  Filter,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  FileText,
  Compass
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  
  // Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [searchCountry, setSearchCountry] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  
  // Auth States
  const [user, setUser] = useState(null); 
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMethod, setAuthMethod] = useState('email'); 
  const [loginRole, setLoginRole] = useState('employer');

  // Chat States
  const [activeChat, setActiveChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const chatEndRef = useRef(null);

  // Mock Data
  const [jobs, setJobs] = useState([
    { id: 1, title: "Senior Frontend Engineer", company: "TechFlow Systems", city: "New York", country: "USA", location: "New York, USA", salary: "$140k - $180k", type: "Full-time", description: "We are looking for a React expert to lead our dashboard redesign project.", posted: "2 days ago" },
    { id: 2, title: "UI/UX Designer", company: "Creative Pulse", city: "London", country: "UK", location: "London, UK", salary: "$80k - $110k", type: "Contract", description: "Help us build the future of mobile banking. Strong Figma skills required.", posted: "5 hours ago" },
    { id: 3, title: "Backend Architect", company: "DataNode", city: "Berlin", country: "Germany", location: "Berlin, DE", salary: "$120k - $150k", type: "Full-time", description: "Scale our microservices architecture using Go and Kubernetes.", posted: "1 day ago" }
  ]);

  const [freelancers, setFreelancers] = useState([
    { id: 1, name: "Alex Rivera", role: "Full Stack Developer", experience: "8 Years", skills: ["React", "Node.js", "AWS"], bio: "Specializing in high-performance web applications and cloud architecture.", hourly: "$95/hr" },
    { id: 2, name: "Sarah Chen", role: "Brand Strategist", experience: "5 Years", skills: ["Branding", "SEO", "Copywriting"], bio: "I help startups find their voice and dominate their market niche.", hourly: "$70/hr" },
    { id: 3, name: "Marcus Thorne", role: "Mobile Dev", experience: "6 Years", skills: ["Flutter", "Kotlin", "Firebase"], bio: "Crafting beautiful cross-platform experiences.", hourly: "$85/hr" }
  ]);

  const [experiences, setExperiences] = useState([
    { id: 1, title: "Senior Developer", company: "Global Tech", duration: "2021 - Present", description: "Leading the core platform team." },
    { id: 2, title: "Web Developer", company: "StartUp Hub", duration: "2018 - 2021", description: "Built responsive UI components." }
  ]);

  // Search Logic
  const filteredJobs = jobs.filter(job => {
    const query = searchQuery.toLowerCase();
    const city = searchCity.toLowerCase();
    const country = searchCountry.toLowerCase();
    
    return (
      (job.title.toLowerCase().includes(query) || job.company.toLowerCase().includes(query)) &&
      job.city.toLowerCase().includes(city) &&
      job.country.toLowerCase().includes(country)
    );
  });

  // Effects
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    window.scrollTo(0, 0);
  }, [activeTab, chatMessages]);

  const addNotification = (msg) => {
    const id = Date.now();
    setNotifications([...notifications, { id, msg }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 3000);
  };

  const handleDiscovery = () => {
    setHasSearched(true);
    const element = document.getElementById('discovery-feed');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    addNotification("Updating results...");
  };

  const handleLogin = (e, provider) => {
    e?.preventDefault();
    setUser({ 
      name: loginRole === 'employer' ? "Sarah Johnson" : "Alex Rivera", 
      email: loginRole === 'employer' ? "sarah@searchforjobs.com" : "alex@searchforjobs.com",
      role: loginRole,
      company: loginRole === 'employer' ? "TechFlow Systems" : null,
      bio: loginRole === 'freelancer' ? "Full Stack Developer specializing in React and Node.js." : null
    });
    setShowAuthModal(false);
    setActiveTab('dashboard');
    addNotification(`Logged in as ${loginRole} via ${provider}!`);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveChat(null);
    setActiveTab('home');
    setIsAccountMenuOpen(false);
    addNotification("Logged out successfully");
  };

  const triggerContact = (target) => {
    if (!user) {
      setLoginRole('employer');
      setShowAuthModal(true);
      addNotification("Please login to start a conversation");
    } else {
      setActiveChat(target);
      if (chatMessages.length === 0) {
        setChatMessages([{ id: 1, sender: 'system', text: `You are now messaging ${target.name}.`, time: "Now" }]);
      }
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;
    const newMessage = { id: Date.now(), sender: user ? user.role : 'guest', text: currentMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages([...chatMessages, newMessage]);
    setCurrentMessage('');
    setTimeout(() => {
      setChatMessages(prev => [...prev, { id: Date.now() + 1, sender: 'other', text: `Received! I'll check my dashboard soon.`, time: "Just now" }]);
    }, 1500);
  };

  // UI Components
  const Logo = () => (
    <div className="flex items-center cursor-pointer group" onClick={() => { setActiveTab('home'); setHasSearched(false); }}>
      <div className="relative">
        <div className="bg-indigo-600 p-2.5 rounded-2xl mr-3 shadow-lg shadow-indigo-200 group-hover:bg-indigo-700 transition transform group-hover:rotate-6">
          <Search className="text-white w-6 h-6" />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full border-2 border-white"></div>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tighter leading-none">
          SearchForJobs
        </span>
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-0.5">Connect & Hire</span>
      </div>
    </div>
  );

  const AuthModal = () => {
    if (!showAuthModal) return null;
    return (
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAuthModal(false)}></div>
        <div className="bg-white rounded-3xl w-full max-w-md p-8 relative z-10 shadow-2xl animate-in zoom-in-95 duration-200">
          <button onClick={() => setShowAuthModal(false)} className="absolute right-6 top-6 text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Join SearchForJobs</h2>
            <p className="text-gray-500 mt-2 text-sm font-medium">Join our global network of talent and companies</p>
          </div>
          <div className="flex gap-3 mb-8">
            <button onClick={() => setLoginRole('employer')} className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition ${loginRole === 'employer' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-100 text-gray-400 hover:border-gray-200'}`}><Building2 className="w-6 h-6" /><span className="font-bold text-xs uppercase tracking-widest">Employer</span></button>
            <button onClick={() => setLoginRole('freelancer')} className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition ${loginRole === 'freelancer' ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-gray-100 text-gray-400 hover:border-purple-200'}`}><UserCheck className="w-6 h-6" /><span className="font-bold text-xs uppercase tracking-widest">Freelancer</span></button>
          </div>
          <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
            <button onClick={() => setAuthMethod('email')} className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-lg transition ${authMethod === 'email' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}><Mail className="w-4 h-4" /> Email</button>
            <button onClick={() => setAuthMethod('phone')} className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-lg transition ${authMethod === 'phone' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}><Smartphone className="w-4 h-4" /> Phone</button>
          </div>
          {authMethod === 'email' ? (
            <form onSubmit={(e) => handleLogin(e, 'Email')} className="space-y-4">
              <input type="email" placeholder="name@company.com" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition" />
              <input type="password" placeholder="Password" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition" />
              <button className={`w-full text-white py-3.5 rounded-xl font-bold transition shadow-lg ${loginRole === 'employer' ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100' : 'bg-purple-600 hover:bg-purple-700 shadow-purple-100'}`}>Sign In as {loginRole.charAt(0).toUpperCase() + loginRole.slice(1)}</button>
            </form>
          ) : (
            <form onSubmit={(e) => handleLogin(e, 'Phone')} className="space-y-4">
              <div className="flex gap-2">
                <select className="px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold outline-none"><option>+1</option><option>+44</option><option>+91</option></select>
                <input type="tel" placeholder="000-000-0000" required className="flex-grow px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition" />
              </div>
              <button className={`w-full text-white py-3.5 rounded-xl font-bold transition shadow-lg ${loginRole === 'employer' ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100' : 'bg-purple-600 hover:bg-purple-700 shadow-purple-100'}`}>Get OTP Code</button>
            </form>
          )}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-gray-400 font-black tracking-widest">Or continue with</span></div>
          </div>
          <button onClick={() => handleLogin(null, 'Google')} className="w-full flex items-center justify-center gap-3 border-2 border-gray-100 py-3 rounded-xl font-bold hover:bg-gray-50 transition active:scale-95 duration-100">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>Sign in with Google
          </button>
        </div>
      </div>
    );
  };

  const AccountDropdown = () => {
    if (!user) return null;
    return (
      <div className="relative">
        <button onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)} className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full hover:bg-gray-100 transition">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold ${user.role === 'employer' ? 'bg-indigo-600' : 'bg-purple-600'}`}>{user.name.charAt(0)}</div>
          <span className="text-sm font-bold text-gray-700 hidden sm:block">Account</span>
          <ChevronDown className={`w-4 h-4 transition ${isAccountMenuOpen ? 'rotate-180' : ''}`} />
        </button>
        {isAccountMenuOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsAccountMenuOpen(false)}></div>
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden py-2 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-4 py-2 border-b border-gray-50 mb-1"><p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{user.role}</p><p className="text-sm font-bold text-gray-900 truncate">{user.name}</p></div>
              <button onClick={() => { setActiveTab('dashboard'); setIsAccountMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-indigo-600 transition"><LayoutDashboard className="w-4 h-4" /> Dashboard</button>
              <button onClick={() => { setActiveTab('profile'); setIsAccountMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-indigo-600 transition"><User className="w-4 h-4" /> My Profile</button>
              <button onClick={() => { setActiveTab('settings'); setIsAccountMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-indigo-600 transition"><Settings className="w-4 h-4" /> Settings</button>
              <div className="h-px bg-gray-100 my-1"></div>
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition font-bold"><LogOut className="w-4 h-4" /> Sign Out</button>
            </div>
          </>
        )}
      </div>
    );
  };

  const JobCard = ({ job }) => (
    <div key={job.id} className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition group">
      <div className="flex justify-between items-start gap-4">
        <div className="bg-indigo-50 p-4 rounded-2xl group-hover:bg-indigo-600 transition duration-300">
          <Building2 className="w-6 h-6 text-indigo-600 group-hover:text-white" />
        </div>
        <div className="flex-grow">
          <div className="flex flex-wrap justify-between items-start gap-2">
            <div>
              <h3 className="text-xl font-black text-gray-900 leading-tight group-hover:text-indigo-600 transition">{job.title}</h3>
              <div className="flex flex-wrap gap-4 mt-2 text-xs font-bold text-gray-400 uppercase tracking-tight">
                <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" /> {job.company}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                <span className="flex items-center gap-1 text-green-600"><DollarSign className="w-3.5 h-3.5" /> {job.salary}</span>
              </div>
            </div>
            <button onClick={() => addNotification(`Applied to ${job.company}`)} className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-black hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 whitespace-nowrap">Apply Now</button>
          </div>
          <p className="mt-5 text-gray-500 leading-relaxed text-sm line-clamp-2">{job.description}</p>
          <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5"><Clock className="w-3 h-3" /> Posted {job.posted}</span>
            <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-gray-100">{job.type}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const FreelancerCard = ({ talent }) => (
    <div key={talent.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-6 hover:shadow-xl transition border-l-4 border-l-purple-500">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center shrink-0 border border-purple-100 shadow-inner">
          <User className="text-purple-600 w-8 h-8" />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-black text-gray-900 tracking-tight">{talent.name}</h3>
              <p className="text-purple-600 font-bold text-xs uppercase tracking-wider">{talent.role}</p>
            </div>
            <p className="font-black text-gray-900 bg-gray-50 px-3 py-1 rounded-lg text-sm shadow-sm">{talent.hourly}</p>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{talent.bio}</p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {talent.skills.map(s => <span key={s} className="px-2 py-1 bg-gray-50 text-gray-500 rounded text-[10px] font-black uppercase tracking-tighter border border-gray-100">{s}</span>)}
      </div>
      <div className="mt-4 flex gap-3">
        <button onClick={() => triggerContact(talent)} className="flex-grow flex items-center justify-center bg-purple-600 text-white py-2.5 rounded-xl font-bold hover:bg-purple-700 shadow-lg shadow-purple-100 transition"><MessageSquare className="w-4 h-4 mr-2" /> Contact</button>
        <button className="px-4 py-2 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 transition text-gray-400 hover:text-gray-900"><ExternalLink className="w-4 h-4" /></button>
      </div>
    </div>
  );

  // Content Views
  const HomeView = () => (
    <div className="animate-in fade-in duration-500">
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900 py-20 px-4 sm:px-6 lg:px-8 rounded-[3rem] mb-16 relative overflow-hidden shadow-2xl shadow-indigo-200">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.05] tracking-tight">
            Find work that <span className="text-indigo-300 italic">matters.</span>
          </h1>
          <p className="text-lg md:text-xl text-indigo-100/70 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Search thousands of high-paying jobs or showcase your talent to elite hiring managers worldwide.
          </p>
          
          <div className="bg-white/10 backdrop-blur-xl p-3 rounded-[2.5rem] border border-white/20 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-4 h-4" />
                <input type="text" placeholder="Job Title" className="w-full bg-white/5 text-white px-10 py-4 rounded-2xl outline-none placeholder:text-white/40 font-bold focus:bg-white/10 transition" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-4 h-4" />
                <input type="text" placeholder="City" className="w-full bg-white/5 text-white px-10 py-4 rounded-2xl outline-none placeholder:text-white/40 font-bold focus:bg-white/10 transition" value={searchCity} onChange={(e) => setSearchCity(e.target.value)} />
              </div>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-4 h-4" />
                <input type="text" placeholder="Country" className="w-full bg-white/5 text-white px-10 py-4 rounded-2xl outline-none placeholder:text-white/40 font-bold focus:bg-white/10 transition" value={searchCountry} onChange={(e) => setSearchCountry(e.target.value)} />
              </div>
              <button onClick={handleDiscovery} className="bg-white text-indigo-900 px-6 py-4 rounded-2xl font-black hover:bg-indigo-50 transition shadow-xl active:scale-95 flex items-center justify-center gap-2"><Sparkles className="w-4 h-4" /> Discovery</button>
            </div>
          </div>
        </div>
      </div>

      <div id="discovery-feed" className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        <div className="xl:col-span-8 space-y-10">
          <div className="flex items-center justify-between border-b border-gray-100 pb-6">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-gray-900">{hasSearched ? `Search Results (${filteredJobs.length})` : 'Trending Opportunities'}</h2>
              <p className="text-gray-500 font-bold text-sm uppercase mt-1 tracking-widest">{hasSearched ? 'Refined by your Discovery' : 'Active Jobs Near You'}</p>
            </div>
            {hasSearched && <button onClick={() => { setSearchQuery(''); setSearchCity(''); setSearchCountry(''); setHasSearched(false); }} className="text-gray-400 font-black text-xs uppercase tracking-widest hover:text-indigo-600 transition">Clear Filters</button>}
          </div>
          <div className="space-y-6">
            {filteredJobs.length > 0 ? (filteredJobs.map(job => <JobCard key={job.id} job={job} />)) : (
              <div className="bg-purple-50 p-12 rounded-[3rem] border-2 border-dashed border-purple-200 text-center animate-in zoom-in-95 duration-500">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6"><UserCheck className="w-10 h-10 text-purple-600" /></div>
                <h3 className="text-2xl font-black text-purple-900 tracking-tight">No matching jobs found!</h3>
                <p className="text-purple-700/70 font-medium max-w-md mx-auto mt-2 mb-8">Don't worry! Instead of searching, you can post an "Availability Ad" so top companies can reach out to you directly.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button onClick={() => setActiveTab('post-profile')} className="bg-purple-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-purple-700 shadow-xl shadow-purple-100 transition flex items-center justify-center gap-2"><Trophy className="w-5 h-5" /> Post My Experience Ad</button>
                  <button onClick={() => { setSearchQuery(''); setSearchCity(''); setSearchCountry(''); setHasSearched(false); }} className="bg-white text-purple-600 border border-purple-200 px-10 py-4 rounded-2xl font-black hover:bg-purple-50 transition">Reset Search</button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="xl:col-span-4 space-y-10">
          <div className="flex items-center justify-between border-b border-gray-100 pb-6">
            <div><h2 className="text-3xl font-black tracking-tight text-gray-900">Top Professionals</h2><p className="text-gray-500 font-bold text-sm uppercase mt-1 tracking-widest">Verified Experts</p></div>
          </div>
          <div className="grid grid-cols-1 gap-6">{freelancers.map(talent => <FreelancerCard key={talent.id} talent={talent} />)}</div>
        </div>
      </div>
    </div>
  );

  const AboutUsView = () => (
    <div className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in duration-500">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">About SearchForJobs</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">We are on a mission to bridge the gap between world-class talent and innovative companies across the globe.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6"><Trophy className="text-indigo-600" /></div>
          <h3 className="text-2xl font-black mb-4">Our Mission</h3>
          <p className="text-gray-600 leading-relaxed">To create a frictionless marketplace where skills are the primary currency, enabling anyone, anywhere to find meaningful work with the world's best employers.</p>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-6"><Globe className="text-purple-600" /></div>
          <h3 className="text-2xl font-black mb-4">Global Reach</h3>
          <p className="text-gray-600 leading-relaxed">With users in over 120 countries, we provide localized tools for global search, ensuring that geography is never a barrier to professional growth.</p>
        </div>
      </div>
    </div>
  );

  const PrivacyPolicyView = () => (
    <div className="max-w-3xl mx-auto py-12 px-4 animate-in fade-in duration-500">
      <h1 className="text-4xl font-black text-gray-900 mb-8 tracking-tight flex items-center gap-4"><ShieldCheck className="text-green-600 w-10 h-10" /> Privacy Policy</h1>
      <div className="prose prose-indigo max-w-none text-gray-600 space-y-8 font-medium">
        <p>We take your privacy seriously. This document outlines how your professional and personal data is handled on SearchForJobs.</p>
        <section>
          <h3 className="text-xl font-bold text-gray-900 mb-3">1. Information Collection</h3>
          <p>We collect data provided during account creation and profile updates to enhance your job discovery experience.</p>
        </section>
        <section>
          <h3 className="text-xl font-bold text-gray-900 mb-3">2. Cookies & Analytics</h3>
          <p>We use essential cookies for sessions and Google AdSense for monetization. By using this site, you agree to our data handling practices.</p>
        </section>
      </div>
    </div>
  );

  const TermsView = () => (
    <div className="max-w-3xl mx-auto py-12 px-4 animate-in fade-in duration-500">
      <h1 className="text-4xl font-black text-gray-900 mb-8 tracking-tight flex items-center gap-4"><FileText className="text-indigo-600 w-10 h-10" /> Terms & Conditions</h1>
      <div className="prose prose-indigo max-w-none text-gray-600 space-y-8 font-medium">
        <p>By using the SearchForJobs platform, you agree to adhere to our community guidelines and usage policies.</p>
        <section>
          <h3 className="text-xl font-bold text-gray-900 mb-3">1. Platform Integrity</h3>
          <p>Users must provide accurate professional information. Misrepresentation of skills or identity will result in account suspension.</p>
        </section>
      </div>
    </div>
  );

  const DashboardView = () => {
    if (!user) return null;
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4">
        <h1 className="text-4xl font-black mb-10 flex items-center gap-4 tracking-tight">
          <div className="p-3 bg-indigo-50 rounded-2xl"><LayoutDashboard className="text-indigo-600 w-8 h-8" /></div>
          {user.role === 'employer' ? 'Employer Hub' : 'Professional Hub'}
        </h1>
        {user.role === 'employer' ? (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-100">
                <p className="text-indigo-200 text-xs font-black uppercase tracking-widest">Active Jobs</p>
                <p className="text-5xl font-black mt-2">04</p>
                <div className="mt-8 flex items-center gap-2 text-sm font-bold text-indigo-100 cursor-pointer"><ArrowRight className="w-4 h-4" /> Analytics</div>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <p className="text-gray-400 text-xs font-black uppercase tracking-widest">Applicants</p>
                <p className="text-5xl font-black mt-2 text-gray-900">28</p>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <p className="text-gray-400 text-xs font-black uppercase tracking-widest">Response</p>
                <p className="text-5xl font-black mt-2 text-gray-900">2h</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden relative">
              <div className="h-48 bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-900"></div>
              <div className="px-10 pb-10">
                <div className="relative -mt-20 mb-6 flex justify-between items-end">
                  <div className="w-40 h-40 rounded-[2.5rem] border-8 border-white bg-indigo-50 overflow-hidden flex items-center justify-center shadow-xl group cursor-pointer relative"><User className="w-20 h-20 text-indigo-200" /><div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300"><Camera className="text-white w-8 h-8" /></div></div>
                </div>
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">{user.name}</h1>
                <p className="text-xl text-indigo-600 font-bold mt-2 uppercase tracking-tight">Full Stack Developer | React Expert</p>
              </div>
            </div>
            <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-black mb-8 tracking-tight">Experience</h2>
              <div className="space-y-8">
                {experiences.map(exp => (
                  <div key={exp.id} className="flex gap-8 group">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:bg-indigo-50 transition duration-300"><Building2 className="text-gray-300 group-hover:text-indigo-600 w-8 h-8" /></div>
                    <div><h3 className="text-xl font-black text-gray-900 tracking-tight">{exp.title}</h3><p className="text-indigo-600 font-bold text-sm uppercase tracking-widest mt-1">{exp.company}</p><p className="text-gray-500 mt-4 leading-relaxed font-medium">{exp.description}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const Footer = () => (
    <footer className="mt-40 border-t border-gray-100 pt-20 pb-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-6 text-sm text-gray-400 leading-relaxed font-medium">Empowering professionals and companies to discover the future of collaborative work through the most innovative job hub.</p>
          </div>
          <div>
            <h4 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] mb-6">Explore</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-400">
              <li><button onClick={() => setActiveTab('jobs')} className="hover:text-indigo-600 transition">Jobs Feed</button></li>
              <li><button onClick={() => setActiveTab('freelancers')} className="hover:text-indigo-600 transition">Expert Talent</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] mb-6">Company</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-400">
              <li><button onClick={() => setActiveTab('about')} className="hover:text-indigo-600 transition">About Us</button></li>
              <li><button onClick={() => setActiveTab('privacy')} className="hover:text-indigo-600 transition">Privacy Policy</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] mb-6">Legal</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-400">
              <li><button onClick={() => setActiveTab('terms')} className="hover:text-indigo-600 transition">Terms & Conditions</button></li>
              <li><button className="hover:text-indigo-600 transition">Cookie Settings</button></li>
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-gray-50 flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
          <p>© 2024 SearchForJobs Inc.</p>
          <div className="flex gap-8"><Globe className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" /><Compass className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" /></div>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pb-20 selection:bg-indigo-100 selection:text-indigo-900">
      <NavigationBar />
      <AuthModal />
      
      {activeChat && (
        <div className="fixed bottom-6 right-6 z-[120] w-full max-w-[360px] bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[520px] animate-in slide-in-from-bottom-10">
          <div className="bg-indigo-600 p-5 text-white flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-black">{activeChat.name.charAt(0)}</div>
              <div><p className="font-black text-sm leading-none">{activeChat.name}</p><p className="text-[10px] text-indigo-100 uppercase tracking-widest font-black mt-1.5">Active Now</p></div>
            </div>
            <button onClick={() => setActiveChat(null)} className="p-2 hover:bg-white/10 rounded-xl transition"><X className="w-5 h-5" /></button>
          </div>
          <div className="flex-grow p-5 overflow-y-auto space-y-4 bg-gray-50/50">
            {chatMessages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === (user ? user.role : 'guest') ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-[1.25rem] px-4 py-3 text-sm font-medium ${msg.sender === (user ? user.role : 'guest') ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none shadow-sm'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={sendMessage} className="p-4 bg-white border-t border-gray-100 flex gap-2">
            <input type="text" value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} placeholder="Type a message..." className="flex-grow bg-gray-100 rounded-2xl px-4 py-3 text-sm outline-none font-medium" />
            <button type="submit" className="bg-indigo-600 text-white p-3 rounded-2xl hover:bg-indigo-700 transition"><Send className="w-5 h-5" /></button>
          </form>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 min-h-[60vh]">
        <div className="fixed top-24 right-6 z-[100] flex flex-col gap-3">
          {notifications.map(n => (
            <div key={n.id} className="bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center animate-in slide-in-from-right-full duration-300">
              <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" /> <span className="text-sm font-black uppercase tracking-tight">{n.msg}</span>
            </div>
          ))}
        </div>

        {activeTab === 'home' && <HomeView />}
        {activeTab === 'about' && <AboutUsView />}
        {activeTab === 'privacy' && <PrivacyPolicyView />}
        {activeTab === 'terms' && <TermsView />}
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'profile' && <ProfileView />}
        {activeTab === 'jobs' && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <h1 className="text-4xl font-black mb-10 text-gray-900 tracking-tight">Browse Careers</h1>
            <div className="grid grid-cols-1 gap-8">{jobs.map(job => <JobCard key={job.id} job={job} />)}</div>
          </div>
        )}
        {activeTab === 'freelancers' && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
             <h1 className="text-4xl font-black mb-12 tracking-tight">Expert Network</h1>
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">{freelancers.map(talent => <FreelancerCard key={talent.id} talent={talent} />)}</div>
          </div>
        )}
        {activeTab === 'post-job' && user?.role === 'employer' && (
          <div className="max-w-2xl mx-auto bg-white p-12 rounded-[3rem] border border-gray-100 shadow-2xl animate-in slide-in-from-bottom-10">
            <h1 className="text-3xl font-black mb-10 tracking-tight flex items-center gap-3"><PlusCircle className="text-indigo-600 w-10 h-10" /> Create Position</h1>
            <form onSubmit={(e) => { e.preventDefault(); addNotification("Position Live!"); setActiveTab('dashboard'); }} className="space-y-8">
              <input type="text" placeholder="Job Title" className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none font-bold" />
              <input type="text" placeholder="Location" className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none font-bold" />
              <button className="w-full bg-indigo-600 text-white py-5 rounded-3xl font-black text-lg shadow-2xl shadow-indigo-100 hover:bg-indigo-700 transition">Broadcast Vacancy</button>
            </form>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );

  function NavigationBar() {
    return (
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Logo />
            <div className="hidden md:flex space-x-10 items-center">
              <button onClick={() => setActiveTab('jobs')} className={`text-xs font-black uppercase tracking-widest transition ${activeTab === 'jobs' ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-900'}`}>Jobs Feed</button>
              <button onClick={() => setActiveTab('freelancers')} className={`text-xs font-black uppercase tracking-widest transition ${activeTab === 'freelancers' ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-900'}`}>Experts</button>
              <div className="h-6 w-[2px] bg-gray-100"></div>
              {user ? <AccountDropdown /> : <button onClick={() => setShowAuthModal(true)} className="text-xs font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-6 py-2.5 rounded-full transition hover:bg-indigo-100 active:scale-95">Login / Join</button>}
            </div>
            <div className="md:hidden flex items-center gap-4">{user && <AccountDropdown />}<button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-500 p-2"><Menu /></button></div>
          </div>
        </div>
      </nav>
    );
  }
};

export default App; 