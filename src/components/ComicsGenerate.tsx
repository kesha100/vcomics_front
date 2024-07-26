'use client'
import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Panel = {
  panelId: number;
  image: string;  // This will be a base64 string
};

export function ComicsGenerate() {
  const [inputValue, setInputValue] = useState('');
  const [panels, setPanels] = useState<Panel[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true); // Start loading
    const response = await fetch('http://localhost:8000/generate-comics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ scenario: inputValue }),
    });

    const data = await response.json();
    console.log(data);
    setLoading(false); // End loading
  };

  const fetchPanels = async () => {
    setLoading(true); // Start loading
    const response = await fetch('http://localhost:8000/get-panels');
    const data = await response.json();
    setPanels(data.panels);
    setLoading(false); // End loading
  };

  useEffect(() => {
    fetchPanels();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <div className="w-full max-w-md space-y-4">
        <div className="space-y-2 flex flex-col items-center">
          <h1 className="text-4xl font-bold whitespace-nowrap">Write the scenario of your own comics</h1>
          <div className="relative w-full">
            <Input
              id="input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type something..."
              className="w-full rounded-full bg-gray-100 text-black px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 shadow-lg"
            />
            <Button
              type="button"
              onClick={handleSubmit}
              className="absolute inset-y-0 right-0 flex items-center justify-center px-4 rounded-full bg-white text-black"
            >
              <SendIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div>
  
          {loading ? (
            <div className="flex justify-center items-center">
              <LoadingSpinner />
            </div>
          ) : (
            <ul>
              {panels.map((panel) => (
                <li key={panel.panelId}>
                  <img src={`data:image/png;base64,${panel.image}`} alt={`Panel ${panel.panelId}`} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function SendIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function LoadingSpinner() {
  return (
    <svg
      className="animate-spin h-5 w-5 text-black"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"
      ></path>
    </svg>
  );
}
