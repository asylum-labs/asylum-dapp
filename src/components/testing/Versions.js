import { Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
const SoftwareVersions = () => {
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const entryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  const versions = [
    {
      id: 1,
      name: 'Asylum Labs Testnet - Genesis 🌱',
      image: '/android-bug.svg',
      date: 'Feb 10, 2024',
      state: 'COMPLETED',
      network: 'ETHEREUM GOERLI TESTNET',
    },
    {
      id: 2,
      name: 'Asylum Labs Testnet - Stellar 🌠',
      image: '/android-bug.svg',
      date: 'Mar 18, 2024',
      state: 'COMPLETED',
      network: 'ETHEREUM GOERLI TESTNET',
    },
    {
      id: 3,
      name: 'Asylum Labs Testnet - Nebula 🌌',
      image: '/android-bug.svg',
      date: 'Sep 6, 2024',
      state: 'COMPLETED',
      network: 'BASE SEPOLIA TESTNET',
    },
    {
      id: 4,
      name: 'Asylum Labs Testnet - Terra 🌏',
      image: '/android-bug.svg',
      date: 'Dec 20, 2024',
      state: 'COMPLETED',
      network: 'BASE SEPOLIA TESTNET',
    },
    {
      id: 5,
      name: 'Asylum Labs Testnet - Orbit 🚀',
      image: '/android-bug.svg',
      date: 'March 1, 2025',
      state: 'UPCOMING',
      network: 'BASE SEPOLIA TESTNET',
    },
  ];

  return (
    <div className="software-versions p-4 text-grey px-8 pt-8 md:px-20 max-w-screen-2xl mx-auto">
      <motion.div
        className="header flex justify-between border-b-2 border-gray-300 pb-2 mb-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={headerVariants}
        transition={{ duration: 0.6 }}
      >
        <div className="version font-bold">Version</div>
        <div className="name font-bold">Name</div>
        <div className="portal-widget font-bold">Portal Widget</div>
      </motion.div>
      {versions.map((version, index) => (
        <motion.div
          key={index}
          className="entry flex justify-between mb-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={entryVariants}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <div className="version w-1/4">
            <h3 className="text-lg text-lime">{`{ ${version.id} } `}</h3>
            <div className="text-sm text-gray-600">{version.date}</div>
          </div>
          <div className="name w-1/2 px-4">
            <h3 className="text-lg">{version.name}</h3>
            <p className="text-sm text-gray-600 md:w-[80%]">
              {version.network}
            </p>
          </div>
          <div className="portal-widget w-1/4">
            <a href={version.image} target="_blank" rel="noopener noreferrer">
              <Image
                src={version.image}
                alt={version.name}
                className="w-full"
              />
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SoftwareVersions;
