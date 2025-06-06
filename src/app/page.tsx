'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center py-16 px-4">
      <h1 className="text-4xl font-extrabold text-[#0058A3] mb-6 text-center">Welcome to IKEA AI Persona Evaluator</h1>
      <div className="w-16 h-1 bg-[#FFD200] mx-auto my-4 rounded-full" />
      <p className="text-lg text-gray-700 max-w-2xl text-center mb-8">
        This tool helps IKEA teams quickly generate AI personas based on your project and target group information, and simulate how these personas would answer your evaluation surveys. Streamline your user research and get instant, AI-powered insights!
      </p>
      {/* 图片占位符，用户可替换为实际图片 */}
      <div className="mb-10">
        <Image
          src="/ikea-intro.png"
          alt="IKEA AI Persona Evaluator Illustration"
          width={600}
          height={360}
          className="rounded-xl shadow-lg border border-[#E6E6E6] bg-[#F7F7F7] object-contain"
        />
      </div>
      <button
        onClick={() => router.push('/project')}
        className="inline-flex items-center px-8 py-3 border border-transparent shadow text-lg font-bold rounded-lg text-[#0058A3] bg-[#FFD200] hover:bg-[#FFB800] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0058A3] transition"
      >
        Start Your Project
      </button>
    </div>
  );
} 