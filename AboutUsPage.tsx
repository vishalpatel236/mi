import React from 'react';
import teamImage from '../assets/images/regenerated_image_1785103024477.webp';
import { 
  Building2, 
  Users2, 
  ShieldCheck, 
  Activity, 
  Stethoscope, 
  Heart, 
  Briefcase, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight,
  CheckCircle2,
  Lock
} from 'lucide-react';

export default function AboutUsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12" id="about-us-container">
      
      {/* Hero Headline Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="bg-blue-50 text-blue-600 border border-blue-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Who We Are
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-4 leading-tight">
          Your Strategic HR & Pre-Employment Screening Partner
        </h1>
        <p className="text-base text-slate-600 mt-4 leading-relaxed font-medium">
          Whether you are looking to scale your business or step into your next career move, our team of hiring experts makes recruitment simple, transparent, and secure. We connect pre-screened talent with top companies—taking the stress out of hiring so you can stay ahead of the competition.
        </p>
      </div>

      {/* Grid of Key Professional Competencies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        
        {/* Core Offering 1: Pre-Employment Background Checks */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between">
          <div>
            <div className="bg-blue-50 text-blue-600 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-3">
              Pre-Employment Background Checks
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Pre-employment background checks are used to verify a candidate's credentials, criminal history, and suitability for a role. By conducting rigorous verifications, we help safeguard company culture, physical assets, and proprietary information.
            </p>
            
            <ul className="mt-6 space-y-3">
              {[
                'Criminal Record Checks (CPIC & Local Police Databases)',
                'Educational & Professional Credential Verification',
                'Previous Employment & Reference Audits',
                'Credit Checks & Identity Verification (KYC)'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center text-xs font-bold text-blue-600">
            Secure Verification Process <Lock className="w-3.5 h-3.5 ml-1.5 text-slate-400" />
          </div>
        </div>

        {/* Core Offering 2: Pre-Employment Medical Examinations */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between">
          <div>
            <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-6">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-3">
              Pre-Employment Medical Exams
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Ensure health standards & legal compliance with our streamlined medical examinations. Designed to evaluate physical fitness levels, vision capabilities, and occupational health parameters to match your specific workplace demands safely.
            </p>
            
            <ul className="mt-6 space-y-3">
              {[
                'Occupational Health Screenings & Fitness for Duty Exams',
                'Audiometric (Hearing) & Vision Acuity Diagnostics',
                'Drug, Alcohol, and Controlled Substance Screenings',
                'Regulatory Compliance Assessments for Transport & Heavy Industry'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center text-xs font-bold text-emerald-600">
            Certified Medical Practitioners <Activity className="w-3.5 h-3.5 ml-1.5 text-slate-400" />
          </div>
        </div>

      </div>

      {/* Why Humber HR Experts Section - Redesigned Layout matching reference mockup */}
      <div className="bg-[#0b1329] rounded-2xl text-white border border-slate-800/80 shadow-2xl mb-16 overflow-hidden relative">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        
        {/* Main Content Grid: Text & Badges on Left, Group Photo on Right */}
        <div className="p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-slate-800/60">
          
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs text-blue-400 font-extrabold uppercase tracking-widest block">
              THE VERIFIED JOBS ADVANTAGE
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight text-white">
              Taking the Stress Out of Human Resource Operations
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              We specialize in full-cycle recruitment, security compliance vetting, and medical fitness assessments. Our unified solutions protect your organization, accelerate onboarding timelines, and optimize candidate placement matching with local regulations across Ontario.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
              <div className="flex items-start gap-3 bg-white/5 border border-white/10 p-3.5 rounded-xl">
                <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">Rapid Turnaround</h5>
                  <p className="text-[11px] text-slate-400 leading-snug mt-0.5">Police Checks & background screenings verified in real-time.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/5 border border-white/10 p-3.5 rounded-xl">
                <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400 mt-0.5">
                  <Users2 className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">Full HR Stewardship</h5>
                  <p className="text-[11px] text-slate-400 leading-snug mt-0.5">Managing client needs seamlessly from recruitment to onboarding.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Group Photo on the right side */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-slate-800 group">
              <img 
                src={teamImage} 
                alt="Humber HR Experts Recruitment Team"
                className="w-full h-72 sm:h-80 lg:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

        </div>

        {/* Lower Banner: Ontario Offices Details */}
        <div className="p-6 sm:p-8 bg-slate-950/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3 w-full md:w-auto min-w-[280px]">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider border-b border-white/10 pb-2 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-400" />
              Ontario Offices
            </h4>
            <div className="space-y-2 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Greater Toronto Area, Ontario, Canada</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>+1 (800) 555-HHR</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-blue-300 font-bold">compliance@verified-jobs.com</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-400 max-w-md leading-relaxed">
            <p className="font-semibold text-slate-300 mb-1">Empowering Canadian Organizations</p>
            <p>Our dedicated team delivers secure pre-employment screening, credential auditing, and staffing solutions backed by real-time compliance reporting.</p>
          </div>
        </div>

      </div>

    </div>
  );
}
