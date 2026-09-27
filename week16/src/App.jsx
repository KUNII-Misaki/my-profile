import { useState } from 'react'
import { ArrowLeft, CalendarDays, ImagePlus, Trash2 } from 'lucide-react'
import { Sidebar, Avatar } from './components/Sidebar.jsx'
import { Timeline, initialPosts, relativeTime } from './components/Timeline.jsx'
import { Announcements, initialAnnouncements } from './components/Announcements.jsx'
import { ImageSlideshow } from './components/ImageSlideshow.jsx'
import posseNewsImage from './assets/images/POSSE_NEWS.png'
import posseNewsGuide from './assets/images/NEWSガイド.jpg'
import posseTed from './assets/images/POSSE NEWS ted.png'

const howToSlides = [
  { image: posseNewsImage, title: 'みんなの投稿を見よう', body: 'タイムラインからイベントや日常の投稿をチェックできます。' },
  { image: posseNewsGuide, title: '思い出を投稿しよう', body: '「記事を投稿」から文章と写真を追加して共有できます。' },
  { image: posseTed, title: 'イベント告知を確認しよう', body: '右側の告知で開催日時や対象の期生を確認できます。' },
]

function BackButton({ onClick, children = 'タイムラインに戻る' }) {
  return <button onClick={onClick} className="mb-7 inline-flex items-center gap-2 text-sm font-bold text-posse-700 hover:text-posse-500 cursor-pointer hover:underline"><ArrowLeft size={18} />{children}</button>
}

function BlogPage({ post, onBack, onDelete }) {
  const images = post.images || (post.image ? [post.image] : [])
  return (
    <article className="mx-auto max-w-3xl rounded-2xl border border-slate-100 bg-white p-6 shadow-card sm:p-10">
      <BackButton onClick={onBack} />
      <div className="flex items-center justify-between gap-3"><span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-950">{relativeTime(post.createdAt)}</span><time className="flex items-center gap-1 text-sm text-slate-600"><CalendarDays size={15} />{post.date}</time></div>
      <h1 className="mt-5 text-3xl font-extrabold leading-tight text-slate-900">{post.title}</h1>
      <div className="mt-6 flex items-center gap-3 border-b border-slate-100 pb-6"><Avatar kind={post.avatar || 'profile'} size="lg" /><div><p className="font-bold">{post.name}</p><p className="text-sm text-slate-500">{post.handle}</p></div></div>
      {(post.name === 'misaki' || post.handle === '@misaki') && <button onClick={onDelete} className="mt-4 inline-flex items-center gap-2 rounded-lg border border-rose-200 px-4 py-2 text-sm font-bold text-rose-600 transition hover:bg-rose-50"><Trash2 size={16} />投稿を削除</button>}
      <ImageSlideshow images={images} alt={`${post.title}の画像`} />
      <p className="mt-7 whitespace-pre-wrap text-base leading-8 text-slate-700">{post.body}</p>
    </article>
  )
}

