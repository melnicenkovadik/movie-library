import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";

import { IMG_API } from "../utils/APP_IMG_API";
import "../styles.css";

const Movie = ({
  title,
  poster_path,
  overview,
  vote_average,
  release_date,
  backdrop_path
}:any) => {
  const [isFavList, setFavList] = useState(false);
  const [isWishList, setWishList] = useState(false);

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  return (
    <div className="movie">
      <div className="movie-wall">
        <img className="poster" src={IMG_API + poster_path} alt={title} />
      </div>
      <div className="movie-content">
        <div className="title-container">
          <h5 className="title">{title}</h5>
          <span className="vote">{vote_average}</span>
        </div>
        <div className="misc-container">
          <span className="date">{release_date}</span>
          <div className="btn">
            <button
              className="favlist"
              onClick={() => {
                setFavList(!isFavList);
              }}
              data-tip
              data-for="favListTip"
            >
              {!isFavList ? (
                <FontAwesomeIcon icon={["far", "heart"]} />
              ) : (
                <FontAwesomeIcon icon={["fas", "heart"]} />
              )}
            </button>
            <button
              className="wishlist"
              onClick={() => {
                setWishList(!isWishList);
              }}
              data-tip
              data-for="wishListTip"
            >
              {!isWishList ? (
                <FontAwesomeIcon icon={["far", "bookmark"]} />
              ) : (
                <FontAwesomeIcon icon={["fas", "bookmark"]} />
              )}
            </button>
            <ReactTooltip
              id="favListTip"
              place="top"
              effect="solid"
              borderColor="crimson"
              border={true}
              getContent={() => {
                return <span>Add to Favorites</span>;
              }}
            ></ReactTooltip>
            <ReactTooltip
              id="wishListTip"
              place="top"
              effect="solid"
              borderColor="cyan"
              border={true}
              getContent={() => {
                return <span>Add to Wishlist</span>;
              }}
            />
          </div>
        </div>
      </div>
      <div className="desp-container">
        <h4 className="overview">Overview</h4>
        <div className="sep"></div>
        <p className="desp">&nbsp;&nbsp;{overview}</p>
      </div>
    </div>
  );
};

export default Movie;
