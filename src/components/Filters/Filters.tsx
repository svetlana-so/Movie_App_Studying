type Props = {
  genres: Array<string>
  selectedGenre: string
  onGenreButtonClick: (genre: string) => void
}

const Filters = ({ genres, selectedGenre, onGenreButtonClick }: Props) => {
  
  const handleGenreButtonClick = (genre: string) => () => {
    onGenreButtonClick(genre)
  }

  return (
    <div className="flex justify-between items-center mb-4">
      <ul className="flex gap-2 flex-wrap">
        <li key="all">
          <button
            className={`btn btn-sm ${selectedGenre === '' ? '' : 'btn-outline'} btn-primary`}
            onClick={handleGenreButtonClick('')}
          >
            All Categories
          </button>
        </li>
        {genres.map(genre => (
          <li key={genre}>
            <button
              className={`btn btn-sm ${genre === selectedGenre ? '' : 'btn-outline'} btn-primary`}
              onClick={handleGenreButtonClick(genre)}
            >
              {genre}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Filters
