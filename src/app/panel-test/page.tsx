'use client'

import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';

const ComicGenerator: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [remainingTries, setRemainingTries] = useState<number>(3);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the initial remaining tries when the component mounts
    fetchRemainingTries();
  }, []);

  const fetchRemainingTries = async () => {
    try {
      const response = await axios.get<{ remainingTries: number }>('http://localhost:3000/panel/remaining-tries');
      setRemainingTries(response.data.remainingTries);
    } catch (err) {
      console.error('Error fetching remaining tries:', err);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (remainingTries <= 0) {
      setError('You have reached the maximum number of comic generations.');
      return;
    }

    try {
      const response = await axios.post<{ remainingTries: number, outputImagePath: string }>('http://localhost:3000/panel/panel/add-text', {
        imageUrl,
        outputImagePath: 'output.pn/', // Adjust as needed
        text: text.split('\n'), // Split text into array by new lines
      });

      setResult(response.data.outputImagePath);
      setRemainingTries(response.data.remainingTries);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 403) {
        setError('You have reached the maximum number of comic generations.');
        setRemainingTries(0);
      } else {
        setError('An error occurred while generating the comic.');
      }
      console.error('Error:', err);
    }
  };

  return (
    <div className="comic-generator">
      <h1>Comic Generator</h1>
      <p>Remaining tries: {remainingTries}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="text">Text (one line per speech bubble):</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={remainingTries <= 0}>Generate Comic</button>
      </form>
      {error && <p className="error">{error}</p>}
      {result && (
        <div className="result">
          <h2>Generated Comic:</h2>
          <img src={result} alt="Generated Comic" />
        </div>
      )}
    </div>
  );
}

export default ComicGenerator;
