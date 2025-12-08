import Navbar from '../components/leaderboard/Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white h-screen flex flex-col overflow-hidden">
      <div className="fixed -left-[39%] top-1/2 -translate-y-1/2 -rotate-90 pointer-events-none z-0">
        <div className="relative whitespace-nowrap">
          {/* Outline layer */}
          <div
            className="text-[200px] font-black italic tracking-[-0.05em] text-transparent"
            style={
              {
                WebkitTextStroke: '2px rgba(0, 0, 0, 0.02)',
              } as React.CSSProperties
            }
          >
            SPERM RACING
          </div>
          {/* Fill layer */}
          <div className="absolute -top-[8%] -left-[3%] text-[200px] font-black italic tracking-[-0.05em] text-black/[0.02] translate-x-[3px] translate-y-[3px]">
            SPERM RACING
          </div>
        </div>
      </div>
      <div className="relative z-[1] flex flex-col h-full">
        <Navbar />

        <div className="flex-1 flex flex-col items-center md:py-6 md:px-4  bg-black/[0.01] text-black overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
