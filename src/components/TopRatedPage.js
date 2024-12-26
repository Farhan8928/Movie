import React, { useState } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import Pagination from "./Pagination";

const TopRatedPage = () => {
  const { topRated, searchQuery } = useSelector((state) => state.movies);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;

  const filteredTopRated = topRated.filter((movie) =>
    movie.original_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTopRated.length / moviesPerPage);
  const startIndex = (currentPage - 1) * moviesPerPage;
  const paginatedMovies = filteredTopRated.slice(
    startIndex,
    startIndex + moviesPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="cards-container">
      {paginatedMovies.map((movie) => (
        <Card key={movie.id} {...movie} />
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default TopRatedPage;
