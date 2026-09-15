'use client'

interface PhoneMockupProps {
  videoSrc: string
  className?: string
}

export default function PhoneMockup({ videoSrc, className = '' }: PhoneMockupProps) {
  return (
    <div className={`relative h-full flex items-center justify-center ${className}`}>
      {/* Ambient glow echoing the screen behind the phone */}
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover scale-125 opacity-40 blur-2xl"
      />

      <div
        className="relative shrink-0"
        style={{
          width: 'clamp(148px, 30vw, 208px)',
          aspectRatio: '9 / 19.5',
          borderRadius: '2.4rem',
          background: 'var(--ink)',
          padding: '10px',
          boxShadow: '0 24px 40px -12px rgba(var(--shadow-c), 0.6), inset 0 0 0 2px rgba(255,255,255,0.06)',
        }}
      >
        <div
          className="relative w-full h-full overflow-hidden"
          style={{ borderRadius: '1.7rem', background: '#000' }}
        >
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Dynamic-island style notch */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-[16px]"
          style={{ width: '34%', height: 18, borderRadius: 999, background: 'var(--ink)' }}
        />

        {/* Side button */}
        <div
          className="absolute -right-[3px] top-[26%] rounded-r"
          style={{ width: 3, height: '10%', background: 'var(--ink)' }}
        />
      </div>
    </div>
  )
}
