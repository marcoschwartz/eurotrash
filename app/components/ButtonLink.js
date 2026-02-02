'use client';

import Link from 'next/link';
import { useState } from 'react';

/**
 * ButtonLink Component
 * A reusable button component that wraps Next.js Link with custom styling
 * and interactive hover effects.
 */
export default function ButtonLink({ 
  href,                    // The URL to navigate to
  className = '',          // Additional CSS classes for styling
  backgroundColor,         // Initial background color
  hoverColor,             // Background color on hover
  children                // Button text/content
}) {
  // State to manage the current background color
  const [bgColor, setBgColor] = useState(backgroundColor);
  
  return (
    <Link
      href={href}
      // Tailwind classes for padding, border-radius, transitions, and shadows
      className={`px-8 py-3 rounded-lg transition-all duration-200 text-center shadow-sm hover:shadow-md ${className}`}
      // Apply the dynamic background color
      style={{ backgroundColor: bgColor }}
      // Change color on mouse enter
      onMouseOver={() => setBgColor(hoverColor)}
      // Revert to original color on mouse leave
      onMouseOut={() => setBgColor(backgroundColor)}
    >
      {children}
    </Link>
  );
}