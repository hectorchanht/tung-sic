import { Box } from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
 
const Header = () => {
  const router = useRouter()
  const { locales, locale: activeLocale } = router
  const otherLocales = locales && locales.filter((locale) => locale !== activeLocale)

  return (
  <div>
    <Head>
      <title>tung-sic</title>
      <meta name="description" content="tung sharing music 24/7" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Box as={'nav'}>
     {otherLocales ? otherLocales.map((locale) => {
    const { pathname, query, asPath } = router;
    const isEn = activeLocale === 'en'
    return <Link key={locale} href={{ pathname, query }} as={asPath} locale={locale}>
      <a>
        <Image src={isEn ? '/hk.svg' : '/en.svg'} alt="Logo" height={24} width={24} />
        {locale}
      </a>
    </Link>
  }) : null}
    </Box>
  </div>
)}

export default Header;