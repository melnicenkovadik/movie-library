import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { moviesActions } from "../store/movie/movies.slice";

const actionCreators = {
  ...moviesActions,
};
export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actionCreators, dispatch);
};
