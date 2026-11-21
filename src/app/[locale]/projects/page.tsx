import type {Metadata} from 'next';
import {ProjectsPage} from '@/components/pages';
import {isLocale} from '@/lib/content';import {notFound} from 'next/navigation';
export default async function Page({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return <ProjectsPage locale={locale}/>}

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;return {title:'Projects',description:'Initra desktop application and official website.'}}
