import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../redux/slices/moviesSlice";

const Header = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Using useNavigate instead of useHistory

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(search.trim()));
    navigate("/"); // Navigate to the home page after search
  };

  const handleNavigation = (path) => {
    setSearch(""); // Clear the search state on navigation
    dispatch(setSearchQuery("")); // Optionally, reset the search query in the store
    navigate(path); // Navigate to the specified path
  };

  return (
    <div className="container">
      <div className="navbar">
        <h2 className="logo-name">MovieDb</h2>
        <div className="nav-items">
          <ul className="nav-items">
            <li className="items">
              <Link
                to="/"
                onClick={() => handleNavigation("/")}
                className="items"
              >
                Popular
              </Link>
            </li>
            <li className="items">
              <Link
                to="/top-rated"
                onClick={() => handleNavigation("/top-rated")}
                className="items"
              >
                Top Rated
              </Link>
            </li>
            <li className="items">
              <Link
                to="/upcoming"
                onClick={() => handleNavigation("/upcoming")}
                className="items"
              >
                Upcoming
              </Link>
            </li>
          </ul>
          <form className="example" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Movie Name"
              className="input-field"
              value={search}
              onChange={handleInputChange}
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Header;
