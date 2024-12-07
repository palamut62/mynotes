import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Mail, Lock } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-radial from-dark-900 to-dark-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 card">
        <div className="text-center">
          <Shield className="mx-auto h-12 w-12 text-accent-500" />
          <h2 className="mt-6 text-3xl font-mono text-gray-50">Welcome back</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-900/20 border border-red-800/50 text-red-200 px-4 py-3 rounded font-mono">
              {error}
            </div>
          )}
          <div className="rounded-md space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Mail className="h-5 w-5 text-dark-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="glass-input appearance-none rounded-lg relative block w-full pl-10 px-3 py-2"
                  placeholder="Email address"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Lock className="h-5 w-5 text-dark-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glass-input appearance-none rounded-lg relative block w-full pl-10 px-3 py-2"
                  placeholder="Password"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between font-mono">
            <div className="text-sm">
              <Link to="/forgot-password" className="text-accent-400 hover:text-accent-300">
                Forgot your password?
              </Link>
            </div>
            <div className="text-sm">
              <Link to="/register" className="text-accent-400 hover:text-accent-300">
                Create an account
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary w-full"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}