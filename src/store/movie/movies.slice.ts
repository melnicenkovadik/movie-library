import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMovie } from "../../types";

export interface IMoviesState {
  movies: IMovie[];
  movie: IMovie;
}
const initialState: IMoviesState = {
  movies: [],
  movie: {
    adult: false,
    backdrop_path: "",
    genre_ids: [],
    id: 0,
    original_language: "",
    original_title: "",
    overview: "",
    popularity: 0,
    poster_path: "",
    release_date: "",
    title: "",
    video: false,
    vote_average: 0,
    vote_count: 0,
  },
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<any>) => {
      state.movies = action.payload;
    },
    setMovie: (state, action: PayloadAction<any>) => {
      state.movie = action.payload;
    },
  },
});

export const moviesActions = moviesSlice.actions;
export const moviesReducer = moviesSlice.reducer;
