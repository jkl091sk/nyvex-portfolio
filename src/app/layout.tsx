import type {Metadata} from 'next';
import {SITE_URL} from '@/lib/seo';
import '@/app/globals.css';
export const metadata:Metadata={
 metadataBase:new URL(SITE_URL),
 title:{default:'Dmitriy Savva — Desktop & Web Developer | NYVEX',template:'%s | NYVEX'},
 description:'NYVEX — the personal portfolio of Dmitriy Savva, a desktop and web developer.',
 applicationName:'NYVEX',
 creator:'Dmitriy Savva',
 publisher:'Dmitriy Savva',
 robots:{index:true,follow:true},
 alternates:{canonical:SITE_URL+'/',languages:{en:SITE_URL+'/en/',uk:SITE_URL+'/ua/','x-default':SITE_URL+'/en/'}},
 openGraph:{type:'website',siteName:'NYVEX',title:'Dmitriy Savva — Desktop & Web Developer | NYVEX',description:'Creative development. Real solutions.',url:SITE_URL+'/',images:[{url:'/og/nyvex-social.png',width:1200,height:630,alt:'NYVEX — Dmitriy Savva'}]},
 twitter:{card:'summary_large_image',images:['/og/nyvex-social.png']},
 icons:{icon:[{url:'/favicon.ico',sizes:'any'},{url:'/brand/nyvex-mark.svg',type:'image/svg+xml'}],shortcut:'/favicon.ico',apple:'/apple-touch-icon.png'}
};
const structuredData={
 '@context':'https://schema.org','@graph':[
  {'@type':'Person','@id':SITE_URL+'/#person',name:'Dmitriy Savva',url:SITE_URL+'/',jobTitle:'Desktop & Web Developer',sameAs:['https://github.com/jkl091sk','https://www.upwork.com/freelancers/~015d978f5fc078d566']},
  {'@type':'WebSite','@id':SITE_URL+'/#website',url:SITE_URL+'/',name:'NYVEX',inLanguage:['en','uk'],author:{'@id':SITE_URL+'/#person'}}
 ]
};
export default function RootLayout({children}:{children:React.ReactNode}) {
 return <html lang="en"><body>
 <div className="nyvex-atmosphere" aria-hidden="true"><div className="nyvex-atmosphere__mesh"/><div className="nyvex-atmosphere__orb nyvex-atmosphere__orb--violet"/><div className="nyvex-atmosphere__orb nyvex-atmosphere__orb--teal"/><div className="nyvex-atmosphere__orb nyvex-atmosphere__orb--blue"/><div className="nyvex-atmosphere__vignette"/></div>
 {children}
 <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData).replace(/</g,'\\u003c')}}/>
 </body></html>;
}
