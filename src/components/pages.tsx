import Link from 'next/link';
import {ArrowRight,ArrowUpRight,Code2,Globe2,Mail,Check,MoveUpRight,Layers3,Paintbrush,Braces,Handshake,CheckCircle2,MoveRight,ShieldCheck} from 'lucide-react';
import Reveal from '@/components/reveal';
import HeroArt from '@/components/hero-art';
import ProjectCard from '@/components/project-card';
import ProjectVisual from '@/components/project-visual';
import SectionCta from '@/components/section-cta';
import ContactForm from '@/components/contact-form';
import TechnologyExplorer from '@/components/technology-explorer';
import {copy,PROJECTS,EMAIL,UPWORK,type Locale} from '@/lib/content';

const eyebrow = (number:string,title:string) => <div className="eyebrow"><span className="eyebrow__number">{number}</span><span>{title}</span><span className="eyebrow__line"/></div>;

export function Home({locale}:{locale:Locale}) {
 const t=copy(locale),ua=locale==='ua';
 return <main>
  <section className={`hero container hero--${locale}`}>
   <div className="hero__top">
    <Reveal className="hero__copy">
     <div className="hero__availability"><span className="pulse-dot"/>{ua?'ВІДКРИТИЙ ДО СПІВПРАЦІ':'OPEN FOR CREATIVE COLLABORATIONS'}<span className="hero__avail-arrow"> ↗ </span></div>
     <div className="eyebrow hero__identity">DMITRIY SAVVA <span>—</span> DESKTOP & WEB DEVELOPER</div>
     <h1 className="hero__heading"><span>{t.home.titleA}</span><span className="hero__heading--outline">{t.home.titleB}</span><span>{t.home.titleC}</span><em>{t.home.titleD}</em></h1>
    </Reveal>
    <Reveal className="hero__aside"><span className="hero__aside-star" aria-hidden="true">✳</span><p className="hero__intro">{t.home.intro}</p><div className="hero__actions"><Link className="button button--light" href={`/${locale}/projects/`}>{t.universal.explore}<ArrowUpRight size={18}/></Link><Link className="button button--outline" href={`/${locale}/contact/`}>{t.universal.talk}<ArrowUpRight size={18}/></Link></div><p className="hero__micro">{ua?'ПРОДУМАНИЙ ДИЗАЙН. ПРАЦЮЮЧИЙ КОД.':'THOUGHTFUL DESIGN. WORKING CODE.'}</p></Reveal>
   </div>
   <HeroArt locale={locale}/>
   <div className="hero__foot"><span>NYVEX® / 2026</span><span>{t.home.mini}</span><span>{t.universal.scroll} ↓</span></div>
  </section>

  <section className="section section--works container" id="work"><Reveal><div className="section__intro"><div>{eyebrow('01',ua?'ОБРАНІ ПРОЄКТИ':'FEATURED WORK')}<h2 className="section-heading">{t.home.featured}</h2></div><p>{t.home.selectedLead}</p></div></Reveal><div className="work-grid"><ProjectCard locale={locale} index={0}/><ProjectCard locale={locale} index={1}/></div><Reveal><Link className="text-link" href={`/${locale}/projects/`}>{t.universal.all}<ArrowUpRight size={20}/></Link></Reveal></section>

  <section className="section section--about container"><Reveal>{eyebrow('02',t.home.aboutEyebrow)}<div className="about-feature"><div className="about-feature__word">{ua?'ІДЕЇ':'IDEAS'}<span>↘</span></div><div><h2 className="section-heading">{t.home.aboutTitle}</h2><p>{t.home.aboutText}</p><Link className="text-link" href={`/${locale}/about/`}>{t.home.more}<ArrowUpRight size={20}/></Link></div></div></Reveal></section>

  <section className="section section--services container"><Reveal><div className="section__intro"><div>{eyebrow('03',ua?'ПОСЛУГИ':'SERVICES')}<h2 className="section-heading">{t.home.serviceHead}</h2></div><p>{t.home.serviceText}</p></div></Reveal><div className="services-list">{t.services.list.map((s,i)=><Reveal key={s.num} delay={i*.06}><Link className="service-row" href={`/${locale}/services/`}><span className="service-row__num">{s.num}</span><h3>{s.name}</h3><p>{s.desc}</p><span className="round-arrow round-arrow--small"><ArrowUpRight size={21}/></span></Link></Reveal>)}</div></section>
  <SectionCta locale={locale}/>
 </main>;
}

