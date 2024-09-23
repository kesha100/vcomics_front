"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const FETCH_TIMEOUT = 60000; // 60 seconds

export default function UploadPhoto() {
  const [inputText, setInputText] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("english");
  const router = useRouter();
  const sendButtonRef = useRef<HTMLButtonElement>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setErrorMessage(`File size exceeds 5MB limit. Please choose a smaller file.`);
        return;
      }
      setUploadedFile(file);
      setErrorMessage("");
    }
  }, []);

  const handleRemoveFile = useCallback(() => {
    setUploadedFile(null);
    setErrorMessage("");
  }, []);

  const handleSubmit = useCallback(async () => {
    if (isLoading) return;
    if (!inputText && !uploadedFile) {
      setErrorMessage("Please enter text or upload a photo.");
      return;
    }
  
    setIsLoading(true);
    setErrorMessage("");
  
    if (sendButtonRef.current) {
      sendButtonRef.current.classList.add("scale-90");
      setTimeout(() => sendButtonRef.current?.classList.remove("scale-90"), 150);
    }
  
    const formData = new FormData();
    if (inputText) formData.append("prompt", inputText);
    if (uploadedFile) formData.append("image", uploadedFile);
    formData.append("language", language);
    
    try {
      console.log('Sending request to backend...');
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

      const response = await fetch("https://vcomics-backend-last.onrender.com/comics/create-comic", {
        method: "POST",
        body: formData,
        credentials: 'include',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      console.log('Received response from backend:', response);
  
      if (response.ok) {
        const data = await response.json();
        console.log('Parsed response data:', data);
  
        if (data && data.panels && Array.isArray(data.panels.panelImageUrls)) {
          const panelImageUrls = data.panels.panelImageUrls;
          const queryString = new URLSearchParams({
            panelImageUrls: JSON.stringify(panelImageUrls),
          }).toString();
  
          console.log('Redirecting to generated-comics page...');
          router.push(`/generated-comics?${queryString}`);
        } else {
          console.error('Unexpected response structure:', data);
          setErrorMessage("Unexpected response from server. Please try again.");
        }
      } else if (response.status === 403) {
        setErrorMessage("You've reached your free comic generation limit. Please try again later.");
      } else {
        const errorText = await response.text();
        console.error('Error response:', response.status, errorText);
        setErrorMessage(`Failed to create comic. Server responded with status ${response.status}. Please try again.`);
      }
    } catch (error) {
      console.error("Error creating comic:", error);
      if (error === 'AbortError') {
        setErrorMessage("Request timed out. Please try again.");
      } else {
        setErrorMessage(`An error occurred: ${error}. Please try again.`);
      }
    } finally {
      setIsLoading(false);
    }
  }, [inputText, uploadedFile, language, router]);

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
            placeholder="Enter your story and upload photo"
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
        </div>
        
        <div className="mt-4 w-full max-w-lg">
          <button
            ref={sendButtonRef}
            onClick={handleSubmit}
            className="w-full px-3 py-2 shadow-md text-white text-lg bg-[#BB1215] hover:bg-[#BB1215]/80 font-adventure stroke-black stroke-2 relative disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            <Image
              src="/button-background.png"
              alt=""
              className="object-cover absolute inset-0"
              fill
            />
            <span className="relative">
              {isLoading ? (
                <svg
                  className="w-6 h-6 text-white animate-spin mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  ></path>
                </svg>
              ) : (
                "Generate Comic"
              )}
            </span>
          </button>
        </div>

        <div className="mt-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="py-2 px-4 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E0018] shadow-lg"
            disabled={isLoading}
          >
            <option value="english">English</option>
            <option value="russian">Russian</option>
            <option value="kyrgyz">Kyrgyz</option>
            <option value="kazakh">Kazakh</option>
          </select>
        </div>

        {isLoading && (
          <div className="mt-4 flex flex-col items-center">
            <p className="mt-2 text-[#1E0018]">Creating your comic...</p>
          </div>
        )}
        {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
        <p className="mt-4 text-[#BB1215]">
          Important:{" "}
          <span className="text-[#1E0018]">You can upload only one image (max 5MB)!</span>
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