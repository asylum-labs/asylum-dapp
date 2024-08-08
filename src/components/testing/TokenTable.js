import MockERC20FactoryABI from '@/abi/MockERC20Factory.abi.json';
import { Constants } from '@/abi/constants';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FaCopy } from 'react-icons/fa';
import BookmarkAdded from '../BookmarkAdded';
import { sendTransaction } from '@/helpers/sponsoredTransaction';

const TokenTable = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [referralAddress, setReferralAddress] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [tokens, setTokens] = useState([
    // Token data...
  ]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        alert('Address copied to clipboard!');
      },
      (err) => {
        alert('Failed to copy the address.');
      }
    );
  };

  const tableVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const glitchVariants = {
    visible: {
      textShadow: [
        '1px 1px 0px lime',
        '-1px -1px 0px purple',
        '1px -1px 0px lime',
        '-1px 1px 0px lime',
        '2px 2px 2px lime',
      ],
      transition: {
        duration: 0.2,
        repeat: Infinity,
        repeatType: 'mirror',
      },
    },
  };

  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    const provider =
      window.ethereum != null
        ? new ethers.providers.Web3Provider(window.ethereum)
        : ethers.providers.getDefaultProvider();
    const factoryContract = new ethers.Contract(
      Constants.testnet.MockERC20FactoryContractAddress,
      MockERC20FactoryABI,
      provider
    );

    const fetchTokenSupply = async () => {
      try {
        const updatedTokens = await Promise.all(
          tokens.map(async (token) => {
            const totalSupply = await factoryContract.getTotalSupply(
              token.address
            );
            return {
              ...token,
              supply: ethers.utils.formatUnits(totalSupply, 18),
            };
          })
        );
        setTokens(updatedTokens);
      } catch (error) {
        console.error('Error fetching token supply:', error);
      }
    };

    fetchTokenSupply();
  }, []);

  const handleClaim = async (tokenAddress) => {
    if (!window.ethereum) {
      setError('Please install MetaMask!');
      return;
    }

    setLoading(true);
    setError(null);
    onOpen();

    try {
      let functionName = 'claimInitial';
      let args = [tokenAddress];

      if (referralAddress) {
        functionName = 'claimInitialWithReferral';
        args = [tokenAddress, referralAddress];
      }

      await sendTransaction(functionName, args);

      setShowPopup(true);
      setMessage('Token claimed successfully!');
      setStatus('success');

      // Refresh token supply after claim
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const factoryContract = new ethers.Contract(
        Constants.testnet.MockERC20FactoryContractAddress,
        MockERC20FactoryABI,
        provider
      );
      const updatedSupply = await factoryContract.getTotalSupply(tokenAddress);
      const formattedSupply = ethers.utils.formatUnits(updatedSupply, 18);

      setTokens((prevTokens) =>
        prevTokens.map((token) =>
          token.address === tokenAddress
            ? { ...token, supply: formattedSupply }
            : token
        )
      );
    } catch (error) {
      if (
        error.code === ethers.errors.UNPREDICTABLE_GAS_LIMIT &&
        error.reason.includes('Already claimed initial tokens')
      ) {
        try {
          await sendTransaction('claimTokens', [tokenAddress]);

          setShowPopup(true);
          setMessage('Weekly tokens claimed successfully!');
          setStatus('success');

          // Refresh token supply after claim
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const factoryContract = new ethers.Contract(
            Constants.testnet.MockERC20FactoryContractAddress,
            MockERC20FactoryABI,
            provider
          );
          const updatedSupply =
            await factoryContract.getTotalSupply(tokenAddress);
          const formattedSupply = ethers.utils.formatUnits(updatedSupply, 18);
          setTokens((prevTokens) =>
            prevTokens.map((token) =>
              token.address === tokenAddress
                ? { ...token, supply: formattedSupply }
                : token
            )
          );
        } catch (weeklyClaimError) {
          setMessage('Failed to claim weekly tokens. Please try again.');
          setStatus('failed');
          console.error('Error claiming weekly tokens:', weeklyClaimError);
        }
      } else {
        setMessage('Failed to claim token.');
        setStatus('failed');
        console.error('Error claiming token:', error);
        setError('Failed to claim token. Please try again.');
      }
    }

    setLoading(false);
  };

  return (
    <div className="overflow-x-auto overflow-y-hidden mt-10 px-8 pt-8 md:px-20 max-w-screen-2xl mx-auto">
      <motion.h1 className="text-3xl text-grey">
        <motion.span
          variants={glitchVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          Claim
        </motion.span>{' '}
        Testnet Tokens
      </motion.h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter referral address (optional)"
          value={referralAddress}
          onChange={(e) => setReferralAddress(e.target.value)}
          className="w-full bg-[#26222B] p-2 border text-grey border-gray-300 rounded mt-4"
        />
      </div>
      <motion.table
        ref={ref}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={tableVariants}
        className="min-w-full bg-black border rounded mt-10 text-grey"
      >
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">NAME</th>
            <th className="py-2 px-4 border-b text-left">SYMB</th>
            <th className="py-2 px-4 border-b text-left">ADDR</th>
            <th className="py-2 px-4 border-b text-left">PAIR</th>
            <th className="py-2 px-4 border-b text-left">SUPPLY</th>
            <th className="py-2 px-4 border-b text-left">CTA</th>
          </tr>
        </thead>
        <motion.tbody variants={tableVariants}>
          {tokens.map((token, index) => (
            <motion.tr key={index} variants={rowVariants}>
              <motion.td className="py-2 px-4 border-b text-left">
                {token.name}
              </motion.td>
              <motion.td className="py-2 px-4 border-b text-left">
                {token.symbol}
              </motion.td>
              <motion.td className="py-2 px-4 border-b text-left">
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href={`https://sepolia.basescan.org/address/${token.address}`}
                >
                  {token.address.slice(0, 14)}...
                </a>

                <button
                  className="ml-2 bg-black text-white px-2 py-1 rounded hover:text-lime-400"
                  onClick={() => copyToClipboard(token.address)}
                >
                  <FaCopy />
                </button>
              </motion.td>
              <motion.td
                className="py-2 px-4 border-b text-left"
                variants={glitchVariants}
              >
                {token.pair}
              </motion.td>
              <motion.td className="py-2 px-4 border-b text-left">
                {token.supply}
              </motion.td>
              <motion.td className="py-2 px-4 border-b text-left">
                {token.name === 'WETH' ? (
                  <p>
                    visit
                    <a
                      className="text-light-purple mx-1 hover:text-lime-400"
                      href="https://www.alchemy.com/faucets/base-sepolia"
                    >
                      Alchemy Faucet
                    </a>{' '}
                    to claim testnet ETH
                  </p>
                ) : (
                  <div className="flex items-center gap-2">
                    {token.symbol !== 'WETH' ? (
                      <button
                        className="bg-black flex items-center gap-2 border-dashed border-light-purple border-2 text-white px-8 py-2 rounded-full hover:text-lime-400"
                        onClick={() => handleClaim(token.address)}
                      >
                        Claim
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                )}
              </motion.td>
            </motion.tr>
          ))}
        </motion.tbody>
      </motion.table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={'#000'}>
          <ModalHeader bg={'#000'} color={'white'}>
            Claim Token
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody bg={'#000'}>
            {loading ? (
              <Spinner />
            ) : (
              <BookmarkAdded
                message={message}
                status={status}
                setShowPopup={setShowPopup}
              />
            )}
          </ModalBody>

          <ModalFooter>
            <button
              className="
              bg-gradient-button text-white px-4 py-2 rounded mt-4
              "
              onClick={onClose}
            >
              Close
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {showPopup && (
        <Modal isOpen={showPopup} onClose={() => setShowPopup(false)}>
          <BookmarkAdded
            message={message}
            status={status}
            setShowPopup={setShowPopup}
          />
        </Modal>
      )}

      <p className="text-grey text-lg mt-5">
        We require: Metamask, testnet ETH on Base Sepolia, and Testnet ERC20
        tokens to test the platform. Make sure to claim ETH from{' '}
        <a
          target="_blank"
          rel="noreferrer noopener"
          className="text-light-purple mx-1 hover:text-lime-400"
          href="https://www.alchemy.com/faucets/base-sepolia"
        >
          Alchemy Faucet
        </a>{' '}
        . Your initial token claim includes 1 WETH, which is required for
        opening trades as all tokens are paired with WETH. These tokens are for
        testing purposes only. They hold no value outside of the Xeon Protocol
        Testnet.
      </p>
    </div>
  );
};

export default TokenTable;
