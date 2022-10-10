import { IResponse } from "../types";

const API_KEY =
  process.env.REACT_TMDB_API_KEY ?? "b7405eebe7d6fb934ae68bc3d7091bea";
export const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=`;
export const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

export const getFeatured = async (page: number): Promise<IResponse> => {
  const res = await fetch(`${FEATURED_API}${page}`);
  const data = await res.json();
  return data;
};
export const getSearch = async (query: string): Promise<IResponse> => {
  const res = await fetch(`${SEARCH_API}${query}`);
  const data = await res.json();
  return data;
};
