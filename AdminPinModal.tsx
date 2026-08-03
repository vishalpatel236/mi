import React, { useState } from 'react';
import { Lock, KeyRound, Shield, Check, X, Eye, EyeOff } from 'lucide-react';

interface AdminPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  savedPin: string;
  onUpdatePin: (newPin: string) => void;
  isAuthenticated: boolean;
  onLogout: () => void;
}

export default function AdminPinModal({
  isOpen,
  onClose,
  onSuccess,
  savedPin,
  onUpdatePin,
  isAuthenticated,
  onLogout
}: AdminPinModalProps) {
  const [inputPin, setInputPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showPin, setShowPin] = useState(false);

  // For changing PIN when authenticated or managing PIN
  const [activeTab, setActiveTab] = useState<'unlock' | 'changepin'>(isAuthenticated ? 'changepin' : 'unlock');
  const [newPin, setNewPin] = useState('');
  const [changeSuccess, setChangeSuccess] = useState('');

  if (!isOpen) return null;

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPin.trim() === savedPin) {
      setErrorMsg('');
      setInputPin('');
      onSuccess();
    } else {
      setErrorMsg('Incorrect passcode. Please try again.');
    }
  };

  const handleSaveNewPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.trim().length < 3) {
      setErrorMsg('Passcode should be at least 3 characters.');
      return;
    }
    onUpdatePin(newPin.trim());
    setChangeSuccess(`Admin passcode updated to "${newPin.trim()}" successfully!`);
    setNewPin('');
    setTimeout(() => setChangeSuccess(''), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 animate-fade-in relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
          <div className="p-3 bg-slate-900 text-amber-400 rounded-xl shadow-xs">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">
              Admin Access & Passcode Settings
            </h3>
            <p className="text-xs text-slate-500">
              Control website editor access and customize your passcode.
            </p>
          </div>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex border-b border-slate-200 my-4">
          <button
            onClick={() => { setActiveTab('unlock'); setErrorMsg(''); }}
            className={`flex-1 pb-2.5 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center justify-center space-x-1.5 ${
              activeTab === 'unlock'
                ? 'border-amber-500 text-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>{isAuthenticated ? 'Status' : 'Unlock Portal'}</span>
          </button>
          <button
            onClick={() => { setActiveTab('changepin'); setErrorMsg(''); }}
            className={`flex-1 pb-2.5 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center justify-center space-x-1.5 ${
              activeTab === 'changepin'
                ? 'border-amber-500 text-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-600" />
            <span>Change Passcode</span>
          </button>
        </div>

        {/* Success Banner */}
        {changeSuccess && (
          <div className="mb-4 bg-emerald-50 border border-emerald-300 text-emerald-900 p-3 rounded-xl text-xs font-bold flex items-center space-x-2 animate-fade-in">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{changeSuccess}</span>
          </div>
        )}

        {/* Tab Content: Change Passcode */}
        {activeTab === 'changepin' && (
          <form onSubmit={handleSaveNewPin} className="space-y-4">
            <div className="bg-amber-50/70 border border-amber-200/80 p-3 rounded-xl">
              <div className="text-[11px] font-bold text-amber-900 flex items-center justify-between">
                <span>Current Active Passcode:</span>
                <span className="font-mono bg-white px-2 py-0.5 rounded border border-amber-300 text-slate-900 font-extrabold text-xs">
                  {savedPin}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Enter New Admin Passcode
              </label>
              <div className="relative">
                <input
                  type={showPin ? 'text' : 'password'}
                  required
                  value={newPin}
                  onChange={(e) => {
                    setNewPin(e.target.value);
                    setErrorMsg('');
                  }}
                  className="w-full text-xs p-2.5 pr-10 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none font-mono font-bold text-slate-900"
                  placeholder="e.g. 8395 or any custom passcode"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                Minimum 3 characters. Once saved, use this passcode to unlock the editor.
              </p>
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-600 font-semibold bg-rose-50 border border-rose-200 p-2 rounded-lg">
                {errorMsg}
              </p>
            )}

            <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold rounded-lg text-xs transition-colors cursor-pointer flex items-center space-x-1.5 shadow-md ring-1 ring-amber-400"
              >
                <KeyRound className="w-3.5 h-3.5 text-slate-950" />
                <span>Save New PIN</span>
              </button>
            </div>
          </form>
        )}

        {/* Tab Content: Unlock / Status */}
        {activeTab === 'unlock' && (
          <div>
            {isAuthenticated ? (
              <div className="space-y-4">
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs font-medium flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Website Editor is unlocked and active on this browser.</span>
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    onClick={() => setActiveTab('changepin')}
                    className="w-full py-2 bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
                  >
                    <KeyRound className="w-4 h-4 text-amber-800" />
                    <span>Change Passcode (Current: {savedPin})</span>
                  </button>

                  <button
                    onClick={() => {
                      onLogout();
                      onClose();
                    }}
                    className="w-full py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
                  >
                    <Lock className="w-4 h-4 text-rose-600" />
                    <span>Lock Editor & Exit Admin Mode</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleVerifyPin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Enter Admin Passcode
                  </label>
                  <div className="relative">
                    <input
                      type={showPin ? 'text' : 'password'}
                      required
                      value={inputPin}
                      onChange={(e) => {
                        setInputPin(e.target.value);
                        setErrorMsg('');
                      }}
                      className="w-full text-xs p-2.5 pr-10 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none font-mono"
                      placeholder={`Enter passcode (Current: ${savedPin})`}
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPin(!showPin)}
                      className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Current Passcode: <code className="bg-slate-100 px-1.5 py-0.5 rounded font-bold text-slate-800">{savedPin}</code>
                  </p>
                </div>

                {errorMsg && (
                  <p className="text-xs text-rose-600 font-semibold bg-rose-50 border border-rose-200 p-2 rounded-lg">
                    {errorMsg}
                  </p>
                )}

                <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center space-x-1.5 shadow-xs"
                  >
                    <Shield className="w-3.5 h-3.5 text-amber-400" />
                    <span>Unlock Editor</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
