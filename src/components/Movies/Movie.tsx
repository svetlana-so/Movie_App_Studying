import { MouseEvent } from 'react'
import { Heart, BookUser } from 'lucide-react'

import { TMovie } from '@/types'

type Props = {
  movie: TMovie
  isFavorite: boolean
  rating: string | number
  isExpanded: boolean
  onFavoriteClick: (event: MouseEvent<HTMLButtonElement>) => void
  onExpandClick: (event: MouseEvent<HTMLButtonElement>) => void
}

const Movie = ({ movie,rating, isFavorite, isExpanded, onFavoriteClick, onExpandClick }: Props) => {
  return (
    <li className="card card-compact card-side bg-base-100 shadow-xl mb-4">
      <figure className="w-44">
        <img src={movie.thumbnail} alt="Movie" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {movie.title} ({movie.year})
        </h2>
        <p>Rating: {rating}</p>

        <p className="max-w-5xl">
          {movie.extract}

          <div className="divider" />

          <button
            className={`btn btn-sm ${isExpanded ? 'btn-primary' : ''}`}
            onClick={onExpandClick}
          >
            <span role="img" aria-label="Unfavorite" className="flex items-center">
              <BookUser size={16} className="mr-2" />
              Details
            </span>
          </button>

          {isExpanded && <p className="my-2">Cast: {movie.cast.join(', ')}</p>}
        </p>

        <div className="card-actions justify-end">
          <button className={`btn ${isFavorite ? 'btn-primary' : ''}`} onClick={onFavoriteClick}>
            {isFavorite ? (
              <span role="img" aria-label="Unfavorite" className="flex items-center">
                <Heart size={16} className="mr-2" />
                Unfavorite
              </span>
            ) : (
              <span role="img" aria-label="Favorite" className="flex items-center">
                <Heart size={16} className="mr-2" />
                Favorite
              </span>
            )}
          </button>
        </div>
      </div>
    </li>
  )
}

export default Movie
