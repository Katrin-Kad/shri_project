import React, { useState } from 'react';
import './StarRating.css';
import { useRateMovieMutation } from '../../../shared/api';

const StarRating = ({id}) => {
  const [rating, setRating] = useState(0); 
  const [hoverValue, setHoverValue] = useState(0);

  const handleStarClick = (starCount) => {
    setRating(starCount); 
  };

  const handleStarHover = (starCount) => {
    setHoverValue(starCount); 
  };

  const handleStarLeave = () => {
    setHoverValue(0); 
  };

  const [rateMovieMutation, { isLoading, error }] = useRateMovieMutation();

  const handleRateMovie = async (starValue:number) => {
    handleStarClick(starValue)
    try {
      const movieId = id; 
      const userRating = starValue;
      console.log(typeof movieId, typeof userRating)
      const { data } = await rateMovieMutation({ movieId: movieId, user_rate: userRating });
      console.log('Rating movie successful:', data);
    } catch (error) {
      console.error('Error rating movie:', error);
    }
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        let starClass = 'star';
        if (starValue <= (hoverValue || rating)) {
          starClass = 'star filled';
        } else if (hoverValue === 0 && starValue > rating) {
          starClass = 'star outlined';
        }
        return (
          <span
            key={index}
            className={starClass}
            onClick={() => handleRateMovie(starValue)}
            onMouseEnter={() => handleStarHover(starValue)}
            onMouseLeave={() => handleStarLeave()}
          >
            &#9733; 
          </span>
        );
      })}
      <p style={{ color: rating === 0 ? '#ccc' : 'inherit' }}>&nbsp;1 &nbsp;&nbsp;2 &nbsp;&nbsp;3 &nbsp;&nbsp;4 &nbsp;&nbsp;5</p>
    </div>
  );
};

export default StarRating;
