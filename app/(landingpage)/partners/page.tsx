'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';

// Types for image data
interface ImageData {
  filename: string;
  platform: string;
  likes: string;
  link: string;
}

interface LoadedImage {
  src: string;
  index: number;
  imageData: ImageData;
}

export default function SpermRacingPage() {
  const [carouselImages, setCarouselImages] = useState<LoadedImage[]>([]);

  // Image data for carousel
  const imageFiles: ImageData[] = [
    {
      filename: '12M Views.jpg',
      platform: 'Instagram',
      likes: '12M Views',
      link: 'https://www.instagram.com/reel/DIeVZjeP2mU/?igsh=NTc4MTIwNjQ2YQ==',
    },
    {
      filename: '18M Views.png',
      platform: 'Instagram',
      likes: '18M Views',
      link: 'https://www.instagram.com/p/DIgxij7t5hT/?img_index=1',
    },
    {
      filename: '30M Views.jpg',
      platform: 'Instagram',
      likes: '30M Views',
      link: 'https://www.instagram.com/p/DI4hNsRoGfs/',
    },
    {
      filename: '34M Views.png',
      platform: 'Instagram',
      likes: '34M Views',
      link: 'https://www.instagram.com/reel/DI5aghXtQs5/?igsh=NTc4MTIwNjQ2YQ==',
    },
    {
      filename: '5m Views.png',
      platform: 'Instagram',
      likes: '5M Views',
      link: 'https://www.instagram.com/reel/DJF1U_oI8nN/',
    },
    {
      filename: '16M Views.png',
      platform: 'TikTok',
      likes: '16M Views',
      link: 'https://www.tiktok.com/@winnyirl/video/7497677461417725186',
    },
    {
      filename: '6M Views.png',
      platform: 'TikTok',
      likes: '6M Views',
      link: 'https://www.tiktok.com/@senpaislays1/video/7497465808273132807',
    },
    {
      filename: '10M Views.png',
      platform: 'TikTok',
      likes: '10M Views',
      link: 'https://www.tiktok.com/@dailymail/video/7497766204791065898',
    },
  ];

  useEffect(() => {
    // Load carousel images
    const loadImages = async () => {
      const promises = imageFiles.map((imageData, index) => {
        const imagePath = `/carousel-images/${imageData.filename}`;
        return checkImageExists(imagePath, index, imageData);
      });

      const results = await Promise.allSettled(promises);
      const successfulImages = results
        .filter(
          (result): result is PromiseFulfilledResult<LoadedImage> =>
            result.status === 'fulfilled' && result.value !== null
        )
        .map((result) => result.value);

      setCarouselImages(successfulImages);
    };

    loadImages();
  }, []);

  const checkImageExists = (
    src: string,
    index: number,
    imageData: ImageData
  ): Promise<LoadedImage | null> => {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.onload = () => resolve({ src, index, imageData });
      img.onerror = () => {
        console.log(`Could not load image: ${imageData.filename}`);
        resolve(null);
      };
      img.src = src;
    });
  };

  // Handle Calendly fallback
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    // Load Calendly script dynamically
    const loadCalendlyScript = () => {
      // Check if script already exists
      const existingScript = document.querySelector(
        'script[src*="calendly.com"]'
      );
      if (existingScript) {
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.type = 'text/javascript';

      // Add script to head
      document.head.appendChild(script);

      script.onload = () => {
        console.log('Calendly script loaded successfully');
      };

      script.onerror = () => {
        console.error('Failed to load Calendly script');
        setShowFallback(true);
      };
    };

    loadCalendlyScript();

    // Set up fallback timer - check if iframe loads
    const fallbackTimer = setTimeout(() => {
      const calendlyWidget = document.querySelector('.calendly-inline-widget');
      const calendlyIframe = calendlyWidget?.querySelector('iframe');

      if (!calendlyIframe) {
        console.log(
          'Calendly widget failed to load after timeout, showing fallback'
        );
        setShowFallback(true);
      }
    }, 10000); // Give Calendly 10 seconds to load

    return () => {
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Partner with us</title>
      </Head>

      <div className="font-inter bg-white text-gray-500 overflow-x-hidden leading-relaxed px-2 pr-4 text-left lowercase text-lg tracking-tight">
        <h1 className="text-white text-center py-4">Partner with us</h1>

        <main className="max-w-2xl mx-auto text-left text-lg pl-5 text-gray-500">
          <div className="w-full flex justify-center mb-8 md:mb-12 mt-14 md:mt-2">
            <Image
              src="/images/logo/mainLogo.png"
              alt="SpermRacing Logo"
              width={240}
              height={60}
              priority
              className="w-[200px] md:w-[240px]"
            />
          </div>
          <h1 className="text-black text-4xl md:text-7xl font-normal mb-2 ">
            <span className="tracking-[-0.02em] font-sans"> Sperm Racing </span>
            <span className="text-sm md:text-lg font-normal text-gray-500">
              (partner with us)
            </span>
          </h1>

          <br />

          <p className="mb-6">
            we went from{' '}
            <span className="font-bold underline decoration-yellow-300 decoration-2 underline-offset-2">
              zero to half a billion views
            </span>{' '}
            in just two weeks.
          </p>

          <p className="mb-6">
            We we're covered on major outlets like{' '}
            <a
              href="https://nypost.com/2025/04/15/lifestyle/millionaires-are-hosting-the-worlds-first-sperm-race-at-iconic-venue/"
              target="_blank"
              className="text-blue-600 underline hover:text-blue-600"
            >
              The New York Post
            </a>
            ,{' '}
            <a
              href="https://www.youtube.com/watch?v=gusGkuENgpQ&pp=0gcJCfwAo7VqN5tD"
              target="_blank"
              className="text-blue-600 underline hover:text-blue-600"
            >
              ABC
            </a>
            ,{' '}
            <a
              href="https://www.youtube.com/watch?v=oBbyt7ieTuI&ab_channel=Reuters"
              target="_blank"
              className="text-blue-600 underline hover:text-blue-600"
            >
              Reuters
            </a>
            ,{' '}
            <a
              href="https://youtu.be/Txt0eLXwurM?si=BZDJxmVsn7lVGLOx&t=31"
              target="_blank"
              className="text-blue-600 underline hover:text-blue-600"
            >
              TMZ
            </a>
            ,{' '}
            <a
              href="https://www.complex.com/life/a/tracewilliamcowen/sperm-racing-raise-awareness-health-competition"
              target="_blank"
              className="text-blue-600 underline hover:text-blue-600"
            >
              Complex
            </a>
            ,{' '}
            <a
              href="https://www.newsnationnow.com/health/los-angeles-sperm-race-la-center-studios/"
              target="_blank"
              className="text-blue-600 underline hover:text-blue-600"
            >
              NewsNation
            </a>
            , and{' '}
            <a
              href="https://www.vice.com/en/article/millionaires-are-hosting-sperm-races-with-spectators-and-betting-slips/"
              target="_blank"
              className="text-blue-600 underline hover:text-blue-600"
            >
              Vice
            </a>
            .
          </p>

          <p className="mb-6">
            and creators with millions of followers started making videos
            about... <strong className="text-2xl">SPERM?</strong>
          </p>

          <div className="overflow-hidden whitespace-nowrap my-6 hidden sm:block">
            <div className="inline-block animate-scroll">
              <span className="inline-block">
                <a
                  href="https://youtu.be/YmLRSOB7noI?si=OAgcU-F9Nz-kDBMQ&t=2034"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Tom Brady
                </a>{' '}
                (15.2M Instagram) &{' '}
                <a
                  href="https://youtu.be/YmLRSOB7noI?si=OAgcU-F9Nz-kDBMQ&t=2034"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Logan Paul
                </a>{' '}
                (27.1M Instagram) •{' '}
                <a
                  href="https://youtu.be/RZzNg2Dntdo?si=Dmh1c7MdJyB6sq5H&t=1760"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Adin Ross
                </a>{' '}
                (7M Twitch) •{' '}
                <a
                  href="https://www.youtube.com/watch?v=07TDi32yJ2I&t=170s&pp=ygUWcGVuZ3VpbnowIHNwZXJtIHJhY2luZw%3D%3D"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Penguin0
                </a>{' '}
                (16.9M YouTube) •{' '}
                <a
                  href="https://x.com/andrewschulz/status/1916944798725849239"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Andrew Schulz
                </a>{' '}
                (4.5M Instagram) •{' '}
                <a
                  href="https://youtu.be/zs1X92HVRO0?si=YcxFAP7mgc85ZRkK&t=3984"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Theo Von
                </a>{' '}
                (8.1M Instagram) &{' '}
                <a
                  href="https://youtu.be/zs1X92HVRO0?si=YcxFAP7mgc85ZRkK&t=3984"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  David Spade
                </a>{' '}
                (4.7M TikTok) •{' '}
                <a
                  href="https://www.instagram.com/m_phelps00/?hl=en"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Michael Phelps
                </a>{' '}
                (3.7M) •{' '}
                <a
                  href="https://www.youtube.com/shorts/bNfqdW3dfTc"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Steve Harvey
                </a>{' '}
                (12.7M TikTok) •{' '}
                <a
                  href="https://www.youtube.com/watch?v=y-7OuGzw4zY&t=555s&pp=ygUZTm9lbCBNaWxsZXIgc3Blcm0gcmFjaW5iZw%3D%3D"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Noel Miller
                </a>{' '}
                (2.5M YouTube) •{' '}
                <a
                  href="https://youtube.com/@fazerain"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Faze Rain
                </a>{' '}
                (5.3M YouTube) •{' '}
                <a
                  href="https://kick.com/n3on/videos/8e25627a-3579-41f5-b099-43eb0c4e8995"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Sneako
                </a>{' '}
                (961.9K Twitter) &{' '}
                <a
                  href="https://instagram.com/neon"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Neon
                </a>{' '}
                (1.5M Instagram) •{' '}
                <a
                  href="https://www.youtube.com/watch?v=0LA3H5zPqCs&pp=ygUNc3Blcm0gcmFjaW5nIA%3D%3D"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Joe Bartolozzi
                </a>{' '}
                (24.5M TikTok) •{' '}
                <a
                  href="https://www.youtube.com/watch?v=EnbgL_prC7k&t=231s&pp=ygUNc3Blcm0gcmFjaW5nIA%3D%3D"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Cody & Ko
                </a>{' '}
                (5.6M Youtube) •{' '}
                <a
                  href="https://www.youtube.com/watch?v=KcnzHZj9D3s&t=785s&pp=ygUNc3Blcm0gcmFjaW5nIA%3D%3D"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Kanel Joseph
                </a>{' '}
                (2.9M TikTok) •{' '}
                <a
                  href="https://www.youtube.com/watch?v=S58HZB1YZEM&t=5973s&pp=ygUNc3Blcm0gcmFjaW5nIA%3D%3D"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Barstool Sports
                </a>{' '}
                (6.5M Twitter) •{' '}
                <a
                  href="https://www.youtube.com/watch?v=uZ-XFx6_Sw0"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Noah Boat
                </a>{' '}
                (8.5M YouTube) •{' '}
                <a
                  href="https://youtube.com/@jimmyzhang"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Jimmy Zhang
                </a>{' '}
                (1.7M Youtube) •{' '}
                <a
                  href="https://www.youtube.com/watch?v=PPHz-Nm7Z4w"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Tom Brady
                </a>{' '}
                (15.2M Instagram) &{' '}
                <a
                  href="https://instagram.com/loganpaul"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Logan Paul
                </a>{' '}
                (27.1M Instagram) •
              </span>
            </div>
          </div>

          <a
            href="https://youtu.be/YmLRSOB7noI?si=OAgcU-F9Nz-kDBMQ&t=2034"
            target="_blank"
            className="block my-5"
          >
            <Image
              src="/logan paul.png"
              alt="Logan Paul"
              width={600}
              height={400}
              className="block mx-auto w-full"
            />
          </a>

          <p className="text-sm mb-6">
            In this video, Tom Brady and Logan Paul discuss Sperm Racing and its
            potential impact on fertility health. [double click to view]
          </p>

          <p className="mb-6">But here's the thing... </p>

          <p className="mb-6">
            <strong>
              <span className="font-bold underline decoration-yellow-300 decoration-2 underline-offset-2">
                this isn't some degenerate stunt or a cheap way to go viral.
              </span>
            </strong>
          </p>

          <p className="mb-6">
            It's not a joke to us. And it shouldn't be to anyone.
          </p>
          <p className="mb-6">Sperm shouldn't be associated with p***</p>
          <p className="mb-6">
            It's a legitimate health biomarker. Quite literally an aggregate
            one.{' '}
            <sup className="text-xs">
              <a
                href="https://mavenpreprint.substack.com/p/the-secrets-sperm-carry"
                target="_blank"
                className="text-blue-600 underline"
              >
                (coined by Paul Turek M.D whom we work with)
              </a>
            </sup>
          </p>
          <p className="mb-6">
            It doesn't just tell you one thing, it reflects your entire
            lifestyle: how well you sleep, what you eat, whether you exercise,
            your stress levels, your habits, your overall health, condensed into
            one trackable signal.
          </p>

          <Image
            src="/healthsport.png"
            alt="Health Sport"
            width={600}
            height={400}
            className="block mx-auto w-full my-5"
          />

          <p className="mb-6">
            if you can train for sports, spend hours perfecting your form, and
            push your body to its limits, then why can't you train your health
            the same way? Why can't you measure it, improve it, and compete in
            it?
          </p>

          <p className="mb-6">
            We're building something that helps people take control of their
            health again
          </p>

          <p className="mb-6">
            <strong>
              <span className="font-bold underline decoration-yellow-300 decoration-2 underline-offset-2">
                but here's the crazier part:{' '}
              </span>
            </strong>
          </p>

          <ul className="mb-6 pl-5 list-disc">
            <li className="mb-2">
              1 in 6 men deal with infertility.{' '}
              <sup>
                <a
                  href="https://www.who.int/news/item/04-04-2023-1-in-6-people-globally-affected-by-infertility"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  (World Health Organization)
                </a>
              </sup>
            </li>
            <li className="mb-2">
              The average sperm count has dropped by more than 50% in the last
              50 years.
            </li>
            <li className="mb-2">
              60% of the factors that cause infertility are preventable.
            </li>
          </ul>

          <Image
            src="/spermcount.png"
            alt="Sperm Count"
            width={600}
            height={400}
            className="block mx-auto w-full my-5"
          />

          <p className="text-2xl font-bold text-center my-8">
            <strong>
              <span className="font-bold underline decoration-yellow-300 decoration-2 underline-offset-2">
                So why aren't people talking about it?
              </span>
            </strong>
          </p>

          <p className="mb-6">it's always been treated as something weird.</p>
          <p className="mb-6">but it's so, so important.</p>
          <p className="mb-6">
            we're leading the shift in how people see it, and this is the first
            time sperm has been part of the mainstream conversation.
          </p>

          <Image
            src="/spermrace.png"
            alt="Sperm Race"
            width={600}
            height={400}
            className="block mx-auto w-full my-5"
          />

          <div className="my-6">
            <p className="m-0 text-xl font-bold underline decoration-yellow-300 decoration-2 underline-offset-2">
              Five weeks. Five races. Real people. Celebrities. Athletes.
            </p>
            <p className="mt-2 mb-0 text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              And we want to be the biggest sport of the year.
            </p>
          </div>

          <br />

          <p className="mb-6">
            The stakes are real, because it's not just about winning a race,
            it's about changing the way people think about health, competition,
            and what it means to train your body.
          </p>
          <p className="mb-6">
            <span className="font-bold underline decoration-yellow-300 decoration-2 underline-offset-2">
              we're the only ones who can pull this off.
            </span>
          </p>

          <p className="mb-6">
            we've built some of the most viral campaigns on the internet,
            created brands that have racked up billions of views, and worked
            with the biggest creators in the world.
          </p>

          <div className="my-8 p-5 bg-gray-50 rounded-lg">
            <p className="mb-4 text-base leading-relaxed">
              <span className="font-bold text-blue-600 underline decoration-yellow-300 decoration-2 underline-offset-2">
                <a
                  href="https://www.instagram.com/theofficialgarrett"
                  target="_blank"
                >
                  Garrett Niconienko
                </a>
              </span>{' '}
              - third team member at MrBeast, helped scale the channel from a
              few thousand to over{' '}
              <a
                href="https://www.instagram.com/p/B_nrJACB2cO/?img_index=1"
                target="_blank"
                className="text-blue-600 underline"
              >
                50 million subscribers while producing 300+ videos.
              </a>
            </p>
            <p className="mb-4 text-base leading-relaxed">
              <span className="font-bold text-blue-600 underline decoration-yellow-300 decoration-2 underline-offset-2">
                <a
                  href="https://www.instagram.com/shanefanx/?hl=en"
                  target="_blank"
                >
                  Shane Fan
                </a>
              </span>{' '}
              - Creator with over{' '}
              <a
                href="https://www.instagram.com/shanefanx/?hl=en"
                target="_blank"
                className="text-blue-600 underline"
              >
                7M followers and 3B+ views
              </a>
              , also known as the height-measuring asian guy
            </p>
            <p className="mb-4 text-base leading-relaxed">
              <span className="font-bold text-blue-600 underline decoration-yellow-300 decoration-2 underline-offset-2">
                <a
                  href="https://www.linkedin.com/in/ericzhu105/"
                  target="_blank"
                >
                  Eric Zhu
                </a>
              </span>{' '}
              - Started a company in the{' '}
              <a
                href="https://x.com/ericzhu105/status/1663641843916054528"
                target="_blank"
                className="text-blue-600 underline"
              >
                high school bathroom
              </a>
              , got{' '}
              <a
                href="https://www.youtube.com/shorts/YBi-GVSPJ90"
                target="_blank"
                className="text-blue-600 underline"
              >
                300M views
              </a>{' '}
              & put together massive meme templates for brands such as the{' '}
              <a
                href="https://x.com/ericzhu105/status/1682553786487717888"
                target="_blank"
                className="text-blue-600 underline"
              >
                oppenheimer-barbie
              </a>{' '}
              &{' '}
              <a
                href="https://x.com/ericzhu105/status/1645448826193338374"
                target="_blank"
                className="text-blue-600 underline"
              >
                mr beast harvard meme
              </a>
            </p>
          </div>

          <p className="mb-6">
            We know how to get attention, but more importantly, we know how to
            make something sick.
          </p>

          {/* Image Carousel */}
          <div className="overflow-hidden whitespace-nowrap my-5 rounded-lg bg-transparent py-4">
            <div className="inline-flex animate-image-scroll">
              {carouselImages.length > 0 &&
                [...carouselImages, ...carouselImages].map(
                  (imageData, index) => (
                    <div
                      key={index}
                      className="flex-none mr-4 rounded-lg overflow-hidden bg-white text-center flex flex-col h-40"
                    >
                      <Image
                        src={imageData.src}
                        alt={imageData.imageData.filename.replace(
                          /\.(jpg|jpeg|png|gif|webp)$/i,
                          ''
                        )}
                        width={150}
                        height={120}
                        className="max-w-[150px] max-h-[120px] h-auto block mx-auto object-contain"
                      />
                      <div className="p-2 text-center text-sm font-semibold bg-white mt-auto">
                        <a
                          href={imageData.imageData.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 no-underline"
                        >
                          {imageData.imageData.platform} (
                          {imageData.imageData.likes})
                        </a>
                      </div>
                    </div>
                  )
                )}
            </div>
          </div>

          <p className="mb-6">
            <span className="font-bold underline decoration-yellow-300 decoration-2 underline-offset-2">
              and just to be clear…
            </span>
          </p>
          <p className="mb-6">
            <strong>
              we're building a brand people can be proud to work with.
            </strong>
          </p>

          <p className="mb-6">
            we're not here to be associated with degeneracy.
          </p>

          <p className="mb-6">this is about health. it's about performance.</p>
          <p className="mb-6">we're turning biomarkers into a global sport</p>
          <p className="mb-6">
            and we want to partner with people who believe in that vision.
          </p>

          <p className="mb-6">
            <a
              href="https://calendly.com/nick-spermracing/30min"
              target="_blank"
              className="text-blue-600 underline"
            >
              if that aligns, let's work together.
            </a>
          </p>
          <p className="mb-6">-sperm racing team</p>

          {/* Calendly inline widget */}
          {!showFallback ? (
            <div
              className="calendly-inline-widget min-w-[320px] h-[600px] md:h-[700px]"
              data-url="https://calendly.com/nick-spermracing/30min"
            ></div>
          ) : (
            <div className="text-center p-8 bg-gray-50 rounded-lg my-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Schedule a Meeting
              </h3>
              <p className="text-gray-600 mb-6">
                Ready to partner with us? Let's discuss how we can work
                together.
              </p>
              <a
                href="https://calendly.com/nick-spermracing/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-bold inline-block transition-colors duration-200 no-underline"
              >
                Book a Meeting →
              </a>
              <p className="text-sm text-gray-500 mt-4">
                Opens in a new window
              </p>
            </div>
          )}

          {/* Fallback link for no JavaScript */}
          <noscript>
            <div className="text-center p-8 bg-gray-50 rounded-lg my-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Schedule a Meeting
              </h3>
              <a
                href="https://calendly.com/nick-spermracing/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white py-3 px-8 rounded-lg font-bold inline-block no-underline"
              >
                Book a Meeting
              </a>
            </div>
          </noscript>
        </main>

        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          @keyframes imageScroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-scroll {
            animation: scroll 70s linear infinite;
          }

          .animate-image-scroll {
            animation: imageScroll 70s linear infinite;
          }

          @media (max-width: 768px) {
            .animate-scroll {
              animation: scroll 50s linear infinite;
            }
            .animate-image-scroll {
              animation: imageScroll 40s linear infinite;
            }
          }

          @media (max-width: 480px) {
            .animate-scroll {
              animation: scroll 40s linear infinite;
            }
            .animate-image-scroll {
              animation: imageScroll 40s linear infinite;
            }
          }
        `}</style>
      </div>
    </>
  );
}
