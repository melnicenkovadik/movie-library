import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IMovieResponse, IResponse} from "../../types";

const API_KEY = "b7405eebe7d6fb934ae68bc3d7091bea";

const baseApi = 'https://api.themoviedb.org/3';
const FEATURED_API = `discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=`;
const SEARCH_API = `search/movie?api_key=${API_KEY}&query=`;
const GET_MOVIE = (id: string) => `movie/${id}?api_key=${API_KEY}`


export const moviesApi = createApi({
    reducerPath: 'moviesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseApi
    }),
    endpoints: builder => ({
        getFeatured: builder.query<IResponse, number>({
            query: (page) => ({
                url: `/${FEATURED_API}${page}`,
                method: 'GET',
            }),
        }),
        getSearch: builder.query<IResponse, string>({
            query: (qvery) => ({
                url: `/${SEARCH_API}${qvery}`,
                method: 'GET',
            }),
        }),
        getOne: builder.query<IMovieResponse, string>({
            query: (id) => ({
                url: `/${GET_MOVIE(id)}`,
                method: 'GET',
            }),
        }),
    }),
});

export const {useLazyGetFeaturedQuery,useGetSearchQuery,useLazyGetOneQuery} = moviesApi;
