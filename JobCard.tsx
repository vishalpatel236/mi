import React from 'react';
import { Bookmark, MapPin, Briefcase, DollarSign, ShieldCheck, FileCheck, Award, Heart, Sparkles, UserCheck, Edit2, Trash2 } from 'lucide-react';
import { Job } from '../types';

interface JobCardProps {
  key?: string | number;
  job: Job;
  isSaved: boolean;
  isApplied: boolean;
  onSaveToggle: (jobId: string) => void;
  onApplyClick: (job: Job) => void;
  isAdminMode?: boolean;
  onEditJob?: (job: Job) => void;
  onDeleteJob?: (jobId: string) => void;
}

export default function JobCard({ job, isSaved, isApplied, onSaveToggle, onApplyClick, isAdminMode, onEditJob, onDeleteJob }: JobCardProps) {
  // Determine employer verification badge styling
  const getVerificationBadge = () => {
    switch (job.employerVerificationLevel) {
      case 'Enterprise':
        return (
          <span className="inline-flex items-center space-x-1 bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            <span>Enterprise Verified</span>
          </span>
        );
      case 'Premium':
        return (
          <span className="inline-flex items-center space-x-1 bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span>Premium Verified</span>
          </span>
        );
      case 'Basic':
      default:
        return (
          <span className="inline-flex items-center space-x-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Basic Verified</span>
          </span>
        );
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 shadow-xs hover:shadow-md hover:-translate-y-[1px] transition-all duration-200 flex flex-col justify-between h-full relative overflow-hidden">
      
      {/* Accent strip for Urgent Hiring */}
      {job.isUrgent && (
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-orange-500"></div>
      )}

      <div>
        {/* Row 1: Badges Header (Urgent, Verification Level) */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 mb-3.5">
          <div className="flex flex-wrap gap-1.5 items-center">
            {getVerificationBadge()}
            {job.isUrgent && (
              <span className="bg-orange-50 text-orange-700 border border-orange-200 text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wide flex items-center space-x-0.5 shadow-xs">
                <Sparkles className="w-3 h-3 animate-pulse text-orange-600" />
                <span>Urgent Hiring</span>
              </span>
            )}
          </div>
          
          {/* Save Job Button */}
          <button
            onClick={() => onSaveToggle(job.id)}
            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
              isSaved
                ? 'bg-blue-50 border-blue-200 text-blue-600'
                : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
            title={isSaved ? 'Remove from Saved Jobs' : 'Save Job Listing'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Row 2: Company Logo, Title, and Company Name */}
        <div className="flex items-start space-x-3.5 mb-4">
          <div className={`w-12 h-12 rounded-xl flex-shrink-0 font-bold text-sm flex items-center justify-center shadow-inner ${job.logoColor}`}>
            {job.logoText}
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900 leading-snug hover:text-blue-600 cursor-pointer transition-colors" onClick={() => onApplyClick(job)}>
              {job.title}
            </h3>
            <p className="text-sm font-semibold text-slate-500 mt-0.5">{job.company}</p>
          </div>
        </div>

        {/* Row 3: Standard Job Criteria (Salary, City, Type, Experience) */}
        <div className="grid grid-cols-2 gap-x-2 gap-y-2 pb-4 mb-4 border-b border-slate-100 text-xs text-slate-600">
          <div className="flex items-center space-x-1.5">
            <DollarSign className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="font-medium text-slate-800 line-clamp-1">{job.salary}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="font-medium text-slate-800 line-clamp-1">
              {job.city}, {job.province}
            </span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Briefcase className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded-sm font-semibold text-[10px]">
              {job.jobType}
            </span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="text-slate-400 flex-shrink-0 font-bold">🎯</span>
            <span className="font-medium text-slate-700">{job.experience}</span>
          </div>
        </div>

        {/* Row 4: Custom Immigration/Legal Badges & Security */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {/* Work Form Type Indicator */}
          <span className="bg-slate-50 text-slate-600 border border-slate-200/60 text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
            <span>{job.remoteType}</span>
          </span>

          {/* Immigration Friendly */}
          {job.isImmigrationFriendly && (
            <span className="bg-emerald-50/60 text-emerald-800 border border-emerald-100 text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center space-x-0.5">
              <UserCheck className="w-3 h-3 text-emerald-600" />
              <span>Immigration Friendly</span>
            </span>
          )}

          {/* Police Check Required */}
          {job.requiresPoliceCheck && (
            <span className="bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center space-x-0.5">
              <ShieldCheck className="w-3 h-3 text-slate-600" />
              <span>Police Check Req.</span>
            </span>
          )}
        </div>
      </div>

      {/* Row 5: Interaction Footer (Apply, Badge Highlights, Admin Actions) */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400">Posted {job.postedAt}</span>
        </div>
        
        <div className="flex items-center space-x-1.5">
          {isAdminMode && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); onEditJob?.(job); }}
                className="px-2 py-1 bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300 rounded-md text-[10px] font-bold flex items-center space-x-1 transition-colors cursor-pointer"
                title="Edit this job listing"
              >
                <Edit2 className="w-3 h-3 text-amber-700" />
                <span>Edit</span>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onDeleteJob?.(job.id); }}
                className="px-2 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-md text-[10px] font-bold flex items-center space-x-1 transition-colors cursor-pointer"
                title="Delete this job listing"
              >
                <Trash2 className="w-3 h-3 text-rose-600" />
                <span>Delete</span>
              </button>
            </>
          )}

          <button
            onClick={() => onApplyClick(job)}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              isApplied
                ? 'bg-slate-100 text-slate-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
            }`}
            disabled={isApplied}
          >
            {isApplied ? '✓ Applied' : 'Details'}
          </button>
        </div>
      </div>
    </div>
  );
}
