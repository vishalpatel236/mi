/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  HeartPulse, Hammer, Compass, Laptop, Building, ShoppingBag, 
  Coffee, Package, Truck, Briefcase, GraduationCap, PhoneCall,
  Search, MapPin, Globe, ChevronRight, Award, ShieldCheck, 
  Sparkles, CheckCircle2, RefreshCw, X, Edit3, Plus, RotateCcw, Check, Pencil, Trash2, KeyRound 
} from 'lucide-react';

import { mockJobs, provincesList, categoriesList } from './data/mockJobs';
import { Job, UserState, SearchFilters, PoliceCheckRecord, SiteContent } from './types';

// Import our modular components
import Navbar from './components/Navbar';
import HeroSearch from './components/HeroSearch';
import StatsSection from './components/StatsSection';
import JobCard from './components/JobCard';
import JobDetailsModal from './components/JobDetailsModal';
import JobEditModal from './components/JobEditModal';
import AdminPinModal from './components/AdminPinModal';
import PoliceCheckPage from './components/PoliceCheckPage';
import JobSeekersPage from './components/JobSeekersPage';
import AboutUsPage from './components/AboutUsPage';
import JoinWithUsPage from './components/JoinWithUsPage';

const defaultSiteContent: SiteContent = {
  listingsTitle: 'Featured Jobs Across Ontario',
  listingsSubtitle: 'Showing pre-vetted corporate openings offering digital credential shortcuts.',
  resultsBadgeSuffix: 'Results',
  customResultCount: '30 Results',
  categoriesTitle: 'Browse Verified Vacancies by Sector',
  categoriesSubtitle: 'Select a high-demand industry to view immediate vetted job listings.',
  regionsTitle: 'Verified Ontario Regions',
  regionsSubtitle: 'Query background screening credentials and active civic vacancies across Ontario.',
  heroTitle: 'Canada’s Premier Verified Employment Directory',
  heroSubtitle: 'Access pre-vetted job opportunities, speed up hiring with background-checked credentials, and connect directly with trusted Canadian employers.'
};

