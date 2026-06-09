import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, ShieldAlert, Sparkles, LogIn } from 'lucide-react';
import InfinityLogo from './InfinityLogo';

interface LoginPageProps {
  onLoginSuccess: (email: string) => void;
  isDark: boolean;
}

export default function LoginPage({ onLoginSuccess, isDark }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic Validation
    if (!email || !email.includes('@')) {
      setError('Please enter a valid developer or QA testing email.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must compile to at least 6 characters.');
      return;
    }

    setLoading(true);
    // Simulate premium login transition
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(email);
    }, 1200);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background blobs / floating elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-orange/20 rounded-full blur-3xl -z-10 animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl -z-10 animate-float" style={{ animationDelay: '2s' }} />

      {/* Glassmorphism Panel Wrapper */}
      <div className="max-w-md w-full glass-panel rounded-3xl p-8 sm:p-10 shadow-2xl relative">
        {/* Dynamic AI sparkle */}
        <div className="absolute -top-4 -right-4 p-3 bg-brand-yellow/10 rounded-full border border-brand-yellow/30 animate-pulse">
          <Sparkles className="w-5 h-5 text-brand-yellow" />
        </div>

        {/* Branding Info */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-2">
            <InfinityLogo size={140} />
          </div>
          <h2 className="text-xl font-bold font-display tracking-tight text-slate-800 dark:text-white">
            Access Pytest Migrator
          </h2>
          <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
            Sign in to access your automated parser agents workspace
          </p>
        </div>

        {/* Error messaging */}
        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-brand-red/10 border border-brand-red/30 flex gap-2.5 items-start">
            <ShieldAlert className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
            <span className="text-xs font-medium text-brand-red leading-relaxed">{error}</span>
          </div>
        )}

        {/* Form Controls */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email input field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block">
              Email Address / QA Identity
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="developer@testing.com"
                className="block w-full pl-10 pr-4 py-2.5 bg-slate-100/60 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 rounded-xl text-sm placeholder-slate-400 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Password input field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block">
              Workspace Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="••••••••"
                className="block w-full pl-10 pr-10 py-2.5 bg-slate-100/60 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 rounded-xl text-sm placeholder-slate-400 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-400 cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me controls */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 dark:border-slate-800 text-brand-orange focus:ring-brand-orange-light bg-slate-100 dark:bg-slate-900 cursor-pointer"
              />
              <span className="text-xs font-medium text-slate-500 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-200 transition-colors">
                Remember my workspace session
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 rounded-xl text-white font-medium bg-gradient-to-r from-brand-orange to-brand-orange-light hover:from-brand-blue hover:to-brand-blue-light shadow-lg hover:shadow-brand-blue/30 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? (
              <div className="flex items-center gap-2 font-display text-sm font-semibold tracking-wide">
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Syncing credentials...
              </div>
            ) : (
              <span className="flex items-center gap-1.5 text-sm font-bold tracking-wide">
                <LogIn className="w-4 h-4" /> Enter SaaS Workspace
              </span>
            )}
          </button>
        </form>

        {/* Demo instructions snippet */}
        <div className="mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-800/40 text-center">
          <p className="text-[10px] text-slate-400 leading-normal">
            Beta mode active. Ensure you enter a mockup email (e.g. <span className="font-mono text-slate-500">qa@example.com</span>) and any 6-character password to access.
          </p>
        </div>
      </div>
    </div>
  );
}
