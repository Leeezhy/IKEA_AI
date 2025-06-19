'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PersonaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [persona, setPersona] = useState('');
  const [error, setError] = useState('');

  const generatePersona = async () => {
    try {
      const projectInfo = JSON.parse(localStorage.getItem('projectInfo') || '{}');
      const targetGroup = JSON.parse(localStorage.getItem('targetGroup') || '{}');
      const personaCount = Number(localStorage.getItem('personaCount')) || 1;

      if (!projectInfo.name || !targetGroup.demographics.age) {
        router.push('/project');
        return;
      }

      const response = await fetch('/api/generatePersona', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectInfo, targetGroup, personaCount }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate persona');
      }

      const data = await response.json();
      setPersona(data.persona);
    } catch (err) {
      setError('Failed to generate persona. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generatePersona();
  }, [router]);

  const handleRegenerate = () => {
    setLoading(true);
    setError('');
    generatePersona();
  };

  const handleContinue = () => {
    localStorage.setItem('persona', persona);
    router.push('/survey');
  };

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-[#0058A3] tracking-tight">Generated Persona</h1>
          <div className="w-16 h-1 bg-[#FFD200] mx-auto my-4 rounded-full" />
          <p className="mt-2 text-lg text-gray-700 font-medium">
            Review the generated persona and continue to create your survey
          </p>
        </div>

        <div className="mt-8">
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-b-[#FFD200] border-[#B7D0E2] mx-auto mb-6"></div>
              <p className="mt-4 text-xl text-[#0058A3] font-semibold">Generating persona...</p>
            </div>
          ) : error ? (
            <div className="bg-[#FFF3CD] border border-[#FFD200] rounded-xl p-8 text-center">
              <p className="text-[#B94A00] text-lg font-bold">{error}</p>
              <button
                onClick={handleRegenerate}
                className="mt-6 inline-flex items-center px-8 py-3 border border-transparent text-lg font-bold rounded-lg text-[#0058A3] bg-[#FFD200] hover:bg-[#FFB800] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0058A3] transition"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="bg-white shadow-lg rounded-xl p-8 border border-[#E6E6E6]">
              <div className="prose max-w-none text-lg text-gray-800">
                <pre className="whitespace-pre-wrap font-sans bg-[#F7F7F7] rounded-lg p-4 text-base leading-relaxed">{persona}</pre>
              </div>
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  onClick={handleRegenerate}
                  className="inline-flex items-center px-8 py-3 border border-[#0058A3] shadow text-lg font-bold rounded-lg text-[#0058A3] bg-white hover:bg-[#F0F6FA] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0058A3] transition"
                >
                  Regenerate
                </button>
                <button
                  onClick={handleContinue}
                  className="inline-flex items-center px-8 py-3 border border-transparent shadow text-lg font-bold rounded-lg text-[#0058A3] bg-[#FFD200] hover:bg-[#FFB800] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0058A3] transition"
                >
                  Continue to Survey
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 