import React, { useState } from 'react';
import { X, Check, Briefcase, Building, MapPin, DollarSign, Sparkles } from 'lucide-react';
import { Job, ProvinceName } from '../types';

interface JobEditModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (job: Job) => void;
}

export default function JobEditModal({ job, isOpen, onClose, onSave }: JobEditModalProps) {
  if (!isOpen) return null;

  const isEditing = Boolean(job && job.id);

  const [formData, setFormData] = useState<Partial<Job>>(() => {
    if (job) return { ...job };
    return {
      id: `job-${Date.now()}`,
      title: '',
      company: '',
      logoColor: 'bg-blue-600 text-white',
      logoText: 'ON',
      salary: '$65,000 - $80,000 / yr',
      city: 'Toronto',
      province: 'Greater Toronto Area' as ProvinceName,
      industry: 'IT',
      jobType: 'Full-time',
      remoteType: 'Hybrid',
      experience: 'Mid Level',
      isUrgent: true,
      isLMIAAvailable: false,
      isImmigrationFriendly: true,
      requiresPoliceCheck: true,
      employerVerificationLevel: 'Premium',
      description: 'Responsibilities include collaborating with cross-functional teams to deliver high quality solutions in Ontario.',
      requirements: ['Canadian Citizenship or Valid Work Permit', 'Clean Background Check'],
      benefits: ['Health Insurance', 'Paid Time Off', 'Dental & Vision'],
      postedAt: 'Just now'
    };
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.company) {
      alert('Please fill in the Job Title and Company Name.');
      return;
    }

    const completedJob: Job = {
      id: formData.id || `job-${Date.now()}`,
      title: formData.title || 'Untitled Opening',
      company: formData.company || 'Ontario Enterprise',
      logoColor: formData.logoColor || 'bg-slate-800 text-white',
      logoText: formData.logoText || (formData.company ? formData.company.substring(0, 2).toUpperCase() : 'ON'),
      salary: formData.salary || '$60,000 - $75,000 / yr',
      city: formData.city || 'Toronto',
      province: (formData.province as ProvinceName) || 'Greater Toronto Area',
      industry: formData.industry || 'IT',
      jobType: formData.jobType || 'Full-time',
      remoteType: formData.remoteType || 'Hybrid',
      experience: formData.experience || 'Mid Level',
      isUrgent: formData.isUrgent || false,
      isLMIAAvailable: formData.isLMIAAvailable || false,
      isImmigrationFriendly: formData.isImmigrationFriendly || false,
      requiresPoliceCheck: formData.requiresPoliceCheck || false,
      employerVerificationLevel: formData.employerVerificationLevel || 'Basic',
      description: formData.description || 'Job description details...',
      requirements: formData.requirements || ['Valid work authorization'],
      benefits: formData.benefits || ['Comprehensive benefits'],
      postedAt: formData.postedAt || 'Today'
    };

    onSave(completedJob);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-2xl w-full p-6 animate-fade-in relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 pb-4 mb-4 border-b border-slate-100">
          <div className="p-2 bg-amber-100 text-amber-700 rounded-lg font-bold">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">
              {isEditing ? 'Edit Job Listing' : 'Add New Job Listing'}
            </h3>
            <p className="text-xs text-slate-500">
              Customize listing details. Changes persist to your site.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Job Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                placeholder="e.g. Senior Software Developer"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Company Name *</label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value, logoText: e.target.value.substring(0,2).toUpperCase() })}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                placeholder="e.g. Ontario Tech Corp"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Salary Range</label>
              <input
                type="text"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. $80,000 - $100,000 / yr"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. Toronto"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Province / Region</label>
              <select
                value={formData.province}
                onChange={(e) => setFormData({ ...formData, province: e.target.value as ProvinceName })}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="Greater Toronto Area">Greater Toronto Area</option>
                <option value="Ottawa & Eastern Ontario">Ottawa & Eastern Ontario</option>
                <option value="Hamilton, Niagara & Halton">Hamilton, Niagara & Halton</option>
                <option value="Southwestern Ontario">Southwestern Ontario</option>
                <option value="Northern Ontario">Northern Ontario</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Industry Sector</label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. IT, Healthcare, Engineering"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Work Setup</label>
              <select
                value={formData.remoteType}
                onChange={(e) => setFormData({ ...formData, remoteType: e.target.value as any })}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Job Type</label>
              <select
                value={formData.jobType}
                onChange={(e) => setFormData({ ...formData, jobType: e.target.value as any })}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Job Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Provide key responsibilities and expectations..."
            />
          </div>

          <div className="flex flex-wrap gap-4 pt-2 border-t border-slate-100 text-xs font-semibold text-slate-700">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isUrgent}
                onChange={(e) => setFormData({ ...formData, isUrgent: e.target.checked })}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Urgent Hiring</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.requiresPoliceCheck}
                onChange={(e) => setFormData({ ...formData, requiresPoliceCheck: e.target.checked })}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Requires Police Background Check</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isImmigrationFriendly}
                onChange={(e) => setFormData({ ...formData, isImmigrationFriendly: e.target.checked })}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Immigration Friendly</span>
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center space-x-1"
            >
              <Check className="w-4 h-4" />
              <span>Save Job Listing</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
