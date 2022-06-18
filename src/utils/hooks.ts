enum locales { 'zh', 'en' };
import { useRouter } from 'next/router';
import en_dict from '../../src/locales/en.json';
import zh_dict from '../../src/locales/zh.json';


export const useLocale = () => {
  const router = useRouter();
  const { locale } = router;
  const isEn = locale === 'en';
  return {
    get: (k: string = '') => isEn ? en_dict[k] : zh_dict[k],
    getDict: isEn ? en_dict : zh_dict,
  }
}