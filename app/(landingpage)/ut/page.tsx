'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Analytics, track } from '@vercel/analytics/react';

export default function UTPage() {
  const router = useRouter();

  useEffect(() => {
    // Track the redirect
    track('UTRedirect', {
      source: 'direct_url',
      destination: 'partiful.com',
    });

    // Redirect after tracking
    router.push('https://partiful.com/e/xasdiOqAFKjVADMUgqFJ');
  }, [router]);

  return (
    <>
      <Analytics />
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-white">Redirecting to UF vs UT event...</p>
      </div>
    </>
  );
}
