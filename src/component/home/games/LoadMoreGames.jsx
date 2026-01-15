function LoadMoreGames({ onClick }) {
  return (
    <div onClick={onClick} className="flex justify-center my-6">
      <button className="px-6 py-2 text-sm font-medium text-black bg-primary rounded cursor-pointer shadow transition duration-200">
        Load more games
      </button>
    </div>
  );
}

export default LoadMoreGames;