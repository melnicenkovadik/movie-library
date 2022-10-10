import Movie from "../comon/Movie";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {far} from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import rem from "../../utils/rem";
import {library} from "@fortawesome/fontawesome-svg-core";
import {
    useGetSearchQuery,
    useLazyGetFeaturedQuery,
} from "../../store/movie/movies.api";
import {IMovie} from "../../types";
import {useDebounce} from "../../hooks/useDebounce";
import {Row} from "../comon/Row";
import {Button} from "@material-ui/core";
import {Container} from "../comon/Container";

library.add(fas, far);


const StyledMovieResults = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin: ${rem(40)} ${rem(16)} 0;
`;

const MoviesPage = () => {
    const [getFeatured, {isLoading, isError, data: featuredData}] =
        useLazyGetFeaturedQuery();
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [searchVal, setSearchVal] = useState<string>(" ");
    const debouncedSearch = useDebounce(searchVal, 500);
    const [len, setLength] = useState<number>(1);
    const [onPage, setOnPage] = useState<number>(Number(1));
    const  {isLoading: isSearchLoading, isError: isSearchError, data: searchData} = useGetSearchQuery(debouncedSearch, {
        skip: debouncedSearch.length < 3,
    });

    useEffect(() => {
        getFeatured(onPage);
        if (featuredData) {
            setLength(Number(featuredData.total_pages));
            setMovies(featuredData.results);
        }
    }, [onPage, featuredData]);

    useEffect(() => {
        if (searchData) {
            setMovies(searchData.results);
        }
    }, [searchData]);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchVal(e.target.value);
        if (!e.target.value.length || e.target.value.length < 3) {
            getFeatured(1);
            setOnPage(1);
        }
    };

    function handlePrevPage() {
        if (onPage > 1) {
            setOnPage(onPage - 1);
        } else {
            setOnPage(1);
        }
    }

    function handleNextPage() {
        if (onPage < len) {
            setOnPage(onPage + 1);
        } else {
            setOnPage(len);
        }
    }

    function generatePageNumbers(len: number) {
        const maxVisiblePages = 10;
        const pages = [];
        if (len <= maxVisiblePages) {
            for (let i = 1; i <= len; i++) {
                pages.push(i);
            }
        } else {
            if (onPage <= 6) {
                for (let i = 1; i <= maxVisiblePages; i++) {
                    pages.push(i);
                }
            } else if (onPage > len - 5) {
                for (let i = len - 9; i <= len; i++) {
                    pages.push(i);
                }
            } else {
                for (let i = onPage - 5; i <= onPage + 4; i++) {
                    pages.push(i);
                }
            }
        }
        return pages;
    }

    if (isLoading) return <p>Loading...</p>;

    return (
        <Container>
            {isError && <p>Something went wrong</p>}
            {isSearchError && searchVal?.length || (searchData?.results?.length === 0  && searchVal?.length) ? <p>No results found</p> : null}
            <header>
                <h1>Movie App</h1>
                <input
                    autoFocus
                    type="search"
                    placeholder="Search movie"
                    value={searchVal}
                    onChange={handleOnChange}
                />
                <div>
                    {isSearchLoading && <p>Loading...</p>}
                </div>
            </header>
            <StyledMovieResults>
                {movies.map((movie) => (
                    <Movie key={movie.id} movie={movie}/>
                ))}
            </StyledMovieResults>
            <br/>
            <Row>
                <Button onClick={handlePrevPage}>
                    <FontAwesomeIcon icon={["fas", "chevron-left"]}/>
                    <span>Previous</span>
                </Button>
                <div>
          <span>
            {generatePageNumbers(len).map((page) => (
                <Button
                    key={page}
                    onClick={() => setOnPage(page)}
                    style={{
                        backgroundColor: page === onPage ? "red" : "white",
                        color: page === onPage ? "white" : "black",
                    }}
                >
                    {page}
                </Button>
            ))}
          </span>
                    <span>/</span>
                    <span>{len}</span>
                </div>
                <Button onClick={handleNextPage}>
                    <span>Next</span>
                    <FontAwesomeIcon icon={["fas", "chevron-right"]}/>
                </Button>
            </Row>
        </Container>
    );
};

export default MoviesPage;
