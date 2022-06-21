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

export default LocaleSwitcher;