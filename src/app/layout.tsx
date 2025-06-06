import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import StepProgress from '@/components/StepProgress';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IKEA AI Persona Evaluator',
  description: 'Generate and evaluate AI personas for IKEA projects',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + ' bg-white'}>
        <header className="bg-[#0058A3] shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#FFD200] text-center tracking-wide drop-shadow-lg">
              IKEA AI Persona Evaluator
            </h1>
          </div>
          <StepProgress />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
} 