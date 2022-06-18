enum locales { 'zh', 'en' };
import en_dict from '../../src/locales/en.json';
import zh_dict from '../../src/locales/zh.json';


export const getLocaleJson = (k: string = '', isEn: boolean) => (
  isEn ? en_dict[k] : zh_dict[k]
)