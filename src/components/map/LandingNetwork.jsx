import DelayedShipmentCard from "../../pages/landing/DelayedShipmentCard";

function LandingNetwork() {
  return (
    <div className="absolute inset-0 h-full w-full pointer-events-none select-none">
      {/* SVG Network Canvas locked 1:1 to earth-orbit.jpg (1376 x 768) */}
      <svg
        viewBox="0 0 1376 768"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full overflow-visible pointer-events-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Cyan route glow filter */}
          <filter id="cyan-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Intense neon beacon glow */}
          <filter id="beacon-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur1" />
            <feGaussianBlur stdDeviation="1.8" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Amber / alert glow */}
          <filter id="alert-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Route gradients */}
          <linearGradient id="routeCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#2196F3" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#00B0FF" stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id="routeGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#F97316" stopOpacity="0.75" />
          </linearGradient>

          {/* Delivery Van Icon */}
          <g id="delivery-van">
            <rect x="-11" y="-6" width="22" height="12" rx="3" fill="#07101E" stroke="#38BDF8" strokeWidth="1.2" />
            <path d="M3 -4H7L9 -1V4H3V-4Z" fill="#38BDF8" opacity="0.35" />
            <circle cx="-5" cy="6" r="1.8" fill="#FFFFFF" />
            <circle cx="5" cy="6" r="1.8" fill="#FFFFFF" />
          </g>

          {/* Cargo Truck Icon (Front faces +X direction) */}
          <g id="cargo-truck">
            <rect x="-14" y="-7" width="28" height="14" rx="3" fill="#060E1A" stroke="#38BDF8" strokeWidth="1.4" filter="drop-shadow(0 0 6px rgba(56,189,248,0.7))" />
            <rect x="-11" y="-5" width="13" height="10" rx="1.5" fill="#2196F3" opacity="0.3" />
            <path d="M4 -5H9L12 -1V5H4V-5Z" fill="#38BDF8" />
            <circle cx="-6" cy="7" r="2" fill="#FFFFFF" />
            <circle cx="7" cy="7" r="2" fill="#FFFFFF" />
            {/* Delay alert beacon on truck during delay */}
            <circle cx="-1" cy="-7" r="2" fill="#EF4444" className="animate-ping" />
          </g>
        </defs>

        {/* -------------------- 1. SUBTLE ARTERIAL BACKBONE -------------------- */}
        {/* Restrained secondary connection corridors via central junction (Nagpur 530, 450) */}
        <g stroke="#1E3A5F" strokeWidth="1.2" strokeOpacity="0.3" strokeDasharray="3 4">
          <path d="M 440 500 L 530 450 L 650 418" />
          <path d="M 502 290 L 530 450 L 506 562" />
          <path d="M 502 290 L 460 360 L 440 500" />
        </g>
        {/* Secondary central hub */}
        <circle cx="530" cy="450" r="3" fill="#2196F3" opacity="0.5" />

        {/* -------------------- 2. PRIMARY LOGISTICS CORRIDORS -------------------- */}
        
        {/* Route 1: Delhi -> Mumbai (Primary highlighted route, SHP-7842) */}
        {/* Natural transit corridor through Rajasthan and Gujarat into Mumbai */}
        <path
          id="route-delhi-mumbai"
          d="M 502 290 C 478 360, 456 435, 440 500"
          stroke="url(#routeCyanGrad)"
          strokeWidth="2.4"
          filter="url(#cyan-glow)"
          fill="none"
        />
        {/* Animated dashes along Delhi -> Mumbai */}
        <path
          d="M 502 290 C 478 360, 456 435, 440 500"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeDasharray="7 24"
          fill="none"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-62"
            dur="2.8s"
            repeatCount="indefinite"
          />
        </path>

        {/* Route 2: Delhi -> Kolkata (Indo-Gangetic logistics arc) */}
        <path
          id="route-delhi-kolkata"
          d="M 502 290 C 545 330, 595 372, 650 418"
          stroke="url(#routeGoldGrad)"
          strokeWidth="2.2"
          filter="url(#cyan-glow)"
          fill="none"
        />
        <path
          d="M 502 290 C 545 330, 595 372, 650 418"
          stroke="#38BDF8"
          strokeWidth="1.6"
          strokeDasharray="6 20"
          fill="none"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-52"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </path>

        {/* Route 3: Mumbai -> Bengaluru (Western Deccan corridor) */}
        <path
          id="route-mumbai-bengaluru"
          d="M 440 500 C 458 522, 480 545, 506 562"
          stroke="url(#routeCyanGrad)"
          strokeWidth="2.2"
          filter="url(#cyan-glow)"
          fill="none"
        />
        <path
          d="M 440 500 C 458 522, 480 545, 506 562"
          stroke="#FFFFFF"
          strokeWidth="1.6"
          strokeDasharray="7 22"
          fill="none"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-58"
            dur="2.2s"
            repeatCount="indefinite"
          />
        </path>

        {/* Route 4: Bengaluru -> Kolkata (Eastern coast/plateau corridor) */}
        <path
          id="route-bengaluru-kolkata"
          d="M 506 562 C 560 518, 612 465, 650 418"
          stroke="url(#routeGoldGrad)"
          strokeWidth="2"
          filter="url(#cyan-glow)"
          fill="none"
        />
        <path
          d="M 506 562 C 560 518, 612 465, 650 418"
          stroke="#38BDF8"
          strokeWidth="1.5"
          strokeDasharray="5 18"
          fill="none"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-46"
            dur="2.6s"
            repeatCount="indefinite"
          />
        </path>

        {/* -------------------- 3. IN-TRANSIT SHIPMENTS -------------------- */}

        {/* Primary Highlighted Shipment: SHP-7842 along Delhi -> Mumbai */}
        {/* Travels along curve, pauses at delay point (55% along curve, (466, 408)), rotates automatically */}
        <g>
          <use href="#cargo-truck">
            <animateMotion
              dur="8.5s"
              repeatCount="indefinite"
              rotate="auto"
              keyPoints="0; 0.55; 0.55; 0.55; 1"
              keyTimes="0; 0.44; 0.68; 0.76; 1"
              calcMode="linear"
            >
              <mpath href="#route-delhi-mumbai" />
            </animateMotion>
          </use>
        </g>

        {/* Secondary Shipment along Mumbai -> Bengaluru */}
        <g>
          <use href="#delivery-van">
            <animateMotion
              dur="6.5s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath href="#route-mumbai-bengaluru" />
            </animateMotion>
          </use>
        </g>

        {/* Secondary Shipment along Bengaluru -> Kolkata */}
        <g>
          <use href="#delivery-van">
            <animateMotion
              dur="7.8s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath href="#route-bengaluru-kolkata" />
            </animateMotion>
          </use>
        </g>

        {/* -------------------- 4. DELAY INCIDENT & ALERT CARD CONNECTOR -------------------- */}
        {/* Incident is located precisely at (466, 408) on the Delhi -> Mumbai route */}
        <g>
          {/* Pulsing warning radar ring */}
          <circle cx="466" cy="408" r="14" stroke="#EF4444" strokeWidth="1.5" opacity="0.4">
            <animate attributeName="r" values="6;22;6" dur="2.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.85;0;0.85" dur="2.2s" repeatCount="indefinite" />
          </circle>
          {/* Incident point beacon */}
          <circle cx="466" cy="408" r="4.5" fill="#EF4444" filter="url(#alert-glow)" />
          <circle cx="466" cy="408" r="1.8" fill="#FFFFFF" />

          {/* Dotted warning connector leading to the alert card anchor (310, 330) */}
          <path
            d="M 466 408 L 385 330 L 310 330"
            stroke="#EF4444"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            fill="none"
            filter="url(#alert-glow)"
          />
          <circle cx="310" cy="330" r="3" fill="#EF4444" />
        </g>

        {/* -------------------- 5. MAJOR CITY HUBS -------------------- */}

        {/* 1. DELHI (502, 290) - Northern India Capital */}
        <g className="transition-all duration-300">
          {/* Pulsing outer halo */}
          <circle cx="502" cy="290" r="16" stroke="#00E5FF" strokeWidth="1.2" opacity="0.35">
            <animate attributeName="r" values="8;22;8" dur="2.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.75;0;0.75" dur="2.8s" repeatCount="indefinite" />
          </circle>
          {/* Beacon Core */}
          <circle cx="502" cy="290" r="6" fill="#00E5FF" filter="url(#beacon-glow)" />
          <circle cx="502" cy="290" r="2.5" fill="#FFFFFF" />
          {/* City Label Badge (above node) */}
          <g transform="translate(502, 260)">
            <rect x="-30" y="-11" width="60" height="22" rx="5" fill="#050F1D" fillOpacity="0.92" stroke="#1F3D61" strokeWidth="1" />
            <circle cx="-18" cy="0" r="2.2" fill="#22C55E" />
            <text x="-10" y="3.5" fill="#FFFFFF" fontSize="10" fontWeight="600" letterSpacing="0.05em">
              Delhi
            </text>
          </g>
        </g>

        {/* 2. MUMBAI (440, 500) - West Coast Financial Center */}
        <g className="transition-all duration-300">
          <circle cx="440" cy="500" r="16" stroke="#00E5FF" strokeWidth="1.2" opacity="0.35">
            <animate attributeName="r" values="8;22;8" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.75;0;0.75" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="440" cy="500" r="6" fill="#00E5FF" filter="url(#beacon-glow)" />
          <circle cx="440" cy="500" r="2.5" fill="#FFFFFF" />
          {/* City Label Badge (below node) */}
          <g transform="translate(440, 532)">
            <rect x="-34" y="-11" width="68" height="22" rx="5" fill="#050F1D" fillOpacity="0.92" stroke="#1F3D61" strokeWidth="1" />
            <circle cx="-21" cy="0" r="2.2" fill="#22C55E" />
            <text x="-13" y="3.5" fill="#FFFFFF" fontSize="10" fontWeight="600" letterSpacing="0.05em">
              Mumbai
            </text>
          </g>
        </g>

        {/* 3. KOLKATA (650, 418) - Eastern India Port / Hub */}
        <g className="transition-all duration-300">
          <circle cx="650" cy="418" r="16" stroke="#00E5FF" strokeWidth="1.2" opacity="0.35">
            <animate attributeName="r" values="8;22;8" dur="3.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.75;0;0.75" dur="3.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="650" cy="418" r="6" fill="#00E5FF" filter="url(#beacon-glow)" />
          <circle cx="650" cy="418" r="2.5" fill="#FFFFFF" />
          {/* City Label Badge (above node) */}
          <g transform="translate(650, 388)">
            <rect x="-34" y="-11" width="68" height="22" rx="5" fill="#050F1D" fillOpacity="0.92" stroke="#1F3D61" strokeWidth="1" />
            <circle cx="-21" cy="0" r="2.2" fill="#22C55E" />
            <text x="-13" y="3.5" fill="#FFFFFF" fontSize="10" fontWeight="600" letterSpacing="0.05em">
              Kolkata
            </text>
          </g>
        </g>

        {/* 4. BENGALURU (506, 562) - Southern India Tech / Logistics Hub */}
        <g className="transition-all duration-300">
          <circle cx="506" cy="562" r="16" stroke="#00E5FF" strokeWidth="1.2" opacity="0.35">
            <animate attributeName="r" values="8;22;8" dur="2.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.75;0;0.75" dur="2.6s" repeatCount="indefinite" />
          </circle>
          <circle cx="506" cy="562" r="6" fill="#00E5FF" filter="url(#beacon-glow)" />
          <circle cx="506" cy="562" r="2.5" fill="#FFFFFF" />
          {/* City Label Badge (below node) */}
          <g transform="translate(506, 594)">
            <rect x="-42" y="-11" width="84" height="22" rx="5" fill="#050F1D" fillOpacity="0.92" stroke="#1F3D61" strokeWidth="1" />
            <circle cx="-29" cy="0" r="2.2" fill="#22C55E" />
            <text x="-21" y="3.5" fill="#FFFFFF" fontSize="10" fontWeight="600" letterSpacing="0.05em">
              Bengaluru
            </text>
          </g>
        </g>

        {/* -------------------- 6. DELAYED SHIPMENT CARD OVERLAY -------------------- */}
        {/* Anchored precisely at (90, 280) so its right edge attaches to connector at (310, 330) */}
        <foreignObject
          x="90"
          y="280"
          width="220"
          height="105"
          className="overflow-visible pointer-events-auto"
        >
          <DelayedShipmentCard />
        </foreignObject>
      </svg>
    </div>
  );
}

export default LandingNetwork;