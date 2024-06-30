import React, { FC } from "react";
import { Filter } from "../../../entities/Filter";
import { GENRES } from "../../../shared/constants/genres";
import { YEARS } from "../../../shared/constants/years";
import "./Filters.css";

interface FiltersProps {
  onGenreChange: (genre: string) => void;
  onYearChange: (year: string) => void;
}

export const Filters: FC<FiltersProps> = ({ onGenreChange, onYearChange }) => {
  return (
    <div className="block">
      <p className="title">Фильтр</p>
      <p className="subtitle">Жанр</p>
      <div>
        <Filter id_name="genres" typeOfFilter={GENRES} onSelect={onGenreChange} />
      </div>
      <p className="subtitle">Год выпуска</p>
      <div>
        <Filter id_name="years" typeOfFilter={YEARS} onSelect={onYearChange} />
      </div>
    </div>
  );
};
