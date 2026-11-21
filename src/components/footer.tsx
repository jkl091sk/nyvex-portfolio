import Link from 'next/link';
import {ArrowUpRight, Mail} from 'lucide-react';
import Brand from '@/components/brand';
import {copy,type Locale,EMAIL,UPWORK} from '@/lib/content';
export default function Footer({locale}:{locale:Locale}){
 const t=copy(locale);
 return <footer className="footer"><div className="container">
  <div className="footer__top"><div><Brand locale={locale} footer/><p>{t.footer.tag}</p></div>
   <div className="footer__links"><a href={`mailto:${EMAIL}`}><Mail size={16}/> Email <ArrowUpRight size={16}/></a><a href={UPWORK} target="_blank" rel="noopener noreferrer">Upwork <ArrowUpRight size={16}/></a><Link href={`/${locale}/privacy-policy/`}>{t.footer.privacy}<ArrowUpRight size={16}/></Link></div>
  </div>
  <div className="footer__giant" aria-hidden="true">NYVEX.</div><div className="footer__bottom"><span>© {new Date().getFullYear()} NYVEX — Dmitriy Savva. {t.footer.rights}</span><span>{t.footer.built}</span></div>
 </div></footer>
}
