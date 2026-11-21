'use client';
import {useState,useEffect} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {ArrowUpRight,Menu,X} from 'lucide-react';
import Brand from '@/components/brand';
import {copy,locales,type Locale} from '@/lib/content';
const links = ['home','projects','about','services','contact'] as const;
function localPath(locale:Locale, key:string){return key==='home'?`/${locale}/`:`/${locale}/${key}/`}
export default function Header({locale}:{locale:Locale}) {
 const t=copy(locale),path=usePathname();
 const [open,setOpen]=useState(false),[scrolled,setScrolled]=useState(false);
 useEffect(()=>{const h=()=>setScrolled(window.scrollY>18);h();window.addEventListener('scroll',h,{passive:true});return()=>window.removeEventListener('scroll',h)},[]);
 useEffect(()=>{document.body.classList.toggle('menu-open',open);return()=>document.body.classList.remove('menu-open')},[open]);
 const active=(k:string)=>path===localPath(locale,k)||(k!=='home'&&path.startsWith(`/${locale}/${k}/`));
 const translate=(next:Locale)=>{const seg=path.split('/').filter(Boolean);if(seg[0]&&locales.includes(seg[0] as Locale))seg[0]=next;else seg.unshift(next);return '/'+seg.join('/')+'/'};
 return <header className={`header ${scrolled?'header--scrolled':''}`}>
  <div className="header__inner container"><Brand locale={locale}/>
   <nav className="header__nav" aria-label="Main navigation">{links.map(k=><Link aria-current={active(k)?'page':undefined} key={k} className={active(k)?'is-active':''} href={localPath(locale,k)}>{t.nav[k]}</Link>)}</nav>
   <div className="header__right"><div className="language-switch" aria-label="Language">{locales.map(l=><Link key={l} href={translate(l)} hrefLang={l==='ua'?'uk':l} aria-current={l===locale?'page':undefined} className={l===locale?'is-active':''}>{l.toUpperCase()}</Link>)}</div>
    <Link className="button button--primary button--small desktop-talk" href={`/${locale}/contact/`}>{t.universal.talk}<ArrowUpRight size={16}/></Link>
    <button className="menu-toggle" aria-label={open?'Close menu':t.nav.menu} aria-expanded={open} aria-controls="mobile-nav" onClick={()=>setOpen(x=>!x)}>{open?<X size={24}/>:<Menu size={24}/>}</button>
   </div>
  </div>
  <nav id="mobile-nav" aria-label="Mobile navigation" className={`mobile-nav ${open?'mobile-nav--open':''}`} inert={!open}>
   <div className="mobile-nav__inner">{links.map((k,i)=><Link key={k} href={localPath(locale,k)} onClick={()=>setOpen(false)}><span>0{i+1}</span>{t.nav[k]}<ArrowUpRight size={19}/></Link>)}
   <div className="mobile-nav__langs">{locales.map(l=><Link key={l} className={locale===l?'is-active':''} href={translate(l)} onClick={()=>setOpen(false)}>{l.toUpperCase()}</Link>)}</div></div>
  </nav>
 </header>;
}
