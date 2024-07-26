'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';

const LoadingPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkBackend = async () => {
        try {
          const response = await axios.get('/http://localhost:8000/generate-comics');
          if (response.status === 200) {
            setIsLoading(false);
            window.location.href = '/another-page';
          }
        } catch (error) {
          console.error('Backend not ready, retrying...', error);
          setTimeout(checkBackend, 3000);
        }
      };

      checkBackend();
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#1c0a1b]">
      <div className="text-4xl font-bold text-white mb-5">VCOMICS</div>
      <div className="text-center">
        <p className="text-xl text-red-600">LOADING ...</p>
        <div className="w-4/5 h-2 bg-gray-400 rounded overflow-hidden mt-4">
          <div className="w-1/3 h-full bg-red-600 animate-loading"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