export function ProjectsPage({locale}:{locale:Locale}) {const t=copy(locale),ua=locale==='ua';return <main><PageIntro eyebrow={t.projects.eyebrow} heading={t.projects.heading} text={t.projects.intro} number="01"/><section className="container section projects-list"><div className="list-meta"><span>{ua?'ВИБРАНІ РОБОТИ':'CURATED / SELECTED WORK'}</span><span>03 / 03</span></div><div className="work-grid"><ProjectCard locale={locale} index={0}/><ProjectCard locale={locale} index={1}/></div><Link className="rt-project-link" href={`/${locale}/projects/roundtrace/`}><img src="/roundtrace/logo.svg" width="54" height="54" alt=""/><div><strong>RoundTrace</strong><span>{ua?'Історія матчів FACEIT · Завантаження та встановлення':'FACEIT match history · Download and installation'}</span></div><ArrowUpRight size={20}/></Link></section><SectionCta locale={locale}/></main>}

export function ProjectPage({locale,slug}:{locale:Locale;slug:string}){
 const t=copy(locale),p=PROJECTS.find(x=>x.slug===slug);if(!p)return null;
 const isApp=p.kind==='app',ua=locale==='ua';
 return <main><section className="container detail-header"><Reveal><Link className="back-link" href={`/${locale}/projects/`}>← {t.universal.back}</Link>{eyebrow(isApp?'01':'02',isApp?t.projects.appCategory:t.projects.siteCategory)}<h1 className="page-title">{isApp?'INITRA.':'INITRA WEBSITE.'}</h1><p className="page-intro">{isApp?t.projects.appDesc:t.projects.siteDesc}</p><div className="tag-list">{p.tech.map(tech=><span key={tech}>{tech}</span>)}</div></Reveal><Reveal><div className="detail-art"><ProjectVisual kind={p.kind} locale={locale}/></div></Reveal></section>
 <section className="section container detail-story"><Reveal>{eyebrow('A',ua?'ПРО ПРОЄКТ':'THE PROJECT')}<h2 className="section-heading">{isApp?t.projects.appTitle:t.projects.siteTitle}</h2></Reveal><Reveal><p>{isApp?t.projects.appLong:t.projects.siteLong}</p></Reveal></section>
 <section className="container detail-cols"><Reveal>{eyebrow('01',t.projects.challenge)}<h3>{isApp?t.projects.appChallenge:t.projects.siteChallenge}</h3></Reveal><Reveal>{eyebrow('02',t.projects.solution)}<h3>{isApp?t.projects.appSolution:t.projects.siteSolution}</h3></Reveal></section>
 <section className="section container"><Reveal>{eyebrow('03',t.projects.features)}<h2 className="section-heading">{t.projects.features}</h2></Reveal><div className="feature-list">{(isApp?t.projects.appFeatures:t.projects.siteFeatures).map((f,i)=><Reveal key={f}><div><span>0{i+1}</span><h3>{f}</h3><Check size={20}/></div></Reveal>)}</div><div className="detail-actions"><a href={p.github} className="button button--outline" target="_blank" rel="noopener noreferrer">{t.universal.source}<ArrowUpRight size={18}/></a><a href={p.demo} className="button button--light" target="_blank" rel="noopener noreferrer">{t.universal.website}<ArrowUpRight size={18}/></a></div></section><SectionCta locale={locale}/></main>
}

const principleIcons=[Paintbrush,Layers3,Code2,Handshake,CheckCircle2];
export function AboutPage({locale}:{locale:Locale}){
 const t=copy(locale),ua=locale==='ua';
 return <main><PageIntro eyebrow={t.about.eyebrow} heading={t.about.heading} text={t.about.intro} number="02"/>
  <section className="section container about-main"><Reveal><div className="about-main__number"><div className="mono">{ua?'САМОСТІЙНО В ПРОГРАМУВАННІ З':'SELF-TAUGHT SINCE'}</div><strong>20<span>23</span></strong><small>{ua?'І ДО СЬОГОДНІ':'AND COUNTING'} ↗</small></div></Reveal><Reveal><div>{eyebrow('01',ua?'МОЯ ІСТОРІЯ':'ORIGIN STORY')}<h2 className="section-heading">{t.about.storyTitle}</h2></div><p>{t.about.story1}</p><p>{t.about.story2}</p><p>{t.about.story3}</p></Reveal></section>
  <section className="section container"><Reveal>{eyebrow('02',ua?'МОЇ ПРИНЦИПИ':'MY PRINCIPLES')}<h2 className="section-heading">{t.about.principles}</h2></Reveal><div className="values-grid">{t.about.values.map((v,i)=>{const Icon=principleIcons[i];return <Reveal className="value-card" key={v} delay={i*.05}><div className="value-card__top"><span>0{i+1} / 05</span><Icon size={25}/></div><p>{v}</p><span className="value-card__bar"/></Reveal>})}</div></section>
  <section className="section container stack-section"><Reveal><div>{eyebrow('03',ua?'ТЕХНОЛОГІЇ':'TOOLKIT')}<h2 className="section-heading">{t.about.skills}</h2><p className="stack-intro">{ua?'Натисни на технологію, щоб побачити, як я її застосовую.':'Select a technology to see how it fits into my work.'}</p></div><TechnologyExplorer locale={locale}/></Reveal><Reveal><div className="language-card">{eyebrow('04',ua?'МОВИ СПІЛКУВАННЯ':'COMMUNICATION')}<h3>{t.about.languages}</h3><ul className="languages">{t.about.langItems.map(x=><li key={x}><span className="pulse-dot"/>{x}</li>)}</ul><div className="language-card__corner">↗</div></div></Reveal></section>
  <SectionCta locale={locale}/>
 </main>
}

