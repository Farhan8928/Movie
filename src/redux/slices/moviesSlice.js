import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "c45a857c193f6302f2b5061c3b85e743";
const BASE_URL = "https://api.themoviedb.org/3";

// Thunks for fetching Movies, Top-rated, Upcoming Movies, and Movie Cast
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async () => {
    const response = await axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}`);
    return response.data.results; // Return the movie list
  }
);

export const fetchTopRated = createAsyncThunk(
  "movies/fetchTopRated",
  async () => {
    const response = await axios.get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
    return response.data.results; // Return top-rated movie list
  }
);

export const fetchUpcoming = createAsyncThunk(
  "movies/fetchUpcoming",
  async () => {
    const response = await axios.get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
    return response.data.results; // Return upcoming movie list
  }
);

// New Thunk for Fetching Movie Cast
export const fetchCast = createAsyncThunk(
  "movies/fetchCast",
  async (movieId) => {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
    return response.data.cast; // Return the cast list for the movie
  }
);

// New Thunk for Fetching Movie Details
export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchMovieDetails",
  async (movieId) => {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    return response.data; // Return movie details
  }
);

// Movies slice
const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [], // List of all movies
    topRated: [], // List of top-rated movies
    upcoming: [], // List of upcoming movies
    cast: [], // Movie cast data
    movieDetails: null, // Single movie details
    searchQuery: "", // Search query state
    statuses: {
      movies: "idle", // Movie fetch status
      topRated: "idle", // Top-rated movie fetch status
      upcoming: "idle", // Upcoming movie fetch status
      cast: "idle", // Cast fetch status
      movieDetails: "idle", // Movie details fetch status
    },
    errors: {
      movies: null, // Error for movies
      topRated: null, // Error for top-rated movies
      upcoming: null, // Error for upcoming movies
      cast: null, // Error for cast
      movieDetails: null, // Error for movie details
    },
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearMoviesData: (state) => {
      state.movies = [];
      state.topRated = [];
      state.upcoming = [];
      state.cast = [];
      state.movieDetails = null;
    },
    clearCast: (state) => {
      state.cast = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Movie details
      .addCase(fetchMovieDetails.pending, (state) => {
        state.statuses.movieDetails = "loading";
        state.errors.movieDetails = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.statuses.movieDetails = "succeeded";
        state.movieDetails = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.statuses.movieDetails = "failed";
        state.errors.movieDetails = action.error.message;
      })
      // Cast
      .addCase(fetchCast.pending, (state) => {
        state.statuses.cast = "loading";
        state.errors.cast = null;
      })
      .addCase(fetchCast.fulfilled, (state, action) => {
        state.statuses.cast = "succeeded";
        state.cast = action.payload;
      })
      .addCase(fetchCast.rejected, (state, action) => {
        state.statuses.cast = "failed";
        state.errors.cast = action.error.message;
      })
      // Movies
      .addCase(fetchMovies.pending, (state) => {
        state.statuses.movies = "loading";
        state.errors.movies = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.statuses.movies = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.statuses.movies = "failed";
        state.errors.movies = action.error.message;
      })
      // Top-rated
      .addCase(fetchTopRated.pending, (state) => {
        state.statuses.topRated = "loading";
        state.errors.topRated = null;
      })
      .addCase(fetchTopRated.fulfilled, (state, action) => {
        state.statuses.topRated = "succeeded";
        state.topRated = action.payload;
      })
      .addCase(fetchTopRated.rejected, (state, action) => {
        state.statuses.topRated = "failed";
        state.errors.topRated = action.error.message;
      })
      // Upcoming
      .addCase(fetchUpcoming.pending, (state) => {
        state.statuses.upcoming = "loading";
        state.errors.upcoming = null;
      })
      .addCase(fetchUpcoming.fulfilled, (state, action) => {
        state.statuses.upcoming = "succeeded";
        state.upcoming = action.payload;
      })
      .addCase(fetchUpcoming.rejected, (state, action) => {
        state.statuses.upcoming = "failed";
        state.errors.upcoming = action.error.message;
      });
  },
});

export const { setSearchQuery, clearMoviesData, clearCast } = moviesSlice.actions;

export default moviesSlice.reducer;
