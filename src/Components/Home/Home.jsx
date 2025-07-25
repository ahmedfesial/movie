import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

export default function Home() {
  const [getMovies, setGetMovies] = useState([]);
  const [getSreach, setgetSreach] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  // Get Trending Movies
  function getAllMovies() {
    setisLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=bfb56f35908d8f19d9588e5408104035`
      )
      .then((response) => {
        setisLoading(false);
        setGetMovies(response.data.results);
      })
      .catch((error) => {
        setisLoading(false);
      });
  }

  // Sreach Movies
  function sreachMovies() {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=bfb56f35908d8f19d9588e5408104035&query=${formik.values.query}`
      )
      .then(({ data }) => {
        setgetSreach(data.results);
        console.log(data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Back to Trending Movies
  function bactHome() {
    setgetSreach(0);
  }

  // Get a Value
  let formik = useFormik({
    initialValues: {
      query: "",
    },
    onSubmit: sreachMovies,
  });

  useEffect(() => {
    getAllMovies();
  }, []);

  // Laoding Page
  if (isLoading) {
    return (
      <div className="min-h-96 flex items-center justify-center my-12">
        <i className="fas fa-spinner fa-spin fa-5x text-red-900"></i>
      </div>
    );
  }

  return (
    <>
      {/* Input Sreach */}
      <div className="my-4">
        <form onSubmit={formik.handleSubmit}>

            {/* Input Search */}
          <input
            className="border-1 py-1 p-1 rounded-lg ms-4"
            type="text"
            name="query"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.query}
            placeholder="Sreach Movies..."
          />

          <button className=" ms-4 px-4 py-1 bg-red-600 text-white font-semibold rounded-2xl cursor-pointer ">
            Sreach
          </button>
        </form>
      </div>

      {/* Get Data Sreach */}

      {getSreach.length > 0 ? (
        <div>
          <h1 className="text-center text-3xl font-bold mb-6">
            Search Results 🔎
          </h1>

          <button
            onClick={bactHome}
            className="ms-4 bg-red-600 px-4 py-2 text-white font-semibold rounded-lg cursor-pointer hover:bg-red-400"
          >
            Back To Trending Movies
          </button>

            {/*Loop All Movies Sreaches  */}
          <div className="flex flex-row flex-wrap justify-center">
            {getSreach?.map((film) => (
              <div
                key={film.id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2"
              >
                <Link to={`/MovieDetails/${film.id}`}>
                  <div className="flex flex-col justify-start items-center shadow-lg hover:shadow-2xl p-2 my-2 h-full">
                    <img
                      className="w-full"
                      src={`https://image.tmdb.org/t/p/w200/${film.poster_path}`}
                      alt={film.original_title}
                    />
                    <h1 className="font-semibold text-center mt-1">
                      {film.title}
                    </h1>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-center text-3xl font-bold mb-6">
            Trending Movies 🎬
          </h1>
          <div className="container mx-auto flex flex-wrap justify-center gap-y-6">

            {/* Loop All Moviees Trending */}
            {getMovies.map((movie) => (
              <div
                key={movie.id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2"
              >
                <Link to={`/MovieDetails/${movie.id}`}>
                  <div className="flex flex-col justify-start items-center shadow-lg hover:shadow-2xl p-2 my-2 h-full">
                    <img
                      className="w-full h-auto"
                      src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                      alt={movie.original_title}
                    />
                    <h1 className="font-semibold text-center mt-1">
                      {movie.title}
                    </h1>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
