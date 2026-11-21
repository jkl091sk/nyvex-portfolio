import type {Metadata} from 'next';
import {ProjectPage} from '@/components/pages';
import {PROJECTS,isLocale} from '@/lib/content';
import {seoMetadata,type SeoPage} from '@/lib/seo';
import {notFound} from 'next/navigation';
type Props={params:Promise<{locale:string;slug:string}>};
export function generateStaticParams(){return PROJECTS.map(({slug})=>({slug}));}
export const dynamicParams=false;
export default async function Page({params}:Props){
 const {locale,slug}=await params;
 if(!isLocale(locale)||!PROJECTS.some(p=>p.slug===slug))notFound();
 return <ProjectPage locale={locale} slug={slug}/>;
}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {locale,slug}=await params;
 if(!isLocale(locale)||!PROJECTS.some(p=>p.slug===slug))notFound();
 return seoMetadata(locale,slug as SeoPage);
}
