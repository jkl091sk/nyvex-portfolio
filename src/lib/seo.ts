import type {Metadata} from 'next';
import type {Locale} from '@/lib/content';

export const SITE_URL = 'https://nyvex-bq4.pages.dev';
export type SeoPage = 'home' | 'projects' | 'about' | 'services' | 'contact' | 'privacy-policy' | 'initra-app' | 'initra-site' | 'roundtrace';
type Info = {title:string; description:string};
const details:Record<Locale,Record<SeoPage,Info>> = {
 en:{
  roundtrace:{title:'RoundTrace for FACEIT',description:'Download RoundTrace for Chrome or Brave and follow the installation guide.'},
  home:{title:'Dmitriy Savva — Desktop & Web Developer',description:'NYVEX is the portfolio of Dmitriy Savva, a creative desktop and web developer building responsive websites, Linux applications and thoughtful digital experiences.'},
  projects:{title:'Projects — Initra & RoundTrace',description:'Explore projects by Dmitriy Savva: Initra, a Linux setup manager built with Python and PySide6, and its official responsive website.'},
  about:{title:'About Dmitriy Savva',description:'Meet Dmitriy Savva, a self-taught desktop and web developer since 2023, focused on modern interfaces, maintainable code and practical solutions.'},
  services:{title:'Development Services',description:'Website development, responsive landing pages and bug fixing services for individuals and startups. Work with Dmitriy Savva at NYVEX.'},
  contact:{title:'Contact Dmitriy Savva',description:'Have a project idea or technical brief? Contact Dmitriy Savva via the NYVEX form, email or Upwork to discuss websites and development work.'},
  'privacy-policy':{title:'Privacy Policy',description:'Read how the NYVEX portfolio processes contact form submissions and personal data, including the use of Cloudflare Pages and FormSubmit.co.'},
  'initra-app':{title:'Initra — Linux Setup Manager',description:'Initra is a Linux desktop setup and maintenance application built with Python, PySide6 and Qt. Discover its functionality and technology.'},
  'initra-site':{title:'Initra — Official Website',description:'Discover the official Initra website, presenting the Linux setup manager, features, compatibility and download information.'}
 },
 ua:{
  roundtrace:{title:'RoundTrace для FACEIT',description:'Завантажте RoundTrace для Chrome або Brave та встановіть за інструкцією.'},
  home:{title:'Dmitriy Savva — Розробник програм і сайтів',description:'NYVEX — портфоліо Dmitriy Savva. Створюю адаптивні сайти, програми для Linux і сучасні цифрові рішення з продуманим дизайном.'},
  projects:{title:'Проєкти — Initra та RoundTrace',description:'Перегляньте проєкти Dmitriy Savva: застосунок Initra для налаштування Linux на Python та PySide6 і його офіційний адаптивний сайт.'},
  about:{title:'Про Dmitriy Savva',description:'Дізнайтеся більше про Dmitriy Savva: самостійно вивчаю програмування з 2023 року, створюю сайти, програми та сучасні інтерфейси.'},
  services:{title:'Послуги з розробки',description:'Розробка сайтів, адаптивних лендінгів та виправлення помилок для приватних клієнтів і стартапів. Співпраця з NYVEX.'},
  contact:{title:'Зв’язатися з Dmitriy Savva',description:'Маєте ідею або технічне завдання? Напишіть Dmitriy Savva через форму NYVEX, email або Upwork, щоб обговорити співпрацю.'},
  'privacy-policy':{title:'Політика конфіденційності',description:'Дізнайтеся, як NYVEX обробляє персональні дані та повідомлення контактної форми, використовуючи Cloudflare Pages і FormSubmit.co.'},
  'initra-app':{title:'Initra — менеджер налаштування Linux',description:'Initra — десктопна програма для налаштування та обслуговування Linux на Python, PySide6 і Qt. Дізнайтеся про її можливості.'},
  'initra-site':{title:'Initra — офіційний сайт',description:'Офіційний сайт Initra, що презентує Linux-застосунок, його функції, сумісність із дистрибутивами та можливості завантаження.'}
 }
};
const suffix:Record<SeoPage,string> = {
 roundtrace:'projects/roundtrace/',home:'',projects:'projects/',about:'about/',services:'services/',contact:'contact/',
 'privacy-policy':'privacy-policy/','initra-app':'projects/initra-app/','initra-site':'projects/initra-site/'
};
export function seoUrl(locale:Locale,page:SeoPage){return `${SITE_URL}/${locale}/${suffix[page]}`;}
export function seoMetadata(locale:Locale,page:SeoPage):Metadata {
 const {title,description}=details[locale][page];
 const url=seoUrl(locale,page);
 return {
  title:{absolute:page==='home'?title+' | NYVEX':title+' | NYVEX'},
  description,
  alternates:{canonical:url,languages:{en:seoUrl('en',page),uk:seoUrl('ua',page),'x-default':seoUrl('en',page)}},
  openGraph:{type:'website',siteName:'NYVEX',title:title+' | NYVEX',description,url,
   locale:locale==='ua'?'uk_UA':'en_US',
   alternateLocale:[locale==='ua'?'en_US':'uk_UA'],
   images:[{url:'/og/nyvex-social.png',width:1200,height:630,alt:'NYVEX — Dmitriy Savva, Desktop & Web Developer'}]},
  twitter:{card:'summary_large_image',title:title+' | NYVEX',description,images:['/og/nyvex-social.png']},
  robots:{index:true,follow:true}
 };
}
