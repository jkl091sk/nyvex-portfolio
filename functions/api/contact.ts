/** Optional Cloudflare Pages Function for real delivery via Resend.
 * Configure secrets in Cloudflare Pages: RESEND_API_KEY, CONTACT_FROM, CONTACT_TO,
 * and optionally TURNSTILE_SECRET_KEY + public NEXT_PUBLIC_TURNSTILE_SITE_KEY at build time.
 * Without this function configured, the Next.js form falls back to mailto.
 */
type Env = {RESEND_API_KEY?:string;CONTACT_FROM?:string;CONTACT_TO?:string;TURNSTILE_SECRET_KEY?:string};
type Context = {request:Request;env:Env};
export async function onRequestPost({request,env}:Context):Promise<Response>{
 const json=(data:unknown,status=200)=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'}});
 if(!env.RESEND_API_KEY||!env.CONTACT_FROM||!env.CONTACT_TO)return json({error:'Contact delivery not configured'},503);
 const origin=request.headers.get('origin');if(origin&&new URL(origin).host!==new URL(request.url).host)return json({error:'Origin not allowed'},403);
 if(!request.headers.get('content-type')?.includes('application/json'))return json({error:'JSON required'},415);
 const length=Number(request.headers.get('content-length')||0);if(length>15000)return json({error:'Payload too large'},413);
 let data:Record<string,unknown>;try{data=await request.json() as Record<string,unknown>}catch{return json({error:'Invalid JSON'},400)}
 const clean=(k:string,max:number)=>typeof data[k]==='string'?(data[k] as string).trim().slice(0,max):'';
 const name=clean('name',100),email=clean('email',180),subject=clean('subject',180),message=clean('message',5000),website=clean('website',100);
 if(website)return json({ok:true});
 if(!name||!email||!subject||!message||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return json({error:'Invalid fields'},400);
 if(env.TURNSTILE_SECRET_KEY){const token=clean('turnstile',2048);if(!token)return json({error:'Challenge required'},403);const c=new FormData();c.set('secret',env.TURNSTILE_SECRET_KEY);c.set('response',token);const verify=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body:c});const result=await verify.json() as {success:boolean};if(!result.success)return json({error:'Challenge failed'},403)}
 const safe=(x:string)=>x.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]||c));
 const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:env.CONTACT_FROM,to:[env.CONTACT_TO],reply_to:email,subject:`[NYVEX] ${subject}`,html:`<h2>NYVEX enquiry</h2><p><b>Name:</b> ${safe(name)}</p><p><b>Email:</b> ${safe(email)}</p><p><b>Subject:</b> ${safe(subject)}</p><pre style="white-space:pre-wrap">${safe(message)}</pre>`})});
 return response.ok?json({ok:true}):json({error:'Email provider failed'},502);
}
