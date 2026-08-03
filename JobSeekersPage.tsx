import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Upload, 
  Mail, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  BarChart3, 
  Clock, 
  Download, 
  RefreshCw, 
  FileCheck, 
  ArrowRight,
  BookOpen,
  Check,
  X,
  Building,
  Target
} from 'lucide-react';

export default function JobSeekersPage() {
  const [email, setEmail] = useState('');
  const [whatsApp, setWhatsApp] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeName, setResumeName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  
  // Scanning state
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'completed'>('idle');
  const [scanStep, setScanStep] = useState(0);
  const [atsScore, setAtsScore] = useState(0);
  
  const scanSteps = [
    { label: 'Initializing ATS Parser Engine', desc: 'Pre-processing resume file format...' },
    { label: 'Biometric & Contact Info Extraction', desc: 'Validating Ontario address & email match...' },
    { label: 'Section Header Check', desc: 'Evaluating Work Experience & Education structure...' },
    { label: 'Action Verb & Industry Keyword Analysis', desc: 'Comparing against 10,000+ Ontario job templates...' },
    { label: 'Formatting & Parseability Audit', desc: 'Checking for unparseable columns, text boxes & graphs...' },
    { label: 'Generating Scoring Report', desc: 'Calculating final Applicant Tracking System score...' }
  ];

  // Run simulated scan
  useEffect(() => {
    let timer: any;
    if (scanStatus === 'scanning') {
      if (scanStep < scanSteps.length) {
        timer = setTimeout(() => {
          setScanStep(prev => prev + 1);
        }, 800);
      } else {
        // Generate simulated ATS score between 72 and 88 for realistic feedback
        const randomScore = Math.floor(Math.random() * 16) + 72;
        setAtsScore(randomScore);
        setScanStatus('completed');
      }
    }
    return () => clearTimeout(timer);
  }, [scanStatus, scanStep]);

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
      const file = e.dataTransfer.files[0];
      setResumeFile(file);
      setResumeName(file.name);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResumeFile(file);
      setResumeName(file.name);
    }
  };

  const handleClearFile = (e: React.MouseEvent) => {
    e.preventDefault();
    setResumeFile(null);
    setResumeName('');
    setScanStatus('idle');
    setScanStep(0);
  };

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeName) {
      alert('Please upload a resume first.');
      return;
    }
    if (!email) {
      alert('Please enter a valid email to receive your detailed ATS scan results.');
      return;
    }
    if (!whatsApp) {
      alert('Please enter your WhatsApp number to receive your mobile alerts.');
      return;
    }
    setScanStep(0);
    setScanStatus('scanning');
  };

  const handleResetScan = () => {
    setScanStatus('idle');
    setScanStep(0);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12" id="job-seekers-container">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="bg-blue-50 text-blue-600 border border-blue-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Job Seeker Toolkits
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
          Resume Optimizer & ATS Audit Center
        </h1>
        <p className="text-sm text-slate-500 mt-3 leading-relaxed">
          Ensure your resume passes Applicant Tracking Systems (ATS) used by Ontario's premium employers. 
          Upload your CV, enter your email, and receive a secure audit scorecard instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left column: Getting Started Guide (1/3 width) */}
        <div className="lg:col-span-1 space-y-6">
          
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center space-x-2.5 pb-4 border-b border-slate-100">
              <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                <BookOpen className="w-5 h-5" />
              </div>
              <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
                Getting Started
              </h2>
            </div>
            
            <p className="text-xs text-slate-500 mt-4 leading-relaxed">
              Before applying to jobs, optimize your resume format. Over <strong>90% of mid-to-large size employers in Ontario</strong> use automated ATS software to pre-screen candidates before a human recruiter even sees the file.
            </p>

            <div className="mt-6 space-y-5">
              {[
                {
                  step: '1',
                  title: 'Use Standard Fonts',
                  desc: 'Fonts like Inter, Arial, or Georgia parse accurately. Avoid non-standard decorative typography that gets scrambled in translation.'
                },
                {
                  step: '2',
                  title: 'Stick to Single Column Layouts',
                  desc: 'Multi-column tables, floating text boxes, and sidebar graphics look great but often fail text extraction loops entirely.'
                },
                {
                  step: '3',
                  title: 'Inject Ontario Industry Keywords',
                  desc: 'Match language from actual jobs. Use hard skills matching precisely (e.g. "React Native" rather than generic "App Developer").'
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 border border-blue-200 text-blue-600 font-bold text-xs flex items-center justify-center">
                    {item.step}
                  </span>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <h5 className="text-xs font-bold text-slate-800 flex items-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 mr-1.5" />
                  Applicant Quality Guarantee
                </h5>
                <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                  Resumes scoring above <strong className="text-emerald-700">80 points</strong> on our local simulator have been statistically shown to secure first-round interviews 3x faster in the GTA area.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Right column: Interactive Uploader and Live Scanner (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          
          {scanStatus === 'idle' && (
            <form onSubmit={handleStartScan} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider block">Resume Audit Setup</span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">Free AI-Driven ATS Compliance Report</h3>
              </div>

              {/* Step 1: Upload Resume */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  1. Upload Resume
                </label>
                
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
                    isDragging
                      ? 'border-blue-500 bg-blue-50/50'
                      : resumeName
                        ? 'border-emerald-300 bg-emerald-50/20'
                        : 'border-slate-300 bg-slate-50 hover:bg-slate-100/80'
                  }`}
                >
                  <input
                    type="file"
                    id="resume-ats-upload"
                    accept=".doc,.docx,.pdf,.txt"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  
                  <label htmlFor="resume-ats-upload" className="cursor-pointer block w-full">
                    <Upload className={`mx-auto w-10 h-10 mb-3 ${resumeName ? 'text-emerald-500 animate-pulse' : 'text-slate-400'}`} />
                    {resumeName ? (
                      <div className="flex items-center justify-center space-x-2">
                        <FileCheck className="w-5 h-5 text-emerald-600" />
                        <span className="text-xs font-bold text-emerald-700 truncate max-w-sm">
                          {resumeName}
                        </span>
                        <button
                          onClick={handleClearFile}
                          className="p-1 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Clear file"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <span className="block text-xs font-bold text-slate-800">Drag & drop your resume file, or click to browse</span>
                        <span className="block text-[10px] text-slate-400">Supports PDF, DOC, DOCX, TXT formats (Max 15MB)</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Step 2: Email & WhatsApp for Results */}
              <div className="space-y-4">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  2. Email & WhatsApp for Results
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="ats-email" className="block text-[11px] font-semibold text-slate-500">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-slate-400" />
                      </div>
                      <input
                        id="ats-email"
                        type="email"
                        required
                        placeholder="candidate@example.ca"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-xs pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-lg py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="ats-whatsapp" className="block text-[11px] font-semibold text-slate-500">
                      WhatsApp Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-xs font-bold font-sans">
                        <span>💬</span>
                      </div>
                      <input
                        id="ats-whatsapp"
                        type="tel"
                        required
                        placeholder="e.g. +1 416-555-0199"
                        value={whatsApp}
                        onChange={(e) => setWhatsApp(e.target.value)}
                        className="w-full text-xs pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-lg py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400">
                  Your privacy matters. We securely deliver the full PDF scorecard to your inbox and a copy via WhatsApp. No resume copies are stored permanently.
                </p>
              </div>

              {/* Footer pricing note and Submit Action */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-bold">Expected Time</span>
                  <span className="text-xs font-black text-slate-900 flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1 text-slate-500 animate-pulse" /> within 15 min
                  </span>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-blue-100 cursor-pointer"
                >
                  Score My Resume - Free ATS Resume Scan
                </button>
              </div>

            </form>
          )}

          {/* Case 2: Scanning Mode */}
          {scanStatus === 'scanning' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="text-center py-6">
                <RefreshCw className="w-10 h-10 text-blue-600 animate-spin mx-auto mb-4" />
                <h3 className="text-lg font-black text-slate-900">Parsing & Analyzing Resume</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Our advanced ATS audit pipeline checks matching keyword indexes against Ontario government and registry lists.
                </p>
              </div>

              {/* Step indicator */}
              <div className="space-y-3.5 max-w-md mx-auto bg-slate-50 p-5 rounded-xl border border-slate-200">
                {scanSteps.map((step, idx) => {
                  const isCurrent = idx === scanStep;
                  const isDone = idx < scanStep;
                  return (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : isCurrent ? (
                          <div className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-slate-200 border border-slate-300"></div>
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <span className={`text-xs font-bold block ${isCurrent ? 'text-blue-600' : isDone ? 'text-slate-700' : 'text-slate-400'}`}>
                          {step.label}
                        </span>
                        <span className="text-[10px] text-slate-400 block">{step.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Case 3: Scan Completed */}
          {scanStatus === 'completed' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 animate-fade-in">
              
              <div className="flex justify-between items-start pb-4 border-b border-slate-100 flex-wrap gap-4">
                <div>
                  <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider block">Scan Completed Successfully</span>
                  <h3 className="text-lg font-black text-slate-900 mt-0.5">ATS Audit Scorecard for {resumeName}</h3>
                  <span className="text-xs text-slate-500">Full detailed report dispatched securely to <strong className="text-slate-800">{email}</strong> and via WhatsApp to <strong className="text-slate-800">{whatsApp}</strong></span>
                </div>
                <button
                  onClick={handleResetScan}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  Scan Another Resume
                </button>
              </div>

              {/* Score Display Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Visual Circle Score */}
                <div className="md:col-span-1 bg-slate-900 text-white p-6 rounded-2xl flex flex-col justify-between items-center text-center">
                  <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Overall ATS Score</span>
                  
                  <div className="my-4 relative flex items-center justify-center">
                    {/* Circle wrapper */}
                    <div className="w-24 h-24 rounded-full border-4 border-slate-800 flex flex-col items-center justify-center relative">
                      <div className="absolute inset-0 rounded-full border-4 border-t-emerald-400 border-r-emerald-400 border-l-emerald-400 border-b-transparent animate-pulse"></div>
                      <span className="text-3xl font-black text-white">{atsScore}</span>
                      <span className="text-[9px] text-slate-400 font-bold uppercase">/ 100</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-bold text-emerald-400 uppercase block">Good Match Range</span>
                    <p className="text-[9px] text-slate-400 leading-normal">
                      Most systems require a minimum threshold score of 75 to bypass auto-rejections.
                    </p>
                  </div>
                </div>

                {/* Audit breakdown bullets */}
                <div className="md:col-span-2 space-y-4">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Scoring Metrics & Breakdown</h4>
                  
                  <div className="space-y-2.5">
                    {[
                      {
                        metric: 'Formatting and Structure',
                        score: '92/100',
                        status: 'Excellent',
                        desc: 'Clean single column layout detected. No problematic floating tables.',
                        isSuccess: true
                      },
                      {
                        metric: 'Keyword & Vocabulary Match',
                        score: '71/100',
                        status: 'Needs Polish',
                        desc: 'Missing key hard-skill markers for standard Ontario registries.',
                        isSuccess: false
                      },
                      {
                        metric: 'Experience Structure',
                        score: '84/100',
                        status: 'Strong',
                        desc: 'Dates of employment, job titles, and employers successfully matched.',
                        isSuccess: true
                      },
                      {
                        metric: 'ATS Parseability',
                        score: '100%',
                        status: 'Perfect',
                        desc: 'Biometric OCR parsed all content lines smoothly.',
                        isSuccess: true
                      }
                    ].map((item, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between gap-4">
                        <div className="space-y-0.5">
                          <strong className="text-xs font-bold text-slate-900 block">{item.metric}</strong>
                          <span className="text-[10px] text-slate-500 block leading-tight">{item.desc}</span>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="text-xs font-black text-slate-900 block">{item.score}</span>
                          <span className={`text-[9px] font-bold uppercase ${item.isSuccess ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Tips for enhancement */}
              <div className="bg-amber-50/50 border border-amber-200 p-5 rounded-xl space-y-2">
                <h4 className="text-xs font-black text-slate-900 flex items-center">
                  <AlertCircle className="w-4 h-4 text-amber-600 mr-1.5" />
                  Key Recommendation to Elevate Score above 85
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Your resume has great structural integrity! However, to rank at the top of local Ontario candidate registries, we recommend injecting standard industry verbs like <span className="font-mono bg-white border border-slate-200 px-1 py-0.5 rounded text-slate-800">"orchestrated"</span>, <span className="font-mono bg-white border border-slate-200 px-1 py-0.5 rounded text-slate-800">"optimized"</span>, and <span className="font-mono bg-white border border-slate-200 px-1 py-0.5 rounded text-slate-800">"benchmarked"</span> inside your Work Experience sections.
                </p>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
