import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import Reveal from '@/components/reveal';
import {copy,type Locale} from '@/lib/content';
export default function SectionCta({locale}:{locale:Locale}){const t=copy(locale);return <section className="section-cta"><div className="container"><Reveal><div className="section-cta__inner"><div><span className="eyebrow">{locale==='ua'?'NYVEX / ВАШ НАСТУПНИЙ ПРОЄКТ':'NYVEX / YOUR NEXT PROJECT'}</span><h2>{t.home.endTitle}</h2><p>{t.home.endText}</p></div><Link className="button button--light" href={`/${locale}/contact/`}>{t.universal.talk}<ArrowUpRight size={19}/></Link></div></Reveal></div></section>}
