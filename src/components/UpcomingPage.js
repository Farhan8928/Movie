import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import Pagination from "./Pagination";

const UpcomingPage = () => {
  const { upcoming, searchQuery } = useSelector((state) => state.movies);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedMovies, setPaginatedMovies] = useState([]);
  const itemsPerPage = 8;

  // Filter and paginate movies
  useEffect(() => {
    const filteredMovies = upcoming.filter((movie) =>
      movie.original_title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    setPaginatedMovies(filteredMovies.slice(startIndex, endIndex));
  }, [upcoming, searchQuery, currentPage]);

  const totalPages = Math.ceil(
    upcoming.filter((movie) =>
      movie.original_title.toLowerCase().includes(searchQuery.toLowerCase())
    ).length / itemsPerPage
  );

  // Handler for page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="upcoming-page">
      <div className="cards-container">
        {paginatedMovies.length > 0 ? (
          paginatedMovies.map((movie) => <Card key={movie.id} {...movie} />)
        ) : (
          <p>No upcoming movies found.</p>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UpcomingPage;
