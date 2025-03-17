'use client';
import React from 'react';
import { motion } from 'framer-motion';

const StakingPanel = () => {
  const rewardInfoText =
    'Stake ALT tokens to be eligible for rewards sharing. The staking window works in 30 day epochs, with 30 mins at the end of each epoch that prevents anyone from being able to stake or unstake ALT. Revenue is deposited to staking contract for claiming.';

  return (
    <div className="px-8 pt-8 md:px-10 max-w-screen-2xl mx-auto text-grey">
      <div className="section-title flex items-center lg:mt-20 gap-32 mb-6">
        <motion.h1 className="text-3xl text-grey">
          <motion.span
            initial="hidden"
            whileInView={{ opacity: 1, x: 0 }}
            animate={'visible'}
          >
            Staking
          </motion.span>{' '}
          Panel
        </motion.h1>
      </div>

      <div className="rewardsInformer md:w-3/4 mb-6">{rewardInfoText}</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-6 mb-4">
        <div className="flex flex-col bg-transparent border-muted border-b-2 border-r-2 p-4 rounded-md">
          <p className="text-lg mb-2 font-semibold">Stake, Earn, Repeat</p>

          <div className="flex flex-col p-4">
            <div className="stakingTable">
              <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <div className="flex flex-col w-full md:w-2/3">
                  <div className="grid-sect-subtitle">Staking Pool Balance</div>
                  <div className="grid-sect-subtitle-value text-purple">
                    <span id="poolBalanceAmnt">0 ALT</span> (
                    <span id="poolBalanceValue" className="text-white">
                      $0.00
                    </span>
                    )
                  </div>
                </div>

                <div className="flex flex-col w-full md:w-1/3 md:text-right mt-4 md:mt-0">
                  <div className="grid-sect-subtitle">24hr Volume</div>
                  <div className="green-value">$0</div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <div className="flex flex-col w-full md:w-2/3">
                  <div className="grid-sect-subtitle">Total Rewarded</div>
                  <div className="grid-sect-subtitle-value text-yellow-600">
                    <span id="totalRewardedAmnt">0 ALT</span> (
                    <span id="totalRewardedValue" className="text-white">
                      $0.00
                    </span>
                    )
                  </div>
                </div>

                <div className="flex flex-col w-full md:w-1/3 md:text-right mt-4 md:mt-0">
                  <div className="grid-sect-subtitle">Your Share</div>
                  <div className="text-white">0%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 rounded-md">
            <div className="p-4 flex flex-col items-center border-muted border-b-2 border-r-2">
              <div className="grid-sect-subtitle">ALT available</div>
              <div className="grid-sect-subtitle-value text-xl mb-4">
                <span id="availAmnt">0.00</span>
              </div>
              <input
                type="text"
                placeholder="Amount"
                className="bg-transparent border p-2 mb-4 w-full"
              />
              <button className="text-white bg-button-gradient rounded-full px-8 py-2 border-t-none border-b-[1px] border-r-[1px] border-l-[1px] border-button-gradient hover:bg-purple hover:border-blue w-full">
                <span>Stake ALT</span>
              </button>
            </div>

            <div className="p-4 flex flex-col items-center border-muted border-b-2 border-r-2">
              <div className="grid-sect-subtitle">ALT staked</div>
              <div className="grid-sect-subtitle-value text-xl mb-4">
                <span id="stakedAmnt">0.00</span>
              </div>
              <input
                type="text"
                placeholder="Amount"
                className="bg-transparent border p-2 mb-4 w-full"
              />
              <button className="text-white bg-button-gradient rounded-full px-8 py-2 border-t-none border-b-[1px] border-r-[1px] border-l-[1px] border-button-gradient hover:bg-purple hover:border-blue w-full">
                <span>Unstake ALT</span>
              </button>
            </div>
          </div>

          <div className="p-4 border-muted border-b-2 border-r-2">
            <p className="text-xl mb-4">Staking and Pool Assignment</p>
            <div className="text-sm mb-4">
              <p>
                In the Assignment tab you can select which staking pool you want
                to assign your tokens to. (1) Simply stake ALT without
                assigning, to earn revenue-sharing rewards, (2) use the assign
                feature to select a staking pool if you want to participate in
                hedge liquidity provision, farming, or mining.
              </p>
              <p className="mt-4">
                Pools are not only available for ALT tokens only, other projects
                can list here soon once the mainnet is launched.
              </p>
              <div className="mt-4 flex justify-end">
                <div className="stake-all-pool-options">
                  <button className="text-white bg-button-gradient rounded-full px-8 py-2 border-t-none border-b-[1px] border-r-[1px] border-l-[1px] border-button-gradient hover:bg-purple hover:border-blue">
                    <span>Stake Assignment</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <button className="text-white bg-button-gradient mt-5 rounded-full px-8 py-2 border-t-none border-b-[1px] border-r-[1px] border-l-[1px] border-button-gradient hover:bg-purple hover:border-blue">
          <span>Stake Now</span>
        </button> */}
    </div>
  );
};

export default StakingPanel;
