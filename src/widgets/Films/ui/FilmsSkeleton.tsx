import React, { FC, useEffect, useState } from "react";
import { MovieSearchResults } from "./Films";
import { Search } from "./Search";
import "./FilmSkeleton.css";

interface FilmsProps {
  qParams: string;
}

export const Films: FC<FilmsProps> = ({ qParams }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>('');
  
    const handleSearch = (query: string) => {
      setSearchQuery(query);
    };
  
    
    useEffect(() => {
      const timerId = setTimeout(() => {
        setDebouncedSearchQuery(searchQuery);
      }, 500); 
  
      return () => {
        clearTimeout(timerId);
      };
    }, [searchQuery]);
  

  let params = `${qParams}`

  if (searchQuery) {
    params += `&title=${debouncedSearchQuery}`;
  }

  return (
    <div className="searchResults">
      <Search onSearch={handleSearch} />
      <MovieSearchResults queryParams={params} />
    </div>
  );
};
