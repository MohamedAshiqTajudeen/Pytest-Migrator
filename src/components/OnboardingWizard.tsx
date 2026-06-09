import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Zap, Sparkles, FolderArchive, ArrowUpFromLine } from 'lucide-react';
import InfinityLogo from './InfinityLogo';

interface OnboardingWizardProps {
  onComplete: () => void;
  onSkip: () => void;
  isDark: boolean;
}

export default function OnboardingWizard({ onComplete, onSkip, isDark }: OnboardingWizardProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Content configuration for each onboarding step
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 text-center animate-fade-in">
            <div className="flex justify-center mb-4">
              <InfinityLogo size={240} />
            </div>
            <h3 className="text-2xl font-bold font-display text-brand-orange dark:text-white">
              Bridge the Gap: Postman to Pytest
            </h3>
            <p className="text-gray-600 dark:text-slate-300 text-sm max-w-lg mx-auto leading-relaxed">
              Step into the future of QA engineering. Convert your Postman API collections into clean, scalable, and executable Pytest automation scripts instantly with Gemini Intelligence.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-brand-orange/10 text-brand-orange">
                <Zap className="w-3.5 h-3.5" /> Postman JSON v2.1
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-brand-blue/10 text-brand-blue">
                <Sparkles className="w-3.5 h-3.5" /> Gemini API Pro
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-brand-green/10 text-brand-green">
                <CheckCircle2 className="w-3.5 h-3.5" /> Pytest Native
              </span>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-center">
              <div className="relative p-6 bg-brand-orange/10 dark:bg-brand-orange/5 rounded-2xl border border-brand-orange/20 animate-float">
                <ArrowUpFromLine className="w-16 h-16 text-brand-orange" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-orange"></span>
                </span>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold font-display text-slate-800 dark:text-white">
                1. Upload Your Collection
              </h3>
              <p className="text-gray-600 dark:text-slate-400 text-xs mt-2 max-w-sm mx-auto leading-relaxed">
                Export your Postman Collection as a JSON file (we recommend v2.1 format) and drag it directly into our workspace.
              </p>
            </div>
            <div className="bg-slate-100 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800/80 max-w-md mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-3.5 h-3.5 rounded-full bg-brand-orange" />
                <span className="text-xs font-mono text-slate-700 dark:text-slate-300 truncate">
                  My_SaaS_API_Collection.json
                </span>
                <span className="ml-auto text-[10px] font-mono text-slate-400">128 KB</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-brand-orange h-full w-2/3 rounded-full" />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-center gap-6 items-center">
              <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">PM Spec</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] text-brand-orange font-semibold animate-pulse">Parser Agent</span>
                <div className="h-0.5 w-16 bg-gradient-to-r from-brand-orange to-brand-blue animate-pulse-ring" />
              </div>
              <div className="p-4 bg-brand-blue/10 rounded-full border border-brand-blue/30 animate-spin" style={{ animationDuration: '8s' }}>
                <Sparkles className="w-8 h-8 text-brand-blue" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] text-brand-green font-semibold animate-pulse">Pytest Output</span>
                <div className="h-0.5 w-16 bg-gradient-to-r from-brand-blue to-brand-green animate-pulse-ring" />
              </div>
              <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">test_*.py</span>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold font-display text-slate-800 dark:text-white">
                2. Live AI Conversion Loop
              </h3>
              <p className="text-gray-600 dark:text-slate-400 text-xs mt-2 max-w-sm mx-auto leading-relaxed">
                Watch five specialized Gemini AI agents work in tandem: parsing requests, validating syntax, converting assertions, validating output structures, and exporting error-free scripts.
              </p>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-center">
              <div className="p-6 bg-brand-blue/10 dark:bg-brand-blue/5 rounded-2xl border border-brand-blue/20 animate-float">
                <FolderArchive className="w-16 h-16 text-brand-blue" />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold font-display text-slate-800 dark:text-white">
                3. Download ZIP & Individual Scripts
              </h3>
              <p className="text-gray-600 dark:text-slate-400 text-xs mt-2 max-w-sm mx-auto leading-relaxed">
                Download singular Python test files or download the entire test suite in a complete ZIP package, fully structured with configuration files and requirements.
              </p>
            </div>
            <div className="flex justify-center gap-3">
              <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-mono text-slate-700 dark:text-slate-300">
                conftest.py
              </div>
              <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-mono text-slate-700 dark:text-slate-300">
                test_auth.py
              </div>
              <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-mono text-slate-700 dark:text-slate-300">
                pytest.ini
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6 text-center animate-fade-in">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-brand-green/10 dark:bg-brand-green/5 rounded-full flex items-center justify-center border border-brand-green/30 animate-pulse-ring">
                <ShieldCheck className="w-12 h-12 text-brand-green" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold font-display text-brand-green">
                You Are Standardized!
              </h3>
              <p className="text-gray-600 dark:text-slate-300 text-sm mt-3 max-w-sm mx-auto leading-relaxed">
                No more manual copy-pasting of API endpoints or translating Javascript assertions. Standarize your API tests into production-ready Pytest workflows.
              </p>
            </div>
            <button
              onClick={onComplete}
              className="w-full max-w-xs mx-auto py-3 px-6 rounded-xl text-white font-medium bg-gradient-to-r from-brand-orange to-brand-orange-light shadow-lg hover:shadow-brand-orange/35 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Start Converting Now
            </button>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md p-4">
      <div 
        className={`w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 ${
          isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-100'
        }`}
      >
        {/* Onboarding Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-brand-orange" />
            <span className="text-sm font-bold tracking-tight font-display text-slate-700 dark:text-slate-200">
              MIGRATION GUIDE WIZARD
            </span>
          </div>
          <button 
            onClick={onSkip}
            className="text-xs font-semibold text-slate-400 hover:text-brand-orange dark:text-slate-500 dark:hover:text-white transition-colors cursor-pointer"
          >
            Skip Onboarding
          </button>
        </div>

        {/* Wizard Main Panel */}
        <div className="p-10 min-h-[380px] flex flex-col justify-center">
          {renderStepContent()}
        </div>

        {/* Progress & Controls Footer */}
        <div className="p-6 border-t border-slate-104 dark:border-slate-800/60 flex items-center justify-between">
          {/* Custom Steps Dot Indicator */}
          <div className="flex gap-2">
            {Array.from({ length: totalSteps }).map((_, idx) => (
              <div
                key={idx}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx + 1 === step 
                    ? 'w-8 bg-brand-orange' 
                    : idx + 1 < step 
                      ? 'w-3.5 bg-brand-blue' 
                      : 'w-2.5 bg-slate-200 dark:bg-slate-800'
                }`}
              />
            ))}
          </div>

          {/* Nav Buttons */}
          <div className="flex items-center gap-3">
            {step > 1 && (
              <button
                onClick={handleBack}
                className={`py-2 px-4 rounded-xl flex items-center gap-1.5 text-xs font-bold transition-all duration-200 border cursor-pointer ${
                  isDark 
                    ? 'border-slate-800 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white' 
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Previous
              </button>
            )}
            
            {step < totalSteps ? (
              <button
                onClick={handleNext}
                className="py-2 px-5 rounded-xl flex items-center gap-1.5 text-xs font-bold text-white bg-brand-orange hover:bg-brand-orange-light shadow-md hover:shadow-brand-orange/30 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
              >
                Next <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
