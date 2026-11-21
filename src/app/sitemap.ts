import type {MetadataRoute} from 'next';
import {SITE_URL,seoUrl,type SeoPage} from '@/lib/seo';
export const dynamic = 'force-static';

const pages:SeoPage[]=['home','projects','initra-app','initra-site','about','services','contact','privacy-policy'];
const langs=(page:SeoPage)=>({en:seoUrl('en',page),uk:seoUrl('ua',page),'x-default':seoUrl('en',page)});
export default function sitemap():MetadataRoute.Sitemap{
 const lastModified=new Date('2026-11-21');
 return [
  {url:SITE_URL+'/',lastModified,changeFrequency:'monthly',priority:0.8},
  ...pages.flatMap(page=>(['en','ua'] as const).map(locale=>({
   url:seoUrl(locale,page),lastModified,
   changeFrequency:'monthly' as const,
   priority:page==='home'?1:page==='privacy-policy'?0.2:0.7,
   alternates:{languages:langs(page)}
  })))
 ];
}
