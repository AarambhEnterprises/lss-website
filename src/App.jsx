import React, { useState, useEffect } from 'react';
import { 
  Menu, X, MapPin, Phone, Mail, Calendar, 
  BookOpen, Dumbbell, Users, ChevronRight, 
  Building2, HeartHandshake, Image as ImageIcon,
  LayoutDashboard, Megaphone, FileText, Settings, Plus, Edit, Trash2, LogOut
} from 'lucide-react';

// --- MOCK DATA (For Public Website Frontend) ---
const mockAnnouncements = [
  "Centenary Year Special: LSS Vasant Vyakhyanmala 2026 scheduled for next month.",
  "Admissions open for Dr. A. V. Baliga Gymnasium - Special batches for ladies.",
  "New extensive collection of Marathi literature added to Shree P. V. Dixit Library."
];

const mockEvents = [
  { id: 1, title: "Vasant Vyakhyanmala", date: "2026-05-15", venue: "Tilak Mandir, Main Hall", desc: "Annual spring lecture series featuring prominent thinkers, authors, and social workers.", imgUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80" },
  { id: 2, title: "Lokmanya Tilak Punyatithi", date: "2026-08-01", venue: "LSS Ground", desc: "Tribute to Lokmanya Tilak with cultural programs and social service initiatives.", imgUrl: "https://images.unsplash.com/photo-1521622340576-a07e4d8fb875?auto=format&fit=crop&w=600&q=80" },
  { id: 3, title: "Sarvajanik Ganeshotsav", date: "2026-09-07", venue: "Tilak Mandir Sabhagriha", desc: "Traditional Ganeshotsav celebration focusing on eco-friendly idols and cultural roots.", imgUrl: "https://images.unsplash.com/photo-1566810237731-155ce8c8e1d5?auto=format&fit=crop&w=600&q=80" }
];

const mockShakhas = [
  { id: 1, name: "Main Branch (Tilak Mandir)", address: "Ram Mandir Road, Vile Parle (East)", head: "Central Committee" },
  { id: 2, name: "LSS Medical & Health Centre", address: "Vile Parle (East)", head: "Medical Director" },
  { id: 3, name: "Ramabai Paranjape Balmandir", address: "Tilak Mandir Premises", head: "Education Coordinator" }
];

// --- MAIN APP ROUTER ---
export default function App() {
  const [currentAppView, setCurrentAppView] = useState('public');

  if (currentAppView === 'admin') {
    return <AdminApp setAppView={setCurrentAppView} />;
  }

  return <PublicWebsite setAppView={setCurrentAppView} />;
}

// ==========================================
// 1. PUBLIC WEBSITE COMPONENT
// ==========================================
function PublicWebsite({ setAppView }) {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateTo = (page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <div className="bg-orange-600 text-white text-xs md:text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <div className="flex items-center space-x-4">
            <span className="flex items-center"><Phone size={14} className="mr-1"/> (022) 3511 2989</span>
            <span className="flex items-center"><Mail size={14} className="mr-1"/> info@lssparle.org.in</span>
          </div>
          <div className="flex space-x-3">
            <button onClick={() => setAppView('admin')} className="hover:underline flex items-center bg-orange-700 px-2 py-1 rounded">
               Admin Login
            </button>
            <span className="py-1">|</span>
            <button className="hover:underline font-semibold text-orange-100 py-1">Donate Now</button>
          </div>
        </div>
      </div>

      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center cursor-pointer" onClick={() => navigateTo('home')}>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center border-2 border-orange-500 mr-3">
                <span className="text-orange-600 font-bold text-xl">LSS</span>
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">Lokamanya Seva Sangh</h1>
                <p className="text-sm text-slate-500 font-medium">Parle, Mumbai</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <NavLink label="Home" active={currentPage === 'home'} onClick={() => navigateTo('home')} />
              <NavLink label="About Us" active={currentPage === 'about'} onClick={() => navigateTo('about')} />
              <NavLink label="Shakhas" active={currentPage === 'shakhas'} onClick={() => navigateTo('shakhas')} />
              <NavLink label="Services" active={currentPage === 'services'} onClick={() => navigateTo('services')} />
              <NavLink label="Events" active={currentPage === 'events'} onClick={() => navigateTo('events')} />
              <button onClick={() => navigateTo('contact')} className="bg-orange-600 text-white px-5 py-2 rounded-full font-medium hover:bg-orange-700 transition-colors shadow-sm">
                Contact Us
              </button>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600 hover:text-orange-600 focus:outline-none">
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 pt-2 pb-4 space-y-1 shadow-lg absolute w-full">
            <MobileNavLink label="Home" onClick={() => navigateTo('home')} />
            <MobileNavLink label="About Us" onClick={() => navigateTo('about')} />
            <MobileNavLink label="Services" onClick={() => navigateTo('services')} />
            <MobileNavLink label="Contact Us" onClick={() => navigateTo('contact')} />
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {currentPage === 'home' && <HomeView navigateTo={navigateTo} />}
        {currentPage === 'about' && <AboutView />}
        {currentPage === 'shakhas' && <ShakhasView />}
        {currentPage === 'services' && <ServicesView />}
        {currentPage === 'events' && <EventsView />}
        {currentPage === 'contact' && <ContactView />}
      </main>

      <footer className="bg-slate-900 text-slate-300 py-12 border-t-4 border-orange-500 text-center">
        <p>&copy; 2026 Lokamanya Seva Sangh, Parle. All rights reserved.</p>
      </footer>
    </div>
  );
}

function HomeView({ navigateTo }) {
  return (
    <div className="animate-fade-in">
      <section className="relative bg-slate-800 text-white overflow-hidden py-24 md:py-32 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Empowering the Community</h1>
        <button onClick={() => navigateTo('events')} className="mt-8 bg-orange-600 text-white px-8 py-3 rounded-full font-bold shadow-lg">
          View Upcoming Events
        </button>
      </section>
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">A Century of Community Service</h2>
          <p className="text-lg text-slate-700 max-w-3xl mx-auto">
            Established on 25th March 1923, Lokamanya Seva Sangh (LSS) was founded by devoted followers of Lokmanya Bal Gangadhar Tilak. For over 100 years, we have been the cultural and social heartbeat of Vile Parle.
          </p>
        </div>
      </section>
    </div>
  );
}

function AboutView() {
  return <div className="p-12 text-center"><h1 className="text-4xl font-bold">About Us</h1></div>;
}
function ShakhasView() {
  return <div className="p-12 text-center"><h1 className="text-4xl font-bold">Our Shakhas</h1></div>;
}
function ServicesView() {
  return <div className="p-12 text-center"><h1 className="text-4xl font-bold">Our Services</h1></div>;
}
function EventsView() {
  return <div className="p-12 text-center"><h1 className="text-4xl font-bold">Programs & Events</h1></div>;
}
function ContactView() {
  return <div className="p-12 text-center"><h1 className="text-4xl font-bold">Contact Us</h1></div>;
}

function NavLink({ label, active, onClick }) {
  return (
    <button onClick={onClick} className={`font-medium transition-colors border-b-2 py-1 ${active ? 'text-orange-600 border-orange-600' : 'text-slate-600 border-transparent hover:text-orange-600'}`}>
      {label}
    </button>
  );
}
function MobileNavLink({ label, onClick }) {
  return <button onClick={onClick} className="block w-full text-left px-4 py-3 text-slate-700 font-medium hover:bg-orange-50">{label}</button>;
}

// ==========================================
// 2. ADMIN PANEL COMPONENT
// ==========================================
function AdminApp({ setAppView }) {
  // Bypassing Firebase for the demo so it loads instantly without crashing
  const [user, setUser] = useState({ uid: 'demo-admin' }); 
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      <aside className="w-64 bg-indigo-900 text-white flex flex-col shadow-xl">
        <div className="p-4 border-b border-indigo-800/50">
          <h1 className="text-lg font-bold">LSS ADMIN</h1>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            <li><button onClick={() => setActiveTab('dashboard')} className="w-full text-left px-4 py-3 rounded-lg bg-indigo-800">Dashboard</button></li>
          </ul>
        </nav>
        <div className="p-4 border-t border-indigo-800/50">
          <button onClick={() => setAppView('public')} className="w-full flex items-center justify-center space-x-2 bg-indigo-700 hover:bg-indigo-600 py-2 rounded-lg text-sm font-bold">
            <LogOut size={16} /> <span>Back to Website</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b px-6 py-4"><h2 className="text-xl font-semibold">Admin Dashboard</h2></header>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="bg-white p-12 rounded-xl border text-center shadow-sm">
             <h3 className="text-2xl font-bold mb-2">Welcome to the Backend</h3>
             <p className="text-slate-500">Your cloud database connection is ready to be configured here.</p>
          </div>
        </div>
      </main>
    </div>
  );
}