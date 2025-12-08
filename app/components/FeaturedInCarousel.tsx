'use client';

import React from 'react';
import Image from 'next/image';

const FeaturedInCarousel = () => {
  const companies = [
    { name: 'ABC7', logo: 'abc7.png', alt: 'ABC7 News' },
    { name: 'NY Post', logo: 'nypost.png', alt: 'New York Post' },
    { name: 'TMZ', logo: 'tmz.png', alt: 'TMZ' },
    { name: "Men's Health", logo: 'menshealth.png', alt: "Men's Health" },
    { name: 'Vanity Fair', logo: 'vanityfair.png', alt: 'Vanity Fair' },
    { name: 'CNBC TV', logo: 'cnbc.png', alt: 'CNBC' },
    { name: 'KTLA', logo: 'KTLA_logo-1.svg', alt: 'KTLA' },
    { name: 'Slate', logo: 'slate.png', alt: 'Slate' },
    {
      name: 'The Economic Times',
      logo: 'theeconomictimes.svg',
      alt: 'The Economic Times',
    },
    { name: 'Daily Mail', logo: 'dailymail.png', alt: 'Daily Mail' },
    { name: 'The Cut', logo: 'thecut.png', alt: 'The Cut' },
  ];

  // Helper function to determine if logo should have filters applied
  const shouldApplyFilter = (companyName: string) => {
    return companyName !== 'NY Post';
  };

  // Helper function to get appropriate className and style
  const getImageProps = (company: any) => {
    const baseClasses =
      'h-full w-auto object-contain opacity-40 group-hover:opacity-60 transition-all duration-500 transform group-hover:scale-105';
    const filterClasses = 'filter invert brightness-0 invert';

    if (shouldApplyFilter(company.name)) {
      return {
        className: `${baseClasses} ${filterClasses}`,
        style: {
          maxHeight: '20px',
          width: 'auto',
          filter: 'brightness(0) invert(0.8)',
        },
      };
    } else {
      return {
        className: baseClasses,
        style: {
          maxHeight: '20px',
          width: 'auto',
          opacity: '0.4',
        },
      };
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 pb-4 z-20">
      {/* Subtle gradient overlay for better integration */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

      <div className="relative overflow-hidden py-2 md:py-3 ">
        {/* "Featured In" label with improved styling */}
        {/* <div className="absolute left-4 md:left-8 top-0 z-10">
          <span className="text-white/60 text-xs md:text-sm font-medium uppercase tracking-[0.15em]">
            As Featured In
          </span>
        </div> */}

        {/* Scrolling container with better spacing */}
        <div className="overflow-hidden w-full ">
          <div className="flex featured-scroll-smooth items-center whitespace-nowrap">
            {/* First set of logos */}
            {companies.map((company, index) => {
              const imageProps = getImageProps(company);
              return (
                <div
                  key={`first-${index}`}
                  className="flex-shrink-0 mx-4 md:mx-6 lg:mx-8 flex items-center justify-center h-6 md:h-7 min-w-0"
                >
                  <div className="relative h-4 md:h-5 lg:h-6 w-auto flex items-center group">
                    <Image
                      src={`/logos/${company.logo}`}
                      alt={company.alt}
                      width={120}
                      height={40}
                      className={imageProps.className}
                      style={imageProps.style}
                      onError={(e) => {
                        // Fallback to text if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback =
                          target.nextElementSibling as HTMLElement;
                        if (fallback) {
                          fallback.style.display = 'block';
                        }
                      }}
                    />
                    <span
                      className="text-white/60 text-sm md:text-base font-semibold whitespace-nowrap group-hover:text-white/80 transition-colors hidden"
                      style={{ display: 'none' }}
                    >
                      {company.name}
                    </span>
                  </div>
                </div>
              );
            })}
            {/* Duplicate set for seamless loop */}
            {companies.map((company, index) => {
              const imageProps = getImageProps(company);
              return (
                <div
                  key={`second-${index}`}
                  className="flex-shrink-0 mx-4 md:mx-6 lg:mx-8 flex items-center justify-center h-6 md:h-7 min-w-0"
                >
                  <div className="relative h-4 md:h-5 lg:h-6 w-auto flex items-center group">
                    <Image
                      src={`/logos/${company.logo}`}
                      alt={company.alt}
                      width={120}
                      height={40}
                      className={imageProps.className}
                      style={imageProps.style}
                      onError={(e) => {
                        // Fallback to text if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback =
                          target.nextElementSibling as HTMLElement;
                        if (fallback) {
                          fallback.style.display = 'block';
                        }
                      }}
                    />
                    <span
                      className="text-white/60 text-sm md:text-base font-semibold whitespace-nowrap group-hover:text-white/80 transition-colors hidden"
                      style={{ display: 'none' }}
                    >
                      {company.name}
                    </span>
                  </div>
                </div>
              );
            })}
            {/* Third set for extra seamlessness */}
            {companies.map((company, index) => {
              const imageProps = getImageProps(company);
              return (
                <div
                  key={`third-${index}`}
                  className="flex-shrink-0 mx-4 md:mx-6 lg:mx-8 flex items-center justify-center h-6 md:h-7 min-w-0"
                >
                  <div className="relative h-4 md:h-5 lg:h-6 w-auto flex items-center group">
                    <Image
                      src={`/logos/${company.logo}`}
                      alt={company.alt}
                      width={120}
                      height={40}
                      className={imageProps.className}
                      style={imageProps.style}
                      onError={(e) => {
                        // Fallback to text if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback =
                          target.nextElementSibling as HTMLElement;
                        if (fallback) {
                          fallback.style.display = 'block';
                        }
                      }}
                    />
                    <span
                      className="text-white/60 text-sm md:text-base font-semibold whitespace-nowrap group-hover:text-white/80 transition-colors hidden"
                      style={{ display: 'none' }}
                    >
                      {company.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// New compact header version
export const FeaturedInHeader = () => {
  const companies = [
    { name: 'ABC7', logo: 'abc7.png', alt: 'ABC7 News' },
    { name: 'NY Post', logo: 'nypost.png', alt: 'New York Post' },
    { name: 'TMZ', logo: 'tmz.png', alt: 'TMZ' },
    { name: "Men's Health", logo: 'menshealth.png', alt: "Men's Health" },
    { name: 'Vanity Fair', logo: 'vanityfair.png', alt: 'Vanity Fair' },
    { name: 'CNBC TV', logo: 'cnbc.png', alt: 'CNBC' },
    { name: 'KTLA', logo: 'KTLA_logo-1.svg', alt: 'KTLA' },
  ];

  // Helper function to determine if logo should have filters applied
  const shouldApplyFilter = (companyName: string) => {
    return companyName !== 'NY Post';
  };

  // Helper function to get appropriate className and style for header version
  const getImageProps = (company: any) => {
    const baseClasses =
      'h-full w-auto object-contain opacity-30 group-hover:opacity-50 transition-all duration-300';
    const filterClasses = 'filter invert brightness-0 invert';

    if (shouldApplyFilter(company.name)) {
      return {
        className: `${baseClasses} ${filterClasses}`,
        style: {
          maxHeight: '14px',
          width: 'auto',
          filter: 'brightness(0) invert(0.6)',
        },
      };
    } else {
      return {
        className: baseClasses,
        style: {
          maxHeight: '14px',
          width: 'auto',
          opacity: '0.3',
        },
      };
    }
  };

  return (
    <div className="flex items-center gap-1">
      <span className="text-white/40 text-xs font-medium uppercase tracking-wider mr-3 whitespace-nowrap">
        Featured In
      </span>
      <div className="overflow-hidden max-w-[300px] lg:max-w-[400px]">
        <div className="flex featured-scroll-smooth items-center whitespace-nowrap">
          {companies.map((company, index) => {
            const imageProps = getImageProps(company);
            return (
              <div
                key={`header-${index}`}
                className="flex-shrink-0 mx-2 flex items-center justify-center h-4 min-w-0"
              >
                <div className="relative h-4 w-auto flex items-center group">
                  <Image
                    src={`/logos/${company.logo}`}
                    alt={company.alt}
                    width={60}
                    height={20}
                    className={imageProps.className}
                    style={imageProps.style}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            );
          })}
          {/* Duplicate for seamless loop */}
          {companies.map((company, index) => {
            const imageProps = getImageProps(company);
            return (
              <div
                key={`header-duplicate-${index}`}
                className="flex-shrink-0 mx-2 flex items-center justify-center h-4 min-w-0"
              >
                <div className="relative h-4 w-auto flex items-center group">
                  <Image
                    src={`/logos/${company.logo}`}
                    alt={company.alt}
                    width={60}
                    height={20}
                    className={imageProps.className}
                    style={imageProps.style}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeaturedInCarousel;
