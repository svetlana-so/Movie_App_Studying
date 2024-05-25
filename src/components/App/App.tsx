import { useEffect, useReducer, useState } from 'react'

import movies from '@/services/movies'
import { MovieContext } from '@/contexts/MovieContext'
import { moviesReducer } from '@/state'
import Movies from '@/components/Movies'
import Search from '@/components/Search'
import Filters from '@/components/Filters'


function App() {
  const [state, dispatch] = useReducer(moviesReducer, { list: [], favorites: [], query: '', loading: false, error: null, ratings: [] })
  const [expandedMovies, setExpandedMovies] = useState<string[]>([])
  const [selectedGenre, setSelectedGenre] = useState('')
  const { list, favorites, query, loading, error, ratings } = state
  // const genres = list.map(movie => movie.genres).flat()
  const genres = Array.from(new Set(list.map(movie => movie.genres).flat()));


  const handleGenreButtonClick = (genre: string) => {
    setSelectedGenre(genre)
  }

  useEffect(() => {
    const fetchMovies = async () => {
      dispatch({ type: 'movies_loading' })
      try {
        const [moviesData, ratingsData] = await Promise.all([movies.getMovies(), movies.getRatings()])
        dispatch({ type: 'movies_loaded', payload: moviesData })
        dispatch({ type: 'ratings_loaded', payload: ratingsData })
      } catch (error: unknown) {
        if(error instanceof Error) {
          dispatch({type: 'movies_error', payload: error.message})
        }
        else(
          dispatch({ type: 'movies_error', payload: 'An unknown error occurred' })
        )
      } 
    }

    fetchMovies()
  }, [])

  return (
    <div className="p-8">
      <MovieContext.Provider value={{ list, favorites, query, loading, error,ratings, dispatch }}>
        <h1 className="text-2xl mb-4">Movie List</h1>

        <Search />
        <Filters
          genres={genres}
          selectedGenre={selectedGenre}
          onGenreButtonClick={handleGenreButtonClick}
        />
         {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}. Try again.</div>
        ) : (
          <Movies
            expandedMovies={expandedMovies}
            selectedGenre={selectedGenre}
            setExpandedMovies={setExpandedMovies}
          />
        )}
        
      </MovieContext.Provider>
    </div>
  )
}

export default App
