'use client';

import Image from 'next/image';

import WaitlistSignupForm from '../../components/WaitlistSignupForm';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const TryoutsPage = () => {
  return (
    <div
      className={`min-h-screen flex flex-col items-center py-6 md:py-10 px-4 md:px-6 bg-white text-black`}
    >
      {/* SR Logo - Mobile Only */}

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

        {/* Headline - Adjusted for Tryouts */}
        <h1 className="text-xl md:text-3xl font-bold mb-6 md:mb-8 text-center">
          sperm racing tryouts.
          <span className="block md:inline bg-[#ffeb3b] px-1 rounded mt-1 md:mt-0">
            train. compete. conquer.
          </span>
        </h1>

        <video
          className="my-6 md:my-8 w-full aspect-[1948/1080]"
          controls
          preload="none"
          poster="/images/tryouts-poster.jpg"
          autoPlay
          muted
          playsInline
        >
          <source
            src="https://www.dropbox.com/scl/fi/cb3zn9e9khuzvnps64v8t/SPERM-RACING3.mp4?rlkey=20vas77eqwuoudhs7qtrnbvv8&e=1&st=qdnba2v6&dl=0&raw=1"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Main Content */}
        <div className="tryouts-content relative w-full min-h-screen bg-white">
          <div className="space-y-4 md:space-y-6 text-sm md:text-base">
            <p className="text-lg md:text-xl font-bold">People ask us —</p>
            <p className="text-lg md:text-xl font-bold">
              What's next for Sperm Racing?
            </p>

            <br />

            <p className="text-lg md:text-xl">Simple.</p>
            <p className="text-lg md:text-xl font-bold">
              We're building a real sport.
            </p>
            <p className="text-lg md:text-xl">A real league.</p>
            <p className="text-lg md:text-xl">A real path to greatness.</p>

            <br />

            <h2 className="text-2xl md:text-3xl mt-6 md:mt-8 mb-3 md:mb-4">
              Introducing: <strong>Sperm Racing Tryouts.</strong>
            </h2>

            <p className="text-lg md:text-xl">
              Train from anywhere. Compete with the best.
            </p>

            <br />

            <p className="text-lg md:text-xl">
              The <strong>Sperm Racing Professional Sperm Analysis Kit</strong>,
              powered by YO, lets you measure everything that matters:
            </p>

            <ul className="list-disc pl-5 space-y-2 text-base md:text-lg ml-5">
              <li>Concentration</li>
              <li>Motility</li>
              <li>Progressive Motility</li>
              <li>Motile Sperm Concentration</li>
              <li>Progressive Motile Sperm Concentration</li>
            </ul>

            <p className="text-lg md:text-xl">And yes —</p>
            <p className="text-lg md:text-xl font-bold">
              You'll see your racers LIVE in action.
            </p>

            <br />

            <p className="text-lg md:text-xl">
              When you're ready, you'll be placed onto the{' '}
              <strong>Sperm Racing Amateur Leaderboards</strong> —
            </p>
            <p className="text-lg md:text-xl">
              where we scout the next generation of professional athletes.
            </p>
            <p className="text-lg md:text-xl">Where futures are built.</p>
            <p className="text-lg md:text-xl">Where legends are born.</p>

            <br />

            <p className="text-lg md:text-xl font-bold">
              One day, racing sperm could be your full-time career.
            </p>

            <br />

            <p className="text-2xl md:text-3xl font-bold text-center mt-6 md:mt-8">
              Coming soon.
            </p>

            {/* Waitlist Signup Form */}
            <WaitlistSignupForm />

            {/* Extra whitespace for mobile and tablet only */}
            <div className="block lg:hidden h-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryoutsPage;
