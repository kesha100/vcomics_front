"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function UploadPhoto() {
  const [inputText, setInputText] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const sendButtonRef = useRef<HTMLButtonElement>(null);

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
    if (isLoading) return;
    if (!inputText && !uploadedFile) {
      setErrorMessage("Please enter text or upload a photo.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    // Add button click animation
    if (sendButtonRef.current) {
      sendButtonRef.current.classList.add("scale-90");
      setTimeout(() => {
        if (sendButtonRef.current) {
          sendButtonRef.current.classList.remove("scale-90");
        }
      }, 150);
    }

    const formData = new FormData();
    if (inputText) formData.append("prompt", inputText);
    if (uploadedFile) formData.append("image", uploadedFile);

    try {
      const response = await fetch("https://vcomicsbackend-production.up.railway.app/comics/create-comic", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const panelImageUrls = data.panels.panelImageUrls;
        const queryString = new URLSearchParams({
          panelImageUrls: JSON.stringify(panelImageUrls),
        }).toString();

        // Redirect to generated-comics page
        router.push(`/generated-comics?${queryString}`);
      } else {
        setErrorMessage("Failed to create comic. Please try again.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error creating comic:", error);
      setErrorMessage("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[url('/background.png')] bg-bottom bg-repeat-x">
      <header className="flex items-center justify-between px-6 h-14 bg-[#1E0018]">
        <a href="#" className="text-white font-bold text-xl">
          VCOMICS
        </a>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-adventure uppercase text-[#1E0018] mb-8">
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
            disabled={isLoading}
          />
          <button className="absolute top-1/2 left-3 transform -translate-y-1/2" disabled={isLoading}>
            <label htmlFor="file-upload">
              <Image
                src="/upload.png"
                alt="Upload"
                width={28}
                height={28}
                className="cursor-pointer"
              />
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                disabled={isLoading}
              />
            </label>
          </button>
          <button
            ref={sendButtonRef}
            onClick={handleSubmit}
            className={`absolute top-1/2 right-3 transform -translate-y-1/2 transition-transform duration-150 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            <svg
              className={`w-6 h-6 text-[#1E018] ${isLoading ? 'animate-spin' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isLoading ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                ></path>
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round" 
                  strokeWidth="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                ></path>
              )}
            </svg>
          </button>
        </div>
        {isLoading && (
          <div className="mt-4 flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#BB1215]"></div>
            <p className="mt-2 text-[#1E0018]">Creating your comic...</p>
          </div>
        )}
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
            <button onClick={handleRemoveFile} className="ml-4 text-[#BB1215]" disabled={isLoading}>
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