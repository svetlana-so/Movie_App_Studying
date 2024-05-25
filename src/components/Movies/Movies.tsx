import { useContext, Dispatch, SetStateAction, useState } from 'react'

import * as chaos from '@/utils/chaos'

import { TMovie } from '@/types'
import { MovieContext } from '@/contexts/MovieContext'
import Movie from './Movie'

type Props = {
  expandedMovies: Array<string>
  selectedGenre: string
  setExpandedMovies: Dispatch<SetStateAction<Array<string>>>
}

const Movies = ({ expandedMovies, selectedGenre, setExpandedMovies }: Props) => {
  const { list, favorites, query, ratings, dispatch } = useContext(MovieContext)
  const [currentPage, setCurrentPage] = useState(1)
  const moviesPerPage = 10
  const pageRange = 10

  const totalMoviesCount = new Intl.NumberFormat().format(list.length)
  const movieList = list
    .filter(movie => movie.title?.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
    .filter(movie => movie.genres.includes(selectedGenre) || selectedGenre === '')

    const indexOfLastMovie = currentPage * moviesPerPage
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage
    const currentMovies = movieList.slice(indexOfFirstMovie, indexOfLastMovie)

    const totalPages = Math.ceil(movieList.length / moviesPerPage)

  const getRatingForMovie = (title: string) => {
      const rating = ratings.find(rating => rating.title === title)
      return rating ? rating.rating : 'No rating'
    }
  const handleFavoriteClick = (movie: TMovie) => () => {
    if (favorites.some(favorite => favorite === movie.title)) {
      dispatch({ type: 'favorite_removed', payload: movie.title })
    } else {
      dispatch({ type: 'favorite_added', payload: movie.title })
    }
  }

  const handleExpandedClick = (movie: TMovie) => () => {
    chaos.randomlyThrowError()

    if (expandedMovies.includes(movie.title)) {
      setExpandedMovies(prevExpandedMovies =>
        prevExpandedMovies.filter(expandedMovie => expandedMovie !== movie.title),
      )
    } else {
      setExpandedMovies(prevExpandedMovies => [...prevExpandedMovies, movie.title])
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  const handlePrevClick = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1))
  }

  const handleNextClick = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))
  }

  const startPage = Math.floor((currentPage - 1) / pageRange) * pageRange + 1
  const endPage = Math.min(startPage + pageRange - 1, totalPages)
  return (
    <>
      <ul className="movies">
        {currentMovies.map((movie, index) => {
          const isFavorite = favorites.some(favorite => favorite === movie.title)
          return (
            <Movie
              key={index}
              movie={movie}
              rating={getRatingForMovie(movie.title)}
              isFavorite={isFavorite}
              isExpanded={expandedMovies.includes(movie.title)}
              onFavoriteClick={handleFavoriteClick(movie)}
              onExpandClick={handleExpandedClick(movie)}
            />
          )
        })}
      </ul>

      <div className="flex flex-row justify-center">
        <button className='m-2' onClick={handlePrevClick} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
          <button
            className={`m-2 ${currentPage === i + startPage ? 'font-bold text-green-700' : ''}`}
            key={i + startPage}
            onClick={() => handlePageChange(i + startPage)}
            disabled={currentPage === i + startPage}
          >
            {i + startPage}
          </button>
        ))}
        <button className='m-2' onClick={handleNextClick} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      <hr />


      <p>
        Total movies: <b>{totalMoviesCount}</b> | Favourited movies: <b>{favorites.length}</b>
      </p>
    </>
  )
}

export default Movies
