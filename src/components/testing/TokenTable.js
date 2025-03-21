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

const TokenTable = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [referralAddress, setReferralAddress] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [txHash, setTxHash] = useState('');
  const [txChainId, setTxChainId] = useState('');
  const [tokens, setTokens] = useState([
    {
      name: 'Vela Exchange',
      symbol: 'oVELA',
      address: '0xb7E16D46f26B1615Dcc501931F28F07fD4b0D7F4',
      pair: 'WETH',
      supply: '100,000,000',
    },
    {
      name: 'Pepe',
      symbol: 'oPEPE',
      address: '0x7dC9ecE25dcCA41D8a627cb47ded4a9322f7722b',
      pair: 'WETH',
      supply: '100,000,000',
    },
    {
      name: 'Degen',
      symbol: 'oDEGEN',
      address: '0x9B9852A943a570685c3704d70C4F1ebD5EdE109B',
      pair: 'WETH',
      supply: '100,000,000',
    },
    {
      name: 'Higher',
      symbol: 'oHIGHER',
      address: '0x9855d38b7E6270B9f22F283A0C62330b16Ac909C',
      pair: 'WETH',
      supply: '100,000,000',
    },
    {
      name: 'Rorschach',
      symbol: 'oROR',
      address: '0xEb2DCAFFFf1b0d5BA76F14Fe6bB8348126339FcB',
      pair: 'WETH',
      supply: '100,000,000',
    },
    {
      name: 'Wrapped Ether',
      symbol: 'WETH',
      address: '0x395cB7753B02A15ed1C099DFc36bF00171F18218',
      pair: 'WETH',
      supply: '134,000',
    },
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
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const claimContract = new ethers.Contract(
        Constants.testnet.onboardingUtilsContractAddress,
        [
          'function claimInitial(address tokenAddress) public',
          'function claimInitialWithReferral(address tokenAddress, address referredByAddress) public',
          'function claimTokens(address tokenAddress) public',
        ],
        signer
      );

      let transaction;
      if (referralAddress) {
        transaction = await claimContract.claimInitialWithReferral(
          tokenAddress,
          referralAddress
        );
      } else {
        transaction = await claimContract.claimInitial(tokenAddress);
      }

      await transaction.wait();
      setShowPopup(true);
      setMessage('Token claimed successfully!');
      setStatus('success');

      // Refresh token supply after claim
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
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const claimContract = new ethers.Contract(
            Constants.testnet.onboardingUtilsContractAddress,
            ['function claimTokens(address tokenAddress) public'],
            signer
          );

          const transaction = await claimContract.claimTokens(tokenAddress);
          await transaction.wait();

          setTxHash(transaction.hash);
          setTxChainId(transaction.chainId);
          setShowPopup(true);
          setMessage('Weekly tokens claimed successfully!');
          setStatus('success');

          // Refresh token supply after claim
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
      <h1 className="text-3xl text-grey">Claim Testnet Tokens</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter referral address (optional)"
          value={referralAddress}
          onChange={(e) => setReferralAddress(e.target.value)}
          className="w-full bg-[#26222B] p-2 border text-grey border-gray-300 rounded mt-4"
        />
      </div>
      <table
        ref={ref}
        className="min-w-full bg-black border rounded mt-10 text-grey"
      >
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">NAME</th>
            <th className="py-2 px-4 border-b text-left">SYMB</th>
            <th className="py-2 px-4 border-b text-left">ADDR</th>
            <th className="py-2 px-4 border-b text-left">PAIR</th>
            <th className="py-2 px-4 border-b text-left">SUPPLY</th>
            <th className="py-2 px-4 border-b text-left">{''}</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b text-left">{token.name}</td>
              <td className="py-2 px-4 border-b text-left">{token.symbol}</td>
              <td className="py-2 px-4 border-b text-left">
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href={`https://sepolia.basescan.org/address/${token.address}`}
                >
                  {token.address.slice(0, 6)}...{token.address.slice(-4)}
                </a>
                <button
                  className="ml-2 bg-black text-white px-2 py-1 rounded hover:text-lime-400"
                  onClick={() => copyToClipboard(token.address)}
                >
                  <FaCopy />
                </button>
              </td>
              <td className="py-2 px-4 border-b text-left">{token.pair}</td>
              <td className="py-2 px-4 border-b text-left">{token.supply}</td>
              <td className="py-2 px-4 border-b text-left">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
            txHash={txHash}
            txChainId={txChainId}
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
        testing purposes only. They hold no value outside of the Asylum Labs
        Testnet.
      </p>
    </div>
  );
};

export default TokenTable;
