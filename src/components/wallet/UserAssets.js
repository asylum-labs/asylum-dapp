'use client';
import { FormControl, FormLabel, Switch } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { FaEthereum } from 'react-icons/fa';
import AssetsValues from './AssetsValues';
import { ethers } from 'ethers';
import {
  useActiveAccount,
  useActiveWalletChain,
  useDisconnect,
  useWallet,
} from 'thirdweb/react';
import {
  useApprovedBalanceOfToken,
  useSwitchActiveWalletChain,
} from 'thirdweb/wallets';
import { formatUnits } from 'ethers';
import { baseSepolia } from 'thirdweb/chains';
import { Constants } from '@/abi/constants';
import AsylumStakingPoolABI from '@/abi/AsylumStakingPool.abi.json';

const variants = {
  hidden: { x: -1000 },
  visible: {
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const UserAssets = () => {
  const [activeTab, setActiveTab] = useState('Assets');
  const [totalEarned, setTotalEarned] = useState('0.00');
  const [totalClaimed, setTotalClaimed] = useState('0.00');
  const [walletAsylumBalance, setWalletAsylumBalance] = useState('0.00'); // todo: display user's contract balance
  const [stakedAsylumBalance, setStakedAsylumBalance] = useState('0.00'); // todo: display user's staked balance
  const [wethBalance, setWethBalance] = useState('0.00');
  const [epoch, setEpoch] = useState(0);
  const [teamFee, setTeamFee] = useState('0.00');
  const [buybackFee, setBuybackFee] = useState('0.00');
  const [isApproved, setIsApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUnstaking, setIsUnstaking] = useState(false);
  const wallet = useWallet();
  const activeChain = useActiveWalletChain();
  const switchChain = useSwitchActiveWalletChain();
  const connectedAccount = useActiveAccount();
  const connectedAddress = connectedAccount?.address;
  const { disconnect } = useDisconnect();

  const AsylumToken = useMemo(() => {
    if (!window.ethereum) return null;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(
      Constants.testnet.AsylumToken,
      AsylumStakingPoolABI,
      signer
    );
  }, []);

  const AsylumStakingPool = useMemo(() => {
    if (!window.ethereum) return null;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(
      Constants.testnet.AsylumStakingPool,
      AsylumStakingPoolABI,
      signer
    );
  }, []);

  const WETH = useMemo(() => {
    if (!window.ethereum) return null;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(
      Constants.testnet.WETH,
      AsylumStakingPoolABI,
      signer
    );
  }, []);

  useEffect(() => {
    if (!AsylumStakingPool || !WETH || !AsylumToken || !connectedAddress)
      return;
    const fetchData = async () => {
      try {
        const epoch = await AsylumStakingPool.epoch();
        setEpoch(epoch.toString());
        const IERC20 = AsylumToken.interface;
        const encodedData = IERC20.encodeFunctionData('balanceOf', [
          Constants.testnet.AsylumStakingPool,
        ]);
        const buyBackPercentage = await AsylumStakingPool.buyBackPercentage();
        setBuybackFee(buyBackPercentage.toString());
        const teamPercentage = await AsylumStakingPool.teamPercentage();
        setTeamFee(teamPercentage.toString());
        const asylumBalance = await AsylumToken.balanceOf(connectedAddress);
        setWalletAsylumBalance(ethers.utils.formatEther(asylumBalance));
        // get stakedAsylumBalance
        const stakedAsylumBalance =
          await AsylumStakingPool.balanceOf(connectedAddress);
        setStakedAsylumBalance(ethers.utils.formatEther(stakedAsylumBalance));
        // get weth balance
        const wethBalance = await WETH.balanceOf(connectedAddress);
        setWethBalance(ethers.utils.formatEther(wethBalance));
      } catch (error) {
        console.error('Error fetching epoch: ', error);
      }
    };
    fetchData();
  }, [connectedAddress, AsylumStakingPool, AsylumToken, WETH]);

  // Check if we have already approved the tokens for staking
  useEffect(() => {
    if (wallet && AsylumToken && AsylumStakingPool) {
      AsylumToken.balanceOf(wallet.address).then((balance) => {
        setWalletAsylumBalance(ethers.utils.formatEther(balance));
      });

      // Staked balance
      AsylumStakingPool.stakedAmounts(wallet.address).then((balance) => {
        setStakedAsylumBalance(ethers.utils.formatEther(balance));
      });

      AsylumToken.allowance(wallet.address, AsylumStakingPool.address).then(
        (allowance) => {
          console.log('ALLOWANCE: ', allowance);
          setIsApproved(allowance.gt(ethers.utils.parseEther('1000000000')));
        }
      );
    }
  }, [wallet, AsylumToken, AsylumStakingPool]);

  /**
   * Handle token approval for token staking
   */
  const handleApprove = async () => {
    setIsLoading(true);
    try {
      if (!isApproved && AsylumToken) {
        const tx = await AsylumToken.approve(
          AsylumStakingPool.address,
          ethers.constants.MaxUint256
        );
        await tx.wait();
        setIsApproved(true);
      }
    } catch (error) {
      console.error('Error approving tokens: ', error);
    }
    setIsLoading(false);
  };

  /**
   * Handle staking tokens
   */
  const handleStake = async () => {
    setIsLoading(true);
    try {
      if (isApproved && AsylumStakingPool) {
        const tx = await AsylumStakingPool.stake(
          ethers.utils.parseEther('100')
        );
        await tx.wait();
        const balance = await AsylumToken.balanceOf(wallet.address);
        setWalletAsylumBalance(ethers.utils.formatEther(balance));
        const stakedBalance = await AsylumStakingPool.stakedAmounts(
          wallet.address
        );
        setStakedAsylumBalance(ethers.utils.formatEther(stakedBalance));
      }
    } catch (error) {
      console.error('Error staking tokens: ', error);
    }
    setIsLoading(false);
  };

  /**
   * Handle unstaking tokens
   */
  const handleUnstake = async () => {
    setIsUnstaking(true);
    try {
      const tx = await AsylumStakingPool.unstake(
        ethers.utils.parseEther('100')
      );
      await tx.wait();
      const balance = await AsylumToken.balanceOf(wallet.address);
      setWalletAsylumBalance(ethers.utils.formatEther(balance));
      const stakedBalance = await AsylumStakingPool.stakedAmounts(
        wallet.address
      );
      setStakedAsylumBalance(ethers.utils.formatEther(stakedBalance));
    } catch (error) {
      console.error('Error unstaking tokens: ', error);
    }
    setIsUnstaking(false);
  };

  const [isSwitched, setIsSwitched] = useState(false);

  const switchHandler = () => {
    setIsSwitched(!isSwitched);
  };

  return (
    <div className="flex flex-col gap-6 md:gap-12 lg:gap-12 lg:pb-20 relative md:flex-row justify-between items-center px-8 pt-8 max-w-screen-2xl mx-auto">
      <div className="border-2 rounded-xl border-grey w-full p-4 hover:border-animate">
        <FormControl display="flex" alignItems="center">
          <Switch
            isChecked={isSwitched}
            onChange={switchHandler}
            id="mode-switch"
          />
          <FormLabel htmlFor="mode-switch" mb="0" ml={2} className="text-grey">
            {isSwitched ? 'Withdrawing mode' : 'Depositing mode'}
          </FormLabel>
        </FormControl>

        {isSwitched ? (
          <motion.div
            className="w-full"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
          >
            <div className="text-grey text-3xl md:text-5xl lg:text-7xl mt-5">
              Withdraw Tokens
            </div>
            <div className="text-grey mt-5 md:w-[100%]">
              <input
                type="text"
                placeholder="Paste Address"
                className="border-[1px] bg-[#71637f4d] rounded-xl border-grey p-2 focus:outline-lime w-full"
              />
              <input
                type="text"
                placeholder="Amount..."
                className="border-[1px] bg-[#71637f4d] mt-5 rounded-xl border-grey p-2 focus:outline-lime w-full"
              />
              <div className="text-grey bg-[#71637f4d] rounded p-1 mt-5 flex justify-between md:w-[100%]">
                <p className="w-full text-lime">Deposited:</p>
                <p className="w-full text-floral">Withdrawn:</p>
              </div>
              <div className="flex w-full">
                <button className="text-white bg-floral mx-auto mt-5 px-8 p-2 rounded-full border-t-none border-b-[1px] border-r-[1px] border-l-[1px] border-button-gradient hover:bg-purple hover:border-lime">
                  Withdraw
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="w-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <div className="text-grey text-3xl md:text-5xl lg:text-7xl">
              Deposit Tokens
            </div>
            <div className="text-grey mt-5 md:w-[100%]">
              <input
                type="text"
                placeholder="Paste Address"
                className="border-[1px] bg-[#71637f4d] rounded-xl border-grey p-2 focus:outline-lime w-full"
              />
              <input
                type="text"
                placeholder="Amount..."
                className="border-[1px] bg-[#71637f4d] mt-5 rounded-xl border-grey p-2 focus:outline-lime w-full"
              />
              <div className="text-grey bg-[#71637f4d] rounded p-1 mt-5 flex justify-between md:w-[100%]">
                <p className="w-full text-lime">Deposited:</p>
                <p className="w-full text-floral">Withdrawn:</p>
              </div>
              <div className="flex w-full">
                <button className="text-white bg-[#71637f4d] mx-auto mt-5 px-8 p-2 rounded-full border-t-none border-b-[1px] border-r-[1px] border-l-[1px] border-button-gradient hover:bg-purple hover:border-lime">
                  Deposit
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      <div className="w-full border-2 rounded-xl border-grey lg:py-9 p-4 flex gap-2 hover:border-animate">
        <div className="w-full">
          <div className="w-full flex justify-between gap-5">
            {' '}
            <div className="flex justify-between w-full mb-5">
              {' '}
              <p className="text-lime text-3xl">Net Worth</p>
              <p className="text-grey text-3xl">$0.00</p>
            </div>
            <div className="w-full flex justify-between">
              <p className="text-grey text-3xl"></p>
              <p className="text-light-purple">0xa92..ce7</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-full">
              <AssetsValues label="Deposits" value="0.00" />
              <AssetsValues label="Dividents" value="0.00" />
              <AssetsValues label="Commision" value="0.00" />
              <AssetsValues label="Asylum" value="0.00" />
            </div>
            <div className="w-full ">
              <div className="flex justify-between my-2">
                <p className="text-lg text-grey">Staked</p>
                <div className="flex items-center gap-2">
                  <FaEthereum className="text-light-purple" />
                  <p className="text-grey">0.00</p>
                </div>
              </div>

              <div className="flex justify-between my-2">
                <p className="text-lg text-grey">Wallet</p>
                <div className="flex items-center gap-2">
                  <FaEthereum className="text-light-purple" />
                  <p className="text-grey">0.00</p>
                </div>
              </div>
              <div className="flex justify-between my-2">
                <p className="text-lg text-grey">Airdrop</p>
                <div className="flex items-center gap-2">
                  <FaEthereum className="text-light-purple" />
                  <p className="text-grey">0.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAssets;
