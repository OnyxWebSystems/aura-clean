import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { authQueries, supabase } from '../lib';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Mail, Lock, AlertCircle, User, CheckCircle2, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isResendingEmail, setIsResendingEmail] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get the return URL from location state or default to home
  const returnUrl = (location.state as any)?.from?.pathname || createPageUrl('Home');

  // Check Supabase connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Test Supabase connection
        const { error } = await supabase.auth.getSession();
        if (error && error.message.includes('Failed to fetch')) {
          console.error('Supabase connection error:', error);
          setError(
            'Unable to connect to authentication service. Please check:\n1. Your internet connection\n2. Supabase project is active\n3. Environment variables are set correctly'
          );
        }
      } catch (err) {
        console.error('Connection check failed:', err);
      }
    };
    checkConnection();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      if (isSignUp) {
        // Sign up
        await authQueries.signUpWithEmail(email, password, {
          full_name: fullName,
        });
        setSuccess(
          'Account created successfully! Please check your email to verify your account before signing in.'
        );
        // Clear form
        setEmail('');
        setPassword('');
        setFullName('');
        // Switch to sign-in mode after 3 seconds
        setTimeout(() => {
          setIsSignUp(false);
          setSuccess(null);
        }, 3000);
      } else {
        // Sign in
        await authQueries.signInWithEmail(email, password);
        // Navigate to return URL or dashboard
        navigate(returnUrl, { replace: true });
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      // Use the error message from the auth query (it already has specific messages)
      let errorMessage = err.message || (isSignUp ? 'Failed to create account. Please try again.' : 'Failed to sign in. Please check your credentials.');
      
      // Handle specific Supabase errors (additional handling if needed)
      if (err.message?.includes('User already registered')) {
        errorMessage = 'An account with this email already exists. Please sign in instead.';
      } else if (err.message?.includes('Password') && err.message?.includes('at least')) {
        errorMessage = 'Password must be at least 6 characters long.';
      } else if (err.message?.includes('Invalid email') && !err.message?.includes('password')) {
        errorMessage = 'Please enter a valid email address.';
      } else if (err.message?.includes('Network error') || err.message?.includes('Failed to fetch')) {
        errorMessage = 'Unable to connect to the server. Please check your internet connection and try again.';
      } else if (err.message === 'EMAIL_NOT_CONFIRMED') {
        errorMessage = 'EMAIL_NOT_CONFIRMED'; // Special flag for email confirmation
      }
      // For "Invalid email or password" and other messages, use the message as-is from authQueries
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {isSignUp ? (
                <User className="w-8 h-8 text-emerald-600" aria-hidden="true" />
              ) : (
                <Lock className="w-8 h-8 text-emerald-600" aria-hidden="true" />
              )}
            </div>
            <h1 className="text-3xl font-bold text-[#1a1a2e] mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-gray-600">
              {isSignUp ? 'Sign up to get started' : 'Sign in to your account to continue'}
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3"
              role="alert"
              aria-live="polite"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-emerald-800">{success}</p>
            </motion.div>
          )}

          {/* Error Message */}
          {error && error !== 'EMAIL_NOT_CONFIRMED' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
              role="alert"
              aria-live="assertive"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div className="flex-1">
                  <p className="text-sm text-red-800 font-medium mb-1">{error}</p>
                  {error.includes('Invalid email or password') && (
                    <div className="text-xs text-red-700 mt-2 space-y-1">
                      <p>• Make sure you're using the correct email address</p>
                      <p>• Check that your password is correct (case-sensitive)</p>
                      <p>• If you just signed up, make sure you've confirmed your email</p>
                      <p>• Try using "Forgot password?" to reset your password</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Email Not Confirmed Message */}
          {error === 'EMAIL_NOT_CONFIRMED' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl"
              role="alert"
              aria-live="assertive"
            >
              <div className="flex items-start gap-3 mb-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-amber-800 mb-1">Email Not Confirmed</p>
                  <p className="text-sm text-amber-700">
                    Please check your email and click the confirmation link before signing in. If you didn't receive the email, we can resend it.
                  </p>
                </div>
              </div>
              <Button
                type="button"
                onClick={async () => {
                  setIsResendingEmail(true);
                  setError(null);
                  try {
                    await authQueries.resendConfirmationEmail(email);
                    setSuccess('Confirmation email sent! Please check your inbox and click the link to confirm your email.');
                  } catch (err: any) {
                    setError(err.message || 'Failed to resend confirmation email. Please try again.');
                  } finally {
                    setIsResendingEmail(false);
                  }
                }}
                disabled={isResendingEmail || !email}
                variant="outline"
                className="w-full border-amber-300 text-amber-700 hover:bg-amber-100"
              >
                {isResendingEmail ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" aria-hidden="true" />
                    Resend Confirmation Email
                  </>
                )}
              </Button>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="fullName">
                  Full Name <span className="text-red-500" aria-label="required">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    required
                    aria-required="true"
                    className="pl-10"
                    autoComplete="name"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">
                Email Address <span className="text-red-500" aria-label="required">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  aria-required="true"
                  className="pl-10"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                Password <span className="text-red-500" aria-label="required">*</span>
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  aria-required="true"
                  className="pl-10"
                  autoComplete="current-password"
                />
              </div>
            </div>

            {!isSignUp && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-emerald-500 focus:ring-emerald-500" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <Link
                  to={createPageUrl('ForgotPassword')}
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Forgot password?
                </Link>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white h-12 text-base font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" aria-hidden="true" />
                  {isSignUp ? 'Creating account...' : 'Signing in...'}
                </>
              ) : (
                isSignUp ? 'Create Account' : 'Sign in'
              )}
            </Button>
          </form>

          {/* Toggle Sign Up/Sign In */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError(null);
                  setSuccess(null);
                  setEmail('');
                  setPassword('');
                  setFullName('');
                }}
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                {isSignUp ? 'Sign in' : 'Sign up'}
              </button>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <Link
              to={createPageUrl('Home')}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

