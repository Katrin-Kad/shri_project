import React from "react";
import StarRating from "./StarRating";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const truncateText = (text: string, maxLength: number) => {
  if (!text) {
    return null; 
  }
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
};

export const FilmComponent = ({ movie }) => {
    const isAuthenticated = useSelector((state: unknown) => {
        if (typeof state === 'object' && state !== null) {
          return (state as { auth: { isAuthenticated: boolean } }).auth.isAuthenticated;
        }
        return false; 
    }); 
    return (
        <div className="card" key={movie.id}>
            <Link to={`/film/${movie.id}`} className="link-unstyled">
                <div className="gap-info">
                    <img src={movie.poster} alt="Movie Poster" className="img_movie" />
                    <div>
                        <h3 className="name">{movie.title}</h3>
                        <div className="film">
                            <div className="info-name">
                            <p className="p-info">Жанр</p>
                            <p className="p-info">Год выпуска</p>
                            <p className="p-info">Описание</p>
                            </div>
                            <div className="info-content">
                            <p className="p-info">{movie.genre}</p>
                            <p className="p-info">{movie.release_year}</p>
                            <p className="p-info">{truncateText(movie.description, 500)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
            {isAuthenticated && <StarRating id={movie.id} />}
        </div>
    );
  };

