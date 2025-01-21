import React, { useState } from "react";
import search from "../assets/find.png";

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      onSearch(searchTerm); // Trigger the search action with the entered term
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-row relative items-center border border-solid border-black">
      <input
        type="search"
        name="search"
        id="search"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className="border border-solid border-black w-96 p-3 outline-none"
        placeholder="Enter your search term"
      />
      <img
        src={search}
        alt="search"
        className="w-8 h-8 mx-3 cursor-pointer"
        onClick={handleSearch}
      />
    </div>
  );
};

export default Search;
