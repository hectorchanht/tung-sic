import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Avatar}  from '@chakra-ui/react'

const LocaleSwitcher = () => {
  const router = useRouter()
  const { locales, locale: activeLocale } = router
  const otherLocales = locales && locales.filter((locale) => locale !== activeLocale)

  return otherLocales.map((locale) => {
    const { pathname, query, asPath } = router;
    const isEn = activeLocale === 'en'

    return (
      <Link key={locale} href={{ pathname, query }} as={asPath} locale={locale}>
        <a>
          <Image src={isEn ? '/hk.svg' : '/en.svg'} alt="Logo" height={24} width={24} />
          {locale}
        </a>
        <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
      </Link>
    )
  })
}

export default LocaleSwitcher;