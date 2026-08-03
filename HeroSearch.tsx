import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Globe, Filter, X } from 'lucide-react';
import { ProvinceName, SearchFilters } from '../types';

interface HeroSearchProps {
  onSearch: (filters: SearchFilters) => void;
  activeFilters: SearchFilters;
  onClearFilters: () => void;
}

export default function HeroSearch({ onSearch, activeFilters, onClearFilters }: HeroSearchProps) {
  const [localFilters, setLocalFilters] = useState<SearchFilters>(activeFilters);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const provinces: ProvinceName[] = [
    'Greater Toronto Area',
    'Ottawa & Eastern Ontario',
    'Hamilton, Niagara & Halton',
    'Southwestern Ontario',
    'Northern Ontario'
  ];

  const industries = [
    'Healthcare',
    'Construction',
    'Engineering',
    'IT',
    'Government',
    'Retail',
    'Hospitality',
    'Warehouse',
    'Transportation',
    'Finance',
    'Education',
    'Customer Service'
  ];

  const handleInputChange = (field: keyof SearchFilters, value: string) => {
    const updated = { ...localFilters, [field]: value };
    setLocalFilters(updated);
    // Realtime search trigger for instant responsiveness
    onSearch(updated);
  };

  const triggerSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localFilters);
  };

  const handleQuickTagClick = (tagType: 'remote' | 'urgent' | 'healthcare' | 'it') => {
    let updated = { ...localFilters };
    if (tagType === 'remote') {
      updated.remoteType = 'Remote';
    } else if (tagType === 'urgent') {
      onSearch({ ...localFilters, title: 'Urgent' });
      return;
    } else if (tagType === 'healthcare') {
      updated.industry = 'Healthcare';
    } else if (tagType === 'it') {
      updated.industry = 'IT';
    }
    setLocalFilters(updated);
    onSearch(updated);
  };

  const handleClear = () => {
    const cleared = {
      title: '',
      city: '',
      province: '',
      industry: '',
      jobType: '',
      remoteType: ''
    };
    setLocalFilters(cleared);
    onClearFilters();
  };

  const hasActiveFilters = Object.values(activeFilters).some(v => v !== '');

  return (
    <div className="relative bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white overflow-hidden py-16 sm:py-24 border-b border-indigo-900/50" id="hero-banner">
      {/* Small Dots Pattern Design */}
      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#38bdf8_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none"></div>

      {/* Dynamic Gradient Glow Accents */}
      <div className="absolute -top-32 left-1/3 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center -mt-10 pt-0">
        {/* Vibrant Badge / Tagline Pill */}
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-400/30 px-4 py-1.5 rounded-full text-xs font-semibold text-blue-300 mb-6 shadow-lg backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-ping"></span>
          <span className="bg-gradient-to-r from-blue-300 via-indigo-200 to-purple-300 bg-clip-text text-transparent font-bold">
            ✨ Ontario's #1 Smart Job & Career Opportunity Network
          </span>
        </div>

        {/* Hero Typography */}
        <h1 className="text-5xl sm:text-6xl lg:text-[80px] font-extrabold tracking-tight mb-6 leading-tight">
          Find Your <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Dream Career</span> <br />
          Across Ontario
        </h1>

        <p className="max-w-3xl mx-auto text-sm sm:text-base text-slate-300 mb-10 leading-relaxed font-normal">
          Skip the traditional recruitment cycle. Through our collaboration with verified employers, 
          we manage the pre-hiring process on their behalf, helping qualified candidates move through 
          screening, background checks, and pre-employment medical assessments before final employer selection.
        </p>

        {/* Search Panel Widget */}
        <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-[2px] rounded-2xl max-w-4xl mx-auto shadow-2xl shadow-indigo-950/50">
          <form onSubmit={triggerSearch} className="bg-white/95 backdrop-blur-xl p-4 sm:p-6 rounded-[14px] text-left">
            {/* Row 1: Core Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Job Title */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500" />
                <input
                  type="text"
                  value={localFilters.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Job title, keywords, or company..."
                  className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                />
              </div>

              {/* City */}
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-500" />
                <input
                  type="text"
                  value={localFilters.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="City (e.g., Toronto, Ottawa)..."
                  className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium"
                />
              </div>

              {/* Province Selection */}
              <div className="relative">
                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-500" />
                <select
                  value={localFilters.province}
                  onChange={(e) => handleInputChange('province', e.target.value)}
                  className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-700 focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/20 appearance-none cursor-pointer transition-all font-medium"
                >
                  <option value="">All Ontario Regions</option>
                  {provinces.map((prov) => (
                    <option key={prov} value={prov} className="bg-white text-slate-700">
                      {prov}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-purple-400 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* Row 2: Advanced Filters (Collapsible / Toggleable) */}
            <div className={`mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 transition-all duration-300 ${isAdvancedOpen ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0 overflow-hidden md:opacity-100 md:max-h-none'}`}>
              {/* Industry Selection */}
              <div className="relative">
                <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-500" />
                <select
                  value={localFilters.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-700 focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20 appearance-none cursor-pointer transition-all font-medium"
                >
                  <option value="">All Industries</option>
                  {industries.map((ind) => (
                    <option key={ind} value={ind} className="bg-white text-slate-700">
                      {ind}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-teal-400 text-xs">
                  ▼
                </div>
              </div>

              {/* Job Type */}
              <div className="relative">
                <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
                <select
                  value={localFilters.jobType}
                  onChange={(e) => handleInputChange('jobType', e.target.value)}
                  className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-700 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 appearance-none cursor-pointer transition-all font-medium"
                >
                  <option value="">Full & Part-Time (All)</option>
                  <option value="Full-time">Full-time Only</option>
                  <option value="Part-time">Part-time Only</option>
                  <option value="Contract">Contract Only</option>
                  <option value="Temporary">Temporary Only</option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-amber-400 text-xs">
                  ▼
                </div>
              </div>

              {/* Remote Type */}
              <div className="relative">
                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-500" />
                <select
                  value={localFilters.remoteType}
                  onChange={(e) => handleInputChange('remoteType', e.target.value)}
                  className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-700 focus:outline-none focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-500/20 appearance-none cursor-pointer transition-all font-medium"
                >
                  <option value="">All Work Formats</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-rose-400 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* Search Controls Row */}
            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center pt-3 border-t border-slate-100 gap-3">
              <button
                type="button"
                onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                className="text-xs text-slate-500 hover:text-slate-800 transition-colors flex items-center space-x-1 md:hidden"
              >
                <span>{isAdvancedOpen ? 'Hide Filters' : 'Show More Filters'}</span>
                <span>{isAdvancedOpen ? '▲' : '▼'}</span>
              </button>
              <div className="hidden md:block"></div>

              <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 font-semibold transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Clear Filters</span>
                  </button>
                )}
                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  Search Jobs
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Quick Tags Suggestions */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-2 text-xs">
          <span className="text-slate-400 mr-2 font-medium">Quick Searches:</span>
          <button
            type="button"
            onClick={() => handleQuickTagClick('remote')}
            className="bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-white px-3.5 py-1.5 rounded-full transition-all cursor-pointer shadow-xs hover:border-blue-500/50"
          >
            💻 Remote Jobs
          </button>
          <button
            type="button"
            onClick={() => handleQuickTagClick('urgent')}
            className="bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-white px-3.5 py-1.5 rounded-full transition-all cursor-pointer shadow-xs hover:border-blue-500/50"
          >
            ⚡ Urgent Hiring
          </button>
          <button
            type="button"
            onClick={() => handleQuickTagClick('healthcare')}
            className="bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-white px-3.5 py-1.5 rounded-full transition-all cursor-pointer shadow-xs hover:border-blue-500/50"
          >
            🏥 Healthcare
          </button>
          <button
            type="button"
            onClick={() => handleQuickTagClick('it')}
            className="bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-white px-3.5 py-1.5 rounded-full transition-all cursor-pointer shadow-xs hover:border-blue-500/50"
          >
            ⚙️ IT & Tech
          </button>
        </div>
      </div>
    </div>
  );
}
