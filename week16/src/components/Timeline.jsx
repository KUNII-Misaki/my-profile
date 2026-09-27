export const initialPosts = [
  {
    id: 'post-1',
    category: 'event',
    createdAt: '2026-09-04T12:00:00+09:00',
    date: '2026年9月4日',
    title: '夏ハッカソン！！',
    body: '6・7期生夏ハッカソンお疲れさまでした！！',
    images: [],
    name: 'misaki',
    handle: '@misaki',
    likes: 142,
    avatar: 'profile',
  },
  {
    id: 'post-2',
    category: 'event',
    createdAt: '2026-08-22T12:00:00+09:00',
    date: '2026年8月22日',
    title: '夏ハウィーク　プレゼン編',
    body: '渋谷のハーバーズでプレゼンの練習をしました！',
    images: [],
    name: 'かとまな',
    handle: '@kato',
    likes: 89,
    avatar: 'two',
  },
  {
    id: 'post-3',
    category: 'daily',
    createdAt: '2026-08-03T12:00:00+09:00',
    date: '2026年8月3日',
    title: 'ジョイポリスの思い出',
    body: '7期で遊園地に行きました！',
    images: [],
    name: 'ずみ',
    handle: '@zumi',
    likes: 230,
    avatar: 'three',
  },
  {
    id: 'post-4',
    category: 'daily',
    createdAt: '2026-07-27T12:00:00+09:00',
    date: '2026年7月27日',
    title: 'ディスコードでのテスト勉強',
    body: 'テスト前でも楽しみながら勉強できた！ちょっと脱線したかな？',
    images: [],
    name: 'おのしょう',
    handle: '@ono',
    likes: 312,
    avatar: 'one',
  },
]

export function relativeTime(dateString) {
  const diffMs = Date.now() - new Date(dateString).getTime()
  const minutes = Math.max(0, Math.floor(diffMs / 60000))
  if (minutes < 1) return 'たった今'
  if (minutes < 60) return `${minutes}分前`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}時間前`
  const days = Math.floor(hours / 24)
  return `${days}日前`
}

export function Timeline({ posts = initialPosts, likedPosts = [], onLike, onDeletePost, onOpenPost }) {
  return (
    <div className="space-y-6">
      <label className="flex h-[46px] items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 shadow-sm focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-100">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 text-slate-500">
          <circle cx="11" cy="11" r="6" />
          <path d="M16 16L21 21" strokeLinecap="round" />
        </svg>
        <input className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-500" placeholder="投稿を検索..." />
      </label>

      <div className="space-y-5">
        {posts.map((post) => (
          <article key={post.id} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className={`inline-grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br ${post.avatar === 'profile' ? 'from-amber-200 via-orange-100 to-sky-200' : post.avatar === 'two' ? 'from-emerald-200 via-amber-100 to-rose-200' : post.avatar === 'three' ? 'from-orange-200 via-stone-100 to-sky-200' : 'from-amber-100 via-stone-100 to-teal-200'}`} aria-hidden="true" />
                <div>
                  <p className="font-bold text-slate-900">{post.name}</p>
                  <p className="text-sm text-slate-500">{post.handle}</p>
                </div>
              </div>
              <span className="rounded-full bg-sky-100 px-3 py-1 text-[11px] font-bold text-sky-950">{post.category === 'event' ? 'イベント' : '日常'}</span>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
              <span>{relativeTime(post.createdAt)}</span>
              <time>{post.date}</time>
            </div>

            <h2 className="mt-4 text-xl font-extrabold text-slate-900">{post.title}</h2>
            <p className="mt-3 whitespace-pre-wrap text-[15px] leading-7 text-slate-700">{post.body}</p>

            {post.images?.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-2">
                {post.images.slice(0, 2).map((image, index) => (
                  <img key={`${post.id}-${index}`} src={image} alt={`${post.title}の画像 ${index + 1}`} className="h-32 w-full rounded-xl object-cover" />
                ))}
              </div>
            )}

            <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
              <button onClick={() => onLike?.(post.id)} className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold ${likedPosts.includes(post.id) ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-600'}`}>
                <svg aria-hidden="true" viewBox="0 0 24 24" fill={likedPosts.includes(post.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                  <path d="M12 21s-8.5-5.2-10.5-9.6C.5 8.9 2.3 4 6.7 4c2.2 0 3.4 1.1 4.3 2.2C11.9 5.1 13.1 4 15.3 4c4.4 0 6.2 4.9 5.2 7.4C20.5 15.8 12 21 12 21Z" />
                </svg>
                {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
              </button>
              <button onClick={() => onOpenPost?.(post)} className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-2 text-sm font-bold text-posse-700">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                  <path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z" />
                  <path d="M8 10h8M8 14h5" strokeLinecap="round" />
                </svg>
                詳細を見る
              </button>
              {(post.name === 'misaki' || post.handle === '@misaki') && (
                <button onClick={() => onDeletePost?.(post.id)} className="ml-auto inline-flex items-center gap-2 rounded-full border border-rose-200 px-3 py-2 text-sm font-bold text-rose-600 hover:bg-rose-50">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                    <path d="M4 7h16M9 7V4h6v3M6 7l1 12h10l1-12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  削除
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default Timeline
