import * as chaos from '@/utils/chaos'

import { TMovie, TRating } from '@/types'

const API_ENDPOINTS = {
  movies: '/movies.json',
  ratings: '/ratings.json',
}

const movieService = {
  getMovies: async () => {
    const request = new Request(new URL(API_ENDPOINTS.movies, location.origin))

    const result = await chaos.randomizeResponseTime(chaos.randomlyRejectPromise(fetch(request)))
    const data = (await result.json()) as Array<TMovie>

    return chaos.randomlyDropMovieTitle(data)
  },
  getRatings: async () => {
    const request = new Request(new URL(API_ENDPOINTS.ratings, location.origin))

    const result = await chaos.randomizeResponseTime(fetch(request))
    const data = (await result.json()) as Array<TRating>

    return data
  },
}

export default movieService
