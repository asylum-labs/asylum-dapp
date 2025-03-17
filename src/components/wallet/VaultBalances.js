'use client';
import { motion } from 'framer-motion';
import Table from './Table';

export default function VaultBalances() {
  return (
    <div className="px-8 pt-8 md:px-20 lg:mt-20 max-w-screen-2xl mx-auto">
      <div className="mb-6">
        <h4 className="text-grey text-2xl">STAKING</h4>
      </div>
      <div className="mx-auto flex flex-col md:flex-row gap-6">
        <div className="bg-[#000] w-full md:w-1/3 rounded-xl border border-grey p-8">
          <p className="text-lime text-3xl">Stake $ALT</p>
          <p className="text-grey mt-4">
            ALT, our native token, is crucial to supporting our ecosystem. As
            holders, you&apos;re not just invested, but active in our
            protocol&apos;s success. Staking $ALT offers numerous benefits:
            protocol governance, revenue sharing from the protocol, and access
            to special staking pools.
          </p>
          <div className="flex flex-col gap-2"></div>
        </div>
        <div className="bg-[#000] w-full md:w-1/3 rounded-xl border border-grey p-8">
          <p className="text-lime text-3xl">
            Real <span className="text-light-purple">Yield</span> Revenue
          </p>
          <p className="text-grey mt-4">
            Our protocol generates revenue from multiple sources: trading fees,
            lending interests, options premiums, and more. What sets us apart?
            We share this back with our stakers. Simply stake $ALT, and
            you&apos;ll regularly receive tokens from our revenue - real income
            from real usage.
          </p>
        </div>
        <div className="bg-[#000] w-full md:w-1/3 rounded-xl border border-grey p-8">
          <p className="text-lime text-3xl">Pool Assignments</p>
          <p className="text-grey mt-4">
            Choose a specific purpose for your staked tokens. Assign them to
            contribute to lending collateral pools, hedge liquidity reserves, or
            our innovative mining program. Each assignment offers different
            reward structures - diversify your staking for balanced returns.
          </p>
          <div className="flex flex-col gap-2"></div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center mt-10">
        <div className="bg-[#000] w-full md:w-3/4 border border-grey rounded-lg ">
          <div className="w-full neon-border text-center py-6 opacity-100">
            <p className="text-lime text-2xl font-normal">
              Stake with a strategy that suits your goals
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
