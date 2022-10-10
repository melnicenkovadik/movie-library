import React, {useState, useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";

import {IMG_API} from "../../utils/APP_IMG_API";
import {IMovie} from "../../types";
import styled from "styled-components";
import rem from "../../utils/rem";
import {useNavigate} from "react-router-dom";

const MovieItem = styled.a`
  background-color: var(--transparent);
  display: flex;
  gap: 10px;
  flex-direction: row;
  border-radius: ${rem(4)};
  color: var(--color-black-a87);
  text-decoration: none;
  max-width: 49%;
  min-width: 49%;

  &:nth-child(even) {
    margin-left: ${rem(4)};
    margin-right: 0;
  }
`;

const StyledItemTitle = styled.h2`
  font-size: ${rem(20)};
  font-weight: var(--font-medium);
  margin: 0 0 ${rem(15)};
`;

const StyledItemDetails = styled.div`
  color: var(--color-black-a60);
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  align-items: flex-start;
  font-size: ${rem(14)};
  justify-content: space-between;
`;

const StyledItemImg = styled.img`
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  height: 100%;
  object-fit: cover;
  width: 200px;
`;
const Movie = ({
                   movie
               }: { movie: IMovie }) => {
    const {
        title,
        poster_path,
        overview,
        vote_average,
        release_date,
        id,
        original_language,
        original_title,
        popularity,
        video,
        vote_count,
    } = movie
    const navigate = useNavigate();

    function toMovieHandler() {
        navigate(`/${id}`);
    }

    return (
        <MovieItem onClick={toMovieHandler}>
            <div>
                <StyledItemImg src={IMG_API + poster_path} alt={title}/>
            </div>
            <div>
                <StyledItemTitle>
                    <p>{title}</p>
                    <span>Rating : {vote_average}</span>
                </StyledItemTitle>
                <div>
                    <p>
                        Release date :<span>{release_date}</span>
                    </p>
                </div>
                <StyledItemDetails>
                    <h4>Overview</h4>
                    <div></div>
                    <p>&nbsp;&nbsp;{overview}</p>
                    <p>
                        <span>Original language : {original_language}</span>
                    </p>
                    <p>
                        <span>Original title : {original_title}</span>
                    </p>
                    <p>
                        <span>Popularity : {popularity}</span>
                    </p>
                    <p>
                        <span>Video : {video}</span>
                    </p>
                    <p>
                        <span>Vote count : {vote_count}</span>
                    </p>


                </StyledItemDetails>
            </div>
        </MovieItem>
    );
};

export default Movie;
