import React, { useState } from 'react';
import { ShieldCheck, FileCheck, FileText, CheckCircle2, AlertCircle, Clock, Lock, Upload, X, Eye } from 'lucide-react';
import { UserState, PoliceCheckRecord } from '../types';

interface PoliceCheckPageProps {
  userState: UserState;
  onApplyPoliceCheck: (record: PoliceCheckRecord) => void;
  onClearPoliceCheck: () => void;
}

export default function PoliceCheckPage({ userState, onApplyPoliceCheck, onClearPoliceCheck }: PoliceCheckPageProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [province, setProvince] = useState('Ontario');
  const [address, setAddress] = useState('');
  const [idType, setIdType] = useState("Driver's License");
  const [idNumber, setIdNumber] = useState('');
  const [photoIdName, setPhotoIdName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeCheck = userState.policeCheck;

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
      setPhotoIdName(e.dataTransfer.files[0].name);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoIdName(e.target.files[0].name);
    }
  };

  const handleClearFile = (e: React.MouseEvent) => {
    e.preventDefault();
    setPhotoIdName('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !birthDate || !address || !consent || !photoIdName) {
      alert('Please fill out all required fields, upload a valid photo ID, and check the consent box.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedEmail = fullName.trim().toLowerCase().replace(/\s+/g, '.') + '@example.com';
      const record: PoliceCheckRecord = {
        id: 'BG-' + Math.floor(Math.random() * 1000000),
        fullName,
        email: generatedEmail,
        birthDate,
        provinceOfResidence: province,
        address,
        status: 'Submitted',
        submittedAt: new Date().toISOString().split('T')[0],
        feePaid: true
      };
      onApplyPoliceCheck(record);
      setIsSubmitting(false);
    }, 1500);
  };

  const handleSimulateProgress = () => {
    if (!activeCheck) return;
    
    // Rotate states: Submitted -> Identity Verified -> Background Searching -> Completed
    if (activeCheck.status === 'Submitted') {
      onApplyPoliceCheck({ ...activeCheck, status: 'Identity Verified' });
    } else if (activeCheck.status === 'Identity Verified') {
      onApplyPoliceCheck({ ...activeCheck, status: 'Background Searching' });
    } else if (activeCheck.status === 'Background Searching') {
      onApplyPoliceCheck({ 
        ...activeCheck, 
        status: 'Completed',
        completedAt: new Date().toISOString().split('T')[0]
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12" id="background-check-container">
      
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="bg-blue-50 text-blue-600 border border-blue-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Pre-Employment Background Verification
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
          Instant Photo ID Background Check
        </h1>
        <p className="text-sm text-slate-500 mt-3 leading-relaxed">
          Background check processing is strictly reserved for candidates who have received a pre-employment confirmation or formal job offer. Please do not submit background check details unless explicitly requested by our hiring team.
        </p>
      </div>

      {/* Grid: Main Panel and Left Info Column */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Info Column */}
        <div className="md:col-span-1 space-y-6">
          {/* Security Summary Badge */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-lg">
            <ShieldCheck className="w-8 h-8 text-emerald-400 mb-3" />
            <h3 className="font-bold text-sm text-white">Secure Identity Audits</h3>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              We leverage biometric OCR scanning to automatically verify the authenticity of your uploaded ID document and issue an official background clearance seal.
            </p>
            
            <div className="mt-4 pt-4 border-t border-slate-800 space-y-2">
              <div className="flex items-center text-[10px] text-slate-300 font-medium">
                <span className="text-emerald-400 mr-2">🔒</span> Secure 256-bit SSL Encryption
              </div>
              <div className="flex items-center text-[10px] text-slate-300 font-medium">
                <span className="text-emerald-400 mr-2">🪪</span> Automated Photo ID Matching
              </div>
              <div className="flex items-center text-[10px] text-slate-300 font-medium">
                <span className="text-emerald-400 mr-2">⚡</span> Immediate Employer Sharing
              </div>
            </div>
          </div>

          {/* Pricing & Outcome Promise Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3.5 shadow-xs">
            {/* Processing Cost Section */}
            <div>
              <h4 className="font-extrabold text-slate-950 text-xs tracking-wider uppercase mb-3">
                PROCESSING COST
              </h4>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-600 font-medium text-[11px]">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-slate-800">$35.00 CAD</span>
                </div>
                <div className="flex justify-between text-slate-600 font-medium text-[11px]">
                  <span>HST (13%):</span>
                  <span className="font-semibold text-slate-800">$4.55 CAD</span>
                </div>
                <div className="flex justify-between text-slate-950 font-extrabold text-xs pt-2 border-t border-slate-100">
                  <span>Total Amount:</span>
                  <span className="font-black text-black text-sm">$39.55 CAD</span>
                </div>
              </div>
            </div>

            {/* Verification Parameters Section */}
            <div className="pt-2 border-t border-slate-100 space-y-2.5">
              <h4 className="font-bold text-slate-900 text-xs">Verification Parameters</h4>

              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-medium text-[11px]">Expected Time</span>
                <strong className="text-slate-900 font-bold text-xs flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-600" />
                  <span>within 7 days</span>
                </strong>
              </div>
            </div>

            {/* Explanatory Paragraph */}
            <p className="text-[10px] text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
              No repetitive screening required. Our automated verification system securely matches your identity against registered databases and instantly issues your application verification badge. Verification results are shared directly with the employer to support the hiring process and are not displayed to applicants.
            </p>
          </div>
        </div>

        {/* Dynamic Form / Status Column */}
        <div className="md:col-span-2">
          
          {/* Case 1: No Active Check Exists yet -> Show Form */}
          {!activeCheck && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
              <h3 className="font-bold text-slate-900 text-base mb-6 flex items-center">
                <FileText className="w-5 h-5 text-blue-600 mr-2" />
                Step 1: Background Clearance Form
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full legal Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Legal Name (Matching Photo ID) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Robert Matthew Jenkins"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Birth Date & Province */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Province of Residence <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
                    >
                      <option value="Ontario">Ontario</option>
                    </select>
                  </div>
                </div>

                {/* Complete Address */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Current Ontario Mailing Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="101 Maple Leaf Way, Suite 4B, Toronto, ON, M5V 2T6"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Photo ID Specifications */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Photo ID Document Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={idType}
                      onChange={(e) => setIdType(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
                    >
                      <option value="Driver's License">Driver's License (Ontario)</option>
                      <option value="Passport">Passport</option>
                      <option value="Ontario Photo Card">Ontario Photo Card</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Document / ID Number <span className="text-slate-400">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. S1234-56789-01234"
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Drag-and-drop Photo ID Upload field */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Upload Government Photo ID <span className="text-red-500">*</span>
                  </label>
                  
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
                      isDragging
                        ? 'border-blue-500 bg-blue-50/50'
                        : photoIdName
                          ? 'border-emerald-300 bg-emerald-50/20'
                          : 'border-slate-300 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <input
                      type="file"
                      id="photo-id-upload"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    
                    <label htmlFor="photo-id-upload" className="cursor-pointer block w-full">
                      <Upload className={`mx-auto w-8 h-8 mb-2 ${photoIdName ? 'text-emerald-500 animate-bounce' : 'text-slate-400'}`} />
                      {photoIdName ? (
                        <div className="flex items-center justify-center space-x-2">
                          <span className="text-xs font-bold text-emerald-700 truncate max-w-xs">
                            {photoIdName}
                          </span>
                          <button
                            onClick={handleClearFile}
                            className="p-1 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Clear file"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <span className="block text-xs font-semibold text-slate-700">Drag & drop photo ID or click to browse</span>
                          <span className="block text-[10px] text-slate-400">Supported formats: JPG, PNG, PDF (Max 10MB)</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Secure Declaration Consent */}
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="consent-check"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="h-4 w-4 text-blue-600 border-slate-300 rounded-sm mt-0.5 cursor-pointer"
                    />
                    <label htmlFor="consent-check" className="ml-2 block text-[11px] text-slate-600 leading-relaxed font-medium cursor-pointer">
                      <strong>Identity Compliance Consent:</strong> I hereby authorize VerifiedJobs to run automated biometric scanning and query checks against certified identity registers in Ontario using my uploaded Photo ID.
                    </label>
                  </div>
                </div>

                {/* Submission Actions */}
                <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-100 flex-wrap sm:flex-nowrap">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wide block font-semibold">Processing Cost</span>
                    <strong className="text-slate-900 font-bold text-sm">$39.55 CAD Total</strong>
                    <span className="block text-[10px] text-slate-500">($35.00 base + 13% HST)</span>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold tracking-wide transition-all shadow-md shadow-blue-100 cursor-pointer"
                  >
                    {isSubmitting ? 'Biometrically Auditing ID...' : 'Submit Verification Request'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Case 2: Active Check Exists -> Show Interactive Real-Time Status Monitor */}
          {activeCheck && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 animate-fade-in">
              <div className="flex justify-between items-start pb-4 border-b border-slate-100 flex-wrap gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">Active ID Background Verification</span>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">Reference ID: {activeCheck.id}</h3>
                  <span className="text-xs text-slate-500 font-medium">Submitted on {activeCheck.submittedAt}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={onClearPoliceCheck}
                    className="text-[11px] font-bold text-slate-500 hover:text-blue-600 bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-md transition-colors"
                  >
                    Reset & Apply New
                  </button>
                </div>
              </div>

              {/* Progress Stepper Visualizer */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 py-2">
                {[
                  { step: 'Submitted', label: '1. ID Received', desc: 'Secure document data uploaded', completed: true },
                  { 
                    step: 'Identity Verified', 
                    label: '2. OCR Authenticated', 
                    desc: 'Biometric and name match success', 
                    completed: ['Identity Verified', 'Background Searching', 'Completed'].includes(activeCheck.status) 
                  },
                  { 
                    step: 'Background Searching', 
                    label: '3. Registry Query', 
                    desc: 'Municipal records audit search active', 
                    completed: ['Background Searching', 'Completed'].includes(activeCheck.status) 
                  },
                  { 
                    step: 'Completed', 
                    label: '4. Cleared', 
                    desc: 'Background Checked badge issued', 
                    completed: activeCheck.status === 'Completed' 
                  }
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className={`p-3 rounded-lg border text-left flex flex-col justify-between h-24 ${
                      item.completed 
                        ? 'border-emerald-200 bg-emerald-50/50 text-emerald-800' 
                        : 'border-slate-200 bg-slate-50 text-slate-400'
                    }`}
                  >
                    <div>
                      <strong className="text-xs font-bold block">{item.label}</strong>
                      <span className="text-[9px] mt-1 leading-snug block">{item.desc}</span>
                    </div>
                    <div className="flex items-center justify-end mt-2">
                      {item.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-300 border-t-slate-500 animate-spin"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Simulation Helper Box */}
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-0.5 text-center sm:text-left">
                  <strong className="text-xs text-slate-900 block font-semibold flex items-center justify-center sm:justify-start">
                    ⏱️ Verification Accelerator (Simulator)
                  </strong>
                  <span className="text-[10px] text-slate-500 block leading-relaxed">
                    Identity screening usually takes a few minutes. Press this button to instantly advance the verification steps to test the "Background Checked" badge!
                  </span>
                </div>
                <button
                  onClick={handleSimulateProgress}
                  disabled={activeCheck.status === 'Completed'}
                  className={`w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                    activeCheck.status === 'Completed'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 cursor-not-allowed'
                      : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
                  }`}
                >
                  {activeCheck.status === 'Completed' ? 'Cleared & Active' : 'Advance Processing Step →'}
                </button>
              </div>

              {/* Live Clearance Badge showcase once Cleared */}
              {activeCheck.status === 'Completed' && (
                <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-xl animate-fade-in text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="inline-flex items-center space-x-1 bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Certified Background Cleared</span>
                    </span>
                    <h4 className="text-sm font-black text-slate-900 mt-2">Active Background Badge Attached</h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Your Photo ID and Pre-employment Background Check has been cleared successfully. 
                      Employers can see the <strong className="text-slate-800">✅ Background Checked</strong> badge 
                      on your job applications, moving you straight to the top of the queue.
                    </p>
                  </div>
                  
                  <div className="bg-white border border-emerald-200 p-4 rounded-lg flex flex-col items-center flex-shrink-0 shadow-xs">
                    <span className="text-[9px] text-slate-400 font-mono">REG LIC# {activeCheck.id}</span>
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mt-1" />
                    <span className="text-xs font-bold text-slate-900 mt-1">Status: VERIFIED</span>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
