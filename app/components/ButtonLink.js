'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ButtonLink({ 
  href, 
  className = '', 
  backgroundColor, 
  hoverColor, 
  children 
}) {
  const [bgColor, setBgColor] = useState(backgroundColor);
  
  return (
    <Link
      href={href}
      className={`px-8 py-3 rounded-lg transition-all duration-200 text-center shadow-sm hover:shadow-md ${className}`}
      style={{ backgroundColor: bgColor }}
      onMouseOver={() => setBgColor(hoverColor)}
      onMouseOut={() => setBgColor(backgroundColor)}
    >
      {children}
    </Link>
  );
}