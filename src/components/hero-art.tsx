'use client';
import {useRef,useState,type PointerEvent} from 'react';
import {motion,useReducedMotion} from 'motion/react';
import {ArrowUpRight,Check,Code2,Globe2,Terminal} from 'lucide-react';
import type {Locale} from '@/lib/content';

/** An interactive design-and-code workspace, not the previous oversized letter N. */
export default function HeroArt({locale}:{locale:Locale}){
 const ua=locale==='ua';
 const reduced=useReducedMotion();
 const [offset,setOffset]=useState({x:0,y:0});
 const root=useRef<HTMLDivElement>(null);
 const move=(e:PointerEvent<HTMLDivElement>)=>{
  if(reduced||e.pointerType!=='mouse'||!root.current)return;
  const r=root.current.getBoundingClientRect();
  setOffset({x:(e.clientX-r.left)/r.width-.5,y:(e.clientY-r.top)/r.height-.5});
 };
 const spring={type:'spring' as const,stiffness:46,damping:18};
 return <div className="studio-stage" ref={root} onPointerMove={move} onPointerLeave={()=>setOffset({x:0,y:0})} aria-label="Decorative studio workspace showcasing web design, code and software">
  <div className="studio-stage__grid" aria-hidden="true"/><div className="studio-stage__glow" aria-hidden="true"/>
  <div className="stage-label stage-label--top"><span className="pulse-dot"/> {ua?'NYVEX / ЦИФРОВИЙ ПРОСТІР':'NYVEX / DIGITAL WORKSPACE'}</div>
  <div className="stage-label stage-label--bottom">{ua?'ІНТЕРАКТИВНА СЦЕНА / 2026':'INTERACTIVE VISUAL / 2026'} <span>✳</span></div>
  <motion.div className="workspace workspace--main" animate={reduced?{rotate:-6}:{rotate:-6,x:offset.x*12,y:offset.y*9}} transition={spring}>
   <div className="workspace__chrome"><div className="workspace__lights"><i/><i/><i/></div><span>nyvex / creative-workspace</span><Globe2 size={14}/></div>
   <div className="workspace__body"><div className="workspace__overline"><span>{ua?'КРЕАТИВНІ СИСТЕМИ':'CREATIVE SYSTEMS'}</span><span>01 — 03</span></div>
   <div className="workspace__hero"><div className="workspace__small">{ua?'ДИЗАЙН + РОЗРОБКА':'DESIGN + DEVELOPMENT'}</div><div className="workspace__big">{ua?'СТВОРЕНО':'CRAFTED'}<br/><i>{ua?'ЗІ ЗМІСТОМ.':'FOR IMPACT.'}</i></div><div className="workspace__desc">{ua?'Продумана ідея. Якісна реалізація.':'The right idea, thoughtfully built.'}</div></div>
   <div className="workspace__tiles"><div><span>01 / CONCEPT</span><b>{ua?'Новий погляд.':'Think different.'}</b><ArrowUpRight size={17}/></div><div><span>02 / EXECUTION</span><b>{ua?'Кращий код.':'Build better.'}</b><ArrowUpRight size={17}/></div></div></div>
  </motion.div>
  <motion.div className="workspace workspace--code" animate={reduced?{rotate:7}:{rotate:7,x:-offset.x*24,y:-offset.y*20}} transition={spring}>
   <div className="workspace__chrome"><div className="workspace__lights"><i/><i/><i/></div><span><Code2 size={13}/> interface.tsx</span></div>
   <div className="code-lines"><div><b>01</b><span className="token-purple">const</span> idea = <span className="token-cyan">'your vision'</span>;</div><div><b>02</b><span className="token-purple">const</span> craft = <span className="token-cyan">'our code'</span>;</div><div><b>03</b><span className="token-purple">function</span> <span className="token-lilac">create</span>() {'{'}</div><div><b>04</b>&nbsp;&nbsp;<span className="token-purple">return</span> <span className="token-cyan">'something real'</span>;</div><div><b>05</b>{'}'}</div></div>
  </motion.div>
  <motion.div className="workspace workspace--status" animate={reduced?{rotate:5}:{rotate:5,x:offset.x*25,y:-offset.y*15}} transition={spring}><span className="status-orb"><Check size={18}/></span><div><b>{ua?'ЗБІРКА ГОТОВА':'BUILD SUCCESSFUL'}</b><small>{ua?'ідея → продукт':'idea → experience'}</small></div><Terminal size={18}/></motion.div>
  <span className="studio-stage__cross studio-stage__cross--a" aria-hidden="true">+</span><span className="studio-stage__cross studio-stage__cross--b" aria-hidden="true">+</span>
 </div>
}
