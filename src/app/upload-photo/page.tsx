"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPhoto() {
  const [inputText, setInputText] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  const handleSubmit = async () => {
    if (!inputText && !uploadedFile) {
      setErrorMessage("Please enter text or upload a photo.");
      return;
    }

    const formData = new FormData();
    if (inputText) formData.append("prompt", inputText);
    if (uploadedFile) formData.append("image", uploadedFile);

    try {
      const response = await fetch('http://localhost:8000/comics/create-comic', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
      const data = await response.json();
      const panelImageUrls = data.panels.panelImageUrls; // Corrected line
      const queryString = new URLSearchParams({
        panelImageUrls: JSON.stringify(panelImageUrls),
      }).toString();

      // Redirect to /generated-comics with the panelImageUrls as query parameters
      router.push(`/generated-comics?${queryString}`);
    } else {
      setErrorMessage("Failed to create comic. Please try again.");
    }
  } catch (error) {
    console.error('Error creating comic:', error);
    setErrorMessage("An error occurred. Please try again.");
  }
};

  return (
    <div className="min-h-screen flex flex-col bg-[url('/background.png')] bg-bottom bg-repeat-x">
      <header className="flex items-center justify-between px-6 h-14 bg-[#1E0018]">
        <a href="#" className="text-white font-bold text-xl">
          VCOMICS
        </a>
        <a href="#" className="text-white hover:underline">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 4.99 3.65 9.12 8.4 9.88V15.8h-2.5v-2.8h2.5V10c0-2.54 1.54-3.94 3.8-3.94 1.1 0 2.05.08 2.33.12v2.71h-1.6c-1.26 0-1.5.6-1.5 1.47v1.93h2.92l-.38 2.8h-2.54V22C18.35 21.12 22 16.99 22 12c0-5.52-4.48-10-10-10z" />
          </svg>
        </a>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-adventure uppercase text-[#1E0018]">
          Tell Your Story Through Comics
        </h1>
        <div className="relative mt-8 w-full max-w-lg">
          <textarea
            className="w-full py-3 pl-12 pr-4 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E0018] shadow-lg resize-none"
            placeholder="Enter text or upload a photo..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={1}
            style={{ overflow: "hidden" }}
          />
          <button className="absolute top-1/2 left-3 transform -translate-y-1/2">
            <label htmlFor="file-upload">
              <img
                src="/upload.png"
                alt="Upload"
                className="w-7 h-7 cursor-pointer"
              />
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </button>
          <button
            onClick={handleSubmit}
            className="absolute top-1/2 right-3 transform -translate-y-1/2"
          >
            <svg
              className="w-6 h-6 text-[#1E018]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              ></path>
            </svg>
          </button>
        </div>
        {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
        <p className="mt-4 text-[#BB1215]">
          Important:{" "}
          <span className="text-[#1E0018]">You can upload only one image!</span>
        </p>
        {uploadedFile && (
          <div className="mt-4 flex items-center border border-gray-400 rounded-lg p-2 shadow-lg">
            <div className="w-12 h-12 bg-[#BB1215] flex-shrink-0"></div>
            <div className="ml-4 flex-1">
              <p className="text-[#1E0018]">{uploadedFile.name}</p>
              <p className="text-gray-500 text-sm">
                {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
            <button onClick={handleRemoveFile} className="ml-4 text-[#BB1215]">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.71a1 1 0 1 0-1.41 1.41L10.59 12l-4.89 4.88a1 1 0 0 0 1.41 1.41L12 13.41l4.88 4.88a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.88a1 1 0 0 0 0-1.41z"></path>
              </svg>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
