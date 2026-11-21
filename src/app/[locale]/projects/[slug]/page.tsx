import type {Metadata} from 'next';
import {ProjectPage} from '@/components/pages';
import {PROJECTS,isLocale} from '@/lib/content';
import {notFound} from 'next/navigation';
export function generateStaticParams(){return PROJECTS.map(x=>({slug:x.slug}))}
export const dynamicParams=false;
export default async function Page({params}:{params:Promise<{locale:string;slug:string}>}){
 const {locale,slug}=await params;
 if(!isLocale(locale)||!PROJECTS.some(p=>p.slug===slug))notFound();
 return <ProjectPage locale={locale} slug={slug}/>;
}

export async function generateMetadata({params}:{params:Promise<{locale:string;slug:string}>}):Promise<Metadata>{const {slug}=await params;return {title:slug==='initra-app'?'Initra — Linux Setup Manager':'Initra — Official Website',description:slug==='initra-app'?'Python / PySide6 desktop software for Linux configuration.':'Official website for Initra Linux Setup Manager.'}}
