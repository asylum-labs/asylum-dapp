import { Box, Image } from '@chakra-ui/react';
import Link from 'next/link';
import { MdMail } from 'react-icons/md';

function Footer() {
  return (
    <Box fontWeight={'400'} position="relative" width="100%">
      <Image src="/line_footer.webp" alt="line footer" width="100%" />
      <Box
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        zIndex="0"
        height="300px"
        backgroundImage="url('/ellipse.webp')"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center"
      />
      <Box
        py={20}
        className=" z-2 w-full flex flex-wrap"
        position="relative"
        zIndex="2"
      >
        <Box className="w-full md:w-1/2 p-4" color="white" textAlign="left">
          <p>Xeon Protocol.</p>
          <p>ERC20 Hedging & Lending Ecosystem.</p>

          <div className="footer-social">
            <a
              href="https://linktr.ee/XeonProtocol"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 1V1C4.58172 1 1 4.58172 1 9V25C1 29.4183 4.58172 33 9 33V33M25 1V1C29.4183 1 33 4.58172 33 9V25C33 29.4183 29.4183 33 25 33V33"
                  className="line"
                />
                <path
                  d="M11 14.3337H14.8763L12.1206 11.7067L13.6454 10.139L16.2725 12.8396V9H18.5505V12.8396L21.1775 10.1451L22.7011 11.7067L19.9467 14.3276H23.8218V16.4954H19.9246L22.6975 19.1898L21.1775 20.7208L17.4115 16.9363L13.6454 20.7208L12.1206 19.196L14.8946 16.5015H11V14.3337ZM16.2663 19.6062H18.5444V24.7502H16.2663V19.6062Z"
                  fill="#F2F2F2"
                />
              </svg>
            </a>

            <a
              href="https://twitter.com/XeonProtocol"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 1V1C4.58172 1 1 4.58172 1 9V25C1 29.4183 4.58172 33 9 33V33M25 1V1C29.4183 1 33 4.58172 33 9V25C33 29.4183 29.4183 33 25 33V33"
                  className="line"
                />
                <g clip-path="url(#clip0_10_14)">
                  <path
                    d="M21.5867 10H24.04L18.6533 15.941L24.9467 24H20.008L16.1413 19.1026L11.7147 24H9.26133L14.968 17.6458L8.94133 10H14.0027L17.496 14.4738L21.5867 10ZM20.728 22.6052H22.088L13.288 11.3432H11.8267L20.728 22.6052Z"
                    fill="#F2F2F2"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_10_14">
                    <rect
                      width="16"
                      height="14"
                      fill="white"
                      transform="translate(9 10)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </a>
            <a
              href="https://warpcast.com/xeonprotocol"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 1V1C4.58172 1 1 4.58172 1 9V25C1 29.4183 4.58172 33 9 33V33M25 1V1C29.4183 1 33 4.58172 33 9V25C33 29.4183 29.4183 33 25 33V33"
                  className="line"
                />
                <path
                  d="M12.7969 11H9L12.5156 23H15.8203L17.3672 17.4688L18.9375 23H22.2656L25.7812 11H21.9844L20.5078 16.3906L19.0547 11H15.7266L14.2734 16.4375L12.7969 11Z"
                  fill="#F2F2F2"
                />
              </svg>
            </a>
            <a
              href="https://t.me/XeonProtocolPortal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 1V1C4.58172 1 1 4.58172 1 9V25C1 29.4183 4.58172 33 9 33V33M25 1V1C29.4183 1 33 4.58172 33 9V25C33 29.4183 29.4183 33 25 33V33"
                  className="line"
                />
                <path
                  d="M21.8064 11.436C21.8064 11.436 23.1015 10.931 22.9936 12.1574C22.9576 12.6624 22.6339 14.4299 22.382 16.3417L21.5186 22.005C21.5186 22.005 21.4467 22.8346 20.7991 22.9789C20.1516 23.1232 19.1803 22.4739 19.0004 22.3296C18.8565 22.2214 16.3023 20.5982 15.4029 19.8046C15.151 19.5882 14.8632 19.1553 15.4388 18.6503L19.2162 15.0432C19.6479 14.6103 20.0796 13.6003 18.2809 14.8267L13.2444 18.2535C13.2444 18.2535 12.6688 18.6142 11.5895 18.2896L9.25114 17.5682C9.25114 17.5682 8.38774 17.0271 9.86272 16.486C13.4602 14.7906 17.8852 13.0592 21.8064 11.436Z"
                  fill="#F2F2F2"
                />
              </svg>

              <svg
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 1V1C4.58172 1 1 4.58172 1 9V25C1 29.4183 4.58172 33 9 33V33M25 1V1C29.4183 1 33 4.58172 33 9V25C33 29.4183 29.4183 33 25 33V33"
                  className="line"
                />
                <path
                  d="M17.75 17C17.75 19.4853 15.7353 21.5 13.25 21.5C10.7647 21.5 8.75 19.4853 8.75 17C8.75 14.5147 10.7647 12.5 13.25 12.5C15.7353 12.5 17.75 14.5147 17.75 17Z"
                  fill="#F2F2F2"
                />
                <path
                  d="M25.25 17C25.25 19.071 24.9142 20.75 24.5 20.75C24.0858 20.75 23.75 19.071 23.75 17C23.75 14.9289 24.0858 13.25 24.5 13.25C24.9142 13.25 25.25 14.9289 25.25 17Z"
                  fill="#F2F2F2"
                />
                <path
                  d="M20.75 21.5C21.9927 21.5 23 19.4853 23 17C23 14.5147 21.9927 12.5 20.75 12.5C19.5073 12.5 18.5 14.5147 18.5 17C18.5 19.4853 19.5073 21.5 20.75 21.5Z"
                  fill="#F2F2F2"
                />
              </svg>
            </a>
            <a
              href="https://xeonprotocol.gitbook.io/xeon-protocol-documentation/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 1V1C4.58172 1 1 4.58172 1 9V25C1 29.4183 4.58172 33 9 33V33M25 1V1C29.4183 1 33 4.58172 33 9V25C33 29.4183 29.4183 33 25 33V33"
                  className="line"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19.9351 24.2886C19.9351 24.417 19.9754 24.5566 20.0713 24.6571C19.2352 24.881 18.3562 25 17.4492 25C16.5311 25 15.6418 24.8777 14.7962 24.6484C14.8135 24.6291 14.8291 24.6089 14.8431 24.5875C14.8559 24.5681 14.867 24.5479 14.8765 24.5274C14.9115 24.4516 14.9275 24.368 14.9275 24.2886C14.9275 24.1737 14.9255 23.9349 14.923 23.6253V23.5685L14.9217 23.4573L14.9197 23.2379L14.9139 22.3762C12.1045 22.9975 11.5116 21.1642 11.5116 21.1642C11.0521 19.9768 10.3901 19.661 10.3901 19.661C9.47367 19.0237 10.4593 19.0369 10.4593 19.0369C11.4733 19.1089 12.0073 20.0954 12.0073 20.0954C12.9081 21.6656 14.3701 21.2115 14.9465 20.9492C15.037 20.2856 15.2985 19.8319 15.5875 19.5754C13.3441 19.316 10.9863 18.435 10.9863 14.4991C10.9863 13.3776 11.3807 12.4616 12.0266 11.7419C11.9221 11.4833 11.5762 10.4384 12.1246 9.02382C12.1246 9.02382 12.9727 8.74757 14.9028 10.0765C15.3125 9.96086 15.7377 9.8744 16.1696 9.81676C16.357 9.79165 16.5455 9.7723 16.7345 9.7583C16.9663 9.74101 17.1985 9.73195 17.4307 9.73113C17.6489 9.73195 17.8675 9.74019 18.0857 9.75542C18.399 9.77724 18.7111 9.81429 19.0186 9.86617C19.1174 9.88305 19.2162 9.90116 19.3142 9.92093C19.3772 9.93369 19.4402 9.94686 19.5028 9.96086C19.6572 9.99544 19.8099 10.0341 19.9606 10.0765C21.8882 8.74757 22.7351 9.02382 22.7351 9.02382C23.2847 10.4384 22.9389 11.4833 22.8339 11.7419C23.4815 12.4616 23.8734 13.3776 23.8734 14.4991C23.8734 18.4444 21.5107 19.3131 19.2619 19.5676C19.6242 19.8862 19.947 20.5112 19.947 21.4696C19.947 22.3881 19.9417 23.1869 19.938 23.7167L19.9351 24.2886ZM10.9834 19.5433C11.055 19.5783 11.1341 19.563 11.1563 19.512C11.1818 19.4609 11.1398 19.3905 11.0666 19.3568C11.0513 19.3494 11.0357 19.3444 11.0204 19.3415C10.9986 19.337 10.978 19.3366 10.9591 19.3403C10.9278 19.3461 10.9031 19.3629 10.8924 19.3889C10.8772 19.4222 10.8887 19.463 10.9188 19.4963C10.9352 19.5149 10.9575 19.5313 10.9834 19.5433ZM11.5655 19.976C11.5174 20.0213 11.4231 20.0003 11.3593 19.9286C11.344 19.9126 11.3317 19.8953 11.3222 19.8772C11.3103 19.8541 11.3033 19.8306 11.3008 19.808C11.2967 19.7709 11.3062 19.7372 11.3296 19.715C11.379 19.6697 11.4704 19.6911 11.5367 19.7627C11.603 19.8352 11.6158 19.9299 11.5655 19.976ZM11.738 20.4791C11.8006 20.5705 11.9015 20.6112 11.9637 20.5676C12.0266 20.5227 12.0266 20.4132 11.9649 20.3206C11.9015 20.2296 11.8019 20.1905 11.7393 20.2341C11.6759 20.2782 11.6759 20.3877 11.738 20.4791ZM12.5092 21.139C12.4536 21.2012 12.3358 21.1847 12.2494 21.0999C12.1613 21.0172 12.1366 20.8994 12.1922 20.8373C12.2 20.8286 12.2086 20.8216 12.2185 20.8163L12.2337 20.8089L12.2531 20.8031C12.3132 20.7903 12.3914 20.8167 12.4536 20.8768C12.5413 20.9591 12.568 21.0777 12.5092 21.139ZM13.0094 21.5536C13.1238 21.5882 13.2371 21.5516 13.2618 21.4709C13.2852 21.3894 13.2103 21.2955 13.0963 21.2605C12.9814 21.2238 12.8673 21.2621 12.8435 21.3432C12.8299 21.3914 12.8509 21.4445 12.8941 21.4869C12.9233 21.5157 12.9633 21.5396 13.0094 21.5536ZM14.088 21.5326C14.0897 21.5759 14.0654 21.615 14.0255 21.6434C13.9868 21.671 13.9332 21.6883 13.874 21.6891C13.7533 21.692 13.6553 21.6232 13.6541 21.54C13.6541 21.4985 13.6763 21.461 13.713 21.433C13.7517 21.4029 13.8073 21.384 13.8698 21.3828C13.9897 21.3803 14.088 21.4482 14.088 21.5326ZM14.8192 21.5104C14.8489 21.477 14.8637 21.4379 14.8571 21.3992C14.8423 21.3152 14.7352 21.2658 14.6159 21.2868C14.5463 21.3 14.4878 21.3354 14.4549 21.3799C14.4326 21.4099 14.4224 21.4441 14.4285 21.4783C14.4433 21.5602 14.5516 21.6113 14.669 21.5894C14.7324 21.5775 14.7855 21.5479 14.8192 21.5104Z"
                  fill="#F2F2F2"
                />
              </svg>
            </a>
            <a href="mailto:info@xeon-protocol.io">
              <MdMail size={20} className="line" />
            </a>
          </div>
        </Box>
        <Box className="w-full md:w-1/6 p-4" textAlign="left">
          <p className="mb-2 text-grey">{`{ READ }`}</p>
          <li className="mb-2 text-grey">
            {' '}
            <Link
              href="https://docs.xeon-protocol.io/documentation"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </Link>
          </li>

          <li className="mb-2 text-grey">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="/Xeon-Protocol-WhitepaperV2.pdf"
            >
              Whitepaper
            </Link>
          </li>
          <li className="mb-2 text-grey">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://medium.com/@xeonprotocol"
            >
              Medium
            </Link>
          </li>
        </Box>
        <Box className="w-full md:w-1/6 p-4" textAlign="left">
          <p className="mb-2 text-grey">{`{ ENGINEERING }`}</p>
          <li className="mb-2 text-grey">
            {' '}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/neonhedge"
            >
              Github Repo
            </Link>
          </li>

          <li className="mb-2 text-grey">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://docs.xeon-protocol.io/documentation/mechanics/development/deployments"
            >
              Smart Contracts
            </Link>
          </li>
          <li className="mb-2 text-grey">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://docs.xeon-protocol.io/documentation/mechanics/development/security-audits"
            >
              Secutity Audits
            </Link>
          </li>
        </Box>
        <Box className="w-full md:w-1/6 p-4" textAlign="left">
          <p className="mb-2 text-grey">{`{ REVENUE SHARING }`}</p>
          <li className="mb-2 text-grey">
            {' '}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://docs.xeon-protocol.io/documentation/real-yield/protocol-income"
            >
              Protocol Fees
            </Link>
          </li>

          <li className="mb-2 text-grey">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://docs.xeon-protocol.io/documentation/earn-with-us/how-to-earn"
            >
              Ways to Earn
            </Link>
          </li>
          <li className="mb-2 text-grey">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://docs.xeon-protocol.io/documentation/earn-with-us/hedge-mining"
            >
              Miner Program
            </Link>
          </li>
        </Box>
      </Box>
      <Box className="w-full text-center text-white p-4 border-t-[1px] border-[#6c6c6c]">
        <p> Xeon Protocol © All rights reserved. 2024.</p>
      </Box>
    </Box>
  );
}

export default Footer;