export function ServicesPage({locale}:{locale:Locale}){
 const t=copy(locale),ua=locale==='ua';
 return <main><PageIntro eyebrow={t.services.eyebrow} heading={t.services.heading} text={t.services.intro} number="03"/><section className="container section services-detail">{t.services.list.map((s,i)=><Reveal key={s.num} delay={i*.05}><div className="service-detail"><span className="service-detail__num">{s.num} / {ua?'ПОСЛУГА':'SERVICE'}</span><div><h2>{s.name}</h2><p>{s.desc}</p><div className="tag-list">{s.tags.map(x=><span key={x}>{x}</span>)}</div></div><MoveUpRight size={30}/></div></Reveal>)}<p className="services-note">{t.services.note}</p><Link href={`/${locale}/contact/`} className="button button--light">{t.services.cta}<ArrowUpRight size={18}/></Link></section><SectionCta locale={locale}/></main>
}

export function ContactPage({locale}:{locale:Locale}){
 const t=copy(locale),ua=locale==='ua';
 return <main className="contact-page">
  <section className="contact-hero container" aria-labelledby="contact-title">
   <div className="contact-hero__top"><span className="contact-kicker"><span className="pulse-dot"/>{ua?'ЗАПИТИ ТА СПІВПРАЦЯ':'INQUIRIES & COLLABORATIONS'}</span><span className="contact-hero__issue mono">NYVEX / CONTACT — 04</span></div>
   <div className="contact-hero__grid">
    <Reveal className="contact-hero__copy">
     <p className="contact-hero__side mono">{ua?'ВАША ІДЕЯ — НАСТУПНИЙ ПРОЄКТ':'YOUR IDEA COULD BE NEXT'}</p>
     <h1 id="contact-title" className="contact-hero__title">
      <span>{ua?'МАЄТЕ':'HAVE AN'}</span>
      <span>{ua?'ІДЕЮ?':'IDEA?'}</span>
      <span className="contact-hero__accent">{ua?'СТВОРІМО.':'LET’S BUILD.'}</span>
     </h1>
     <p className="contact-hero__lead">{t.contact.intro} {ua?'Розкажіть, що хочете створити — разом знайдемо правильний підхід.':'Share what you’re imagining. We’ll find the right way to make it real.'}</p>
     <a className="contact-hero__shortcut" href="#start-conversation">{ua?'ПОЧАТИ РОЗМОВУ':'START A CONVERSATION'}<span><ArrowRight size={19}/></span></a>
    </Reveal>
    <Reveal className="contact-hero__art">
     <div className="contact-editorial" aria-label={ua?'Про співпрацю з NYVEX':'About collaborating with NYVEX'}>
      <div className="contact-editorial__top mono"><span>NYVEX / STUDIO NOTES</span><span>04 — 2026</span></div>
      <div className="contact-editorial__symbol" aria-hidden="true">✳</div>
      <div className="contact-editorial__body">
       <span className="contact-editorial__index mono">01 / {ua?'ПІДХІД':'THE APPROACH'}</span>
       <p>{ua?'Ідеї заслуговують на продуману реалізацію.':'Thoughtful ideas. Well-crafted outcomes.'}</p>
      </div>
      <div className="contact-editorial__bottom mono"><span>{ua?'ДИЗАЙН · КОД · РЕЗУЛЬТАТ':'DESIGN · CODE · DELIVERY'}</span><span aria-hidden="true">↗</span></div>
     </div>
    </Reveal>
   </div>
   <div className="contact-hero__bottom mono"><span>{ua?'ДИЗАЙН ТА РОЗРОБКА':'DESIGN-LED DEVELOPMENT'}</span><span>{ua?'ГОРТАЙТЕ ДО КОНТАКТІВ ↓':'SCROLL TO CONNECT ↓'}</span></div>
  </section>
  <section className="section container contact-conversation" id="start-conversation">
   <Reveal><div className="contact-conversation__heading"><div>{eyebrow('01',ua?'РОЗПОЧНІМО':'THE CONVERSATION')}<h2>{ua?'РОЗКАЖІТЬ ПРО':'TELL ME ABOUT'}<br/><span>{ua?'ВАШ ПРОЄКТ.':'YOUR PROJECT.'}</span></h2></div><p>{ua?'Сайт, лендинг або помилка, яку потрібно виправити? Напишіть кілька слів — це гарний початок.':'A website, landing page or a bug that needs fixing? A few details are all we need to start.'}</p></div></Reveal>
   <div className="contact-layout contact-layout--new">
    <Reveal className="contact-aside-wrap"><div className="contact-aside contact-aside--new">
     <div className="contact-availability"><span className="pulse-dot"/><span>{ua?'ВІДКРИТИЙ ДО НОВИХ ПРОЄКТІВ':'AVAILABLE FOR NEW PROJECTS'}</span><span className="contact-availability__mark">↗</span></div>
     <div className="contact-aside__statement"><span className="mono">NYVEX / 001</span><h3>{ua?'Гарні ідеї заслуговують на гарну реалізацію.':'Good ideas deserve thoughtful execution.'}</h3><p>{t.contact.availability}</p></div>
     <div className="contact-aside__channels"><div className="contact-aside__channels-title mono">{ua?'ІНШІ СПОСОБИ ЗВ’ЯЗКУ':'OTHER WAYS TO REACH ME'}</div>
      <a className="contact-method contact-method--new" href={`mailto:${EMAIL}`}><span className="contact-method__icon"><Mail size={21}/></span><span><small>{t.contact.directName}</small>{EMAIL}</span><ArrowUpRight size={20}/></a>
      <a className="contact-method contact-method--new" target="_blank" rel="noopener noreferrer" href={UPWORK}><span className="contact-method__icon"><Globe2 size={21}/></span><span><small>{t.contact.upworkName}</small>Upwork / Dmitriy Savva</span><ArrowUpRight size={20}/></a>
     </div>
     <div className="contact-aside__trust"><ShieldCheck size={18}/>{ua?'Ваше повідомлення залишиться приватним.':'Your message stays private.'}</div>
    </div></Reveal>
    <Reveal className="contact-form-wrap"><div className="contact-form-shell"><div className="contact-form-shell__top"><div className="contact-form-shell__label mono"><span className="contact-form-shell__dot"/>{ua?'НОВИЙ ЗАПИТ':'NEW INQUIRY'}</div><div className="contact-form-shell__sequence mono">001—004</div></div><div className="contact-form-shell__heading"><h3>{ua?'Почнімо тут.':'Start here.'}</h3><p>{ua?'Залиште повідомлення — відповім через електронну пошту.':'Send a note — I’ll get back to you by email.'}</p></div><ContactForm locale={locale}/></div></Reveal>
   </div>
  </section>
  <div className="contact-endnote container mono"><span>NYVEX® — DMITRIY SAVVA</span><span>{ua?'ІДЕЇ → РЕЗУЛЬТАТ':'IDEAS → EXPERIENCES'}</span></div>
 </main>;
}
export function PrivacyPage({locale}:{locale:Locale}){const t=copy(locale),ua=locale==='ua';return <main><PageIntro eyebrow={t.privacy.eyebrow} heading={t.privacy.heading} text={t.privacy.intro} number="05"/><section className="container section privacy-layout"><aside><div className="privacy-stamp"><Code2 size={19}/><span>{t.privacy.updated}</span></div><p className="privacy-small mono">{ua?'ПРОЗОРІСТЬ ТА КОНТРОЛЬ':'TRANSPARENCY & CONTROL'}</p></aside><div className="privacy-articles">{t.privacy.sections.map(([title,body],i)=><Reveal key={title}><section>{eyebrow(String(i+1).padStart(2,'0'),ua?'ДАНІ':'PRIVACY')}<h2>{title}</h2><p>{body}</p></section></Reveal>)}<p className="privacy-email"><a href={`mailto:${EMAIL}`}>{EMAIL}<ArrowUpRight size={18}/></a></p></div></section></main>}

export function NotFoundPage({locale}:{locale:Locale}){const t=copy(locale);return <main className="not-found container"><span className="not-found__num">404<span>✳</span></span><div><span className="eyebrow">NYVEX / NOT FOUND</span><h1>{t.notfound.heading}</h1><p>{t.notfound.text}</p><Link href={`/${locale}/`} className="button button--light">{t.notfound.button}<ArrowRight size={18}/></Link></div></main>}

function PageIntro({eyebrow:label,heading,text,number}:{eyebrow:string;heading:string;text:string;number:string}){return <section className="page-intro-section container"><Reveal><div className="page-intro-section__top"><span className="eyebrow"><span className="pulse-dot"/>{label}</span><span className="mono">NYVEX / {number}</span></div><h1 className="page-title">{heading}</h1><p className="page-intro">{text}</p></Reveal><div className="intro-watermark" aria-hidden="true">✳</div></section>}
