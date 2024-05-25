import { createContext, Dispatch } from 'react'

import { TMovie, TRating } from '@/types'
import { MovieAction } from '@/state'

type MovieContextType = {
  list: Array<TMovie>
  favorites: Array<string>
  query: string
  loading: boolean
  error: string | null
  ratings:Array<TRating>
  dispatch: Dispatch<MovieAction>
}

const MovieContext = createContext<MovieContextType>({
  list: [],
  favorites: [],
  query: '',
  loading: false,
  error: null,
  ratings: [],
  dispatch: () => {},
})

export { MovieContext }
