import { Avatar, Flex } from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ThemeSwitchBtn from './themeSwitchBtn'

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

      <Flex as={'nav'} h={16} alignItems={'center'} justifyContent={'space-between'}>
        <ThemeSwitchBtn />

        {otherLocales ? otherLocales.map((locale) => {
          const { pathname, query, asPath } = router;
          const isEn = activeLocale === 'en'
          return (
            <Link key={locale} href={{ pathname, query }} as={asPath} locale={locale}>
              <a>
                <Avatar h={10} name={isEn ? 'hk' : 'en'} src={isEn ? '/hk.svg' : '/en.svg'} />
              </a>
            </Link>
          )
        }) : null}
      </Flex>
    </div>
  )
}

export default Header;