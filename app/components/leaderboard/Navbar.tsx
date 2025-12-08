'use client';
import {
  ArrowRightEndOnRectangleIcon,
  BoltIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const navContainerRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { href: '/leaderboard', label: 'LEADERBOARD' },
    { href: '/profile', label: 'PROFILE' },
  ];

  const updateUnderline = (href: string) => {
    const linkIndex = navItems.findIndex((item) => item.href === href);
    const linkElement = navLinksRef.current[linkIndex];
    const containerElement = navContainerRef.current;

    if (linkElement && containerElement) {
      const containerRect = containerElement.getBoundingClientRect();
      const linkRect = linkElement.getBoundingClientRect();

      setUnderlineStyle({
        left: linkRect.left - containerRect.left,
        width: linkRect.width,
      });
    }
  };

  useEffect(() => {
    // Initialize underline position for active tab
    const activeItem = navItems.find((item) => pathname === item.href);
    if (activeItem) {
      // Small delay to ensure DOM is ready
      setTimeout(() => updateUnderline(activeItem.href), 0);
    }
  }, [pathname]);

  const handleMouseEnter = (href: string) => {
    setHoveredTab(href);
    updateUnderline(href);
  };

  const handleMouseLeave = () => {
    setHoveredTab(null);
    const activeItem = navItems.find((item) => pathname === item.href);
    if (activeItem) {
      updateUnderline(activeItem.href);
    }
  };

  const getMobileLinkClasses = (href: string) => {
    return `text-xl font-bold tracking-tight transition-colors ${
      pathname === href ? 'text-black' : 'text-gray-400 hover:text-black/80'
    }`;
  };

  const activeItem = navItems.find((item) => pathname === item.href);

  return (
    <>
      {/* Desktop Navbar */}
      <div
        ref={navContainerRef}
        className="relative py-2 border-b w-full bg-white border-black/10 px-14 min-[900px]:flex text-black text-sm items-center justify-between hidden"
      >
        <div className="flex gap-8">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              ref={(el) => {
                navLinksRef.current[index] = el;
              }}
              onMouseEnter={() => handleMouseEnter(item.href)}
              onMouseLeave={handleMouseLeave}
              className={`relative hover:text-opacity-85 transition-colors tracking-tight font-bold ${
                pathname === item.href ? 'text-black' : 'text-gray-400'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Animated Underline */}
        {activeItem && (
          <div
            className="absolute bottom-0 h-0.5 bg-red-500 transition-all duration-300 ease-out"
            style={{
              left: `${underlineStyle.left}px`,
              width: `${underlineStyle.width}px`,
            }}
          />
        )}

        <Link href="/" className="justify-self-center">
          <button className="relative w-[188px] h-[63px]">
            <Image
              src="/images/logo/mainLogo.png"
              alt="Sperm Racing Logo"
              fill
              className="object-contain invert"
              priority
            />
          </button>
        </Link>

        <div className="flex gap-4 items-center">
          <div className="relative flex items-center">
            <MagnifyingGlassIcon className="w-4 h-4 text-gray-500 absolute left-3 pointer-events-none" />
            <input
              placeholder="search leaderboard"
              className="bg-gray-100 pl-9 placeholder-gray-500 tracking-tight text-xs py-2 rounded"
            />
          </div>
          <button className="transition-colors">
            <QuestionMarkCircleIcon className="w-5 h-5 text-gray-500" />
          </button>
          <button className="transition-colors">
            <BoltIcon className="w-5 h-5 text-gray-500" />
          </button>
          <button className="transition-colors">
            <ArrowRightEndOnRectangleIcon className="w-5 h-5 text-red-500" />
          </button>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="max-[900px]:flex min-[900px]:hidden relative py-2 border-b w-full items-center border-black/10 px-4">
        {/* Mobile Logo */}
        <div className="mx-auto z-40">
          <Link href="/">
            <div className="relative w-[188px] h-[63px]">
              <Image
                src="/images/logo/mainLogo.png"
                alt="Sperm Racing Logo"
                fill
                className="object-contain invert"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className=" z-50">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 flex items-center justify-center text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-[4vw] h-[4vw] min-w-[20px] min-h-[20px] max-w-[24px] max-h-[24px]"
            >
              {isMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-white/95">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={getMobileLinkClasses(item.href)}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Search */}
            <div className="relative flex items-center mt-4">
              <MagnifyingGlassIcon className="w-4 h-4 text-gray-500 absolute left-3 pointer-events-none" />
              <input
                placeholder="search leaderboard"
                className="bg-gray-100 pl-9 placeholder-gray-500 text-black tracking-tight text-xs py-2 rounded w-64"
              />
            </div>

            {/* Mobile Action Buttons */}
            <div className="flex items-center gap-6 mt-4">
              <button className="transition-colors">
                <QuestionMarkCircleIcon className="w-6 h-6 text-gray-500" />
              </button>
              <button className="transition-colors">
                <BoltIcon className="w-6 h-6 text-gray-500" />
              </button>
              <button className="transition-colors">
                <ArrowRightEndOnRectangleIcon className="w-6 h-6 text-red-500" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
