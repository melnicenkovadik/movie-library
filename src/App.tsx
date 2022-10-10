import { Route, Routes } from "react-router-dom";
import MoviesPage from "./modules/movies-page";
import MoviePage from "./modules/movie-page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MoviesPage />} />
      <Route path="/:id" element={<MoviePage />} />
    </Routes>
  );
}

export default App;
