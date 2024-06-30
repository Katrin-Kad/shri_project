import React, { useState, useRef, useEffect } from 'react';
import './Actors.css';
import "../../Films/ui/Pagination.css"

interface Actor {
    name: string;
    photo: string;
}

interface Props {
    actors: Actor[];
  }

export const Actors: React.FC<Props> = ({actors}) => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const carouselInnerRef = useRef<HTMLDivElement>(null);

  const slideRight = () => {
    if (carouselInnerRef.current) {
      const itemWidth = (carouselInnerRef.current?.querySelector('.actor') as HTMLElement)?.offsetWidth + 20;
      const visibleItems = Math.floor(carouselInnerRef.current.offsetWidth / itemWidth);
      const maxScroll = carouselInnerRef.current.scrollWidth - carouselInnerRef.current.offsetWidth;

      if (scrollPosition < maxScroll) {
        const newPosition = scrollPosition + itemWidth * visibleItems;
        carouselInnerRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
        setScrollPosition(newPosition);
      }
      toggleButtons();
    }
  };

  const slideLeft = () => {
    if (carouselInnerRef.current) {
      const itemWidth = (carouselInnerRef.current?.querySelector('.actor') as HTMLElement)?.offsetWidth + 20;
      const visibleItems = Math.floor(carouselInnerRef.current.offsetWidth / itemWidth);

      if (scrollPosition > 0) {
        const newPosition = scrollPosition - itemWidth * visibleItems;
        carouselInnerRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
        setScrollPosition(newPosition);
      }
      toggleButtons();
    }
  };

  const toggleButtons = () => {
    if (carouselInnerRef.current) {
      const maxScroll = carouselInnerRef.current.scrollWidth - carouselInnerRef.current.offsetWidth;
      const prevButton = document.querySelector('.prev') as HTMLButtonElement;
      const nextButton = document.querySelector('.next') as HTMLButtonElement;
      if (prevButton && nextButton) {
        prevButton.disabled = scrollPosition <= 0;
        nextButton.disabled = scrollPosition >= maxScroll;
      }
    }
  };

  useEffect(() => {
    toggleButtons();
  }, [scrollPosition]);
  

  return (
    <div className="carousel">
      <button className="prev" onClick={slideLeft}>‹</button>
      <div className="carousel-inner" ref={carouselInnerRef}>
        {actors.map((actor) => (
            <div className="actor" key={actor.name}>
                <img src={actor.photo} alt="Movie Poster" className="img-actor"/>
                <p className='actor-name'>{actor.name}</p>
            </div>
        ))}
      </div>
      <button className="next button_actors" onClick={slideRight}>›</button>
    </div>
  );
};


