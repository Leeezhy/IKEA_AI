'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ResultsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const simulateSurvey = async () => {
      try {
        const persona = localStorage.getItem('persona');
        const questions = JSON.parse(localStorage.getItem('surveyQuestions') || '[]');

        if (!persona || !questions.length) {
          router.push('/survey');
          return;
        }

        const response = await fetch('/api/simulateSurvey', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ persona, questions }),
        });

        if (!response.ok) {
          throw new Error('Failed to simulate survey');
        }

        const data = await response.json();
        setResults(data.answers);
      } catch (err) {
        setError('Failed to simulate survey. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    simulateSurvey();
  }, [router]);

  const handleRestart = () => {
    localStorage.clear();
    router.push('/project');
  };

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-[#0058A3] tracking-tight">Survey Results</h1>
          <div className="w-16 h-1 bg-[#FFD200] mx-auto my-4 rounded-full" />
          <p className="mt-2 text-lg text-gray-700 font-medium">
            View how your persona answered the survey questions
          </p>
        </div>

        <div className="mt-8">
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-b-[#FFD200] border-[#B7D0E2] mx-auto mb-6"></div>
              <p className="mt-4 text-xl text-[#0058A3] font-semibold">Simulating survey responses...</p>
            </div>
          ) : error ? (
            <div className="bg-[#FFF3CD] border border-[#FFD200] rounded-xl p-8 text-center">
              <p className="text-[#B94A00] text-lg font-bold">{error}</p>
            </div>
          ) : (
            <div className="bg-white shadow-lg rounded-xl p-8 border border-[#E6E6E6]">
              <div className="prose max-w-none text-lg text-gray-800">
                <pre className="whitespace-pre-wrap font-sans bg-[#F7F7F7] rounded-lg p-4 text-base leading-relaxed">{results}</pre>
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleRestart}
                  className="inline-flex items-center px-8 py-3 border border-transparent shadow text-lg font-bold rounded-lg text-[#0058A3] bg-[#FFD200] hover:bg-[#FFB800] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0058A3] transition"
                >
                  Start New Project
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 