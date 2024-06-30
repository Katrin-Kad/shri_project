import React, { FC, useState, useEffect } from "react";
import { Filters } from "../widgets/Filters";
import { Films } from "../widgets/Films";
import { useNavigate } from "react-router-dom";

export const Content: FC = () => {
  const navigate = useNavigate();
  const [genre, setGenre] = useState<string>('0');
  const [year, setYear] = useState<string>('0');
  const [params, setParams] = useState<string>("page=1"); // State to hold filter parameters

  const handleGenreChange = (selectedGenre: string) => {
    setGenre(selectedGenre);
  };

  const handleYearChange = (selectedYear: string) => {
    setYear(selectedYear);
  };

  useEffect(() => {
    let queryParams = "page=1";
    if (year !== "" && year !== "0") {
      queryParams += `&release_year=${year}`;
    }
    if (genre !== "" && genre !== "0") {
      queryParams += `&genre=${genre}`;
    }

    setParams(queryParams); 

    navigate({
      pathname: location.pathname,
      search: queryParams,
    });

    console.log(queryParams); 
  }, [navigate, genre, year]); 

  return (
    <div className="box">
      <Filters onGenreChange={handleGenreChange} onYearChange={handleYearChange} />
      <Films qParams={params}/>
    </div>
  );
};
