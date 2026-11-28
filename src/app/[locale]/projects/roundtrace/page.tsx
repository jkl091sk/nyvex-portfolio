import Link from 'next/link';
import {Download} from 'lucide-react';
import {notFound} from 'next/navigation';
import {isLocale} from '@/lib/content';
import {seoMetadata} from '@/lib/seo';

type Props = {params: Promise<{locale:string}>};
export async function generateMetadata({params}:Props) {
  const {locale}=await params;
  if(!isLocale(locale)) notFound();
  return seoMetadata(locale,'roundtrace');
}

export default async function RoundTracePage({params}:Props) {
  const {locale}=await params;
  if(!isLocale(locale)) notFound();
  const ua=locale==='ua';
  return <main className="container rt-release">
    <Link className="back-link" href={`/${locale}/projects/`}>← {ua?'Усі проєкти':'All projects'}</Link>
    <header className="rt-hero">
      <div><p className="eyebrow">NYVEX · Chrome / Brave · Windows</p><h1>RoundTrace</h1>
      <p>{ua?'Переглядай матчі FACEIT за днями. Побач результат сесії у W-L та Elo або вибери карту, щоб перевірити свій вінрейт.':'See your FACEIT matches grouped by day. Check your session’s W-L record and Elo change, or pick a map to see your win rate.'}</p>
      <a className="button button--light" download href="/roundtrace/RoundTrace-0.3.1.zip"><Download size={18}/>{ua?'Завантажити ZIP':'Download ZIP'} · 0.3.1</a>
      </div><img className="rt-mark" src="/roundtrace/logo.svg" width="160" height="160" alt=""/>
    </header>
    <section><h2>{ua?'Для чого потрібен RoundTrace':'What is RoundTrace for?'}</h2>
    <p>{ua?'Після кількох ігор легко забути, скільки Elo принесла сесія. RoundTrace збирає матчі одного дня в групу прямо в історії FACEIT. Наприклад, перемога на +37 Elo та поразка на −25 Elo дадуть підсумок 1W-1L · +12 Elo. Натисни на дату, щоб згорнути або розгорнути цей день.':'After a few games it can be hard to tell how much Elo you gained that session. RoundTrace groups each day’s matches in your FACEIT history. For example, a +37 Elo win and a −25 Elo loss give you a daily total of 1W-1L · +12 Elo. Click the date to collapse or expand that day.'}</p></section>
    <section><h2>{ua?'Як він працює':'How it works'}</h2><ol>
    <li>{ua?'Відкрий історію матчів CS2 на FACEIT. Розширення читає завантажені рядки й рахує перемоги, поразки та зміну рейтингу. Якщо Elo якогось матчу відсутнє, замість суми з’явиться риска.':'Open CS2 match history on FACEIT. The extension reads the loaded rows and totals wins, losses and rating changes. If a match is missing its Elo change, the total shows a dash.'}</li>
    <li>{ua?'Натисни R → History. Вибери, наприклад, Mirage: у таблиці залишаться матчі на цій карті, а у зведенні з’явиться їхній вінрейт. Підвантаж попередні матчі на FACEIT, щоб врахувати їх у розрахунку.':'Click R → History. Select Mirage, for example, to show those matches in the table and see their win rate in the panel. Load older matches on FACEIT to include them in the calculation.'}</li>
    <li>{ua?'Перед грою відкрий R → Menu. Тут можна окремо ввімкнути автоприйняття матчу чи запрошення в групу. Коли розширення розпізнає відповідний діалог FACEIT, воно натисне кнопку прийняття. Обидва перемикачі спочатку вимкнені.':'Before queuing, open R → Menu. Auto-accept for matches and party invites can be enabled separately. When RoundTrace recognises a matching FACEIT dialog, it presses the accept button. Both options start off.'}</li>
    </ol></section>
    <section><h2>{ua?'Як встановити':'How to install'}</h2><ol>
      <li>{ua?'Завантаж ZIP та розпакуй його в окрему папку RoundTrace. Залиш її на комп’ютері.':'Download the ZIP and extract it into a dedicated RoundTrace folder. Keep this folder on your computer.'}</li>
      <li>{ua?'Уведи в адресному рядку':'Type'} <code>chrome://extensions</code> {ua?'для Chrome або':'in Chrome or'} <code>brave://extensions</code> {ua?'для Brave. Увімкни режим розробника (Developer mode).':'in Brave. Turn on Developer mode.'}</li>
      <li>{ua?'Натисни «Завантажити розпаковане розширення» (Load unpacked) і вибери папку з файлом manifest.json.':'Click “Load unpacked” and choose the folder containing manifest.json.'}</li>
      <li>{ua?'Онови сторінку FACEIT і натисни пісочну R у правому нижньому куті.':'Reload FACEIT and click the sand-coloured R in the bottom-right corner.'}</li>
    </ol></section>
    <section><h2>{ua?'Мова та оновлення':'Language and updates'}</h2>
    <p>{ua?'Версія 0.3.1 додає англійську мову. Щоб перемкнути інтерфейс, відкрий Appearance → Language або «Вид → Язык». Доступні English та Русский.':'Version 0.3.1 adds English. Open Appearance → Language (Вид → Язык in Russian) to switch between English and Russian.'}</p>
    <p>{ua?'Оновлення встановлюються вручну. Розпакуй новий ZIP поверх файлів у тій самій папці, натисни ↻ біля RoundTrace на сторінці розширень і онови FACEIT.':'Updates are manual. Extract the new ZIP over the files in the same folder, click ↻ on the RoundTrace card on your extensions page, then reload FACEIT.'}</p></section>
    <section id="privacy"><h2>{ua?'Конфіденційність RoundTrace':'RoundTrace privacy'}</h2>
    <p>{ua?'RoundTrace обробляє завантажені дати, рахунки, карти й Elo в пам’яті вкладки. Мова, розмір меню та перемикачі зберігаються локально в браузері. Розширення не передає цю статистику NYVEX і не містить аналітики чи реклами.':'RoundTrace processes loaded match dates, scores, maps and Elo in tab memory. Your language, menu size and switches are stored locally in your browser. The extension does not send these stats to NYVEX and contains no analytics or ads.'}</p>
    <p>{ua?'Якщо ввімкнути автоприйняття, розширення натискає кнопку в розпізнаному діалозі. FACEIT обробляє дію у твоєму акаунті. Видалення розширення очищає його налаштування.':'If you enable auto-accept, RoundTrace clicks the button in a recognised invitation dialog. FACEIT processes the action in your account. Removing the extension clears its preferences.'}</p>
    <Link className="text-link" href={`/${locale}/contact/`}>{ua?'Зв’язатися з NYVEX':'Contact NYVEX'} ↗</Link></section>
  </main>;
}
