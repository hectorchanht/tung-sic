import { ChatIcon } from '@chakra-ui/icons';
import { Box, Flex, HStack, IconButton } from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import ThemeSwitchBtn from './ThemeSwitch';


const LocaleSwitcher = () => {
  const router = useRouter();
  const { locales, locale: activeLocale } = router;
  const otherLocales = locales && locales.filter((locale) => locale !== activeLocale);

  if (!otherLocales) return <div />;

  return <Box>
    {otherLocales.map((locale) => {
      const { pathname, query, asPath } = router;
      const isEn = activeLocale === 'en'
      return (
        <Link key={locale} href={{ pathname, query }} as={asPath} locale={locale}>
          <a>
            <Image width={40} height={40} src={isEn ? '/hk.svg' : '/en.svg'} alt={'locales selector'} />
          </a>
        </Link>
      )
    })}
  </Box>
}

const NavLink = ({ children, href }: { children: ReactNode, href: string }) => (
  <Link href={href}>
    {children}
  </Link>
);

const HS = ({ children }: { children: ReactNode }) => <HStack spacing={4}>
  {children}
</HStack >;

const Header = () => {
  return (
    <div>
      <Head>
        <title>tung-sic</title>
        <meta name="description" content="tung sharing music 24/7" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex as={'nav'} h={16} alignItems={'center'} justifyContent={'space-between'}>
        <HS>
          <Box as={'a'} href='/'>
            <Image src={'/logo.png'} width={40} height={40} alt={'logo'} />
          </Box>

          <NavLink href={'/history'}>
            <IconButton variant='ghost' aria-label='past echo' icon={<ChatIcon />} />
          </NavLink>
        </HS>
        <HS>
          <ThemeSwitchBtn />
          <LocaleSwitcher />
        </HS>
      </Flex>
    </div>
  )
}



export default Header;