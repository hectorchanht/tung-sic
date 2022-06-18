import { Avatar, Box, Flex, HStack, useColorModeValue } from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import ThemeSwitchBtn from './themeSwitchBtn';
const Links = ['History'];

const LocaleAvatar = () => {
  const router = useRouter();
  const { locales, locale: activeLocale } = router;
  const otherLocales = locales && locales.filter((locale) => locale !== activeLocale);

  return otherLocales ? otherLocales.map((locale) => {
      const { pathname, query, asPath } = router;
      const isEn = activeLocale === 'en'
      return (
        <Link key={locale} href={{ pathname, query }} as={asPath} locale={locale}>
          <a>
            <Avatar h={10} name={isEn ? 'hk' : 'en'} src={isEn ? '/hk.svg' : '/en.svg'} />
          </a>
        </Link>
      )
    }) : null
}

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={`/${children.toLowerCase()}`}>
    {children}
  </Link>
);

const HS = ({ children }) => <HStack
  spacing={4}
  display={{ base: 'none', md: 'flex' }}>
  {children}
</HStack >;

const Menus = () => <HStack spacing={8} alignItems={'center'}>
  <Box as={Link} href="/">
    <Image src={'/logo.png'} width={40} height={40} />
  </Box>

  <HS>
    {Links.map((link) => (
      <NavLink key={link}>{link}</NavLink>
    ))}
  </HS>
</HStack>


const Header = () => {

  return (
    <div>
      <Head>
        <title>tung-sic</title>
        <meta name="description" content="tung sharing music 24/7" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex as={'nav'} h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Menus />

        <HS>
          <ThemeSwitchBtn />
          <LocaleAvatar />
        </HS>
      </Flex>
    </div>
  )
}



export default Header;