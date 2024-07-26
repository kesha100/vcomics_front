// components/BeforeAfter.tsx
'use client'
// components/BeforeAfter.tsx
import React, { useState, useRef, useEffect } from 'react';

interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  size: string; // size as a string, e.g. "400px"
}

const BeforeAfter: React.FC<BeforeAfterProps> = ({ beforeImage, afterImage, size }) => {
  const [dividerPosition, setDividerPosition] = useState(50); // Initial position at 50%
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const position = (offsetX / rect.width) * 100;
      setDividerPosition(position);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleMouseDown = () => {
    window.addEventListener('mousemove', handleMouseMove);
  };

  return (
    <div ref={containerRef} className="relative overflow-hidden" style={{ width: size, height: size }}>
      <img src={beforeImage} alt="Before" className="absolute top-0 left-0 w-full h-full object-cover" />
      <div
        className="absolute top-0 left-0 h-full bg-cover"
        style={{ width: `${dividerPosition}%`, backgroundImage: `url(${afterImage})` }}
      ></div>
      <div
        className="absolute top-0 left-0 w-[2px] h-full bg-white cursor-ew-resize"
        style={{ left: `${dividerPosition}%` }}
        onMouseDown={handleMouseDown}
      ></div>
    </div>
  );
};

export default BeforeAfter;

