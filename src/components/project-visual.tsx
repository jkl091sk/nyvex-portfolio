import type {Locale} from '@/lib/content';
export default function ProjectVisual({kind,locale}:{kind:'app'|'site';locale:Locale}){
 const labels=locale==='ua'?['ОГЛЯД','СИСТЕМА','ПРОГРАМИ','НАЛАШТУВАННЯ']:['OVERVIEW','SYSTEM','SOFTWARE','SETUP'];
 return <div className={`project-visual project-visual--${kind}`} aria-label={kind==='app'?'Illustrative Initra desktop interface':'Illustrative Initra website layout'}>
  {kind==='app'?<div className="mock-app"><div className="mock-app__chrome"><span/><span/><span/><small>initra / setup manager</small></div><div className="mock-app__content"><div className="mock-app__sidebar"><b><i>◇</i> initra.</b>{labels.map((a,i)=><span className={i===0?'is-selected':''} key={a}><i>◻</i>{a}</span>)}</div><div className="mock-app__main"><small>WORKSPACE / OVERVIEW</small><p>YOUR LINUX.<br/><strong>YOUR WAY.</strong></p><div className="mock-app__stats"><span><small>STATUS</small><b>HEALTHY</b></span><span><small>PLATFORM</small><b>LINUX</b></span></div><div className="mock-app__bar"><span/></div></div></div></div>
 : <div className="mock-site"><div className="mock-site__chrome"><span/><span/><span/><i>jkl091sk.github.io/Initra</i></div><div className="mock-site__body"><div className="mock-site__nav"><b><i>◇</i> initra.</b><span>Features &nbsp; Download &nbsp; Docs</span></div><small>LINUX SETUP MANAGER</small><h3>Set up Linux,<br/><em>your way.</em></h3><p>Modern Linux setup and system management, all in one place.</p><div className="mock-site__button">Download for Linux ↓</div><div className="mock-site__decor"/></div></div>}
  <span className="visual-corner visual-corner--tl"/><span className="visual-corner visual-corner--br"/>
 </div>
}
