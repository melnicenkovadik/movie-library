import {useParams} from "react-router-dom";
import {useLazyGetOneQuery} from "../../store/movie/movies.api";
import {useEffect} from "react";
import {Container} from "modules/comon/Container";
import { Row } from "modules/comon/Row";

const MoviePage = () => {
    const {id} = useParams<{ id: string }>();

    const [getMovie, {isLoading, isError, data}] = useLazyGetOneQuery();

    useEffect(() => {
        getMovie(id as string);
    }, [id]);
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error :(</p>;
    return (
        <Container>
           <Row>
               <div>
                   <img
                       src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
                       alt={data?.title}
                   />
               </div>
               <div>
                   <h1>{data?.title}</h1>
                   <p>{data?.overview}</p>
                   <span>Rating : {data?.vote_average}</span>
                   <p>Release date :<span>{data?.release_date}</span></p>
                   <p><span>Original language : {data?.original_language}</span></p>
                   <p><span>Popularity : {data?.popularity}</span></p>
                   <p><span>Vote count : {data?.vote_count}</span>
                   </p>
               </div>
           </Row>
        </Container>
    );
};

export default MoviePage;
