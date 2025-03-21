'use client';
import {
  FormControl,
  FormLabel,
  Switch,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { FaEthereum } from 'react-icons/fa';
import AssetsValues from '../wallet/AssetsValues';
import { useActiveAccount } from 'thirdweb/react';
import { ethers } from 'ethers';
import AsylumStakingPoolABI from '@/abi/AsylumStakingPool.abi.json';
import { Constants } from '@/abi/constants';
import BookmarkAdded from '../BookmarkAdded';

function UserAssets() {
  const [isSwitched, setIsSwitched] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [stakedBalance, setStakedBalance] = useState(0);
  const [stakeAmount, setStakeAmount] = useState('');
  const [isApproved, setIsApproved] = useState(false);
  const [buttonText, setButtonText] = useState('APPROVE');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [epoch, setEpoch] = useState('0.00'); // todo: app doesn't set epoch, only reads it (value is whole number integer)
  const [ethInPool, setEthInPool] = useState('0.00');
  const [buyBackPercentage, setBuyBackPercentage] = useState('0.00');
  const [teamPercentage, setTeamPercentage] = useState('0.00');
  const [walletAsylumBalance, setWalletAsylumBalance] = useState('0.00'); // todo: display user's contract balance
  const [stakedAsylumBalance, setStakedAsylumBalance] = useState('0.00'); // todo: display user's staked balance
  const { isOpen, onOpen, onClose } = useDisclosure();
  const wallet = useActiveAccount();
  const connectedAddress = wallet?.address;
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = web3Provider.getSigner();
      setProvider(web3Provider);
      setSigner(signer);
    }
  }, []);

  const AsylumToken = useMemo(() => {
    if (!provider || !signer) return null;
    return new ethers.Contract(
      Constants.testnet.AsylumToken,
      AsylumStakingPoolABI,
      signer
    );
  }, [provider, signer]);

  const AsylumStakingPool = useMemo(() => {
    if (!provider || !signer) return null;
    return new ethers.Contract(
      Constants.testnet.AsylumStakingPool,
      AsylumStakingPoolABI,
      signer
    );
  }, [provider, signer]);

  const WETH = useMemo(() => {
    if (!provider) return null;
    return new ethers.Contract(
      Constants.testnet.WETH,
      AsylumStakingPoolABI,
      provider
    );
  }, [provider]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!AsylumStakingPool || !WETH || !AsylumToken || !connectedAddress)
          return;

        const epoch = await AsylumStakingPool.epoch();
        setEpoch(ethers.utils.formatUnits(epoch, 0));

        const ethBalance = await WETH.balanceOf(
          Constants.testnet.AsylumStakingPool
        );
        setEthInPool(ethers.utils.formatEther(ethBalance));

        const buyBackPercentage = await AsylumStakingPool.buyBackPercentage();
        setBuyBackPercentage(ethers.utils.formatUnits(buyBackPercentage, 0));

        const teamPercentage = await AsylumStakingPool.teamPercentage();
        setTeamPercentage(ethers.utils.formatUnits(teamPercentage, 0));

        const asylumBalance = await AsylumToken.balanceOf(connectedAddress);
        setWalletAsylumBalance(ethers.utils.formatEther(asylumBalance));

        const stakedAsylumBalance =
          await AsylumStakingPool.balanceOf(connectedAddress);
        setStakedAsylumBalance(ethers.utils.formatEther(stakedAsylumBalance));
      } catch (error) {
        console.error('Error fetching asset values:', error);
      }
    };

    if (connectedAddress) {
      fetchData();
    }
  }, [connectedAddress, AsylumStakingPool, AsylumToken, WETH]);

  useEffect(() => {
    if (wallet && AsylumToken && AsylumStakingPool) {
      AsylumToken.balanceOf(wallet.address).then((balance) => {
        setWalletBalance(ethers.utils.formatEther(balance));
      });

      AsylumStakingPool.stakedAmounts(wallet.address).then((balance) => {
        setStakedBalance(ethers.utils.formatEther(balance));
      });

      AsylumToken.allowance(wallet.address, AsylumStakingPool.address).then(
        (allowance) => {
          if (ethers.utils.formatEther(allowance) > 0) {
            setIsApproved(true);
            setButtonText('STAKE');
          }
        }
      );
    }
  }, [wallet, AsylumToken, AsylumStakingPool]);

  const switchHandler = () => {
    setIsSwitched(!isSwitched);
  };

  const handleApprove = async () => {
    setLoading(true);
    try {
      if (!isApproved && AsylumToken) {
        const tx = await AsylumToken.approve(
          AsylumStakingPool.address,
          ethers.utils.parseEther(stakeAmount)
        );
        await tx.wait();
        setIsApproved(true);
        setButtonText('STAKE');
        setStatus('success');
        setMessage('Approval successful!');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Approval failed.');
      console.error('Approval failed', error);
    } finally {
      setLoading(false);
      onOpen();
    }
  };

  const handleStake = async () => {
    setLoading(true);
    try {
      if (isApproved && AsylumStakingPool) {
        const tx = await AsylumStakingPool.stake(
          ethers.utils.parseEther(stakeAmount)
        );
        await tx.wait();
        setStatus('success');
        setMessage('Stake successful!');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Staking failed.');
      console.error('Staking failed', error);
    } finally {
      setLoading(false);
      onOpen();
    }
  };

  const handleUnstake = async () => {
    setLoading(true);
    try {
      if (parseFloat(stakeAmount) > parseFloat(stakedBalance)) {
        throw new Error('Unstake amount exceeds staked balance');
      }

      const tx = await AsylumStakingPool.unstake(
        ethers.utils.parseEther(stakeAmount)
      );
      await tx.wait();
      setMessage('Unstake successful');
    } catch (error) {
      console.error('Unstaking failed', error);
      setMessage(error.message || 'Unstaking failed');
    } finally {
      setLoading(false);
      onOpen();
    }
  };

  const handleButtonClick = () => {
    if (isSwitched) {
      handleUnstake();
    } else if (isApproved) {
      handleStake();
    } else {
      handleApprove();
    }
  };

  const handleStakeAmountChange = (e) => {
    const value = e.target.value;
    if (isSwitched && parseFloat(value) > parseFloat(stakedBalance)) {
      alert('Unstake amount exceeds your staked balance');
    } else if (!isSwitched && parseFloat(value) > parseFloat(walletBalance)) {
      alert('Amount exceeds wallet balance');
    } else {
      setStakeAmount(value);
    }
  };

  return (
    <div className="flex flex-col gap-6 md:gap-12 lg:gap-12 lg:pb-20 relative md:flex-row justify-between items-center px-8 pt-8 max-w-screen-2xl mx-auto">
      <div className="border-2 bg-black rounded-xl border-grey w-full p-4 hover:border-animate">
        <FormControl display="flex" alignItems="center">
          <Switch
            isChecked={isSwitched}
            onChange={switchHandler}
            id="mode-switch"
          />
          <FormLabel htmlFor="mode-switch" mb="0" ml={2} className="text-grey">
            {isSwitched ? 'Unstaking mode' : 'Staking mode'}
          </FormLabel>
        </FormControl>
        <div className="text-grey text-3xl md:text-5xl lg:text-7xl mt-5">
          {isSwitched ? 'Unstake Tokens' : 'Stake Tokens'}
        </div>
        {isSwitched ? (
          <motion.div
            className="w-full  py-5"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
          >
            <input
              type="text"
              placeholder="Amount..."
              value={stakeAmount}
              onChange={handleStakeAmountChange}
              className="border-[1px] bg-[#71637f4d] text-grey mt-5 rounded-xl border-grey p-2 focus:outline-lime w-full"
            />
            <div className="flex w-full">
              <button
                className="text-white m-auto bg-light-purple mx-auto mt-5 px-8 p-2 rounded-full border-t-none border-b-[1px] border-r-[1px] border-l-[1px] border-button-gradient hover:bg-purple hover:border-lime"
                onClick={handleButtonClick}
                disabled={loading}
              >
                {loading ? <Spinner /> : 'Unstake'}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="w-full py-5"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <div className="text-grey mt-5 md:w-[100%]">
              <input
                type="text"
                placeholder="Amount..."
                value={stakeAmount}
                onChange={handleStakeAmountChange}
                className="border-[1px] bg-[#71637f4d] mt-5 rounded-xl border-grey p-2 focus:outline-lime w-full"
              />

              <div className="flex w-full">
                <button
                  className="text-white bg-floral mx-auto mt-5 px-8 p-2 rounded-full border-t-none border-b-[1px] border-r-[1px] border-l-[1px] border-button-gradient hover:bg-purple hover:border-lime"
                  onClick={handleButtonClick}
                  disabled={loading}
                >
                  {loading ? <Spinner /> : buttonText}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="w-full border-2 rounded-xl border-grey lg:py-9 p-4 flex gap-2 hover:border-animate">
        <div className="w-full">
          <div className="w-full flex justify-between gap-5">
            <div className="w-full flex justify-between">
              <p className="text-grey text-3xl"></p>
              <p className="text-light-purple">
                {wallet?.address.slice(0, 6) +
                  '...' +
                  wallet?.address.slice(-4)}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-full">
              <AssetsValues label="Epoch" value={epoch} />
              <AssetsValues label="ETH in pool" value={ethInPool} />
              <AssetsValues
                label="$ALT Buyback"
                value={`${buyBackPercentage}%`}
              />
              <AssetsValues
                label="Team Percentage"
                value={`${teamPercentage}%`}
              />
            </div>
            <div className="w-full mt-4">
              <div className="flex justify-between my-2">
                <p className="text-lg text-grey">Staked</p>
                <div className="flex items-center gap-2">
                  <p className="text-grey"> $ALT {stakedBalance}</p>
                </div>
              </div>

              <div className="flex justify-between my-2">
                <p className="text-lg text-grey">Wallet</p>
                <div className="flex items-center gap-2">
                  <p className="text-grey"> $ALT {walletBalance}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={'#000'}>
          <ModalHeader bg={'#000'} color={'white'}>
            {status === 'success' ? 'Success' : 'Error'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody bg={'#000'}>
            {loading ? (
              <Spinner />
            ) : (
              <BookmarkAdded
                message={message}
                status={status}
                setShowPopup={onClose}
              />
            )}
          </ModalBody>

          <ModalFooter>
            <button
              className="bg-gradient-button text-white px-4 py-2 rounded mt-4"
              onClick={onClose}
            >
              Close
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default UserAssets;
