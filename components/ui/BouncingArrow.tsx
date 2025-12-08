import React from "react";

const BouncingArrow = () => {
  return (
    <div className="hidden lg:block fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 animate-bounce pointer-events-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-white/80"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
      <span className="sr-only">Scroll down</span>
    </div>
  );
};

export default BouncingArrow;
