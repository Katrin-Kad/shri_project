import React, { FC, useState } from "react"
import "./Search.css"

interface SearchProps {
    onSearch: (searchQuery: string) => void;
  }
export const Search: FC<SearchProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);
        onSearch(query); 
    };
    return (
        <div className="search-box">
            <input 
                type="text" 
                placeholder="Название фильма"
                value={searchQuery}
                onChange={handleInputChange}
            />
        </div>
    )
}