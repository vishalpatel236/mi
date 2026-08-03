import React from 'react';
import { ShieldCheck, Award, FileCheck, CheckCircle2, Edit3, Settings, Check, Lock } from 'lucide-react';
import { UserState } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  userState: UserState;
  isAdminMode?: boolean;
  onToggleAdminMode?: () => void;
}

export default function Navbar({ currentTab, setCurrentTab, userState, isAdminMode, onToggleAdminMode }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Colorful Accent Gradient Line */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-600 via-purple-600 to-pink-500 w-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo - Untouched */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentTab('home')}>
            <div className="bg-blue-600 text-white p-2 rounded-lg flex items-center justify-center shadow-md shadow-blue-100">
              {/* Custom styled Maple leaf SVG */}
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12,2L13.1,6.5L17.5,5.5L16.3,9.8L21,10L17.5,13L19.5,17.5L15,15.5L13.5,20L12,17L10.5,20L9,15.5L4.5,17.5L6.5,13L3,10L7.7,9.8L6.5,5.5L10.9,6.5L12,2Z" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                verified-jobs<span className="text-blue-600">.com</span>
              </span>
              <p className="text-[10px] font-mono tracking-wider text-black font-bold uppercase leading-none mt-0.5">
                Canada’s Verified Job Portal
              </p>
            </div>
          </div>

          {/* Navigation Links with Colorful Active Pills & Subtle Hovers */}
          <nav className="hidden md:flex items-center space-x-1.5" id="nav-desktop">
            {[
              { id: 'home', label: 'Explore Jobs' },
              { id: 'job-seekers', label: 'Job Seeker Toolkits' },
              { id: 'police-check', label: 'Background Check' },
              { id: 'about-us', label: 'About Us' },
              { id: 'join-us', label: 'Join With Us' }
            ].map((tab) => {
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`nav-link-${tab.id}`}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20 scale-[1.02]'
                      : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/60'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* User Verification Badges & Admin Lock Button */}
          <div className="flex items-center space-x-2">
            {/* Admin Lock / Edit Button */}
            {onToggleAdminMode && (
              <button
                onClick={onToggleAdminMode}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  isAdminMode
                    ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 border-amber-300 shadow-md ring-2 ring-amber-300/50 animate-pulse'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 border-slate-200'
                }`}
                title={isAdminMode ? 'Exit Editor Mode' : 'Admin Portal Lock (PIN Required)'}
              >
                {isAdminMode ? (
                  <>
                    <Edit3 className="w-3.5 h-3.5 text-slate-950" />
                    <span>Done Editing</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-slate-500" />
                    <span className="hidden sm:inline">Admin Lock</span>
                  </>
                )}
              </button>
            )}

            {/* Background Checked Badge */}
            {userState.policeCheck?.status === 'Completed' && (
              <div 
                title="Your background check and photo ID have been securely verified."
                className="flex items-center space-x-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-xs animate-fade-in"
              >
                <FileCheck className="w-3.5 h-3.5 text-white" />
                <span className="hidden sm:inline">Background Checked</span>
              </div>
            )}

            {/* Default Status Indicator if unverified */}
            {userState.policeCheck?.status !== 'Completed' && (
              <div className="text-xs text-slate-600 bg-indigo-50/70 border border-indigo-100 px-3 py-1 rounded-full font-semibold">
                Standard Profile
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Links */}
        <div className="flex md:hidden overflow-x-auto py-2.5 space-x-1.5 scrollbar-none border-t border-indigo-100/60 bg-gradient-to-r from-blue-50/40 via-indigo-50/50 to-purple-50/40 -mx-4 px-4" id="nav-mobile">
          {[
            { id: 'home', label: 'Explore' },
            { id: 'job-seekers', label: 'Job Seeker Toolkits' },
            { id: 'police-check', label: 'Background Check' },
            { id: 'about-us', label: 'About Us' },
            { id: 'join-us', label: 'Join With Us' }
          ].map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-sm shadow-indigo-500/20'
                    : 'text-slate-700 hover:text-indigo-600 bg-white/80 hover:bg-white border border-slate-200/60 shadow-2xs'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
