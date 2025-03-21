import NetworkChecker from '@/components/ConnectWallet/NetworkChecker';
import './globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { ThirdwebProvider } from 'thirdweb/react';

export const metadata = {
  title: 'Asylum Labs | DeFi redefined',
  description:
    'Unlock liquidity and manage risk seamlessly with Asylum Labs, the future of DeFi. Use any ERC-20 token as collateral, lend tokens for a DeFi cash advance, or trade options & swaps using our next-gen hedging tools.',
  url: 'https://www.app.asylum-labs.io',
  image: '/public/asylum-meta-image.png',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=nippo@200,300,400,500,700&display=swap"
          rel="stylesheet"
        />

        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link
          rel="icon"
          type="image/png"
          href="/public/favicon/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/public/favicon/favicon.svg"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/public/favicon/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Asylum" />
        <link rel="shortcut icon" href="/public/favicon/favicon.ico" />
        <link rel="manifest" href="/public/favicon/site.webmanifest" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />
        <meta property="og:url" content={metadata.url} />
        <meta name="twitter:card" content={metadata.image} />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image} />
      </head>
      <body>
        <ThirdwebProvider>
          <NetworkChecker />
          <ChakraProvider>{children}</ChakraProvider>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
