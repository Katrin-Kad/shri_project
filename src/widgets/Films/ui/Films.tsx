import React, { FC, useEffect, useState } from "react";
import { useSearchMoviesQuery } from "../../../shared/api";
import "./Films.css"
import {Pagination} from "./Pagination"
import {FilmComponent} from "./FilmComponent"


interface MovieSearchResultsProps {
  queryParams: string;
}

export const MovieSearchResults: FC<MovieSearchResultsProps> = ({ queryParams }) => {
    const pageMatch = queryParams.match(/page=(\d+)/);
    const page = pageMatch ? parseInt(pageMatch[1], 10) : 1;
    const [currentPage, setCurrentPage] = useState(page);
    const [params, setParams] = useState(queryParams);

    useEffect(() => {
      const newParams = queryParams.replace(/page=(\d+)/, `page=${currentPage}`);
      setParams(newParams);
    }, [currentPage, queryParams]);

    const { data: searchData, error, isLoading, isFetching } = useSearchMoviesQuery(params);
  
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

    const { search_result: movies, total_pages: totalPages } = searchData;
    
    return (
      <div className="films">
        {(movies).map((movie) => (
          <FilmComponent movie={movie}/>
        ))}
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    )
}