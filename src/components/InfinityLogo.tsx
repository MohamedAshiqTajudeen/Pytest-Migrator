import React from 'react';

interface InfinityLogoProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

export default function InfinityLogo({ className = '', size = 320, animated = true }: InfinityLogoProps) {
  // We'll construct a highly precise, stunning SVG replica of the infinity logo.
  // Using paths to create the infinity loop and overlays for custom branding representation.
  return (
    <div className={`relative inline-block ${className}`} style={{ width: size, height: size * 0.625 }}>
      {/* Background radial soft aura when animated is active */}
      {animated && (
        <div className="absolute inset-0 bg-radial from-brand-orange/5 via-brand-blue/5 to-transparent blur-2xl animate-pulse-ring -z-10" />
      )}
      
      <svg
        viewBox="0 0 800 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="leftLoopGrad" x1="100" y1="250" x2="400" y2="250" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF6B00" />
            <stop offset="100%" stopColor="#FF8A00" />
          </linearGradient>
          
          <linearGradient id="rightLoopBlueGrad" x1="400" y1="250" x2="600" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0A66C2" />
            <stop offset="100%" stopColor="#1976D2" />
          </linearGradient>

          <linearGradient id="rightLoopRedGrad" x1="400" y1="250" x2="650" y2="400" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF8A00" />
            <stop offset="60%" stopColor="#FF3D3D" />
          </linearGradient>

          {/* Glow Filters */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ==================== LEFT LOOP (POSTMAN / ORANGE) ==================== */}
        {/* We carve the left loop of the infinity sign using a custom path */}
        <path
          d="M 400,250 C 310,135 210,135 150,135 C 70,135 30,190 30,250 C 30,310 70,365 150,365 C 230,365 310,250 400,250 Z"
          stroke="url(#leftLoopGrad)"
          strokeWidth="38"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={animated ? 'transition-all duration-700 hover:opacity-90' : ''}
        />

        {/* ==================== RIGHT LOOP (PYTEST / MULTICOLOR SPECTRUM) ==================== */}
        {/* Segment 1: Blue upper path */}
        <path
          d="M 400,250 C 490,135 590,135 650,135 C 710,135 750,175 765,220"
          stroke="url(#rightLoopBlueGrad)"
          strokeWidth="38"
          strokeLinecap="round"
          className={animated ? 'transition-all duration-700' : ''}
        />
        
        {/* Segment 2: Yellow / Orange side arc */}
        <path
          d="M 765,220 C 775,250 775,275 755,305"
          stroke="#FFD600"
          strokeWidth="38"
          strokeLinecap="round"
        />

        <path
          d="M 755,305 C 735,335 710,355 650,365"
          stroke="#FF8A00"
          strokeWidth="38"
          strokeLinecap="round"
        />

        {/* Segment 3: Red bottom path */}
        <path
          d="M 650,365 C 570,365 490,250 400,250"
          stroke="#FF3D3D"
          strokeWidth="38"
          strokeLinecap="round"
        />

        {/* ==================== ARROWS & DECORATIONS ==================== */}
        {/* Direction Indicator 1 on Left Loop bottom path */}
        <path
          d="M 235,312 L 255,322 L 235,332"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Direction Indicator 2 on Right Loop top path */}
        <path
          d="M 550,188 L 570,178 L 550,168"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* ==================== LEFT INNER CONTENT (Postman JSON file) ==================== */}
        {/* Document Border */}
        <g transform="translate(140, 160)">
          <rect
            x="0"
            y="0"
            width="100"
            height="130"
            rx="12"
            fill="#FFFFFF"
            stroke="#FF6B00"
            strokeWidth="8"
            className={animated ? 'animate-float' : ''}
          />
          {/* Page corner fold */}
          <path d="M 72,0 L 100,28 L 72,28 Z" fill="#FF8A00" />
          {/* Curly brackets representing JSON */}
          <text
            x="50"
            y="85"
            fontFamily="Space Grotesk, sans-serif"
            fontSize="52"
            fontWeight="bold"
            fill="#FF6B00"
            textAnchor="middle"
          >
            {"{}"}
          </text>
          {/* Pocket emblem / Postman rocket stamp */}
          <circle cx="85" cy="110" r="22" fill="#FF6B00" />
          {/* Minimalist rocket illustration inside circle */}
          <path
            d="M 85,96 L 91,106 L 88,114 L 85,110 L 82,114 L 79,106 Z"
            fill="#FFFFFF"
            stroke="#FFFFFF"
            strokeWidth="1"
          />
          <circle cx="85" cy="103" r="2" fill="#FF6B00" />
        </g>

        {/* ==================== RIGHT INNER CONTENT (Pytest code viewer + Results) ==================== */}
        {/* Code Editor Window */}
        <g transform="translate(510, 175)">
          {/* Window Container */}
          <rect
            x="0"
            y="0"
            width="130"
            height="110"
            rx="10"
            fill="#0F172A"
            stroke="#1976D2"
            strokeWidth="6"
          />
          {/* Three traffic lights */}
          <circle cx="15" cy="15" r="4.5" fill="#EF4444" />
          <circle cx="28" cy="15" r="4.5" fill="#FBBF24" />
          <circle cx="41" cy="15" r="4.5" fill="#34D399" />
          
          {/* Terminal Markup "< />" */}
          <text
            x="65"
            y="65"
            fontFamily="JetBrains Mono, monospace"
            fontSize="32"
            fontWeight="bold"
            fill="#0A66C2"
            textAnchor="middle"
          >
            {"</>"}
          </text>
          
          {/* Colored test bars on screen */}
          <rect x="15" y="90" width="40" height="6" rx="3" fill="#0A66C2" />
          <rect x="60" y="90" width="55" height="6" rx="3" fill="#34D399" />
          
          {/* Bar Chart Indicator overlay symbolizing Pytest results */}
          <g transform="translate(100, 50)">
            {/* Lego / stack style column bars */}
            <rect x="0" y="25" width="8" height="25" rx="2" fill="#14B8A6" />
            <rect x="12" y="10" width="8" height="40" rx="2" fill="#FFD600" />
            <rect x="24" y="0" width="8" height="50" rx="2" fill="#FF3D3D" />
          </g>
        </g>

        {/* ==================== CENTRAL INTELLIGENCE NODE (AI Brain) ==================== */}
        {/* Outer dotted orbit border */}
        <circle
          cx="400"
          cy="250"
          r="75"
          fill="none"
          stroke="#94A3B8"
          strokeWidth="4"
          strokeDasharray="8, 6"
          className={animated ? 'animate-pulse-ring' : ''}
        />

        {/* White circle backing brain */}
        <circle
          cx="400"
          cy="250"
          r="62"
          fill="#FFFFFF"
          stroke="#E2E8F0"
          strokeWidth="6"
          className={animated ? 'animate-brain-ripple' : ''}
          style={{ transformOrigin: '400px 250px' }}
        />

        {/* Brain SVG path artwork */}
        <g transform="translate(365, 215)">
          {/* Left Brain Hemisphere (Circuits / Logical Blue) */}
          <path
            d="M 35,12 C 28,12 21,17 18,22 C 12,25 8,32 8,38 C 8,43 11,48 15,50 C 12,54 11,58 13,62 C 16,68 22,70 28,70 C 31,70 33,68 35,66"
            stroke="#0A66C2"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Circuit connection nodes */}
          <circle cx="18" cy="22" r="3.5" fill="#0A66C2" />
          <circle cx="8" cy="38" r="3.5" fill="#0A66C2" />
          <circle cx="13" cy="62" r="3.5" fill="#0A66C2" />
          
          <path d="M 18,22 L 26,30 L 26,45 L 35,45" stroke="#38BDF8" strokeWidth="2.5" />
          <path d="M 8,38 L 22,38" stroke="#38BDF8" strokeWidth="2.5" />
          <path d="M 13,62 L 25,52 L 35,52" stroke="#38BDF8" strokeWidth="2.5" />

          {/* Right Brain Hemisphere (Creative / Active Orange) */}
          <path
            d="M 35,12 C 42,12 49,17 52,22 C 58,25 62,32 62,38 C 62,43 59,48 55,50 C 58,54 59,58 57,62 C 54,68 48,70 42,70 C 39,70 37,68 35,66"
            stroke="#FF6B00"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Orange Hemisphere nodes and micro circuits */}
          <circle cx="52" cy="22" r="3.5" fill="#FF6B00" />
          <circle cx="62" cy="38" r="3.5" fill="#FF6B00" />
          <circle cx="57" cy="62" r="3.5" fill="#FF6B00" />

          <path d="M 52,22 L 44,30 L 44,45 L 35,45" stroke="#FDBA74" strokeWidth="2.5" />
          <path d="M 62,38 L 48,38" stroke="#FDBA74" strokeWidth="2.5" />
          <path d="M 57,62 L 45,52 L 35,52" stroke="#FDBA74" strokeWidth="2.5" />

          {/* Core Central Synapse Node */}
          <line x1="35" y1="12" x2="35" y2="66" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
          <circle cx="35" cy="32" r="5.5" fill="#0A66C2" />
          <circle cx="35" cy="48" r="5.5" fill="#FF6B00" />
        </g>

        {/* Glowing AI Sparkly Stars above the Brain */}
        <g transform="translate(425, 185)" className={animated ? 'animate-bounce' : ''}>
          <path d="M 0,10 L 3,3 L 10,0 L 3,-3 L 0,-10 L -3,-3 L -10,0 L -3,3 Z" fill="#FFD600" />
        </g>
        <g transform="translate(440, 205)" className={animated ? 'animate-bounce' : ''} style={{ animationDelay: '0.5s' }}>
          <path d="M 0,6 L 2,2 L 6,0 L 2,-2 L 0,-6 L -2,-2 L -6,0 L -2,2 Z" fill="#FFD600" />
        </g>
      </svg>
    </div>
  );
}
