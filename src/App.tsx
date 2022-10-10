import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {far} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Movie from "./components/Movie";

import "./styles.css";

library.add(fas, far);
const API_KEY = process.env.REACT_TMDB_API_KEY ?? 'b7405eebe7d6fb934ae68bc3d7091bea'

function App() {
    const [movies, setMovies] = useState([]);
    const [searchVal, setSearchVal] = useState<string>(' ');
    const [len, setLength] = useState<number>(0);
    const [onPage, setOnPage] = useState<number>(Number(1));

    const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=`;
    const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

    useEffect(() => {
        console.log(FEATURED_API);
        fetch(`${FEATURED_API}${onPage}`)
            .then((res) => res.json())
            .then((data) => {
                console.log('data', data);
                setLength(Number(data.total_pages));
                setMovies(data.results);
            });
    }, [onPage]);

    const handleOnSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (searchVal) {
            fetch(`${SEARCH_API}${searchVal}`)
                .then((res) => res.json())
                .then((searchData) => {
                    console.log(searchData);
                    setMovies(searchData.results);
                });
            setSearchVal(" ");
        }
    };
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchVal(e.target.value);
    };

    return (
        <div className="container">
            <header className="hero-container">
                <h1 className="app-title">Movie App</h1>
                <form onSubmit={handleOnSubmit}>
                    <input
                        type="search"
                        className="search"
                        placeholder="Search movie"
                        value={searchVal}
                        onChange={handleOnChange}
                    />
                </form>
            </header>
            <div className="movie-container">
                {movies.map((movie: any) => (
                    <Movie key={movie.id} {...movie} />
                ))}
            </div>
            <div className="pagination-container">
                <button
                    className="comp prev"
                    onClick={() => {
                        // @ts-ignore
                        setOnPage(onPage === 1 ? (onPage = 1) : onPage - 1);
                    }}
                >
                    <FontAwesomeIcon icon={["fas", "chevron-left"]}/>
                    <span>Previous</span>
                </button>
                <div className="page">
          <span className="on-page">
            <input
                type="text"
                className="page-input"
                placeholder="Page"
                value={onPage}
                onChange={(e) => setOnPage(Number(e.target.value))}
            />
          </span>
                    <span>/</span>
                    <span className="total-page">{len}</span>
                </div>
                <button
                    className="comp next"
                    onClick={(onPage) => {
                        // @ts-ignore
                        setOnPage(onPage === len ? (onPage = len) : onPage + 1);
                    }}
                >
                    <span>Next</span>
                    <FontAwesomeIcon icon={["fas", "chevron-right"]}/>
                </button>
            </div>
        </div>
    );
}

export default App;
