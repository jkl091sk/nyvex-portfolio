import type {Metadata} from 'next';
import {ServicesPage} from '@/components/pages';
import {isLocale} from '@/lib/content';import {notFound} from 'next/navigation';
export default async function Page({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return <ServicesPage locale={locale}/>}

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;return {title:'Services',description:'Website development, landing pages and bug fixing.'}}
