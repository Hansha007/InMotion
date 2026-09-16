function LandingNetwork() {
  const cities = [
    { name: "Delhi", x: 51, y: 24 },
    { name: "Jaipur", x: 43, y: 34 },
    { name: "Lucknow", x: 61, y: 32 },
    { name: "Mumbai", x: 36, y: 57 },
    { name: "Hyderabad", x: 52, y: 64 },
    { name: "Kolkata", x: 76, y: 46 },
    { name: "Bengaluru", x: 43, y: 79 },
    { name: "Chennai", x: 58, y: 82 },
  ];

  const routes = [
    [51, 24, 43, 34],
    [51, 24, 61, 32],
    [43, 34, 36, 57],
    [43, 34, 52, 64],
    [61, 32, 76, 46],
    [36, 57, 52, 64],
    [52, 64, 43, 79],
    [52, 64, 58, 82],
    [76, 46, 58, 82],
  ];

  return (
    <div className="pointer-events-none absolute right-[-4%] top-[8%] h-[760px] w-[68%] opacity-90">
      {/* Ambient glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2196F3]/[0.08] blur-[110px]" />

      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Decorative India-like network silhouette */}
        <path
          d="M51 13
             C45 17 40 23 40 30
             C36 35 34 42 31 48
             C29 55 34 62 37 68
             C39 75 40 83 46 91
             C50 86 54 85 58 81
             C63 77 67 69 69 62
             C75 57 79 49 77 43
             C73 37 67 34 63 30
             C60 24 57 18 51 13Z"
          fill="rgba(33, 150, 243, 0.035)"
          stroke="rgba(33, 150, 243, 0.18)"
          strokeWidth="0.35"
        />

        {/* Network routes */}
        {routes.map(([x1, y1, x2, y2], index) => (
          <line
            key={index}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#2196F3"
            strokeOpacity="0.28"
            strokeWidth="0.35"
          />
        ))}

        {/* Animated route highlights */}
        <line
          x1="36"
          y1="57"
          x2="52"
          y2="64"
          stroke="#2196F3"
          strokeWidth="0.55"
          strokeDasharray="2 2"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-12"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </line>

        <line
          x1="43"
          y1="79"
          x2="58"
          y2="82"
          stroke="#2196F3"
          strokeWidth="0.55"
          strokeDasharray="2 2"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-12"
            dur="2s"
            repeatCount="indefinite"
          />
        </line>

        {/* City nodes */}
        {cities.map((city) => (
          <g key={city.name}>
            <circle
              cx={city.x}
              cy={city.y}
              r="2.2"
              fill="#2196F3"
              opacity="0.12"
            />

            <circle
              cx={city.x}
              cy={city.y}
              r="0.8"
              fill="#2196F3"
            />

            <circle
              cx={city.x}
              cy={city.y}
              r="0.35"
              fill="#F5F7FA"
            />
          </g>
        ))}

        {/* Moving vehicle */}
        <circle
          cx="0"
          cy="0"
          r="0.8"
          fill="#22C55E"
          filter="url(#glow)"
        >
          <animateMotion
            dur="7s"
            repeatCount="indefinite"
            path="M43,34 L36,57 L52,64 L43,79"
          />
        </circle>

        {/* Alert point */}
        <circle
          cx="76"
          cy="46"
          r="1.1"
          fill="#EF4444"
          opacity="0.9"
        >
          <animate
            attributeName="r"
            values="0.8;2;0.8"
            dur="1.6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="1;0.35;1"
            dur="1.6s"
            repeatCount="indefinite"
          />
        </circle>

        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export default LandingNetwork;