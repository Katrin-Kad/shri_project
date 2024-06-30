import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { url } from "../constants/config"

const API_URL = url;

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMovieById: builder.query({
      query: (movieId) => `/api/v1/movie/${movieId}`,
    }),
    getMoviePosterById: builder.query({
      query: (movieId) => `/static/images/${movieId}`,
    }),
    searchMovies: builder.query({
      query: (queryParams) => ({
        url: '/api/v1/search',
        params: queryParams,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/api/v1/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    rateMovie: builder.mutation({
      query: ({ movieId, user_rate }) => ({
        url: '/api/v1/rateMovie',
        method: 'POST',
        body: { movieId, user_rate },
      }),
    }),
  }),
});

export const {
  useGetMovieByIdQuery,
  useGetMoviePosterByIdQuery,
  useSearchMoviesQuery,
  useLoginMutation,
  useRateMovieMutation
} = api;

export default api;
