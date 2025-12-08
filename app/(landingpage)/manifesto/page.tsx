'use client';

import Image from 'next/image';
import motto from '@/public/images/motto.png';
import fertilityGraph from '@/public/images/fertility-graph.png';
import racetrack from '@/public/images/racetrack.png';
import localFont from 'next/font/local';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

// Load Fonts
const monoFont = localFont({
  src: [
    {
      path: '../../../public/fonts/JetBrainsMono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/JetBrainsMono-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-mono',
});

const ManifestoPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center py-6 md:py-10 px-4 md:px-6 bg-white text-black">
      <div className="max-w-[1000px] w-full tracking-tight">
        {/* Logo */}
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

        {/* Headline */}
        <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3">
          sperm racing.
        </h1>
        <p className="text-base md:text-lg text-gray-800 mb-1">
          two legends. one microscopic racetrack.
        </p>
        <p className="text-xs md:text-sm text-gray-500 mb-6 md:mb-8">
          last updated: November 25, 2024
        </p>

        {/* Main Content */}
        <div className="manifesto-content relative w-full min-h-screen bg-white">
          <div className="space-y-4 md:space-y-6 text-sm md:text-base">
            <Image
              src={motto}
              alt="motto"
              width={300}
              height={200}
              className="mx-auto my-6 md:my-8 w-[250px] md:w-[300px]"
            />

            <p>
              <strong className="text-xl md:text-2xl">so, sperm racing.</strong>
            </p>

            <p>
              when people hear about it, they ask me the same thing every time:
            </p>

            <div className="pl-5 border-l-2 border-[#cccccc] ml-5">
              <p>"wait, is this actually happening?"</p>
            </div>

            <p>
              ...and the answer is always, "
              <em>
                <strong>hell</strong> yeah, it is.
              </em>
              "
            </p>

            <h2 className="text-base md:text-lg font-bold mt-6 md:mt-8 mb-3 md:mb-4">
              but here's the thing.
            </h2>

            <p>
              <strong>sperm racing</strong> isn't just a joke. it's not just
              some viral idea for the internet to laugh at.
              <span className="bg-[#ffeb3b] px-1 rounded">
                it's something much bigger.
              </span>
            </p>

            <h2 className="text-base md:text-lg font-bold">
              male fertility is declining.
            </h2>
            <p>
              like, a lot. it's happening quietly, steadily, and nobody's really
              talking about it.
            </p>

            <Image
              src={fertilityGraph}
              alt="male fertility"
              width={800}
              height={400}
              className="w-full my-6 md:my-8"
            />

            <p>
              and{' '}
              <strong className="bg-[#ffeb3b] px-1 rounded">
                sperm motility
              </strong>
              —how fast your sperm moves—turns out to be a massive factor in
              fertility. it's measurable, trackable, and just like running a
              race or lifting a weight, it's something you can actually improve.
            </p>

            <p>but no one's turned it into something people care about.</p>

            <p>so we did.</p>

            <p
              className="text-xl md:text-2xl font-bold"
              style={{ fontSize: '1.5rem' }}
            >
              <span className="bg-[#ffeb3b] px-1 rounded">
                we're turning health into a sport.
              </span>
            </p>

            <p>
              if you can train for sports—spend hours perfecting your form,
              pushing your body to its limits—then why can't you train your
              health too? why can't you measure it, improve it, compete in it?
            </p>

            <h2 className="text-base md:text-lg font-bold">
              we're building the first-ever racetrack for sperm.
            </h2>
            <p>two competitors. two samples. one microscopic finish line.</p>

            <Image
              src={racetrack}
              alt="microscopic racetrack"
              width={800}
              height={400}
              className="w-full max-w-[800px] mx-auto my-6 md:my-8"
            />

            <h3 className="text-base md:text-lg font-bold">
              how the race works:
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                we've designed a microscopic racetrack that mimics the
                reproductive system—chemical signals, fluid dynamics,
                synchronized starts.
              </li>
              <li>
                high-resolution cameras track every microscopic move. it's all
                live-streamed, complete with stats, leaderboards, and instant
                replays.
              </li>
              <li>
                the winner? the sperm that crosses the finish line first,
                verified by advanced imaging. the stakes have never been
                smaller—or bigger.
              </li>
            </ul>

            <p>
              and yeah, it's exactly as wild as it sounds.{' '}
              <span className="bg-[#ffeb3b] px-1 rounded">
                but we didn't stop there.
              </span>
            </p>

            <p>
              we're turning it into a spectacle. think press conferences.
              weigh-ins. live-streamed races with play-by-play commentary. and,
              of course, the world's smallest racetrack.
            </p>

            <p>
              we're building a market where fans can pick their favorite
              competitors to see who's crossing the finish line first. whether
              it's athletes, or celebrities, imagine backing your icon in the
              weirdest, most entertaining event you've ever seen.
            </p>

            <h3 className="text-base md:text-lg font-bold">
              the bigger picture:
            </h3>

            <p>
              <strong>sperm racing</strong> isn't just about racing sperm
              (although, let's be honest, that's hilarious). it's about turning
              health into a competition. it's about making male fertility
              something people actually want to talk about, track, and improve.
            </p>

            <p>
              we're taking a topic no one wants to touch and making it
              interesting, measurable, and weirdly changing this paradigm.
            </p>

            <p>
              because{' '}
              <strong className="bg-[#ffeb3b] px-1 rounded">
                health is a race.
              </strong>{' '}
              and everyone deserves a shot at the starting line.
            </p>

            <p>
              we've put together a team of researchers and operators who's built
              things people said couldn't work—and made them massive.
            </p>

            <p>
              we've created viral brands. managed wild campaigns. turned ideas
              into cultural moments.
            </p>

            <p>
              <strong>sperm racing is next.</strong>
            </p>

            <p>so, are you ready?</p>

            <p>because we are.</p>

            <p>
              <strong>let's race.</strong>
            </p>

            <p className="text-center lg:text-right italic mt-8">
              - eric,{' '}
              <a
                href="https://x.com/spermracing"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                from SpermRacingHQ
              </a>
            </p>

            {/* Extra whitespace for mobile and tablet only */}
            <div className="block lg:hidden h-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManifestoPage;
