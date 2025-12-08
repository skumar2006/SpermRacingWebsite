'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const ManifestorPage = () => {
  return (
    <div
      className={`min-h-screen flex flex-col items-center py-6 md:py-10 px-4 md:px-6 bg-white text-black `}
    >
      <div className="max-w-[1000px]  w-full tracking-tight">
        {/* Logo */}
        <div className="w-full flex justify-start mb-8 md:mb-12 mt-14 md:mt-2">
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
        <h1 className="text-xl md:text-3xl font-bold mb-6 md:mb-8 tracking-tight">
          Sperm Racing. <span className="bg-[#ffeb3b]">Two Legends.</span>{' '}
          <span className="bg-[#ffeb3b]">One microscopic racetrack.</span>
        </h1>

        {/* Main Content */}
        <div className="manifesto-content relative w-full min-h-screen bg-white">
          <div className="space-y-4 md:space-y-6 text-sm md:text-base">
            <p>
              When people hear about it, they ask me the same thing every time:
            </p>
            <div className="pl-5 border-l-2 border-[#cccccc] ml-5">
              <p>"Wait, is this actually happening?"</p>
            </div>
            <p>
              ...And the answer is always, "
              <em>
                <strong>hell</strong> yeah, it is.
              </em>
              "
            </p>
            <p className="">
              It first{' '}
              <span className="font-bold">started as a wild idea.</span>
            </p>
            <p>A funny conversation with our friends..</p>
            <p>But there was something big…</p>
            <p>
              <strong>1 in 6 men face infertility.</strong>
            </p>
            <p>
              and, sperm count has dropped more than 50% in the last 40 years
            </p>
            <Image
              src="/images/fertility-graph.png"
              alt="male fertility decline"
              width={800}
              height={400}
              className="w-full md:ml-[-9.5rem] lg:ml-[-13rem] my-[-10rem] object-cover object-center"
              style={{ height: '500px' }}
            />
            <h2 className="text-base md:text-lg  mt-6 md:mt-8 mb-3 md:mb-4">
              but here's the thing.
            </h2>
            <p className="font-bold text-xl md:text-2xl">
              Sperm Racing wasn't just a wild idea
            </p>
            <p>
              It was a real opportunity to change how people view their health.
            </p>
            <p>
              When we first told people we know about Sperm Racing, there was
              one consensus:
            </p>
            <div className="pl-5 border-l-2 border-[#cccccc] ml-5">
              <p>That's too crazy of an idea.</p>
            </div>
            <p>But what if it's just crazy enough to work?</p>
            <p>
              What if we could turn this into something people actually care
              about? If you can train for sports, spend hours perfecting your
              form, pushing your body to its limits
              <br></br>
              <br></br>
              <span className="">
                <strong>then why can't you train your health too? </strong>Why
                can't you measure it, improve it, compete in it?
              </span>
            </p>
            <p className="font-bold text-xl md:text-2xl">
              The majority of male{' '}
              <strong className="bg-[#ffeb3b] px-1 rounded">
                infertility is linked to lifestyle.
              </strong>
            </p>
            <p>Not genetics. Not bad luck. Things you can actually control:</p>
            <strong>Sleep, diet, exercise, stress</strong>
            <p>
              And yet, most guys never even think about it until it's too late.
            </p>
            <h2 className=" ">
              So we built a crack team of bioengineers, scientists, and public
              figures.
            </h2>
            <p>Making Sperm Racing real.</p>
            <p>We hosted our first event in LA with just 20 days of planning</p>
            and became one of the fastest-growing sports in internet history.
            <p>
              <strong className="text-xl md:text-2xl px-1 rounded">
                We went from 0 to half a billion views on social media in two
                weeks.
              </strong>
            </p>
            <p>
              We received coverage from major outlets like The New York Post,
              ABC, Slate, TMZ, The Times, NewsNation, and Vice.
            </p>
            <p>
              And most importantly, we made the world talk about sperm and
              fertility in a way that has never been done before.
            </p>
            <p>That one event went so viral that comedians like –</p>
            <div className="pl-5 border-l-2 border-[#cccccc] ml-5 space-y-2">
              <p>
                <strong>Andrew Shultz</strong> and <strong>Theo Von</strong>{' '}
                talked about Sperm Racing.
              </p>
              <p>
                Influencers like <strong>Logan Paul</strong> and{' '}
                <strong>MoistKritcal</strong> covered it.
              </p>
              <p>
                And even athletes like <strong>Tom Brady</strong> and{' '}
                <strong>Michael Phelps</strong> have all brought up Sperm Racing
                in their everyday conversations.
              </p>
            </div>
            <h2 className="text-xl md:text-2xl font-bold">So, what's next?</h2>
            <p>
              <strong className="bg-[#ffeb3b] px-1 rounded">
                We are going even more viral.
              </strong>
            </p>
            <p>
              <strong>
                10 weeks. 10 races. Celebrities. Athletes. Optimization.
              </strong>
            </p>
            <p>Soon, the whole world will know about sperm racing.</p>
            <p>
              Unlike other sports, the barrier to entry here is simple:{' '}
              <strong>just be healthy.</strong>
            </p>
            <p>
              No insane skill curve. No need to risk your life. And, it's even
              more entertaining!
            </p>
            <p>
              That means we can stage wild matchups — like{' '}
              <strong>Trump vs. Biden</strong> — if they're down to race.
            </p>
            <p
              className="text-xl md:text-2xl font-bold"
              style={{ fontSize: '1.5rem' }}
            >
              And know this:{' '}
              <span className="bg-[#ffeb3b] px-1 rounded">
                we're not just creating a sport.
              </span>
            </p>
            <p>We're building the future of male health.</p>
            <p>
              And it starts with a race:{' '}
              <strong>the most important race.</strong>
            </p>
            {/* Extra whitespace for mobile and tablet only */}
            <div className="block lg:hidden h-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManifestorPage;
