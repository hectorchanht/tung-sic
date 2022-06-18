import { Box } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function LocaleSwitcher() {
  const router = useRouter()
  const { locales, locale: activeLocale } = router
  const otherLocales = locales && locales.filter((locale) => locale !== activeLocale)
  console.log(` locale-switcher.jsx --- otherLocales:`, otherLocales)

  return otherLocales.map((locale) => {
    const { pathname, query, asPath } = router;
    const isEn = activeLocale === 'en'
    return (
      <Box key={locale}>
        <Link href={{ pathname, query }} as={asPath} locale={locale}>
          <a>
            <Image src={isEn ? '/hk.svg' : '/en.svg'} alt="Logo" height={24} width={24} />
            {locale}
          </a>
        </Link>
      </Box>
    )
  })
}
