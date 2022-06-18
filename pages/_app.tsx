import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import React from 'react';

// https://patorjk.com/software/taag/#p=display&f=ANSI%20Shadow&t=tung-sic
// font: ANSI Shadow
const t = `
████████╗██╗   ██╗███╗   ██╗ ██████╗       ███████╗██╗ ██████╗
╚══██╔══╝██║   ██║████╗  ██║██╔════╝       ██╔════╝██║██╔════╝
   ██║   ██║   ██║██╔██╗ ██║██║  ███╗█████╗███████╗██║██║     
   ██║   ██║   ██║██║╚██╗██║██║   ██║╚════╝╚════██║██║██║     
   ██║   ╚██████╔╝██║ ╚████║╚██████╔╝      ███████║██║╚██████╗
   ╚═╝    ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝       ╚══════╝╚═╝ ╚═════╝
   https://github.com/hectorchanht/tung-sic
`;

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => console.log(t), []);

  return <ChakraProvider>
    <Component {...pageProps} />
  </ChakraProvider>
}

export default MyApp
