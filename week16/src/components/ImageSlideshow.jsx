import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function ImageSlideshow({ images, alt = 'スライド画像', interval = 3500 }) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (!images || images.length < 2) return undefined
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % images.length), interval)
    return () => window.clearInterval(timer)
  }, [images, interval])

  if (!images?.length) return null
  const step = (delta) => setIndex((current) => (current + delta + images.length) % images.length)
  return (
    <div className="relative mt-6 overflow-hidden rounded-xl bg-slate-100">
      <img src={images[index]} alt={`${alt} ${index + 1}`} className="h-64 w-full object-cover sm:h-80" />
      {images.length > 1 && <>
        <button onClick={() => step(-1)} aria-label="前の画像" className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-800 shadow hover:bg-white"><ChevronLeft size={20} /></button>
        <button onClick={() => step(1)} aria-label="次の画像" className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-800 shadow hover:bg-white"><ChevronRight size={20} /></button>
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-slate-900/40 px-3 py-2">{images.map((_, dot) => <button key={dot} onClick={() => setIndex(dot)} aria-label={`${dot + 1}枚目を表示`} className={`h-2 w-2 rounded-full ${index === dot ? 'bg-white' : 'bg-white/50'}`} />)}</div>
      </>}
    </div>
  )
}