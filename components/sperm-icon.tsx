export function SpermIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M10 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      <path d="M10 10c-1.5-1.5-3-3-6-3" />
      <path d="M14 4c-1.5 1.5-2 3-2 6" />
      <path d="M14 8c1.5 2 2 4 2 8" />
      <path d="M6 16c1 1 2 1 4 0" />
    </svg>
  )
} 