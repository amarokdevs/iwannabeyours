"use client";

import React from 'react';

const AnimatedBackground = () => {
  const numParticles = 50;
  const particles = Array.from({ length: numParticles }).map((_, i) => {
    const size = `${Math.random() * 3 + 1}px`;
    const duration = `${Math.random() * 20 + 10}s`;
    const delay = `${Math.random() * -30}s`;
    const xPos = `${Math.random() * 100}%`;
    
    return (
      <div
        key={i}
        className="particle"
        style={{
          '--size': size,
          '--duration': duration,
          '--delay': delay,
          '--x-pos': xPos,
        } as React.CSSProperties}
      />
    );
  });

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      {particles}
    </div>
  );
};

export { AnimatedBackground };
