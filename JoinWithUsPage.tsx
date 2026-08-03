import React, { useState } from 'react';
import { 
  UserCheck, 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  XCircle,
  Sparkles, 
  Lock, 
  Mail, 
  Phone, 
  User, 
  MapPin, 
  Briefcase, 
  FileText, 
  ArrowRight,
  Receipt,
  HelpCircle,
  Download,
  Printer,
  Send,
  Calendar,
  Clock,
  Building2,
  Check,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

interface PaymentDetails {
  receiptNumber: string;
  transactionId: string;
  membershipId: string;
  applicationId: string;
  paymentDate: string;
  activationDate: string;
  expiryDate: string;
  validityDays: number;
  amount: string;
  taxAmount: string;
  totalAmount: string;
  paymentStatus: 'PAID' | 'FAILED' | 'PENDING';
  membershipStatus: 'ACTIVE' | 'EXPIRED' | 'INACTIVE';
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  location: string;
  targetRole: string;
  paymentMethodUsed: string;
}

export default function JoinWithUsPage() {
  // Candidate Info Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cityProvince, setCityProvince] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Mid Level (2-5 yrs)');
  const [applicationIdInput, setApplicationIdInput] = useState('');

  // Payment Input State
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'debit_card' | 'google_pay' | 'interac'>('credit_card');

  // Checkout State
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [completedPayment, setCompletedPayment] = useState<PaymentDetails | null>(null);
  
  // Interactive email notification feedback states
  const [candidateEmailSent, setCandidateEmailSent] = useState(false);
  const [adminEmailSent, setAdminEmailSent] = useState(false);
  const [emailSendingStatus, setEmailSendingStatus] = useState<string | null>(null);

  const joiningFee = 15.20;
  const taxAmount = 1.98; // 13% HST/GST
  const totalFeeStr = (joiningFee + taxAmount).toFixed(2); // $17.18

  // Helper to format date cleanly
  const formatDate = (d: Date) => {
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (d: Date) => {
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 16);
    let formatted = val.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 3) {
      val = val.slice(0, 2) + '/' + val.slice(2);
    }
    setCardExpiry(val);
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError(null);

    if (!fullName || !email || !phoneNumber || !cityProvince) {
      alert('Please fill out all required basic information fields.');
      return;
    }
    if ((paymentMethod === 'credit_card' || paymentMethod === 'debit_card') && (!cardNumber || !cardExpiry || !cardCvc || !postalCode)) {
      alert('Please complete the card payment details.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const now = new Date();
      const expiry = new Date(now);
      expiry.setDate(expiry.getDate() + 45); // Strictly 45 Days Membership Validity

      // Separate Identifiers
      const generatedTxnId = 'TXN-' + now.getFullYear() + '-' + Math.floor(100000 + Math.random() * 900000);
      const generatedMembershipId = 'MEM-' + now.getFullYear() + '-' + Math.floor(100000 + Math.random() * 900000);
      const generatedReceiptNo = 'REC-' + now.getFullYear() + '-' + Math.floor(10000 + Math.random() * 90000);
      const linkedAppId = applicationIdInput.trim() ? applicationIdInput.trim() : 'APP-' + now.getFullYear() + '-' + Math.floor(100000 + Math.random() * 900000);

      let methodLabel = 'Credit Card (Visa / MasterCard / Amex)';
      if (paymentMethod === 'debit_card') methodLabel = 'Debit Card (Visa Debit / Debit Mastercard)';
      if (paymentMethod === 'google_pay') methodLabel = 'Google Pay Instant Checkout';
      if (paymentMethod === 'interac') methodLabel = 'Interac e-Transfer / Interac Online';

      const paymentRecord: PaymentDetails = {
        receiptNumber: generatedReceiptNo,
        transactionId: generatedTxnId,
        membershipId: generatedMembershipId,
        applicationId: linkedAppId,
        paymentDate: formatDateTime(now),
        activationDate: formatDate(now),
        expiryDate: formatDate(expiry),
        validityDays: 45,
        amount: `$${joiningFee.toFixed(2)} CAD`,
        taxAmount: `$${taxAmount.toFixed(2)} HST`,
        totalAmount: `$${totalFeeStr} CAD`,
        paymentStatus: 'PAID',
        membershipStatus: 'ACTIVE',
        candidateName: fullName,
        candidateEmail: email,
        candidatePhone: phoneNumber,
        location: cityProvince,
        targetRole: targetRole || 'General Member',
        paymentMethodUsed: methodLabel
      };

      setCompletedPayment(paymentRecord);
      setIsProcessing(false);
      setCandidateEmailSent(true);
      setAdminEmailSent(true);
    }, 1500);
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleResendCandidateEmail = () => {
    setEmailSendingStatus('Sending digital receipt to candidate email...');
    setTimeout(() => {
      setCandidateEmailSent(true);
      setEmailSendingStatus(`✓ Digital payment receipt successfully emailed to ${completedPayment?.candidateEmail}`);
      setTimeout(() => setEmailSendingStatus(null), 4000);
    }, 1000);
  };

  const handleResetForm = () => {
    setCompletedPayment(null);
    setCardNumber('');
    setCardExpiry('');
    setCardCvc('');
    setPostalCode('');
    setCandidateEmailSent(false);
    setAdminEmailSent(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12" id="join-us-container">
      
      {/* Top Banner Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 print:hidden">
        <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          Job Seeker Membership & Fast-Track Application
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Join <span className="text-blue-600">verified-jobs.com</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
          Get direct priority candidate status, active 45-day employer placement access, and verified credential distribution across Ontario hiring networks.
        </p>
      </div>

      {completedPayment ? (
        /* ===================================================
           DIGITAL PAYMENT RECEIPT VIEW
           =================================================== */
        <div className="space-y-6">
          
          {/* Notification Banners */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm print:hidden">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-bold flex-shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-emerald-950">
                  Payment Verified & 45-Day Membership Activated!
                </h3>
                <p className="text-xs text-emerald-800">
                  Transaction <strong className="font-mono">{completedPayment.transactionId}</strong> linked to Application <strong className="font-mono">{completedPayment.applicationId}</strong>.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={handleDownloadPDF}
                className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>

          {/* Email Confirmation Alerts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs print:hidden">
            <div className="bg-blue-50/80 border border-blue-200 p-3 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2 text-blue-900">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>Candidate Email: <strong>{completedPayment.candidateEmail}</strong></span>
              </div>
              <span className="bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded text-[10px]">
                {candidateEmailSent ? 'SENT' : 'PENDING'}
              </span>
            </div>

            <div className="bg-indigo-50/80 border border-indigo-200 p-3 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-900">
                <Building2 className="w-4 h-4 text-indigo-600" />
                <span>Admin Alert: <strong>admin@verified-jobs.com</strong></span>
              </div>
              <span className="bg-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded text-[10px]">
                {adminEmailSent ? 'NOTIFIED' : 'PENDING'}
              </span>
            </div>
          </div>

          {emailSendingStatus && (
            <div className="bg-slate-900 text-white p-3 rounded-xl text-xs font-medium text-center animate-fade-in print:hidden">
              {emailSendingStatus}
            </div>
          )}

          {/* MAIN OFFICIAL RECEIPT CONTAINER */}
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden print:border-none print:shadow-none print:p-0" id="printable-payment-receipt">
            
            {/* Top Receipt Decorative Gradient */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 print:hidden"></div>

            {/* Receipt Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-slate-200 gap-4">
              <div>
                <div className="flex items-center space-x-2 text-slate-900 font-black text-xl">
                  <div className="bg-blue-600 text-white p-1.5 rounded-lg">
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <span>verified-jobs<span className="text-blue-600">.com</span></span>
                </div>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  Official Digital Payment Receipt & Candidate Membership Credential
                </p>
                <p className="text-[11px] text-slate-400">
                  Canada's Verified Employment Portal • Toronto, ON M5V 2T6
                </p>
              </div>

              <div className="text-left sm:text-right space-y-1">
                <span className="inline-block bg-slate-900 text-amber-400 text-xs font-black px-3 py-1 rounded-md uppercase tracking-widest">
                  OFFICIAL RECEIPT
                </span>
                <p className="text-xs text-slate-500 font-mono">
                  Receipt No: <strong className="text-slate-900">{completedPayment.receiptNumber}</strong>
                </p>
                <p className="text-[11px] text-slate-400">
                  Issued: {completedPayment.paymentDate}
                </p>
              </div>
            </div>

            {/* STATUS BADGES RIBBON */}
            <div className="my-6 p-4 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              <div className="bg-emerald-100/80 border border-emerald-300 text-emerald-900 py-2 px-3 rounded-lg flex flex-col items-center justify-center">
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Payment Status</span>
                <strong className="text-xs font-black text-emerald-800 flex items-center gap-1 mt-0.5">
                  <Check className="w-3.5 h-3.5" /> PAYMENT SUCCESSFUL (PAID)
                </strong>
              </div>

              <div className="bg-blue-100/80 border border-blue-300 text-blue-900 py-2 px-3 rounded-lg flex flex-col items-center justify-center">
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">Membership Status</span>
                <strong className="text-xs font-black text-blue-800 flex items-center gap-1 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" /> MEMBERSHIP ACTIVE
                </strong>
              </div>

              <div className="bg-purple-100/80 border border-purple-300 text-purple-900 py-2 px-3 rounded-lg flex flex-col items-center justify-center">
                <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider">Validity Period</span>
                <strong className="text-xs font-black text-purple-800 flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-purple-600" /> VALID FOR 45 DAYS
                </strong>
              </div>
            </div>

            {/* SEPARATE IDENTIFIERS & CANDIDATE DETAILS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6 text-xs">
              
              {/* Box 1: Reference Codes & Identifiers */}
              <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-2.5">
                <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px] text-blue-600 border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" /> Payment & Membership Identifiers
                </h4>
                
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Payment Transaction ID:</span>
                  <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {completedPayment.transactionId}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Membership ID:</span>
                  <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {completedPayment.membershipId}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500 font-medium">Linked Application ID:</span>
                  <span className="font-mono font-bold text-slate-800 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                    {completedPayment.applicationId}
                  </span>
                </div>
              </div>

              {/* Box 2: Candidate Info */}
              <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-2.5">
                <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px] text-blue-600 border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Candidate Information
                </h4>

                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Candidate Name:</span>
                  <strong className="text-slate-900">{completedPayment.candidateName}</strong>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Email Address:</span>
                  <span className="text-slate-800 font-semibold">{completedPayment.candidateEmail}</span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500 font-medium">Phone / WhatsApp:</span>
                  <span className="text-slate-800 font-semibold">{completedPayment.candidatePhone}</span>
                </div>
              </div>

            </div>

            {/* 45-DAY MEMBERSHIP VALIDITY SPECIFICATION BOX */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white p-5 rounded-xl my-6 shadow-md">
              <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-400" />
                  <h4 className="text-sm font-extrabold tracking-tight">
                    45-Day Candidate Access & Placement Validity
                  </h4>
                </div>
                <span className="bg-emerald-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded uppercase">
                  ACTIVE 45 DAYS
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-slate-300 block text-[10px] uppercase font-bold">Activation Date</span>
                  <strong className="text-white text-sm">{completedPayment.activationDate}</strong>
                </div>

                <div>
                  <span className="text-slate-300 block text-[10px] uppercase font-bold">Expiration Date (45 Days)</span>
                  <strong className="text-amber-300 text-sm">{completedPayment.expiryDate}</strong>
                </div>

                <div>
                  <span className="text-slate-300 block text-[10px] uppercase font-bold">Validity Duration</span>
                  <strong className="text-emerald-300 text-sm">{completedPayment.validityDays} Days Continuous Access</strong>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-white/10 text-xs text-slate-200 font-medium italic bg-white/5 p-2.5 rounded-lg border border-white/10">
                💬 "Your membership is valid for 45 days from the activation date — Expires on <strong>{completedPayment.expiryDate}</strong>."
              </div>
            </div>

            {/* PAYMENT TABLE BREAKDOWN */}
            <div className="border border-slate-200 rounded-xl overflow-hidden my-6">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-extrabold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Description</th>
                    <th className="p-3">Type</th>
                    <th className="p-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="p-3">
                      <strong className="text-slate-900 block">Job Seeker Priority Membership</strong>
                      <span className="text-[11px] text-slate-500">Includes direct recruiter forwarding, verified candidate badge, and 45-day placement database access.</span>
                    </td>
                    <td className="p-3 font-medium">One-Time Fee</td>
                    <td className="p-3 text-right font-bold">{completedPayment.amount}</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-600">Ontario HST/GST Tax (13%)</td>
                    <td className="p-3 text-slate-500">Government Tax</td>
                    <td className="p-3 text-right font-semibold">{completedPayment.taxAmount}</td>
                  </tr>
                </tbody>
                <tfoot className="bg-slate-50 font-bold text-slate-900 border-t border-slate-200">
                  <tr>
                    <td colSpan={2} className="p-3 text-right font-extrabold text-xs">Total Amount Paid:</td>
                    <td className="p-3 text-right text-sm font-black text-emerald-600">{completedPayment.totalAmount}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* FOOTER VERIFICATION NOTE */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500 gap-2">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Verified by <strong>verified-jobs.com Payment System</strong></span>
              </div>
              <div>
                Customer Support: <a href="mailto:support@verified-jobs.com" className="text-blue-600 underline">support@verified-jobs.com</a>
              </div>
            </div>

          </div>

          {/* ACTION BUTTONS (BOTTOM) */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 print:hidden">
            <button
              onClick={handleDownloadPDF}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download Receipt (PDF)</span>
            </button>

            <button
              onClick={handleResendCandidateEmail}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>Resend Receipt to Email</span>
            </button>

            <button
              onClick={handleResetForm}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Register Another Candidate</span>
            </button>
          </div>

        </div>
      ) : (
        /* ===================================================
           CHECKOUT & CANDIDATE REGISTRATION FORM
           =================================================== */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Details (7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <form onSubmit={handleSubmitPayment} className="space-y-6">
              
              {/* Section 1: Candidate Information */}
              <div>
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-4">
                  <div className="w-7 h-7 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Candidate Profile Information
                  </h3>
                </div>

                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="join-fullname" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        id="join-fullname"
                        type="text"
                        required
                        placeholder="e.g. Sarah Jenkins"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full text-xs pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email & Phone Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="join-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          id="join-email"
                          type="email"
                          required
                          placeholder="candidate@example.ca"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full text-xs pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="join-phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Phone / WhatsApp *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          id="join-phone"
                          type="tel"
                          required
                          placeholder="+1 (416) 555-0188"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full text-xs pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Location & Application ID Link */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="join-location" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        City & Province *
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          id="join-location"
                          type="text"
                          required
                          placeholder="e.g. Toronto, ON"
                          value={cityProvince}
                          onChange={(e) => setCityProvince(e.target.value)}
                          className="w-full text-xs pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="join-appid" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Existing Application ID <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <div className="relative">
                        <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          id="join-appid"
                          type="text"
                          placeholder="e.g. APP-2026-88120"
                          value={applicationIdInput}
                          onChange={(e) => setApplicationIdInput(e.target.value)}
                          className="w-full text-xs pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-colors font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Target Job Title & Experience */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="join-role" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Target Job Role
                      </label>
                      <div className="relative">
                        <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          id="join-role"
                          type="text"
                          placeholder="e.g. Warehouse, Office Admin, IT"
                          value={targetRole}
                          onChange={(e) => setTargetRole(e.target.value)}
                          className="w-full text-xs pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="join-experience" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Experience Level
                      </label>
                      <select
                        id="join-experience"
                        value={experienceLevel}
                        onChange={(e) => setExperienceLevel(e.target.value)}
                        className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                      >
                        <option value="Entry Level / Student">Entry Level / Student / New Graduate</option>
                        <option value="Mid Level (2-5 yrs)">Mid Level (2-5 years experience)</option>
                        <option value="Senior Level (5+ yrs)">Senior Level (5+ years experience)</option>
                        <option value="Executive / Supervisory">Executive / Management / Supervisory</option>
                      </select>
                    </div>
                  </div>

                </div>
              </div>

              {/* Section 2: Secure Payment Checkout */}
              <div>
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-4">
                  <div className="w-7 h-7 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Secure Payment Gateway
                  </h3>
                </div>

                {/* Method selector buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
                  
                  {/* Option 1: Credit Card */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit_card')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      paymentMethod === 'credit_card'
                        ? 'border-blue-600 bg-blue-50/60 text-blue-900 ring-1 ring-blue-600 shadow-2xs'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-blue-600 mb-1" />
                    <span className="text-[11px] font-bold">Credit Card</span>
                    <span className="text-[9px] text-slate-500 font-normal">Visa, MC, Amex</span>
                  </button>

                  {/* Option 2: Debit Card */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('debit_card')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      paymentMethod === 'debit_card'
                        ? 'border-blue-600 bg-blue-50/60 text-blue-900 ring-1 ring-blue-600 shadow-2xs'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-emerald-600 mb-1" />
                    <span className="text-[11px] font-bold">Debit Card</span>
                    <span className="text-[9px] text-slate-500 font-normal">Visa / MC Debit</span>
                  </button>

                  {/* Option 3: Google Pay */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('google_pay')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      paymentMethod === 'google_pay'
                        ? 'border-blue-600 bg-blue-50/60 text-blue-900 ring-1 ring-blue-600 shadow-2xs'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-1 font-black text-slate-800 text-xs mb-1">
                      <span className="text-blue-500 font-black">G</span>
                      <span className="text-red-500 font-black">P</span>
                      <span className="text-amber-500 font-black">a</span>
                      <span className="text-emerald-500 font-black">y</span>
                    </div>
                    <span className="text-[11px] font-bold">Google Pay</span>
                    <span className="text-[9px] text-slate-500 font-normal">1-Tap Express</span>
                  </button>

                  {/* Option 4: Interac / Interac Online */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('interac')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      paymentMethod === 'interac'
                        ? 'border-blue-600 bg-blue-50/60 text-blue-900 ring-1 ring-blue-600 shadow-2xs'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Receipt className="w-4 h-4 text-amber-600 mb-1" />
                    <span className="text-[11px] font-bold">Interac</span>
                    <span className="text-[9px] text-slate-500 font-normal">Online / e-Transfer</span>
                  </button>

                </div>

                {/* Form panels according to selected method */}
                {(paymentMethod === 'credit_card' || paymentMethod === 'debit_card') && (
                  <div className="space-y-4 bg-slate-50/80 p-4 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between text-xs border-b border-slate-200/80 pb-2 mb-2">
                      <span className="font-bold text-slate-800">
                        {paymentMethod === 'credit_card' ? 'Credit Card Details' : 'Debit Card Details'}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {paymentMethod === 'credit_card' ? 'Visa • MasterCard • Amex' : 'Visa Debit • Debit MasterCard'}
                      </span>
                    </div>

                    <div>
                      <label htmlFor="join-cardnum" className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                        Card Number *
                      </label>
                      <input
                        id="join-cardnum"
                        type="text"
                        required
                        placeholder={paymentMethod === 'credit_card' ? "4500 •••• •••• 1234" : "4111 •••• •••• 5678"}
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        className="w-full text-xs px-3 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label htmlFor="join-expiry" className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                          Expiry *
                        </label>
                        <input
                          id="join-expiry"
                          type="text"
                          required
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={handleExpiryChange}
                          className="w-full text-xs px-3 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-mono text-center"
                        />
                      </div>

                      <div>
                        <label htmlFor="join-cvc" className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                          CVC / CVV *
                        </label>
                        <input
                          id="join-cvc"
                          type="password"
                          required
                          maxLength={4}
                          placeholder="•••"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                          className="w-full text-xs px-3 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-mono text-center"
                        />
                      </div>

                      <div>
                        <label htmlFor="join-postal" className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                          Postal Code *
                        </label>
                        <input
                          id="join-postal"
                          type="text"
                          required
                          placeholder="M5V 2T6"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value.toUpperCase().slice(0, 7))}
                          className="w-full text-xs px-3 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-mono text-center uppercase"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'google_pay' && (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-300 text-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-950 text-xs">Google Pay Fast Checkout</span>
                      <span className="bg-slate-200 text-slate-900 text-[10px] font-extrabold px-2 py-0.5 rounded">GPay Verified</span>
                    </div>
                    <p className="text-slate-900 text-xs font-medium">
                      Clicking button below will authorize your Google Account saved payment card to process <strong className="font-black text-black">${totalFeeStr} CAD</strong> instantly.
                    </p>
                    <div className="bg-white p-3 rounded-lg border border-slate-300 text-center font-extrabold text-slate-950 text-xs flex items-center justify-center gap-2 shadow-2xs">
                      <span className="text-blue-600 font-black text-sm">G</span>
                      <span className="text-slate-950 font-extrabold">Pay with Google Pay (${totalFeeStr} CAD)</span>
                    </div>
                  </div>
                )}

                {paymentMethod === 'interac' && (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-300 text-xs space-y-3 text-slate-900">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="font-extrabold text-slate-950 text-xs">Interac e-Transfer & Interac Online</span>
                      <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded border border-amber-300">Canadian Payment</span>
                    </div>
                    <p className="text-slate-900 font-semibold text-xs leading-relaxed">
                      Send <strong className="font-black text-black bg-slate-200/80 px-1.5 py-0.5 rounded border border-slate-300">${totalFeeStr} CAD</strong> to <strong className="font-black text-black bg-slate-200/80 px-1.5 py-0.5 rounded border border-slate-300">payments@verified-jobs.com</strong> after submitting your application order.
                    </p>
                    <div className="bg-white p-3 rounded-lg border border-slate-300 font-mono text-[11px] text-slate-950 space-y-1.5 shadow-2xs">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-700 font-bold">Recipient Email:</span>
                        <strong className="text-black font-extrabold">payments@verified-jobs.com</strong>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-700 font-bold">Auto-Verify Status:</span>
                        <span className="text-emerald-800 font-extrabold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Enabled</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-700 font-medium">
                      Includes automatic 45-day candidate membership activation upon receipt verification.
                    </p>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-extrabold text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Verifying Payment (${totalFeeStr} CAD)...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>
                        {paymentMethod === 'google_pay' && `Pay with Google Pay ($${totalFeeStr} CAD)`}
                        {paymentMethod === 'interac' && `Submit Interac Order ($${totalFeeStr} CAD)`}
                        {paymentMethod === 'credit_card' && `Pay $${totalFeeStr} CAD (Credit Card)`}
                        {paymentMethod === 'debit_card' && `Pay $${totalFeeStr} CAD (Debit Card)`}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-slate-400 text-center mt-3 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  Encrypted 256-bit SSL Checkout. Generates unique Transaction & Membership IDs with digital receipt.
                </p>
              </div>

            </form>
          </div>

          {/* Right Column: Pricing Breakdown & 45-Day Validity Details (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Price & 45-Day Validity Summary Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
              <div className="absolute right-0 top-0 -translate-y-8 translate-x-8 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl pointer-events-none"></div>

              <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-widest block mb-2">
                Job Seeker Placement Access
              </span>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-black text-white tracking-tight">$15.20</span>
                <span className="text-xs text-slate-300 font-medium">+ $1.98 HST tax</span>
              </div>

              {/* Total Billed */}
              <div className="bg-white/10 rounded-xl p-3 border border-white/10 mb-5 flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Total Billed Today:</span>
                <span className="font-bold text-white text-sm">${totalFeeStr} CAD</span>
              </div>

              {/* 45-Day Validity Clean Info Box */}
              <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 mb-6 space-y-1">
                <div className="flex items-center gap-2 text-slate-200 font-bold text-xs uppercase tracking-wider">
                  <Calendar className="w-4 h-4 text-slate-300" />
                  <span>45-Day Membership Validity</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Your membership and profile placement access are active for <strong>exactly 45 days</strong> from your activation date.
                </p>
              </div>

              <div className="space-y-3 border-t border-white/10 pt-5">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  What You Receive Upon Payment:
                </h4>
                {[
                  'Unique Payment Transaction ID & Linked Application ID',
                  'Unique Candidate Membership ID (45-Day Validity)',
                  'Official Printable Digital Payment Receipt (PDF)',
                  'Automated Receipt dispatch to Candidate & Admin Email'
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Help / FAQ Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <h4 className="text-sm font-extrabold text-slate-900">
                  Membership & Payment FAQs
                </h4>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <div>
                  <p className="font-bold text-slate-800">How long is my membership valid?</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">Your membership is valid for 45 days from the activation date.</p>
                </div>
                <div>
                  <p className="font-bold text-slate-800">Are Payment ID and Membership ID separate?</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">Yes, your Payment Transaction ID verifies your payment transaction, while your Membership ID manages your 45-day active placement window.</p>
                </div>
                <div>
                  <p className="font-bold text-slate-800">Can I download my payment receipt?</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">Yes, immediately after payment success you can view, print, or download your receipt as a PDF and receive a copy via email.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
