import type { TMovie, TRating } from '@/types'

export type MovieState = {
  list: Array<TMovie>
  favorites: Array<string>
  query: string,
  loading: boolean,
  error: string| null,
  ratings: Array<TRating>
}

export type MovieAction =

  | {
      type: 'movies_loaded'
      payload: Array<TMovie>
    }
    | {
      type: 'ratings_loaded'
      payload: Array<TRating>
    }
  | {
      type: 'favorite_added'
      payload: string
    }
  | {
      type: 'favorite_removed'
      payload: string
    }
  | {
      type: 'search'
      payload: string
    }
    | {
      type: 'movies_loading'
    }
    | {
      type: 'movies_error'
      payload: string
    }

export const moviesReducer = (state: MovieState, action: MovieAction) => {
  switch (action.type) {
    case 'movies_loading':
      return { ...state, loading: true, error: null }
    case 'movies_loaded':
      return { ...state, list: action.payload, loading: false }
    case 'ratings_loaded':
      return { ...state, ratings: action.payload, loading: false }
    case 'movies_error':
      return { ...state, loading: false, error: action.payload }
    case 'favorite_added':
      return { ...state, favorites: [...state.favorites, action.payload] }
    case 'favorite_removed':
      return {
        ...state,
        favorites: state.favorites.filter(favorite => favorite !== action.payload),
      }
    case 'search':
      return {
        ...state,
        query: action.payload,
      }
    default:
      return state
  }
}
