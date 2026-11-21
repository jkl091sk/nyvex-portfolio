'use client';
import {FormEvent,useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight,LoaderCircle} from 'lucide-react';
import {copy,EMAIL,type Locale} from '@/lib/content';
const endpoint=`https://formsubmit.co/ajax/${EMAIL}`;
const htmlFallback=`https://formsubmit.co/${EMAIL}`;
type Result={success?:boolean|string;message?:string};
export default function ContactForm({locale}:{locale:Locale}){
 const t=copy(locale);
 const [pending,setPending]=useState(false),[sent,setSent]=useState(false),[message,setMessage]=useState('');
 const [form,setForm]=useState({name:'',email:'',subject:'',message:'',website:''});
 async function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault();if(pending||sent||form.website.trim())return;
  setMessage('');setPending(true);
  try{
   const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({
     name:form.name.trim(),email:form.email.trim(),subject:form.subject.trim(),message:form.message.trim(),
     _subject:`[NYVEX] ${form.subject.trim()}`,_template:'table',_honey:form.website
   })});
   const result=(await response.json()) as Result;
   if(!response.ok||(result.success!==true&&result.success!=='true'))throw new Error('Submission rejected');
   setSent(true);setMessage(t.contact.success);
   setForm({name:'',email:'',subject:'',message:'',website:''});
  }catch{setMessage(t.contact.error)}finally{setPending(false)}
 }
 return <form className="contact-form" method="POST" action={htmlFallback} onSubmit={submit} aria-busy={pending}>
  <input type="hidden" name="_subject" value={`[NYVEX] ${form.subject.trim()||'New enquiry'}`}/>
  <input type="hidden" name="_template" value="table"/>
  <div className="field-grid">
   <label>{t.contact.name}<input name="name" maxLength={100} required autoComplete="name" value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="Jane Doe"/></label>
   <label>{t.contact.mail}<input name="email" type="email" maxLength={180} required autoComplete="email" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} placeholder="hello@example.com"/></label>
  </div>
  <label>{t.contact.subject}<input name="subject" maxLength={180} required value={form.subject} onChange={e=>setForm(p=>({...p,subject:e.target.value}))} placeholder="Website / Landing page / Bug fix"/></label>
  <label>{t.contact.message}<textarea name="message" maxLength={5000} required rows={6} value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))} placeholder="..."/></label>
  <div className="honeypot" aria-hidden="true"><label>Website<input name="_honey" tabIndex={-1} autoComplete="off" value={form.website} onChange={e=>setForm(p=>({...p,website:e.target.value}))}/></label></div>
  <label className="consent"><input type="checkbox" required/><span>{t.contact.consent} <Link href={`/${locale}/privacy-policy/`}>{t.nav.privacy}<ArrowUpRight size={13}/></Link></span></label>
  <button className="button button--primary form-submit" type="submit" disabled={pending||sent}>{pending?<LoaderCircle className="spin" size={19}/>:null}{pending?t.contact.sending:sent?t.contact.success:t.universal.send}<ArrowUpRight size={18}/></button>
  <p aria-live="polite" role="status" className="form-feedback">{message||t.contact.note}</p>
 </form>
}
