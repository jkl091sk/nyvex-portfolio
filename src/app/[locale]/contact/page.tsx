import type {Metadata} from 'next';
import {ContactPage} from '@/components/pages';
import {isLocale} from '@/lib/content';
import {seoMetadata} from '@/lib/seo';
import {notFound} from 'next/navigation';
type Props={params:Promise<{locale:string}>};
export default async function Page({params}:Props){
 const {locale}=await params;if(!isLocale(locale))notFound();
 return <ContactPage locale={locale}/>;
}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {locale}=await params;if(!isLocale(locale))notFound();
 return seoMetadata(locale,'contact');
}
