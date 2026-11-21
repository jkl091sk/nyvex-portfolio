'use client';
import {useState} from 'react';
import {ArrowUpRight, Code2, Layers2, Laptop2} from 'lucide-react';
import type {Locale} from '@/lib/content';

const technologies = [
  {name:'C#',category:'desktop',description:{en:'Language for building desktop applications and the WPF ecosystem.',ua:'Мова для створення десктопних застосунків і роботи з WPF.'}},
  {name:'.NET',category:'desktop',description:{en:'Application platform used for building and maintaining Windows software.',ua:'Платформа для створення та підтримки програм під Windows.'}},
  {name:'WPF',category:'desktop',description:{en:'Desktop interface framework — views, layouts and interactive UI for Windows.',ua:'Фреймворк інтерфейсів для Windows: вікна, макети та інтерактивні елементи.'}},
  {name:'Python',category:'desktop',description:{en:'Programming language used in Initra and practical software projects.',ua:'Мова програмування, яку використовую в Initra та інших проєктах.'}},
  {name:'PySide6',category:'desktop',description:{en:'Qt-based desktop interfaces, including the Initra Linux Setup Manager.',ua:'Десктопні інтерфейси на Qt, зокрема для Initra Linux Setup Manager.'}},
  {name:'HTML',category:'web',description:{en:'Semantic structure and content for responsive websites.',ua:'Семантична структура й контент для адаптивних сайтів.'}},
  {name:'CSS',category:'web',description:{en:'Responsive layouts, thoughtful styling and interface motion.',ua:'Адаптивні макети, виразне оформлення та анімації інтерфейсів.'}},
  {name:'JavaScript',category:'web',description:{en:'Client-side interactions and web application behavior.',ua:'Інтерактивність і поведінка вебзастосунків у браузері.'}},
  {name:'TypeScript',category:'web',description:{en:'Typed JavaScript for more maintainable web projects.',ua:'Типізований JavaScript для зручнішої підтримки вебпроєктів.'}},
  {name:'React',category:'web',description:{en:'Component-based approach to building interactive interfaces.',ua:'Компонентний підхід до створення інтерактивних інтерфейсів.'}},
  {name:'Next.js',category:'web',description:{en:'React framework for structured, production-oriented web experiences.',ua:'Фреймворк React для структурованих, повноцінних вебпроєктів.'}},
] as const;

export default function TechnologyExplorer({locale}:{locale:Locale}){
  const [selected,setSelected]=useState<string>('Python');
  const tech=technologies.find(t=>t.name===selected)||technologies[0];
  const isUa=locale==='ua';
  return <div className="technology-explorer">
    <div className="technology-explorer__header"><span className="mono">{isUa?'ОБЕРИ ТЕХНОЛОГІЮ':'SELECT A TECHNOLOGY'}</span><span className="mono">{String(technologies.length).padStart(2,'0')} / TOOLS</span></div>
    <div className="technology-explorer__grid" aria-label={isUa?'Інтерактивний перелік технологій':'Interactive technology list'}>
      {technologies.map(item=><button type="button" key={item.name} className={`tech-chip ${item.name===selected?'tech-chip--active':''}`} aria-pressed={item.name===selected} onClick={()=>setSelected(item.name)}>{item.name}<ArrowUpRight aria-hidden="true" size={14}/></button>)}
    </div>
    <div className="technology-explorer__detail" aria-live="polite">
      <div className="technology-explorer__symbol">{tech.category==='web'?<Code2 size={28}/>:tech.name==='PySide6'?<Layers2 size={28}/>:<Laptop2 size={28}/>}</div>
      <div><span className="mono">{tech.category==='web'?'WEB / FRONTEND':'SOFTWARE / DESKTOP'}</span><h3>{tech.name}</h3><p>{tech.description[locale]}</p></div>
      <span className="technology-explorer__selection mono">{isUa?'ОБРАНО':'SELECTED'} ✓</span>
    </div>
  </div>
}
