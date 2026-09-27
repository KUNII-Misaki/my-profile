import { BookOpen, Cloud, Home, Megaphone, PenSquare, Settings, UserRound } from 'lucide-react'

const navigation = [
  { label: 'ホーム', icon: Home, active: true },
  { label: 'プロフィール', icon: UserRound },
]

export function Sidebar({ onCreatePost, onCreateAnnouncement, onHome, onUsage }) {
  return (
    <aside className="sidebar-shell sticky top-0 flex h-screen w-[248px] shrink-0 flex-col border-r border-slate-100 bg-white px-[18px] py-8 max-lg:w-[220px] max-md:hidden">
      <a href="#home" className="flex items-center gap-3 px-3" aria-label="POSSE NEWS ホーム">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-posse-600 text-white shadow-sm"><Cloud size={23} strokeWidth={2.3} /></span>
        <span><strong className="block text-[21px] font-extrabold leading-none tracking-tight text-posse-700">POSSE NEWS</strong><small className="mt-2 block text-[9px] font-medium tracking-[.16em] text-slate-500">CREATIVE PULSE</small></span>
      </a>

      <nav className="mt-11 space-y-2" aria-label="メインメニュー">
        {navigation.map(({ label, icon: Icon, active }) => (
          <a key={label} href="#home" onClick={active ? (event) => { event.preventDefault(); onHome?.() } : undefined} className={`flex h-11 items-center gap-3 rounded-lg px-4 text-sm font-semibold transition ${active ? 'bg-indigo-50 text-posse-700 before:absolute before:left-[18px] before:h-8 before:w-1 before:rounded-r-full before:bg-posse-600' : 'text-slate-600 hover:bg-slate-50'}`}>
            <Icon size={18} fill={active ? 'currentColor' : 'none'} strokeWidth={2.4} /><span>{label}</span>
          </a>
        ))}
        <button onClick={onUsage} className="flex h-11 w-full items-center gap-3 rounded-lg px-4 text-left text-sm font-semibold text-slate-600 transition hover:bg-slate-50"><BookOpen size={18} strokeWidth={2.2} /><span>使い方</span></button>
      </nav>

      <div className="mt-10 space-y-2">
        <button onClick={onCreatePost} className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-posse-600 text-sm font-bold text-white shadow-md shadow-sky-900/10 transition hover:bg-posse-700"><PenSquare size={17} />記事を投稿</button>
        <button onClick={onCreateAnnouncement} className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-blue-300 bg-indigo-50 text-sm font-bold text-posse-700 transition hover:bg-indigo-100"><Megaphone size={17} />告知を投稿</button>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-slate-100 px-2 pt-6">
        <div className="flex items-center gap-3">
          <Avatar kind="profile" />
          <div><p className="text-base font-bold leading-5">misaki</p><p className="mt-1 text-sm text-slate-500">@misaki</p></div>
        </div>
        <button aria-label="設定" className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"><Settings size={18} /></button>
      </div>
    </aside>
  )
}

export function Avatar({ kind = 'one', size = 'md' }) {
  const color = kind === 'profile' ? 'from-amber-200 via-orange-100 to-sky-200' : kind === 'two' ? 'from-emerald-200 via-amber-100 to-rose-200' : kind === 'three' ? 'from-orange-200 via-stone-100 to-sky-200' : 'from-amber-100 via-stone-100 to-teal-200'
  return <span className={`avatar inline-grid shrink-0 place-items-center rounded-full bg-gradient-to-br ${color} ${size === 'lg' ? 'h-10 w-10' : 'h-8 w-8'}`} aria-hidden="true"><UserRound size={size === 'lg' ? 21 : 17} className="text-slate-500/75" /></span>
}
