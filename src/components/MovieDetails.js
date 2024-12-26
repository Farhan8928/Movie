import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMovieDetails, fetchCast, clearCast } from "../redux/slices/moviesSlice";

const IMAGE_URL = "https://image.tmdb.org/t/p/";

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    movieDetails,
    cast,
    statuses,
    errors,
  } = useSelector((state) => state.movies);

  useEffect(() => {
    // Fetch movie details and cast when the component mounts
    dispatch(fetchMovieDetails(id));
    dispatch(fetchCast(id));

    // Clear cast data when navigating away
    return () => {
      dispatch(clearCast());
    };
  }, [dispatch, id]);

  if (statuses.movieDetails === "loading" || statuses.cast === "loading") {
    return <div>Loading...</div>;
  }

  if (statuses.movieDetails === "failed") {
    return <div>Error: {errors.movieDetails}</div>;
  }

  if (statuses.cast === "failed") {
    return <div>Error: {errors.cast}</div>;
  }

  if (!movieDetails) {
    return <div>No movie details available.</div>;
  }

  const {
    original_title,
    vote_average,
    genres = [],
    release_date,
    overview,
    poster_path,
    backdrop_path,
  } = movieDetails;

  const formattedDate = new Date(release_date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="details-cast-section">
      <div className="details-section">
        <div className="details">
          <div className="bg">
            <img
              src={`${IMAGE_URL}w300${poster_path}`}
              alt="movie"
              className="movie-item"
            />
            <div className="bg-items">
              <h3 className="details-title">{original_title}</h3>
              <p className="details-rating">Rating: {vote_average}</p>
              <h3 className="genres">
                Genres: {genres.map((genre) => genre.name).join(", ")}
              </h3>
              <p className="details-release-date">
                Release Date: {formattedDate}
              </p>
            </div>
          </div>
          <div className="movie-details">
            <h2 className="overview">Overview:</h2>
            <p className="paragraph">{overview}</p>
          </div>
        </div>
        <div className="background-image">
          <img
            src={`${IMAGE_URL}w500${backdrop_path}`}
            alt="background"
            className="item-images"
          />
        </div>
      </div>
      <div className="cast">
        <h2 className="cast-heading">Cast</h2>
        <ul className="cast-list">
          {cast.map((actor) => (
            <li key={actor.id} className="cast-item">
              <img
                src={
                  actor.profile_path
                    ? `${IMAGE_URL}w200${actor.profile_path}`
                    : "/default-profile.jpg"
                }
                alt={actor.name}
                className="actor-image"
              />
              <div className="actor-details">
                <p className="actor-name">{actor.name}</p>
                <p className="character-name">as {actor.character}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieDetails;
