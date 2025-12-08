'use client';

import { useState } from 'react';
import localFont from 'next/font/local';
import { League_Gothic } from 'next/font/google';
import supabase from '@/lib/supabaseClient';

// Load Fonts
const monoFont = localFont({
  src: [
    {
      path: '../../public/fonts/JetBrainsMono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/JetBrainsMono-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-mono',
});

const leagueGothic = League_Gothic({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-league-gothic',
});

interface WaitlistSignupFormProps {
  className?: string;
  monoFontClass?: string;
  labelText?: string;
  variant?: 'default' | 'glass';
}

export default function WaitlistSignupForm({
  className = '',
  monoFontClass = '',
  labelText,
  variant = 'default',
}: WaitlistSignupFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error' | 'duplicate'
  >('idle');
  const [error, setError] = useState('');

  const fontFamily = monoFont.style.fontFamily;
  const titleFont = leagueGothic.style.fontFamily;

  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 15;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }

    if (!validatePhone(phone)) {
      setError('Please enter a valid phone number.');
      return;
    }

    setStatus('loading');

    try {
      const cleanPhone = phone.replace(/\D/g, '').trim();
      const cleanName = name.trim();

      // Check if phone already exists
      const { data: existing, error: selectError } = await supabase
        .from('waitlist')
        .select('id')
        .eq('email', cleanPhone)
        .maybeSingle();

      if (selectError) {
        throw selectError;
      }

      if (existing) {
        setStatus('duplicate');
        return;
      }

      // Insert user
      const { error: insertError } = await supabase
        .from('waitlist')
        .insert([
          {
            email: cleanPhone,
            name: cleanName,
            created_at: new Date().toISOString(),
          },
        ]);

      if (insertError) {
        if (insertError.code === '23505') {
          setStatus('duplicate');
        } else {
          throw insertError;
        }
        return;
      }

      setStatus('success');
      setPhone('');
      setName('');
    } catch (error: any) {
      console.error('Waitlist error:', error);
      setStatus('error');
      setError(error.message || 'Failed to join waitlist. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className={`text-center space-y-8 ${className}`}>
        <div className="mx-auto">
          <div className="mx-auto w-20 h-20 md:w-24 md:h-24 bg-red-500/20 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 md:w-12 md:h-12 text-red-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
            </svg>
          </div>
        </div>
        <div className="space-y-4">
          <h1 
            className="text-center text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide text-white"
            style={{ fontFamily: titleFont, letterSpacing: '0.02em' }}
          >
            Welcome to the Race!
          </h1>
          <p 
            className="mx-auto max-w-[28rem] text-center text-sm md:text-sm text-white/70 uppercase tracking-wider leading-relaxed px-2"
            style={{ fontFamily, letterSpacing: '0.08em' }}
          >
            You're all set for early access. We'll notify you when it's time to compete.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full flex flex-col ${className}`}>
      {/* Coming Soon Badge - Top Left */}
      <div className="absolute top-0 left-0">
        <div 
          className="bg-[#A1483D] text-white px-3 py-1.5 rounded uppercase text-xs font-bold tracking-wider"
          style={{ fontFamily }}
        >
          COMING SOON!
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-8 pt-12">
        {/* Main Title - Stacked */}
        <div className="flex flex-col">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-white leading-[0.9] tracking-tight"
            style={{ fontFamily: titleFont }}
          >
            GET NOTIFIED<br />
            ON NEXT RACE<br />
            
          </h1>
        </div>

        {/* Description */}
        <div>
          <p
            className="text-sm md:text-base uppercase text-white/90 leading-relaxed tracking-wider"
            style={{ fontFamily }}
          >
            BE THE FIRST TO KNOW WHEN THE NEXT RACE IS HAPPENING.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="NAME"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={status === 'loading'}
            className="w-full bg-[#0A0A0A] border border-white/20 text-white placeholder:text-gray-400 placeholder:uppercase px-4 py-3 text-base md:text-sm uppercase tracking-wider focus:outline-none focus:border-white/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily }}
          />

          <input
            type="tel"
            placeholder="PHONE NUMBER"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            disabled={status === 'loading'}
            className="w-full bg-[#0A0A0A] border border-white/20 text-white placeholder:text-gray-400 placeholder:uppercase px-4 py-3 text-base md:text-sm uppercase tracking-wider focus:outline-none focus:border-white/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily }}
          />

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-white text-black hover:bg-white/90 font-bold uppercase tracking-wider px-6 py-4 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily }}
          >
            {status === 'loading' ? 'LOADING...' : 'JOIN WAITLIST'}
          </button>
        </form>

        {/* Status Messages */}
        {error && (
          <div className="mt-2">
            <p className="text-red-400 text-sm uppercase text-center" style={{ fontFamily }}>
              {error}
            </p>
          </div>
        )}

        {status === 'duplicate' && (
          <div className="mt-2">
            <p className="text-yellow-400 text-sm uppercase text-center" style={{ fontFamily }}>
              You're already on the waitlist!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}