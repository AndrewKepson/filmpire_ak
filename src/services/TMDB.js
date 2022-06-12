import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY

// * Create an API to interact with TMDB by defining endpoints which will be available to us in Redux
export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  // * Set the base query for all the requests in this API
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3'
  }),
  // * Define API endpoints
  endpoints: builder => ({
    // * Get Genres
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`
    }),
    // * Get Movies by [Type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        // * Get Movies by Search
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`
        }

        // * Get Movies by Category
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === 'string'
        ) {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`
        }

        // * Get Movies by Genre
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === 'number'
        ) {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`
        }

        // * Get Popular Movies
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`
      }
    }),

    // * Get Move by ID
    getMovie: builder.query({
      query: id =>
        `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`
    }),

    // * Get User-Specific Lists
    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) =>
        `/account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`
    }),

    getRecommendations: builder.query({
      query: ({ movieId, list }) =>
        `/movie/${movieId}/${list}?api_key=${tmdbApiKey}`
    }),

    // * Get Actor by ID
    getActorsDetails: builder.query({
      query: id => `/person/${id}?api_key=${tmdbApiKey}`
    }),

    getMoviesByActorId: builder.query({
      query: ({ id, page }) =>
        `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`
    })
  })
})

// * Export APIs as hooks to access their data from components
export const {
  useGetMoviesQuery,
  useGetGenresQuery,
  useGetMovieQuery,
  useGetListQuery,
  useGetRecommendationsQuery,
  useGetActorsDetailsQuery,
  useGetMoviesByActorIdQuery
} = tmdbApi
