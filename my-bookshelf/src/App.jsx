import BookCard from './components/BookCard';
import Header from './components/Header';
import Footer from './components/Footer';
const books = [
  {
    id: 1,
    title: "イノセントデイズ",
    imageUrl: "/assets/images/イノセントデイズ.jpg",
    author: "早見和真",
    rating: "情緒不安定ミステリー",
    comment: "それぞれの登場人物から見た「田中幸乃」から彼女の人生が語られる",
  },
  {
    id: 2,
    title: "容疑者Xの献身",
    imageUrl: "/assets/images/容疑者Xの献身.avif",
    author: "東野圭吾",
    rating: "泣けるミステリー",
    comment: "ぜひ読んでほしい不朽の名作 登場人物の幸せを願わずにはいられない",
  },
  {
    id: 3,
    title: "八日目の蝉",
    imageUrl: "/assets/images/八日目の蝉.jpg",
    author: "角田光代",
    rating: "結末大号泣",
    comment: "母親と家族愛を考えさせる作品。",
  },
  {
    id: 4,
    title: "夜が明けたら、いちばんに君に会いにいく",
    imageUrl: "/assets/images/夜が明けたら.jpg",
    author: "汐見夏衛",
    rating: "泣ける青春物語",
    comment: "一度読み始めたらとまらない。大号泣",
  },
  {
    id: 5,
    title: "アドラーの教え",
    imageUrl: "/assets/images/アドラーの教え.jpg",
    author: "NHK監修",
    rating: "心理学本",
    comment: "自分の生き方が少し楽になる",
  },
];

function App() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <main className="max-w-2xl mx-auto space-y-6">
        <Header/>
        <div className="space-y-4">
          {books.map((book) => (
            <BookCard
              key={book.id}
              imageUrl={book.imageUrl}
              title={book.title}
              author={book.author}
              rating={book.rating}
              comment={book.comment}
            />
          ))}
        </div>
        
      </main>
      <Footer/>
    </div>
    
  );
}

export default App;