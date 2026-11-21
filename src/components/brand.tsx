import Link from 'next/link';
import type {Locale} from '@/lib/content';
export default function Brand({locale,footer=false}:{locale:Locale;footer?:boolean}) {
 return <Link className={`brand ${footer?'brand--footer':''}`} href={`/${locale}/`} aria-label="NYVEX home"><img alt="" src="/brand/nyvex-mark.svg" width="42" height="42"/><span>NYVEX<span className="brand__dot">.</span></span></Link>
}