// Helper to dynamically render category icons
function CategoryIcon({ name, className }: { name: string; className?: string }) {
  const iconProps = { className: className || "w-6 h-6 text-slate-700" };
  switch (name) {
    case 'HeartPulse': return <HeartPulse {...iconProps} />;
    case 'Hammer': return <Hammer {...iconProps} />;
    case 'Compass': return <Compass {...iconProps} />;
    case 'Laptop': return <Laptop {...iconProps} />;
    case 'Building': return <Building {...iconProps} />;
    case 'ShoppingBag': return <ShoppingBag {...iconProps} />;
    case 'Coffee': return <Coffee {...iconProps} />;
    case 'Package': return <Package {...iconProps} />;
    case 'Truck': return <Truck {...iconProps} />;
    case 'Briefcase': return <Briefcase {...iconProps} />;
    case 'GraduationCap': return <GraduationCap {...iconProps} />;
    case 'PhoneCall': return <PhoneCall {...iconProps} />;
    default: return <Briefcase {...iconProps} />;
  }
}
// Refined, colorful themes for category cards
const categoryThemeMap: Record<string, { bg: string; border: string; iconBg: string; text: string; badgeBg: string; hoverBorder: string; activeStyle: string }> = {
  'Healthcare': {
    bg: 'bg-rose-50/60 hover:bg-rose-100/80',
    border: 'border-rose-200/80',
    iconBg: 'bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-rose-200/60 shadow-sm',
    text: 'text-slate-900 group-hover:text-rose-950',
    badgeBg: 'bg-rose-100/90 text-rose-800 border border-rose-200/80 font-bold',
    hoverBorder: 'hover:border-rose-400 hover:shadow-rose-100',
    activeStyle: 'bg-rose-100 border-rose-500 text-rose-950 shadow-md ring-2 ring-rose-400/30'
  },
  'Construction': {
    bg: 'bg-amber-50/60 hover:bg-amber-100/80',
    border: 'border-amber-200/80',
    iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-amber-200/60 shadow-sm',
    text: 'text-slate-900 group-hover:text-amber-950',
    badgeBg: 'bg-amber-100/90 text-amber-800 border border-amber-200/80 font-bold',
    hoverBorder: 'hover:border-amber-400 hover:shadow-amber-100',
    activeStyle: 'bg-amber-100 border-amber-500 text-amber-950 shadow-md ring-2 ring-amber-400/30'
  },
  'Engineering': {
    bg: 'bg-teal-50/60 hover:bg-teal-100/80',
    border: 'border-teal-200/80',
    iconBg: 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-teal-200/60 shadow-sm',
    text: 'text-slate-900 group-hover:text-teal-950',
    badgeBg: 'bg-teal-100/90 text-teal-800 border border-teal-200/80 font-bold',
    hoverBorder: 'hover:border-teal-400 hover:shadow-teal-100',
    activeStyle: 'bg-teal-100 border-teal-500 text-teal-950 shadow-md ring-2 ring-teal-400/30'
  },
  'IT': {
    bg: 'bg-blue-50/60 hover:bg-blue-100/80',
    border: 'border-blue-200/80',
    iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-blue-200/60 shadow-sm',
    text: 'text-slate-900 group-hover:text-blue-950',
    badgeBg: 'bg-blue-100/90 text-blue-800 border border-blue-200/80 font-bold',
    hoverBorder: 'hover:border-blue-400 hover:shadow-blue-100',
    activeStyle: 'bg-blue-100 border-blue-500 text-blue-950 shadow-md ring-2 ring-blue-400/30'
  },
  'Government': {
    bg: 'bg-slate-100/70 hover:bg-slate-200/80',
    border: 'border-slate-300/80',
    iconBg: 'bg-gradient-to-br from-slate-700 to-slate-900 text-white shadow-slate-300/60 shadow-sm',
    text: 'text-slate-900 group-hover:text-slate-950',
    badgeBg: 'bg-slate-200 text-slate-800 border border-slate-300/80 font-bold',
    hoverBorder: 'hover:border-slate-500 hover:shadow-slate-200',
    activeStyle: 'bg-slate-200 border-slate-600 text-slate-950 shadow-md ring-2 ring-slate-400/30'
  },
  'Retail': {
    bg: 'bg-pink-50/60 hover:bg-pink-100/80',
    border: 'border-pink-200/80',
    iconBg: 'bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-pink-200/60 shadow-sm',
    text: 'text-slate-900 group-hover:text-pink-950',
    badgeBg: 'bg-pink-100/90 text-pink-800 border border-pink-200/80 font-bold',
    hoverBorder: 'hover:border-pink-400 hover:shadow-pink-100',
    activeStyle: 'bg-pink-100 border-pink-500 text-pink-950 shadow-md ring-2 ring-pink-400/30'
  },
  'Hospitality': {
    bg: 'bg-orange-50/60 hover:bg-orange-100/80',
    border: 'border-orange-200/80',
    iconBg: 'bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-orange-200/60 shadow-sm',
    text: 'text-slate-900 group-hover:text-orange-950',
    badgeBg: 'bg-orange-100/90 text-orange-800 border border-orange-200/80 font-bold',
    hoverBorder: 'hover:border-orange-400 hover:shadow-orange-100',
    activeStyle: 'bg-orange-100 border-orange-500 text-orange-950 shadow-md ring-2 ring-orange-400/30'
  },
  'Warehouse': {
    bg: 'bg-indigo-50/60 hover:bg-indigo-100/80',
    border: 'border-indigo-200/80',
    iconBg: 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-indigo-200/60 shadow-sm',
    text: 'text-slate-900 group-hover:text-indigo-950',
    badgeBg: 'bg-indigo-100/90 text-indigo-800 border border-indigo-200/80 font-bold',
    hoverBorder: 'hover:border-indigo-400 hover:shadow-indigo-100',
    activeStyle: 'bg-indigo-100 border-indigo-500 text-indigo-950 shadow-md ring-2 ring-indigo-400/30'
  },
  'Transportation': {
    bg: 'bg-cyan-50/60 hover:bg-cyan-100/80',
    border: 'border-cyan-200/80',
    iconBg: 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-cyan-200/60 shadow-sm',
    text: 'text-slate-900 group-hover:text-cyan-950',
    badgeBg: 'bg-cyan-100/90 text-cyan-800 border border-cyan-200/80 font-bold',
    hoverBorder: 'hover:border-cyan-400 hover:shadow-cyan-100',
    activeStyle: 'bg-cyan-100 border-cyan-500 text-cyan-950 shadow-md ring-2 ring-cyan-400/30'
  },
  'Finance': {
    bg: 'bg-emerald-50/60 hover:bg-emerald-100/80',
    border: 'border-emerald-200/80',
    iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-emerald-200/60 shadow-sm',
    text: 'text-slate-900 group-hover:text-emerald-950',
    badgeBg: 'bg-emerald-100/90 text-emerald-800 border border-emerald-200/80 font-bold',
    hoverBorder: 'hover:border-emerald-400 hover:shadow-emerald-100',
    activeStyle: 'bg-emerald-100 border-emerald-500 text-emerald-950 shadow-md ring-2 ring-emerald-400/30'
  },
  'Education': {
    bg: 'bg-purple-50/60 hover:bg-purple-100/80',
    border: 'border-purple-200/80',
    iconBg: 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-purple-200/60 shadow-sm',
    text: 'text-slate-900 group-hover:text-purple-950',
    badgeBg: 'bg-purple-100/90 text-purple-800 border border-purple-200/80 font-bold',
    hoverBorder: 'hover:border-purple-400 hover:shadow-purple-100',
    activeStyle: 'bg-purple-100 border-purple-500 text-purple-950 shadow-md ring-2 ring-purple-400/30'
  },
  'Customer Service': {
    bg: 'bg-violet-50/60 hover:bg-violet-100/80',
    border: 'border-violet-200/80',
    iconBg: 'bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white shadow-violet-200/60 shadow-sm',
    text: 'text-slate-900 group-hover:text-violet-950',
    badgeBg: 'bg-violet-100/90 text-violet-800 border border-violet-200/80 font-bold',
    hoverBorder: 'hover:border-violet-400 hover:shadow-violet-100',
    activeStyle: 'bg-violet-100 border-violet-500 text-violet-950 shadow-md ring-2 ring-violet-400/30'
  }
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  
  // Custom Editable Site Content State
  const [siteContent, setSiteContent] = useState<SiteContent>(() => {
    const cached = localStorage.getItem('vjc_site_content');
    if (cached) {
      try { return JSON.parse(cached); } catch (e) { /* fallback */ }
    }
    return defaultSiteContent;
  });

  // Custom Editable Jobs List State
  const [jobs, setJobs] = useState<Job[]>(() => {
    const cached = localStorage.getItem('vjc_custom_jobs');
    if (cached) {
      try { return JSON.parse(cached); } catch (e) { /* fallback */ }
    }
    return mockJobs;
  });

  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Admin Mode & Passcode Security State
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState<boolean>(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState<boolean>(false);

  const [savedAdminPin, setSavedAdminPin] = useState<string>(() => {
    return localStorage.getItem('vjc_admin_pin') || '8395';
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('vjc_admin_auth') === 'true';
  });

  const handleToggleAdminMode = () => {
    if (isAdminMode) {
      setIsAdminMode(false);
    } else {
      if (isAdminAuthenticated) {
        setIsAdminMode(true);
      } else {
        setIsPinModalOpen(true);
      }
    }
  };

  const handleAdminAuthSuccess = () => {
    setIsAdminAuthenticated(true);
    sessionStorage.setItem('vjc_admin_auth', 'true');
    setIsAdminMode(true);
    setIsPinModalOpen(false);
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setIsAdminMode(false);
    sessionStorage.removeItem('vjc_admin_auth');
  };

  const handleUpdateAdminPin = (newPin: string) => {
    setSavedAdminPin(newPin);
    localStorage.setItem('vjc_admin_pin', newPin);
  };

  // Save siteContent to localStorage
  useEffect(() => {
    localStorage.setItem('vjc_site_content', JSON.stringify(siteContent));
  }, [siteContent]);

  // Save jobs to localStorage
  useEffect(() => {
    localStorage.setItem('vjc_custom_jobs', JSON.stringify(jobs));
  }, [jobs]);

  // Load state from localStorage if available, or default
  const [userState, setUserState] = useState<UserState>(() => {
    const cached = localStorage.getItem('vjc_user_state');
    if (cached) {
      try { return JSON.parse(cached); } catch (e) { /* fallback */ }
    }
    return {
      savedJobs: [],
      appliedJobs: [],
      isCandidateVerified: false,
      candidateVerificationStatus: 'None',
      policeCheck: null
    };
  });

  // Admin Handlers
  const handleResetSiteContent = () => {
    if (confirm('Are you sure you want to reset all titles, subtitles, and job listings back to defaults?')) {
      setSiteContent(defaultSiteContent);
      setJobs(mockJobs);
      localStorage.removeItem('vjc_site_content');
      localStorage.removeItem('vjc_custom_jobs');
    }
  };

  const handleDeleteJob = (jobId: string) => {
    if (confirm('Delete this job listing?')) {
      setJobs(prev => prev.filter(j => j.id !== jobId));
    }
  };

  const handleOpenEditJob = (job: Job) => {
    setEditingJob(job);
    setIsJobModalOpen(true);
  };

  const handleOpenAddNewJob = () => {
    setEditingJob(null);
    setIsJobModalOpen(true);
  };

  const handleSaveJob = (jobToSave: Job) => {
    setJobs(prev => {
      const exists = prev.some(j => j.id === jobToSave.id);
      if (exists) {
        return prev.map(j => j.id === jobToSave.id ? jobToSave : j);
      } else {
        return [jobToSave, ...prev];
      }
    });
    setIsJobModalOpen(false);
    setEditingJob(null);
  };

  const handleUpdateJob = (updatedJob: Job) => {
    setJobs(prev => prev.map(j => j.id === updatedJob.id ? updatedJob : j));
    setSelectedJob(updatedJob);
  };

  // Search filter settings
  const [filters, setFilters] = useState<SearchFilters>({
    title: '',
    city: '',
    province: '',
    industry: '',
    jobType: '',
    remoteType: ''
  });

  // Save state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('vjc_user_state', JSON.stringify(userState));
  }, [userState]);

  // Execute job search filtering
  useEffect(() => {
    let result = [...jobs];

    // Check title/keywords
    if (filters.title) {
      const term = filters.title.toLowerCase();
      // Special shortcuts
      if (term === 'urgent') {
        result = result.filter(j => j.isUrgent);
      } else {
        result = result.filter(
          j => j.title.toLowerCase().includes(term) || 
               j.company.toLowerCase().includes(term) || 
               j.description.toLowerCase().includes(term)
        );
      }
    }

    // Check City
    if (filters.city) {
      const term = filters.city.toLowerCase();
      result = result.filter(j => j.city.toLowerCase().includes(term));
    }

    // Check Province
    if (filters.province) {
      result = result.filter(j => j.province === filters.province);
    }

    // Check Industry
    if (filters.industry) {
      result = result.filter(j => j.industry === filters.industry);
    }

    // Check Job Type
    if (filters.jobType) {
      result = result.filter(j => j.jobType === filters.jobType);
    }

    // Check Remote Type
    if (filters.remoteType) {
      result = result.filter(j => j.remoteType === filters.remoteType);
    }

    setFilteredJobs(result);
  }, [filters, jobs]);

  // Handle saved toggle
  const handleSaveToggle = (jobId: string) => {
    setUserState(prev => {
      const saved = [...prev.savedJobs];
      const idx = saved.indexOf(jobId);
      if (idx > -1) {
        saved.splice(idx, 1);
      } else {
        saved.push(jobId);
      }
      return { ...prev, savedJobs: saved };
    });
  };

  // Remove save directly from dashboard
  const handleRemoveSave = (jobId: string) => {
    setUserState(prev => ({
      ...prev,
      savedJobs: prev.savedJobs.filter(id => id !== jobId)
    }));
  };

  // Handle application submission
  const handleApplySubmit = (jobId: string, details: any) => {
    setUserState(prev => {
      const alreadyApplied = prev.appliedJobs.some(a => a.jobId === jobId);
      if (alreadyApplied) return prev;
      
      return {
        ...prev,
        appliedJobs: [
          ...prev.appliedJobs,
          {
            jobId,
            appliedAt: new Date().toISOString().split('T')[0],
            status: 'Submitted'
          }
        ]
      };
    });
  };

  // Handle successful Candidate Verification
  const handleCandidateVerification = () => {
    setUserState(prev => ({
      ...prev,
      isCandidateVerified: true,
      candidateVerificationStatus: 'Verified'
    }));
  };

  // Handle new Police Check Submission
  const handleApplyPoliceCheck = (record: PoliceCheckRecord) => {
    setUserState(prev => ({
      ...prev,
      policeCheck: record
    }));
  };

  // Reset Police Check for testing
  const handleClearPoliceCheck = () => {
    setUserState(prev => ({
      ...prev,
      policeCheck: null
    }));
  };

  // Quick filter triggers from province/category cards
  const handleProvinceSelect = (provName: string) => {
    setFilters(prev => ({ ...prev, province: provName }));
    const element = document.getElementById('listings-header');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategorySelect = (catName: string) => {
    setFilters(prev => ({ ...prev, industry: catName }));
    const element = document.getElementById('listings-header');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const clearAllFilters = () => {
    setFilters({
      title: '',
      city: '',
      province: '',
      industry: '',
      jobType: '',
      remoteType: ''
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      
      {/* Universal Sticky Navbar with Admin Edit Toggle */}
      <Navbar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        userState={userState} 
        isAdminMode={isAdminMode}
        onToggleAdminMode={handleToggleAdminMode}
      />

      {/* Admin Live Website Editor Banner */}
      {isAdminMode && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2.5 border-b border-amber-600 text-xs font-bold shadow-md sticky top-16 z-40 animate-fade-in">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <span className="bg-slate-950 text-amber-400 p-1 rounded font-mono text-[10px] uppercase tracking-wider">Editor Mode</span>
              <span>⚡ Live Website Editor Active — Click any highlighted field to edit titles, results badges, and subtitles. All changes auto-save.</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleOpenAddNewJob}
                className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5 text-amber-400" />
                <span>Add Job Listing</span>
              </button>
              <button
                onClick={() => setIsPinModalOpen(true)}
                className="px-2.5 py-1 bg-amber-600/20 hover:bg-amber-600/40 text-slate-950 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer border border-amber-600/60"
                title="Change Admin Passcode"
              >
                <KeyRound className="w-3.5 h-3.5 text-slate-950" />
                <span>Passcode ({savedAdminPin})</span>
              </button>
              <button
                onClick={handleResetSiteContent}
                className="px-2.5 py-1 bg-amber-600/20 hover:bg-amber-600/40 text-slate-950 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer border border-amber-600/60"
                title="Reset all content to defaults"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Defaults</span>
              </button>
              <button
                onClick={() => setIsAdminMode(false)}
                className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs"
              >
                Done Editing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Tab Router */}
      <main className="flex-grow">
        
        {/* Tab 1: Home / Job Explorer */}
        {currentTab === 'home' && (
          <div className="animate-fade-in">
            {/* Hero Banner with Integrated Search panel */}
            <HeroSearch 
              onSearch={setFilters} 
              activeFilters={filters} 
              onClearFilters={clearAllFilters} 
            />

            {/* Core Statistics Bar */}
            <StatsSection />

            {/* Job Categories Horizontal Grid */}
            <section className="py-14 bg-gradient-to-b from-slate-50 via-indigo-50/20 to-white border-b border-slate-200/80 relative overflow-hidden" id="categories-section">
              {/* Background ambient glow accents */}
              <div className="absolute top-0 right-10 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-10 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center sm:text-left mb-8">
                  {isAdminMode ? (
                    <div className="space-y-2 bg-amber-50 p-3 rounded-xl border border-amber-200">
                      <label className="text-[10px] font-bold text-amber-800 block">Edit Categories Title & Subtitle</label>
                      <input
                        type="text"
                        value={siteContent.categoriesTitle}
                        onChange={(e) => setSiteContent(prev => ({ ...prev, categoriesTitle: e.target.value }))}
                        className="text-lg font-extrabold text-slate-900 bg-white border border-amber-300 p-1.5 rounded w-full"
                      />
                      <input
                        type="text"
                        value={siteContent.categoriesSubtitle}
                        onChange={(e) => setSiteContent(prev => ({ ...prev, categoriesSubtitle: e.target.value }))}
                        className="text-xs text-slate-600 bg-white border border-amber-300 p-1.5 rounded w-full"
                      />
                    </div>
                  ) : (
                    <>
                      <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-200/60 px-3 py-1 rounded-full text-[11px] font-extrabold text-indigo-700 mb-2">
                        <span>✨ High-Demand Career Fields</span>
                      </div>
                      <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                        {siteContent.categoriesTitle}
                      </h2>
                      <p className="text-xs text-slate-500 mt-1 font-medium">
                        {siteContent.categoriesSubtitle}
                      </p>
                    </>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
                  {categoriesList.map((cat) => {
                    const isSelected = filters.industry === cat.name;
                    const theme = categoryThemeMap[cat.name] || {
                      bg: 'bg-slate-50/80 hover:bg-slate-100',
                      border: 'border-slate-200',
                      iconBg: 'bg-slate-700 text-white',
                      text: 'text-slate-900',
                      badgeBg: 'bg-slate-100 text-slate-700',
                      hoverBorder: 'hover:border-slate-400',
                      activeStyle: 'bg-blue-100 border-blue-500 text-blue-950'
                    };

                    return (
                      <button
                        key={cat.name}
                        onClick={() => handleCategorySelect(isSelected ? '' : cat.name)}
                        className={`group p-4 rounded-2xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center space-y-2.5 shadow-xs hover:shadow-md hover:-translate-y-1 ${
                          isSelected
                            ? theme.activeStyle
                            : `${theme.bg} ${theme.border} ${theme.hoverBorder} ${theme.text}`
                        }`}
                      >
                        <div className={`p-3 rounded-xl ${theme.iconBg} shadow-xs transition-all duration-200 group-hover:scale-105`}>
                          <CategoryIcon name={cat.iconName} className="w-5 h-5 transition-colors" />
                        </div>
                        <span className="block text-xs font-bold leading-tight tracking-tight">{cat.name}</span>
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] ${theme.badgeBg}`}>
                          {cat.count} openings
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Province Map Grid Cards */}
            <section className="py-12 bg-slate-50 border-b border-slate-200" id="provinces-section">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center sm:text-left mb-8">
                  {isAdminMode ? (
                    <div className="space-y-2 bg-amber-50 p-3 rounded-xl border border-amber-200">
                      <label className="text-[10px] font-bold text-amber-800 block">Edit Regions Title & Subtitle</label>
                      <input
                        type="text"
                        value={siteContent.regionsTitle}
                        onChange={(e) => setSiteContent(prev => ({ ...prev, regionsTitle: e.target.value }))}
                        className="text-lg font-extrabold text-slate-900 bg-white border border-amber-300 p-1.5 rounded w-full"
                      />
                      <input
                        type="text"
                        value={siteContent.regionsSubtitle}
                        onChange={(e) => setSiteContent(prev => ({ ...prev, regionsSubtitle: e.target.value }))}
                        className="text-xs text-slate-600 bg-white border border-amber-300 p-1.5 rounded w-full"
                      />
                    </div>
                  ) : (
                    <>
                      <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                        {siteContent.regionsTitle}
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        {siteContent.regionsSubtitle}
                      </p>
                    </>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  {provincesList.map((prov) => {
                    const isSelected = filters.province === prov.name;
                    return (
                      <div
                        key={prov.name}
                        onClick={() => handleProvinceSelect(isSelected ? '' : prov.name)}
                        className={`group relative rounded-xl overflow-hidden h-36 cursor-pointer border shadow-sm transition-all ${
                          isSelected
                            ? 'border-blue-600 ring-2 ring-blue-500/30 scale-[0.98]'
                            : 'border-slate-200 hover:border-slate-300 hover:-translate-y-1 hover:shadow-md'
                        }`}
                      >
                        {/* Original High-Resolution Image */}
                        <img 
                          src={prov.image} 
                          alt={prov.name} 
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            // Fallback if Unsplash image fails to load
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80';
                          }}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                        />
                        {/* Subtle Bottom Shadow Gradient to protect text readability while keeping full image bright */}
                        <div className={`absolute inset-0 bg-gradient-to-t ${isSelected ? 'from-blue-950/80 via-blue-900/30' : 'from-slate-950/75 via-slate-950/15'} to-transparent transition-opacity duration-300`}></div>
                        
                        {/* Content Overlay with Crisp Glassmorphism Badge */}
                        <div className="absolute inset-x-3 bottom-3 flex justify-between items-end text-white z-10">
                          <div className="drop-shadow-md">
                            <span className="inline-block text-[10px] uppercase font-mono tracking-wider font-extrabold bg-black/40 backdrop-blur-xs px-1.5 py-0.5 rounded text-amber-300 mb-0.5">{prov.code}</span>
                            <span className="block text-xs font-black tracking-tight group-hover:text-amber-300 transition-colors">{prov.name}</span>
                          </div>
                          <span className="bg-slate-950/70 backdrop-blur-md px-2 py-0.5 rounded-md text-[9px] font-extrabold text-white border border-white/20 shadow-xs">
                            {prov.jobCount}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Main Featured Listings area */}
            <section className="py-14 bg-white" id="listings-section">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Search Info Heading */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-slate-100 mb-8 gap-4" id="listings-header">
                  <div className="flex-grow max-w-3xl">
                    {isAdminMode ? (
                      <div className="space-y-3 bg-amber-50 p-4 rounded-xl border border-amber-300 shadow-sm transition-all">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1">
                            <Edit3 className="w-3.5 h-3.5 text-amber-600" /> Edit Section Title & Result Badge
                          </span>
                          <span className="text-[10px] text-amber-700 font-mono">Auto-saved</span>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                          <input
                            type="text"
                            value={siteContent.listingsTitle}
                            onChange={(e) => setSiteContent(prev => ({ ...prev, listingsTitle: e.target.value }))}
                            className="text-lg font-extrabold text-slate-900 bg-white border border-amber-300 px-3 py-1.5 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none flex-grow"
                            placeholder="e.g. Featured Jobs Across Ontario"
                          />
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] font-bold text-amber-800 whitespace-nowrap">Badge:</span>
                            <input
                              type="text"
                              value={siteContent.customResultCount !== undefined ? siteContent.customResultCount : `${filteredJobs.length} Results`}
                              onChange={(e) => setSiteContent(prev => ({ ...prev, customResultCount: e.target.value }))}
                              className="text-xs font-bold text-slate-900 bg-white border border-amber-300 px-3 py-1.5 rounded-lg w-32 focus:ring-2 focus:ring-amber-500 outline-none"
                              placeholder="e.g. 30 Results"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-amber-800 block mb-1">Subtitle / Description</label>
                          <input
                            type="text"
                            value={siteContent.listingsSubtitle}
                            onChange={(e) => setSiteContent(prev => ({ ...prev, listingsSubtitle: e.target.value }))}
                            className="text-xs text-slate-800 bg-white border border-amber-300 px-3 py-1.5 rounded-lg w-full focus:ring-2 focus:ring-amber-500 outline-none"
                            placeholder="Subtitle text..."
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center flex-wrap gap-2">
                          <span>{siteContent.listingsTitle}</span>
                          <span className="bg-slate-100 text-slate-800 text-xs px-2.5 py-0.5 rounded-full font-bold border border-slate-200">
                            {siteContent.customResultCount !== undefined && siteContent.customResultCount !== ''
                              ? siteContent.customResultCount
                              : `${filteredJobs.length} ${siteContent.resultsBadgeSuffix}`}
                          </span>
                        </h2>
                        <p className="text-xs text-slate-500 mt-1">
                          {siteContent.listingsSubtitle}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Active Filter Badges & Admin Add Button */}
                  <div className="flex flex-col sm:items-end gap-2">
                    {isAdminMode && (
                      <button
                        onClick={handleOpenAddNewJob}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center space-x-1"
                      >
                        <Plus className="w-4 h-4 text-amber-400" />
                        <span>Add New Job</span>
                      </button>
                    )}

                    {Object.values(filters).some(v => v !== '') && (
                      <div className="flex flex-wrap items-center gap-1.5 text-xs">
                        <span className="text-slate-400 mr-1">Active filter:</span>
                        {Object.entries(filters).map(([key, val]) => {
                          if (!val) return null;
                          return (
                            <span key={key} className="bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-md flex items-center space-x-1 font-semibold text-[10px]">
                              <span>{key}: {val}</span>
                              <button onClick={() => setFilters(prev => ({ ...prev, [key]: '' }))} className="hover:text-blue-900 font-bold ml-1">
                                ×
                              </button>
                            </span>
                          );
                        })}
                        <button onClick={clearAllFilters} className="text-slate-500 hover:text-slate-950 font-bold underline ml-2 text-[10px]">
                          Clear All
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Grid container */}
                {filteredJobs.length === 0 ? (
                  <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-2xl max-w-lg mx-auto">
                    <span className="text-3xl block mb-2">🔍</span>
                    <strong className="block text-sm font-bold text-slate-900">No Vetted Jobs Match Your Query</strong>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                      Try resetting your province selection, adjusting work format filters, or searching for broader terms like "Software" or "Nurse".
                    </p>
                    <div className="flex items-center justify-center space-x-2 mt-5">
                      <button
                        onClick={clearAllFilters}
                        className="px-4.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      >
                        Reset All Search Parameters
                      </button>
                      {isAdminMode && (
                        <button
                          onClick={handleOpenAddNewJob}
                          className="px-4.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                        >
                          + Add Custom Job
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredJobs.map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        isSaved={userState.savedJobs.includes(job.id)}
                        isApplied={userState.appliedJobs.some(a => a.jobId === job.id)}
                        onSaveToggle={handleSaveToggle}
                        onApplyClick={setSelectedJob}
                        isAdminMode={isAdminMode}
                        onEditJob={handleOpenEditJob}
                        onDeleteJob={handleDeleteJob}
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Join With Us Call-To-Action Banner */}
            <section className="py-14 bg-slate-950 text-white overflow-hidden relative">
              <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] opacity-5 [background-size:16px_16px]"></div>
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">Fast-Track Your Career</span>
                <h3 className="text-xl sm:text-2xl font-extrabold mt-3 tracking-tight text-white leading-relaxed max-w-3xl mx-auto">
                  "Stop waiting months for corporate callbacks—join our platform to get direct priority and put your profile straight into the hands of hiring managers who need people right away."
                </h3>
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => {
                      setCurrentTab('join-us');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-lg hover:shadow-blue-500/20"
                  >
                    Join with us
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Tab 2: Criminal Record Check (Dedicated Page) */}
        {currentTab === 'police-check' && (
          <div className="animate-fade-in">
            <PoliceCheckPage 
              userState={userState}
              onApplyPoliceCheck={handleApplyPoliceCheck}
              onClearPoliceCheck={handleClearPoliceCheck}
            />
          </div>
        )}

        {/* Tab 3: Job Seekers */}
        {currentTab === 'job-seekers' && (
          <div className="animate-fade-in">
            <JobSeekersPage />
          </div>
        )}

        {/* Tab 4: About Us */}
        {currentTab === 'about-us' && (
          <div className="animate-fade-in">
            <AboutUsPage />
          </div>
        )}

        {/* Tab 5: Join With Us */}
        {currentTab === 'join-us' && (
          <div className="animate-fade-in">
            <JoinWithUsPage />
          </div>
        )}

      </main>

      {/* Universal Job Detail Drawer / Popup Modal */}
      {selectedJob && (
        <JobDetailsModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          userState={userState}
          onApplySubmit={handleApplySubmit}
          onUpdateJob={handleUpdateJob}
          isAdmin={isAdminMode}
        />
      )}

      {/* Admin Job Edit / Add Modal */}
      <JobEditModal
        job={editingJob}
        isOpen={isJobModalOpen}
        onClose={() => { setIsJobModalOpen(false); setEditingJob(null); }}
        onSave={handleSaveJob}
      />

      {/* Admin Security PIN Authentication Modal */}
      <AdminPinModal
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        onSuccess={handleAdminAuthSuccess}
        savedPin={savedAdminPin}
        onUpdatePin={handleUpdateAdminPin}
        isAuthenticated={isAdminAuthenticated}
        onLogout={handleAdminLogout}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-2 text-slate-700 font-bold mb-4">
            <svg className="w-5 h-5 fill-current text-blue-600" viewBox="0 0 24 24">
              <path d="M12,2L13.1,6.5L17.5,5.5L16.3,9.8L21,10L17.5,13L19.5,17.5L15,15.5L13.5,20L12,17L10.5,20L9,15.5L4.5,17.5L6.5,13L3,10L7.7,9.8L6.5,5.5L10.9,6.5L12,2Z" />
            </svg>
            <span>verified-jobs.com</span>
          </div>
          <p className="max-w-md mx-auto leading-relaxed">
            In partnership with authorized national background checking registries and corporate audits. 
            Voted Canada’s most trusted job deployment portal.
          </p>
          <div className="mt-4 flex items-center justify-center space-x-3 text-[10px] text-slate-400 font-mono">
            <span>© 2026 verified-jobs.com Inc. All rights reserved.</span>
            <span>•</span>
            <button
              onClick={handleToggleAdminMode}
              className="text-slate-400 hover:text-slate-600 underline cursor-pointer flex items-center space-x-1"
            >
              <span>{isAdminAuthenticated ? 'Admin Portal (Unlocked)' : 'Owner Portal'}</span>
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}

