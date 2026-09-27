import { Search, Trash2 } from 'lucide-react'

export const initialAnnouncements = [
  { id: 'announcement-1', date: '2026-09-27T10:00', title: 'カリキュラム合宿', description: 'カリキュラムの締め切りが迫ってきていますね！この合宿でカリキュラムを終わらせちゃいましょう！！', audience: '対象7期生' },
  { id: 'announcement-2', date: '2026-10-03T13:00', title: '7.5期生入学式', description: '新入生と初めて会えるこの機会！行くしかない！！', audience: '対象6・7期生' },
]

function AnnouncementCard({ item, onOpen, onDelete }) {
  const date = new Date(item.date)
  const dateLabel = `${date.getMonth() + 1}月${date.getDate()}日開催`
  return (
    <article className="rounded-xl border border-sky-100 bg-gradient-to-br from-sky-100 to-sky-50 p-5 shadow-card">
      <div className="flex items-center justify-between"><span className="rounded-full bg-posse-600 px-3 py-2 text-xs font-bold text-white">告知</span><time className="text-xs font-medium text-slate-700">{dateLabel}</time></div>
      <h2 className="mt-2 text-lg font-extrabold text-slate-900">{item.title}</h2>
      <p className="mt-2 truncate text-[15px] leading-6 text-slate-700" title={item.description}>{item.description}</p>
      <button onClick={onOpen} className="mt-3 h-[38px] w-full rounded-lg border border-blue-300 bg-white text-sm font-bold text-posse-700 transition hover:bg-blue-50">詳細をみる</button>
      <button className="mt-1.5 h-[38px] w-full rounded-lg bg-posse-600 text-sm font-bold text-white transition hover:bg-posse-700">{item.audience}</button>
      {item.author === 'misaki' && <button onClick={onDelete} className="mt-2 inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg text-sm font-bold text-rose-600 transition hover:bg-rose-50"><Trash2 size={16} />告知を削除</button>}
    </article>
  )
}

export function Announcements({ announcements = initialAnnouncements, onOpen, onDelete }) {
  return (
    <aside className="min-w-0 pt-1 lg:sticky lg:top-8 lg:self-start">
      <label className="flex h-[42px] items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 shadow-sm focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-100"><Search size={18} className="shrink-0 text-slate-600" /><input className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-500" placeholder="キーワードや投稿者を検索..." /></label>
      <div className="mt-6 space-y-12">{announcements.map((item) => <AnnouncementCard key={item.id} item={item} onOpen={() => onOpen?.(item)} onDelete={() => onDelete?.(item.id)} />)}</div>
    </aside>
  )
}