function ImagePicker({ images, setImages }) {
  async function handleChange(event) {
    const files = Array.from(event.target.files || []).filter((file) => file.type.startsWith('image/'))
    const dataUrls = await Promise.all(files.map((file) => new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result))
      reader.readAsDataURL(file)
    })))
    setImages(dataUrls)
  }
  return <div><span className="mb-2 block text-sm font-bold text-slate-700">画像（任意・複数選択可）</span><label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-blue-200 bg-sky-50 px-4 py-3 text-sm font-bold text-posse-700 hover:bg-sky-100"><ImagePlus size={18} />画像を選択<input type="file" accept="image/*" multiple onChange={handleChange} className="sr-only" /></label>{images.length > 0 && <div className="mt-3 flex flex-wrap gap-2">{images.map((image, index) => <img key={image.slice(0, 36)} src={image} alt={`添付画像 ${index + 1}`} className="h-20 w-20 rounded-lg object-cover" />)}</div>}</div>
}

function PostComposer({ onCancel, onPublish }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [category, setCategory] = useState('event')
  const [images, setImages] = useState([])
  function handleSubmit(event) {
    event.preventDefault()
    if (!title.trim() || !body.trim()) return
    const now = new Date()
    onPublish({ id: `post-${Date.now()}`, category, createdAt: now.toISOString(), date: new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' }).format(now), title: title.trim(), body: body.trim(), images, name: 'misaki', handle: '@misaki', likes: 0, avatar: 'profile' })
  }

  return (
    <section className="mx-auto max-w-3xl rounded-2xl border border-slate-100 bg-white p-6 shadow-card sm:p-10">
      <BackButton onClick={onCancel} />
      <h1 className="text-2xl font-extrabold text-slate-900">記事を投稿</h1>
      <p className="mt-2 text-sm text-slate-500">出来事や思い出をみんなにシェアしましょう。</p>
      <form onSubmit={handleSubmit} className="mt-7 space-y-5">
        <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">タイトル</span><input required maxLength={80} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="記事のタイトル" className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100" /></label>
        <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">分類</span><select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm"><option value="event">イベント</option><option value="daily">日常</option></select></label>
        <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">本文</span><textarea required rows={9} value={body} onChange={(e) => setBody(e.target.value)} placeholder="記事の内容を書いてください" className="w-full resize-y rounded-lg border border-slate-200 px-4 py-3 text-sm leading-6 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100" /></label>
        <ImagePicker images={images} setImages={setImages} />
        <div className="flex justify-end gap-3 border-t border-slate-100 pt-5"><button type="button" onClick={onCancel} className="rounded-lg px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50">キャンセル</button><button type="submit" className="rounded-lg bg-posse-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-posse-700">投稿する</button></div>
      </form>
    </section>
  )
}

function AnnouncementComposer({ onCancel, onPublish }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [audience, setAudience] = useState('対象7期生')
  function submit(event) {
    event.preventDefault()
    onPublish({ id: `announcement-${Date.now()}`, title: title.trim(), description: description.trim(), date, audience, author: 'misaki' })
  }
  return <section className="mx-auto max-w-3xl rounded-2xl border border-slate-100 bg-white p-6 shadow-card sm:p-10">
    <BackButton onClick={onCancel} /><h1 className="text-2xl font-extrabold text-slate-900">告知を投稿</h1>
    <form onSubmit={submit} className="mt-7 space-y-5">
      <label className="block"><span className="mb-2 block text-sm font-bold">イベント名</span><input required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm" placeholder="例：カリキュラム合宿" /></label>
      <label className="block"><span className="mb-2 block text-sm font-bold">本文</span><textarea required rows={5} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm" placeholder="イベントの内容" /></label>
      <label className="block"><span className="mb-2 block text-sm font-bold">日時</span><input required type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm" /></label>
      <label className="block"><span className="mb-2 block text-sm font-bold">対象の期生</span><select value={audience} onChange={(e) => setAudience(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm"><option>対象6期生</option><option>対象7期生</option><option>対象6・7期生</option><option>全期生</option></select></label>
      <div className="flex justify-end gap-3 border-t border-slate-100 pt-5"><button type="button" onClick={onCancel} className="rounded-lg px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50">キャンセル</button><button className="rounded-lg bg-posse-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-posse-700">告知を投稿</button></div>
    </form>
  </section>
}

function HowToPage({ onBack }) {
  const [slide, setSlide] = useState(0)
  return <section className="mx-auto max-w-3xl rounded-2xl border border-slate-100 bg-white p-6 shadow-card sm:p-10">
    <BackButton onClick={onBack} /><h1 className="text-3xl font-extrabold text-slate-900">POSSE NEWSの使い方</h1><p className="mt-2 text-slate-600">6・7期生の日常をたくさん投稿しよう！！</p>
    <ImageSlideshow images={howToSlides.map((item) => item.image)} alt="POSSE NEWSの使い方" interval={4000} />
    <div className="mt-5 rounded-xl bg-sky-50 p-5"><p className="font-bold text-posse-700">{howToSlides[slide].title}</p><p className="mt-2 text-sm leading-6 text-slate-600">{howToSlides[slide].body}</p></div>
    <div className="mt-3 flex justify-center gap-2">{howToSlides.map((item, index) => <button key={item.title} onClick={() => setSlide(index)} aria-label={`${index + 1}枚目の説明`} className={`h-2.5 w-2.5 rounded-full ${slide === index ? 'bg-posse-600' : 'bg-slate-300'}`} />)}</div>
  </section>
}

function AnnouncementDetails({ announcement, onBack, onDelete }) {
  return <article className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-card sm:p-10"><BackButton onClick={onBack} /><span className="rounded-full bg-posse-600 px-3 py-2 text-xs font-bold text-white">告知</span><h1 className="mt-5 text-3xl font-extrabold">{announcement.title}</h1><time className="mt-3 block text-sm text-slate-500">{new Date(announcement.date).toLocaleString('ja-JP')}</time><p className="mt-7 whitespace-pre-wrap leading-8 text-slate-700">{announcement.description}</p><p className="mt-6 rounded-lg bg-sky-50 p-4 text-sm font-bold text-posse-700">{announcement.audience}</p>{announcement.author === 'misaki' && <button onClick={onDelete} className="mt-5 inline-flex items-center gap-2 rounded-lg border border-rose-200 px-4 py-2 text-sm font-bold text-rose-600 transition hover:bg-rose-50"><Trash2 size={16} />告知を削除</button>}</article>
}

export function App() {
  const [posts, setPosts] = useState(initialPosts)
  const [announcements, setAnnouncements] = useState(initialAnnouncements)
  const [likedPosts, setLikedPosts] = useState([])
  const [view, setView] = useState({ page: 'timeline' })

  const toggleLike = (id) => setLikedPosts((liked) => liked.includes(id) ? liked.filter((item) => item !== id) : [...liked, id])
  const publishPost = (post) => { setPosts((current) => [post, ...current]); setView({ page: 'timeline' }) }
  const publishAnnouncement = (announcement) => { setAnnouncements((current) => [announcement, ...current]); setView({ page: 'timeline' }) }
  const deletePost = (id) => {
    const target = posts.find((post) => post.id === id)
    if (!target || (target.name !== 'misaki' && target.handle !== '@misaki')) return
    if (!window.confirm('投稿を削除します。よろしいですか？')) return
    setPosts((current) => current.filter((post) => post.id !== id))
    setLikedPosts((current) => current.filter((postId) => postId !== id))
    setView({ page: 'timeline' })
  }
  const deleteAnnouncement = (id) => {
    const target = announcements.find((item) => item.id === id)
    if (!target || target.author !== 'misaki') return
    if (!window.confirm('投稿を削除します。よろしいですか？')) return
    setAnnouncements((current) => current.filter((item) => item.id !== id))
    setView({ page: 'timeline' })
  }
  let content
  if (view.page === 'compose') content = <PostComposer onCancel={() => setView({ page: 'timeline' })} onPublish={publishPost} />
  else if (view.page === 'announcement-compose') content = <AnnouncementComposer onCancel={() => setView({ page: 'timeline' })} onPublish={publishAnnouncement} />
  else if (view.page === 'blog') content = <BlogPage post={view.post} onBack={() => setView({ page: 'timeline' })} onDelete={() => deletePost(view.post.id)} />
  else if (view.page === 'announcement') content = <AnnouncementDetails announcement={view.announcement} onBack={() => setView({ page: 'timeline' })} onDelete={() => deleteAnnouncement(view.announcement.id)} />
  else if (view.page === 'how-to') content = <HowToPage onBack={() => setView({ page: 'timeline' })} />
  else content = <div className="mx-auto grid max-w-[1050px] grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_272px] lg:gap-8"><Timeline posts={posts} likedPosts={likedPosts} onLike={toggleLike} onDeletePost={deletePost} onOpenPost={(post) => setView({ page: 'blog', post })} /><Announcements announcements={announcements} onDelete={deleteAnnouncement} onOpen={(announcement) => setView({ page: 'announcement', announcement })} /></div>
  return <div className="min-h-screen bg-slate-50 text-posse-ink"><div className="mx-auto flex min-h-screen max-w-[1600px]"><Sidebar onCreatePost={() => setView({ page: 'compose' })} onCreateAnnouncement={() => setView({ page: 'announcement-compose' })} onHome={() => setView({ page: 'timeline' })} onUsage={() => setView({ page: 'how-to' })} /><main className="min-w-0 flex-1 px-5 py-7 sm:px-8 lg:px-10 xl:px-12">{content}</main></div></div>
}
