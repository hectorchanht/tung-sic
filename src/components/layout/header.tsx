import { ChatIcon } from '@chakra-ui/icons';
import { Box, Flex, HStack, IconButton } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import LocaleSwitcher from './localeSwitcher';
import ThemeSwitch from './themeSwitch';


const NavLink = ({ children, href }: { children: ReactNode, href: string }) => (
  <Link href={href}>
    {children}
  </Link>
);

const HS = ({ children }: { children: ReactNode }) => <HStack spacing={4}>
  {children}
</HStack >;

const Header = () => (
  <Flex as={'header'} h={16} alignItems={'center'} justifyContent={'space-between'}>
    <HS>
      <Box as={'a'} href='/'>
        <Image src={'/logo.png'} width={40} height={40} alt={'logo'} />
      </Box>

      <NavLink href={'/history'}>
        <IconButton variant='ghost' aria-label='past echo' icon={<ChatIcon />} />
      </NavLink>
    </HS>
    
    <HS>
      <ThemeSwitch />
      <LocaleSwitcher />
    </HS>
  </Flex>
);


export default Header;