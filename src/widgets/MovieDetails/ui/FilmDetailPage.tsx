import React from "react";
import { useParams } from "react-router-dom";
import { useGetMovieByIdQuery } from "../../../shared/api";
import { Actors } from "./Actors";
import "./FilmDetailPage.css"
import StarRating from "../../Films/ui/StarRating";
import { useSelector } from "react-redux";

export const FilmDetailPage = () => {
  const isAuthenticated = useSelector((state: unknown) => {
    if (typeof state === 'object' && state !== null) {
      return (state as { auth: { isAuthenticated: boolean } }).auth.isAuthenticated;
    }
    return false; 
  });
  
  const { id } = useParams(); 
  const { data: searchData, error, isLoading, isFetching } = useGetMovieByIdQuery(id);
  
  if (isLoading || isFetching) return <img className="loading" src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTk3cmMxNDM2a2JmOHg1Z3NlOHNmYzBvdWllOG9yY2cxdTR6ZnpqbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/GDhwW1VAsuYPH3zpzS/giphy.gif"/>;
  if (error) {
    if ('status' in error) {
      console.error('Fetch error status:', error.status);
      console.error('Fetch error data:', error.data);
    } else if ('error' in error) {
      console.error('General error:', error.error);
    } else {
      console.error('Unknown error type:', error);
    }
    return <div>Error occurred</div>;
  }

  
  const { title, description, genre, release_year, actors, rating, poster } = searchData;

  return (
    <div className="film-page">
      <div className="movie-card">
        <img src={poster} alt={title} style={{ maxWidth: "100%" }} className="img-poster"/>
        <div>
          <h3 className="film-title">{title}</h3>
          <p className="main-info"><strong>Жанр:</strong> {genre}</p>
          <p className="main-info"><strong>Год выпуска:</strong> {release_year}</p>
          <p className="main-info"><strong>Рейтинг:</strong> {rating}</p>
          <p className="main-info"><strong>Описание</strong></p>
          <p className="description">{description}</p>
        </div>
        {isAuthenticated && <StarRating id={id} />}
      </div>
        <Actors actors={actors}/>
    </div>
  );
};
