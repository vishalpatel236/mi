import React, { useState, useEffect } from 'react';
import { X, Briefcase, MapPin, DollarSign, Clock, Upload, CheckCircle2, Edit3, Save, RotateCcw } from 'lucide-react';
import { Job, UserState } from '../types';

interface JobDetailsModalProps {
  job: Job | null;
  onClose: () => void;
  userState: UserState;
  onApplySubmit: (jobId: string, details: any) => void;
  onUpdateJob?: (updatedJob: Job) => void;
  isAdmin?: boolean;
}

export default function JobDetailsModal({ job, onClose, userState, onApplySubmit, onUpdateJob, isAdmin = false }: JobDetailsModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [resumeName, setResumeName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [attachVerification, setAttachVerification] = useState(true);

  // Edit Mode State
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editCompany, setEditCompany] = useState('');
  const [editSalary, setEditSalary] = useState('');
  const [editCity, setEditCity] = useState('');
  const [editProvince, setEditProvince] = useState('');
  const [editIndustry, setEditIndustry] = useState('');
  const [editJobType, setEditJobType] = useState<Job['jobType']>('Full-time');
  const [editRemoteType, setEditRemoteType] = useState<Job['remoteType']>('Remote');
  const [editDescription, setEditDescription] = useState('');
  const [editRequirements, setEditRequirements] = useState('');
  const [editBenefits, setEditBenefits] = useState('');

  // Sync edit state whenever job prop changes
  useEffect(() => {
    if (job) {
      setEditTitle(job.title || '');
      setEditCompany(job.company || '');
      setEditSalary(job.salary || '');
      setEditCity(job.city || '');
      setEditProvince(job.province || '');
      setEditIndustry(job.industry || '');
      setEditJobType(job.jobType || 'Full-time');
      setEditRemoteType(job.remoteType || 'Remote');
      setEditDescription(job.description || '');
      setEditRequirements((job.requirements || []).join('\n'));
      setEditBenefits((job.benefits || []).join('\n'));
      setIsEditing(false);
    }
  }, [job]);

  if (!job) return null;

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) return;

    const updatedJob: Job = {
      ...job,
      title: editTitle.trim() || job.title,
      company: editCompany.trim() || job.company,
      salary: editSalary.trim() || job.salary,
      city: editCity.trim() || job.city,
      province: editProvince.trim() || job.province,
      industry: editIndustry.trim() || job.industry,
      jobType: editJobType,
      remoteType: editRemoteType,
      description: editDescription.trim(),
      requirements: editRequirements
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean),
      benefits: editBenefits
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean),
    };

    if (onUpdateJob) {
      onUpdateJob(updatedJob);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    if (job) {
      setEditTitle(job.title || '');
      setEditCompany(job.company || '');
      setEditSalary(job.salary || '');
      setEditCity(job.city || '');
      setEditProvince(job.province || '');
      setEditIndustry(job.industry || '');
      setEditJobType(job.jobType || 'Full-time');
      setEditRemoteType(job.remoteType || 'Remote');
      setEditDescription(job.description || '');
      setEditRequirements((job.requirements || []).join('\n'));
      setEditBenefits((job.benefits || []).join('\n'));
    }
    setIsEditing(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setResumeName(e.dataTransfer.files[0].name);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !resumeName) {
      alert('Please fill out all required fields and upload a resume.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onApplySubmit(job.id, {
        fullName,
        email,
        resumeName,
        attachedPoliceCheck: attachVerification && userState.policeCheck?.status === 'Completed',
        attachedCandidateCheck: false
      });
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1500);
  };

  const hasPoliceCheck = userState.policeCheck?.status === 'Completed';

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen p-4 text-center sm:p-6">
        {/* Backdrop overlay */}
        <div 
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity" 
          aria-hidden="true"
          onClick={onClose}
        ></div>

        {/* Spacing alignment */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        {/* Modal container */}
        <div className="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all my-8 sm:align-middle sm:max-w-3xl sm:w-full z-[101]">
          
          {/* Header */}
          <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center border-b border-slate-800">
            <div>
              <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">
                {isEditing ? 'Editing Job Details' : 'Job Details'}
              </span>
              <h2 className="text-xl font-bold mt-0.5 text-white">{job.title}</h2>
              <p className="text-xs text-slate-300 mt-0.5 font-medium">{job.company} • {job.city}, {job.province}</p>
            </div>

            <div className="flex items-center space-x-2">
              {isAdmin && (!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  title="Edit Job Details"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Details</span>
                </button>
              ) : (
                <button 
                  onClick={handleCancelEdit}
                  className="flex items-center space-x-1 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Cancel</span>
                </button>
              ))}

              <button 
                onClick={onClose}
                className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 p-2 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6 max-h-[75vh] overflow-y-auto">
            {isAdmin && isEditing ? (
              /* EDIT MODE FORM */
              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div className="bg-blue-50/60 border border-blue-200 p-3 rounded-xl text-xs text-blue-900 font-medium">
                  ✏️ You are editing details for this job post. Any updates saved will immediately apply across the entire site.
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Job Title</label>
                    <input
                      type="text"
                      required
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Company Name</label>
                    <input
                      type="text"
                      required
                      value={editCompany}
                      onChange={(e) => setEditCompany(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Salary / Compensation</label>
                    <input
                      type="text"
                      required
                      value={editSalary}
                      onChange={(e) => setEditSalary(e.target.value)}
                      placeholder="e.g. $65,000 - $80,000 / yr"
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={editCity}
                      onChange={(e) => setEditCity(e.target.value)}
                      placeholder="e.g. Toronto"
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Province / Region</label>
                    <input
                      type="text"
                      required
                      value={editProvince}
                      onChange={(e) => setEditProvince(e.target.value)}
                      placeholder="e.g. Greater Toronto Area"
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Industry Sector</label>
                    <input
                      type="text"
                      required
                      value={editIndustry}
                      onChange={(e) => setEditIndustry(e.target.value)}
                      placeholder="e.g. Technology"
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Job Type</label>
                    <select
                      value={editJobType}
                      onChange={(e) => setEditJobType(e.target.value as Job['jobType'])}
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 focus:bg-white focus:border-blue-500 focus:outline-none"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Temporary">Temporary</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Work Format</label>
                    <select
                      value={editRemoteType}
                      onChange={(e) => setEditRemoteType(e.target.value as Job['remoteType'])}
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 focus:bg-white focus:border-blue-500 focus:outline-none"
                    >
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="On-site">On-site</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Job Description</label>
                  <textarea
                    rows={4}
                    required
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:bg-white focus:border-blue-500 focus:outline-none leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Requirements <span className="font-normal text-slate-500">(Enter one requirement per line)</span>
                  </label>
                  <textarea
                    rows={4}
                    value={editRequirements}
                    onChange={(e) => setEditRequirements(e.target.value)}
                    placeholder="3+ years of experience&#10;Bachelor's degree or equivalent&#10;Strong communication skills"
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:bg-white focus:border-blue-500 focus:outline-none leading-relaxed font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Benefits & Perks <span className="font-normal text-slate-500">(Enter one benefit per line)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={editBenefits}
                    onChange={(e) => setEditBenefits(e.target.value)}
                    placeholder="Health & Dental Insurance&#10;Flexible PTO&#10;Professional Development Allowance"
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:bg-white focus:border-blue-500 focus:outline-none leading-relaxed font-mono text-[11px]"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-3 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center space-x-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors shadow-xs cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            ) : submitSuccess ? (
              <div className="text-center py-12 px-4">
                <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-emerald-100 text-emerald-600 mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Application Submitted!</h3>
                <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
                  Your application has been submitted to <strong className="text-slate-800">{job.company}</strong>.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 inline-flex justify-center px-6 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Close Details
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                
                {/* Left Side: Job Info */}
                <div className="md:col-span-3 space-y-5">
                  {/* Job Highlights */}
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500 font-medium text-[10px] uppercase">Salary</span>
                      <strong className="text-slate-900 text-xs font-bold flex items-center mt-0.5">
                        <DollarSign className="w-3.5 h-3.5 text-slate-500 mr-0.5" />
                        {job.salary}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500 font-medium text-[10px] uppercase">Location</span>
                      <strong className="text-slate-900 text-xs font-bold flex items-center mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-500 mr-0.5" />
                        {job.city}, {job.province}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500 font-medium text-[10px] uppercase">Type</span>
                      <strong className="text-slate-900 text-xs font-bold flex items-center mt-0.5">
                        <Briefcase className="w-3.5 h-3.5 text-slate-500 mr-0.5" />
                        {job.jobType}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500 font-medium text-[10px] uppercase">Format</span>
                      <strong className="text-slate-900 text-xs font-bold flex items-center mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-slate-500 mr-0.5" />
                        {job.remoteType}
                      </strong>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-1.5">Job Description</h4>
                    <p className="text-slate-700 text-xs leading-relaxed mt-2 whitespace-pre-line">{job.description}</p>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-1.5">Requirements</h4>
                    <ul className="list-disc list-inside space-y-1 mt-2 text-xs text-slate-700">
                      {job.requirements && job.requirements.length > 0 ? (
                        job.requirements.map((req, i) => (
                          <li key={i} className="leading-relaxed">{req}</li>
                        ))
                      ) : (
                        <li className="text-slate-400 italic">No specific requirements listed.</li>
                      )}
                    </ul>
                  </div>

                  {/* Benefits */}
                  {job.benefits && job.benefits.length > 0 && (
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-1.5">Benefits</h4>
                      <ul className="list-disc list-inside space-y-1 mt-2 text-xs text-slate-700">
                        {job.benefits.map((ben, i) => (
                          <li key={i} className="leading-relaxed">{ben}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Right Side: Quick Application Form */}
                <div className="md:col-span-2 border-t md:border-t-0 md:border-l border-slate-200 pt-5 md:pt-0 md:pl-6">
                  <h4 className="font-bold text-slate-900 text-sm mb-3">Submit Application</h4>
                  
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    {/* Resume Drag & Drop */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Resume Upload <span className="text-red-500">*</span>
                      </label>
                      
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-lg p-3 text-center transition-all ${
                          isDragging 
                            ? 'border-blue-500 bg-blue-50/50' 
                            : resumeName 
                              ? 'border-emerald-500 bg-emerald-50/30' 
                              : 'border-slate-300 bg-slate-50 hover:bg-slate-100'
                        }`}
                      >
                        <input
                          type="file"
                          id="resume-upload"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        
                        <label htmlFor="resume-upload" className="cursor-pointer">
                          <Upload className={`mx-auto w-5 h-5 mb-1 ${resumeName ? 'text-emerald-500' : 'text-slate-400'}`} />
                          {resumeName ? (
                            <span className="block text-[11px] font-bold text-emerald-700 truncate">
                              {resumeName}
                            </span>
                          ) : (
                            <div className="space-y-0.5">
                              <span className="block text-[11px] font-semibold text-slate-700">Upload PDF or DOCX</span>
                              <span className="block text-[9px] text-slate-400">Max file size 5MB</span>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>

                    {/* Verification Attach Checkbox */}
                    {hasPoliceCheck && (
                      <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg">
                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            id="attach-tokens"
                            checked={attachVerification}
                            onChange={(e) => setAttachVerification(e.target.checked)}
                            className="h-3.5 w-3.5 text-blue-600 border-slate-300 rounded-sm mt-0.5 cursor-pointer"
                          />
                          <label htmlFor="attach-tokens" className="ml-2 block text-[11px] text-slate-700 font-medium cursor-pointer">
                            Attach verified background status
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer disabled:bg-slate-400"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </form>

                </div>

              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

