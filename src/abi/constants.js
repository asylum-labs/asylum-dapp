// global contract addresses
export const Constants = {
  testnet: {
    network: 'Base Sepolia',
    chainId: 84532,
    baseSepoliaScan: 'https://sepolia.basescan.org',
    baseSepoliaScanAPI: 'https://api-sepolia.basescan.org/api',
    onboardingUtilsContractAddress:
      '0x88232810891E015161D3e57C1E5A5DA2376407d5',
    MockERC20FactoryContractAddress:
      '0x5A0d5390c45b49505C43A56DA4A4f89b93023F11',
    PriceOracleAddress: '0xcdea17068968a1a989a0d21e28c5c61ff220fe7e',
    WETH: '0x395cB7753B02A15ed1C099DFc36bF00171F18218',
    AsylumToken: '0x296dBB55cbA3c9beA7A8ac171542bEEf2ceD1163',
    AsylumTokenDistributor: '0x5e401a28d129ee2aa22d58ea9aec9a146027566b',
    AsylumHedging: '0x6Fc917A5588123609B301F528Be107BcbB2f35A4', // AsylumHedging_Test_V1
    AsylumStakingPool: '0x949B2156916A63686835DaF66518C22D497bf8B0',
  },
  ethereum: {
    network: 'Ethereum',
    chainId: 1,
    baseMainnetScan: 'https://etherscan.io',
    baseMainnetScanAPI: 'https://api.etherscan.io/api',
    WETH: '0xMainnetWETHAddressHere',
    AsylumToken: '0x8d65a2eaBDE4B31cbD7E43F27E47559d1CCec86c',
    AsylumHedging: '0xAsylumHedgingEthereumAddress',
    AsylumStaking: '0xAsylumStakingEthereumAddress',
    PriceOracle: '0xPriceOracleEthereumAddress',
  },
  base: {
    network: 'Base',
    chainId: 8453,
    baseMainnetScan: 'https://basescan.org',
    baseMainnetScanAPI: 'https://api.basescan.org/api',
    WETH: '0xMainnetWETHAddressHere',
    AsylumToken: '0xAsylumTokenBaseAddress',
    AsylumHedging: '0xAsylumHedgingBaseAddress',
    AsylumStaking: '0xAsylumStakingBaseAddress',
    PriceOracle: '0xPriceOracleBaseAddress',
  },
};
