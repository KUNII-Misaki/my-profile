function BookCard({ title, author, rating, comment, imageUrl }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5 flex flex-col sm:flex-row gap-5 border border-gray-100 mt-20">

      <div className="flex-shrink-0 mx-auto sm:mx-0">
        <img
          src={imageUrl}
          alt={title}
          className="w-28 h-40 object-cover rounded-md shadow-sm border border-gray-200"
        />
      </div>

      <div className="flex flex-col justify-between flex-grow space-y-2">
        <div>
          <span className="inline-block bg-amber-50 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-200/60 mb-1.5">
            {rating}
          </span>

          <h2 className="text-xl font-bold text-gray-800 leading-snug">
            {title}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            著者：<span className="text-gray-700 font-medium">{author}</span>
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 mt-2 border-l-4 border-indigo-500">
          <p className="text-sm text-gray-600 leading-relaxed italic">
            「{comment}」
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookCard;