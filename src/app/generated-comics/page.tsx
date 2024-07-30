import { Suspense } from 'react';
import GeneratedComicsClient from './GeneratedComicsClient';

export default function GeneratedComicsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[url('/background.png')] bg-bottom bg-repeat-x">
      <header className="flex items-center justify-between px-6 h-14 bg-[#1E0018]">
        <a href="/" className="text-white font-bold text-xl">
          VCOMICS
        </a>
        <a href="#" className="text-white hover:underline">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 4.99 3.65 9.12 8.4 9.88V15.8h-2.5v-2.8h2.5V10c0-2.54 1.54-3.94 3.8-3.94 1.1 0 2.05.08 2.33.12v2.71h-1.6c-1.26 0-1.5.6-1.5 1.47v1.93h2.92l-.38 2.8h-2.54V22C18.35 21.12 22 16.99 22 12c0-5.52-4.48-10-10-10z" />
          </svg>
        </a>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-adventure uppercase text-[#1E0018] mb-8">
          Your Generated Comics
        </h1>
        <Suspense fallback={<div>Loading comic panels...</div>}>
          <GeneratedComicsClient />
        </Suspense>
      </main>
    </div>
  );
}