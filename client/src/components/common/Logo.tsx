
interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Logo({ className = '', iconOnly = false, variant = 'dark', size = 'md' }: LogoProps) {
  // Size presets
  const sizeClasses = {
    sm: { icon: 'w-6 h-6', text: 'text-lg', container: 'gap-1.5' },
    md: { icon: 'w-8 h-8', text: 'text-xl', container: 'gap-2' },
    lg: { icon: 'w-12 h-12', text: 'text-3xl', container: 'gap-3' },
    xl: { icon: 'w-16 h-16', text: 'text-4xl', container: 'gap-4' },
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={`flex items-center ${currentSize.container} ${className}`}>
      {/* Creative Dynamic Logo Icon */}
      <div className={`relative ${currentSize.icon} shrink-0 select-none group`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
        >
          <defs>
            {/* Background Gradient - Premium Indigo to Royal Blue */}
            <linearGradient id="logoBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F46E5" /> {/* Indigo 600 */}
              <stop offset="100%" stopColor="#2563EB" /> {/* Blue 600 */}
            </linearGradient>
            
            {/* Accent Gradient - Modern Saffron to Emerald */}
            <linearGradient id="indianAccent" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF9933" /> {/* Saffron */}
              <stop offset="50%" stopColor="#FFFFFF" /> {/* White */}
              <stop offset="100%" stopColor="#128807" /> {/* Emerald */}
            </linearGradient>

            {/* Glowing filter */}
            <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer Ring / Bag Silhouette */}
          <path
            d="M25 32 C25 29.8 26.8 28 29 28 H71 C73.2 28 75 29.8 75 32 V76 C75 81.5 70.5 86 65 86 H35 C29.5 86 25 81.5 25 76 Z"
            fill="url(#logoBgGrad)"
          />

          {/* Bag Handle with Indian Accent Colors */}
          <path
            d="M38 28 V20 C38 13.4 43.4 8 50 8 C56.6 8 62 13.4 62 20 V28"
            stroke="url(#indianAccent)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />

          {/* Highly stylized white Rupee (₹) + S symbol (integrating e-commerce branding) */}
          {/* Top Bar of Rupee */}
          <path
            d="M36 41 H64"
            stroke="#FFFFFF"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          {/* Middle Bar of Rupee */}
          <path
            d="M36 49 H58"
            stroke="#FFFFFF"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          {/* Main curve and leg of Rupee symbol */}
          <path
            d="M44 41 C57 41, 57 57, 44 57 L58 75"
            stroke="#FFFFFF"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#softGlow)"
          />
          
          {/* Sparkle representing "EZ" and fresh deals */}
          <path
            d="M72 38 L75 42 L79 43 L75 44 L72 48 L71 44 L67 43 L71 42 Z"
            fill="#FFD700"
            className="animate-pulse"
          />
        </svg>
      </div>

      {/* Stylized Logo Text */}
      {!iconOnly && (
        <span
          className={`font-black tracking-tight select-none ${currentSize.text}`}
        >
          <span className={variant === 'light' ? 'text-white' : 'text-gray-900'}>Shop</span>
          <span className="bg-gradient-to-r from-[#FF9933] via-[#FFB84D] to-[#128807] bg-clip-text text-transparent drop-shadow-sm font-black">
            EZ
          </span>
        </span>
      )}
    </div>
  );
}
