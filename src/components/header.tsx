'use client';
import {useState,useEffect,useRef} from 'react';
import {createPortal} from 'react-dom';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {ArrowUpRight,Menu,X} from 'lucide-react';
import Brand from '@/components/brand';
import {copy,locales,type Locale} from '@/lib/content';
const links = ['home','projects','about','services','contact'] as const;
function localPath(locale:Locale, key:string){return key==='home'?`/${locale}/`:`/${locale}/${key}/`}
export default function Header({locale}:{locale:Locale}) {
 const t=copy(locale),path=usePathname();
 const [open,setOpen]=useState(false),[scrolled,setScrolled]=useState(false),[mounted,setMounted]=useState(false);
 const [displayLocale,setDisplayLocale]=useState<Locale>(locale);
 useEffect(()=>setDisplayLocale(locale),[locale]);
 const menuRef=useRef<HTMLElement>(null),toggleRef=useRef<HTMLButtonElement>(null);
 useEffect(()=>setMounted(true),[]);
 useEffect(()=>{const h=()=>setScrolled(window.scrollY>18);h();window.addEventListener('scroll',h,{passive:true});return()=>window.removeEventListener('scroll',h)},[]);
 useEffect(()=>setOpen(false),[path]);
 useEffect(()=>{
  document.body.classList.toggle('menu-open',open);
  const background=[document.querySelector('main'),document.querySelector('footer')].filter((element):element is HTMLElement=>element!==null);
  if(open)background.forEach(el=>el.setAttribute('inert',''));
  else background.forEach(el=>el.removeAttribute('inert'));
  return()=>{document.body.classList.remove('menu-open');background.forEach(el=>el.removeAttribute('inert'))};
 },[open]);
 useEffect(()=>{
  if(!open||!mounted)return;
  const focusables=Array.from(menuRef.current?.querySelectorAll<HTMLAnchorElement>('a[href]')||[]);
  focusables[0]?.focus({preventScroll:true});
  const onKeyDown=(event:KeyboardEvent)=>{
   if(event.key==='Escape'){event.preventDefault();setOpen(false);toggleRef.current?.focus({preventScroll:true});return}
   if(event.key==='Tab'&&focusables.length){
    const first=focusables[0],last=focusables[focusables.length-1];
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
   }
  };
  const mq=window.matchMedia('(min-width: 961px)');
  const onWidth=()=>{if(mq.matches)setOpen(false)};
  document.addEventListener('keydown',onKeyDown);mq.addEventListener('change',onWidth);
  return()=>{document.removeEventListener('keydown',onKeyDown);mq.removeEventListener('change',onWidth)};
 },[open,mounted]);
 const active=(k:string)=>path===localPath(locale,k)||(k!=='home'&&path.startsWith(`/${locale}/${k}/`));
 const translate=(next:Locale)=>{const seg=path.split('/').filter(Boolean);if(seg[0]&&locales.includes(seg[0] as Locale))seg[0]=next;else seg.unshift(next);return '/'+seg.join('/')+'/'};
 const mobileNav=<nav id="mobile-nav" ref={menuRef} aria-label="Mobile navigation" className={`mobile-nav ${open?'mobile-nav--open':''}`} inert={!open}>
   <div className="mobile-nav__inner">{links.map((k,i)=><Link key={k} href={localPath(locale,k)} onClick={()=>setOpen(false)}><span>0{i+1}</span>{t.nav[k]}<ArrowUpRight size={19}/></Link>)}
   <div className="mobile-nav__langs">{locales.map(l=><Link key={l} className={locale===l?'is-active':''} href={translate(l)} onClick={()=>setOpen(false)}>{l.toUpperCase()}</Link>)}</div></div>
  </nav>;
 return <><header className={`header ${scrolled?'header--scrolled':''}`}>
  <div className="header__inner container"><Brand locale={locale}/>
   <nav className="header__nav" aria-label="Main navigation">{links.map(k=><Link aria-current={active(k)?'page':undefined} key={k} className={active(k)?'is-active':''} href={localPath(locale,k)}>{t.nav[k]}</Link>)}</nav>
   <div className="header__right"><div className="language-switch" aria-label="Language" data-active={displayLocale}>
     <span className="language-switch__indicator" aria-hidden="true"/>
     {locales.map(l=><Link key={l} href={translate(l)} hrefLang={l==='ua'?'uk':l} aria-label={l==='ua'?'Switch to Ukrainian':'Switch to English'} aria-current={l===locale?'page':undefined} className={displayLocale===l?'is-active':''} onNavigate={()=>setDisplayLocale(l)}>{l.toUpperCase()}</Link>)}
    </div>
    <Link className="button button--primary button--small desktop-talk" href={`/${locale}/contact/`}>{t.universal.talk}<ArrowUpRight size={16}/></Link>
    <button ref={toggleRef} type="button" className="menu-toggle" aria-label={open?'Close menu':t.nav.menu} aria-expanded={open} aria-controls="mobile-nav" onClick={()=>setOpen(x=>!x)}>{open?<X size={24}/>:<Menu size={24}/>}</button>
   </div>
  </div>
 </header>{mounted?createPortal(mobileNav,document.body):null}</>;
}
