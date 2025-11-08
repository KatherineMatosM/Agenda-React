import React, { useEffect } from 'react';

export default function CherryBlossom() {
  useEffect(() => {
    const createCherryBlossom = () => {
      const blossom = document.createElement('div');
      blossom.classList.add('cherry-blossom');
      
      const startPosition = Math.random() * window.innerWidth;
      blossom.style.left = `${startPosition}px`;
      
      const size = Math.random() * 25 + 15;
      blossom.style.width = `${size}px`;
      blossom.style.height = `${size}px`;
      
      const duration = Math.random() * 15 + 10;
      blossom.style.animationDuration = `${duration}s`;
      blossom.style.animationDelay = `${Math.random() * 3}s`;
      
      const colors = ['#AE0849', '#E21C70', '#F966AB'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      blossom.style.backgroundColor = color;
      blossom.style.opacity = Math.random() * 0.6 + 0.3;
      
      document.getElementById('cherry-blossoms').appendChild(blossom);
      
      setTimeout(() => {
        if (blossom.parentNode) {
          blossom.remove();
        }
      }, duration * 1000);
    };
    
    const interval = setInterval(createCherryBlossom, 400);
    
    return () => clearInterval(interval);
  }, []);

  return <div id="cherry-blossoms" className="cherry-blossoms"></div>;
}