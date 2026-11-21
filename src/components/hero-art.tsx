import type {Locale} from '@/lib/content';
/** Decorative monolith from the NYVEX artboard; all interaction stays in the existing navigation and forms. */
export default function HeroArt({locale}:{locale:Locale}){
 return <div className="nyvex-monolith" aria-hidden="true">
  <svg className="nyvex-monolith__svg" viewBox="0 0 570 565" xmlns="http://www.w3.org/2000/svg" focusable="false">
   <defs>
    <linearGradient id="nyvex-front" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#AF2BBF"/><stop offset="1" stopColor="#9A55C8"/></linearGradient>
    <linearGradient id="nyvex-side" x1="0" x2="1" y1="0" y2="0"><stop stopColor="#3F636C"/><stop offset="1" stopColor="#203A43"/></linearGradient>
    <linearGradient id="nyvex-diag" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#6C91BF"/><stop offset="1" stopColor="#254B52"/></linearGradient>
   </defs>
   <ellipse cx="278" cy="506" rx="198" ry="22" fill="#AF2BBF" opacity=".14"/>
   <g className="nyvex-monolith__letter">
    <path d="M132 160L164 128H229L198 160Z" fill="#7395B1" stroke="#A6C1D4" strokeWidth=".8"/>
    <path d="M198 160L229 128V410L198 442Z" fill="url(#nyvex-side)"/>
    <path d="M132 160H198V442H132Z" fill="url(#nyvex-front)"/>
    <path d="M360 160L392 128H454L423 160Z" fill="#7395B1" stroke="#A6C1D4" strokeWidth=".8"/>
    <path d="M423 160L454 128V410L423 442Z" fill="url(#nyvex-side)"/>
    <path d="M360 160H423V442H360Z" fill="url(#nyvex-front)"/>
    <path d="M198 160L229 128L423 410L392 442Z" fill="#314B53"/>
    <path d="M198 160L360 442H423L229 128Z" fill="url(#nyvex-diag)" stroke="#86B8C7" strokeWidth=".9"/>
    <path d="M198 160L360 442H423L229 128" fill="none" stroke="#DFF7FA" strokeWidth=".6" opacity=".5"/>
   </g>
   <path d="M493 160h13m-6 0v282m-7 0h13" fill="none" stroke="#5FB0B7" strokeWidth=".8" opacity=".55"/>
  </svg>
  <p className="nyvex-monolith__caption mono">FIG. 01 — {locale==='ua'?'N / МОНОЛІТ':'N MONOLITH'}</p>
 </div>;
}
