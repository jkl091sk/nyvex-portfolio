import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import ProjectVisual from '@/components/project-visual';
import Reveal from '@/components/reveal';
import {PROJECTS,copy,type Locale} from '@/lib/content';
export default function ProjectCard({locale,index}:{locale:Locale;index:number}){
 const t=copy(locale),p=PROJECTS[index],isApp=p.kind==='app';
 return <Reveal className="project-card"><Link href={`/${locale}/projects/${p.slug}/`} className="project-card__link" aria-label={`${t.universal.view}: ${isApp?t.projects.appTitle:t.projects.siteTitle}`}>
   <div className="project-card__media"><div className="project-card__meta"><span>0{index+1} / {isApp?'PYTHON · LINUX':'WEB · HTML/CSS/JS'}</span><span>{p.year}</span></div><ProjectVisual kind={p.kind} locale={locale}/></div>
   <div className="project-card__info"><div><span className="eyebrow">{isApp?t.projects.appCategory:t.projects.siteCategory}</span><h3>{isApp?'Initra.':'Initra Website.'}</h3><p>{isApp?t.projects.appDesc:t.projects.siteDesc}</p></div><span className="round-arrow"><ArrowUpRight size={22}/></span></div>
  </Link></Reveal>
}
