# Movie Web Panel

This project is a movie web panel consisting of five different pages and a global search in the Navbar. The web panel is built with React.js and includes the following features:

1. Home Page / Popular Movie Page
2. Top-Rated Movie Page
3. Upcoming Movie Page
4. Single Movie Detail Page
5. Searched Movie Page (UI similar to Home Page)

The project is responsive with decent CSS and includes pagination. Experienced developers are encouraged to use Redux for state management.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/movie-web-panel.git
    ```

2. Navigate to the project directory:
    ```sh
    cd movie-web-panel
    ```

3. Install the dependencies:
    ```sh
    npm install
    ```

4. Start the development server:
    ```sh
    npm start
    ```

5. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### API Details

You can use `c45a857c193f6302f2b5061c3b85e743` as an API key for your API calls OR generate your own by visiting [The Movie Database API](https://www.themoviedb.org/documentation/api).

- Get all movies:
    ```
    https://api.themoviedb.org/3/movie/popular?api_key=${Api_key}&language=en-US&page=1
    ```

- Get movie detail:
    ```
    https://api.themoviedb.org/3/movie/${movie_id}?api_key=${Api_key}&language=en-US
    ```

- Get movie cast detail:
    ```
    https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${Api_key}&language=en-US
    ```

- Get upcoming movies:
    ```
    https://api.themoviedb.org/3/movie/upcoming?api_key=${Api_key}&language=en-US&page=1
    ```

- Get top-rated movies:
    ```
    https://api.themoviedb.org/3/movie/top_rated?api_key=${Api_key}&language=en-US&page=1
    ```

- Get search result:
    ```
    https://api.themoviedb.org/3/search/movie?api_key=${Api_key}&language=en-US&query=${movie_name}&page=1
    ```

For Image Path, you need to add a base domain:

In the `src` directory, the `components` folder contains React components for each page of the web panel, along with utility functions in the `utils` folder.

## Deployment

1. Create a new sandbox on [CodeSandbox](https://codesandbox.io/).
2. Import your GitHub repository.
3. Make sure the project runs without errors on CodeSandbox.
4. Submit the CodeSandbox link.

## Acknowledgments

- The Movie Database (TMDb) API for providing movie data.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
