'use client';
import {FormEvent,useState} from 'react';
import Link from 'next/link';
import Script from 'next/script';
import {ArrowUpRight,LoaderCircle} from 'lucide-react';
import {copy,EMAIL,type Locale} from '@/lib/content';
const endpoint=process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || '';
const turnstileSiteKey=process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';
export default function ContactForm({locale}:{locale:Locale}){
 const t=copy(locale),[pending,setPending]=useState(false),[message,setMessage]=useState(''),[sent,setSent]=useState(false);
 const [form,setForm]=useState({name:'',email:'',subject:'',message:'',website:''});
 const fallback=()=>{const subject=encodeURIComponent(`[NYVEX] ${form.subject}`);const body=encodeURIComponent(`From: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);window.location.href=`mailto:${EMAIL}?subject=${subject}&body=${body}`;setMessage(t.contact.fallback)};
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();if(pending)return;setMessage('');
  if(!endpoint){fallback();return}
  setPending(true);
  try{const fd=new FormData(e.currentTarget);const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:form.name,email:form.email,subject:form.subject,message:form.message,website:form.website,turnstile:fd.get('cf-turnstile-response')||''})});if(!response.ok)throw new Error('Delivery unavailable');setSent(true);setMessage(t.contact.success);setForm({name:'',email:'',subject:'',message:'',website:''})}
  catch{fallback();setMessage(t.contact.error+" "+t.contact.fallback)}finally{setPending(false)}
 }
 return <form className="contact-form" onSubmit={submit}>
   <div className="field-grid"><label>{t.contact.name}<input name="name" maxLength={100} required autoComplete="name" value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="Jane Doe"/></label><label>{t.contact.mail}<input name="email" type="email" maxLength={180} required autoComplete="email" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} placeholder="hello@example.com"/></label></div>
   <label>{t.contact.subject}<input name="subject" maxLength={180} required value={form.subject} onChange={e=>setForm(p=>({...p,subject:e.target.value}))} placeholder="Website / Landing page / Bug fix"/></label>
   <label>{t.contact.message}<textarea name="message" maxLength={5000} required rows={6} value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))} placeholder="..."/></label>
   <div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={e=>setForm(p=>({...p,website:e.target.value}))}/></label></div>
   {turnstileSiteKey&&endpoint?<><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive"/><div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-theme="dark"/></>:null}
   <label className="consent"><input type="checkbox" required/><span>{t.contact.consent} <Link href={`/${locale}/privacy-policy/`}>{t.nav.privacy}<ArrowUpRight size={13}/></Link></span></label>
   <button className="button button--primary form-submit" type="submit" disabled={pending||sent}>{pending?<LoaderCircle className="spin" size={19}/>:null}{sent?t.contact.success:endpoint?t.universal.send:t.contact.send}<ArrowUpRight size={18}/></button>
   <p aria-live="polite" className="form-feedback">{message||t.contact.note}</p>
 </form>
}
