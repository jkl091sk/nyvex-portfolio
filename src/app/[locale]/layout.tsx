import Header from '@/components/header';
import Footer from '@/components/footer';
import HtmlLang from '@/components/html-lang';
import {locales,isLocale,type Locale} from '@/lib/content';
import {notFound} from 'next/navigation';
export function generateStaticParams(){return locales.map(locale=>({locale}))}
export const dynamicParams=false;
export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){
 const {locale}=await params;if(!isLocale(locale))notFound();
 return <><HtmlLang locale={locale as Locale}/><Header locale={locale as Locale}/>{children}<Footer locale={locale as Locale}/></>
}
