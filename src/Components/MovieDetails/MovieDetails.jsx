import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieDetails() {
  const [details, setDeatils] = useState(null);
  const [credits, setcredits] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  // Get parameter
  let { movieId } = useParams();

  // Get Details Movie
  function getMovieDetails(movieId) {
    setisLoading(true);

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=bfb56f35908d8f19d9588e5408104035`
      )
      .then(({ data }) => {
        setisLoading(false);
        setDeatils(data);
      })
      .catch((error) => {
        setisLoading(false);
      });
  }

  // Get Actors Credits
  function getActor(movieId) {
    setisLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=bfb56f35908d8f19d9588e5408104035`
      )
      .then(({ data }) => {
        setisLoading(false);
        setcredits(data);
      })
      .catch((error) => {
        setisLoading(false);
      });
  }

  useEffect(() => {
    getMovieDetails(movieId);
    getActor(movieId);
  }, [movieId]);

  // Loading Page
  if (isLoading) {
    return (
      <div className="min-h-96 flex items-center justify-center my-12">
        <i className="fas fa-spinner fa-spin fa-5x text-red-900"></i>
      </div>
    );
  }

  // Code CSS
  return (
    <>
      <div className="mt-12">
        {details ? (
          <>
            {/*Details Movie  */}
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                {/* Back Ground Movie */}
                <img
                  className="w-full"
                  src={`https://image.tmdb.org/t/p/w500/${details?.backdrop_path}`}
                  alt=""
                />
              </div>

              {/* Details */}
              <div className="w-full md:w-1/2 px-2 md:ms-4">
                <h1 className="font-bold text-2xl">{details?.title}</h1>
                <h1 className="font-light my-2 text-lg">{details?.overview}</h1>
                <h1 className="text-lg font-semibold">
                  Movie Genres :{" "}
                  {details?.genres
                    ?.map((genre) => genre.name)
                    .slice(0, 2)
                    .join(" , ")}
                </h1>
                <h1 className="text-lg font-semibold my-2">
                  Movie Tagline : {details?.tagline}
                </h1>
                <h1 className="text-lg font-semibold">
                  Language : {details?.original_language}
                </h1>
                <h1 className="text-lg font-semibold my-2">
                  Country of Origin :{" "}
                  {details?.production_countries
                    ?.map((country) => country.name)
                    .join(", ")}
                </h1>
                <h1 className="text-lg font-semibold my-2">
                  Spoken Languages :{" "}
                  {details?.spoken_languages
                    ?.map((speak) => speak.english_name)
                    .join(", ")}
                </h1>
                <h1 className="text-lg font-semibold my-2">
                  Movie Rating : {details?.vote_average}{" "}
                  <i className="fa-solid fa-star text-yellow-400"></i>
                </h1>
                <h1 className="text-red-500 text-lg font-semibold">
                  This is the movie link :{" "}
                  <a
                    className="font-bold"
                    href={details?.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {details?.homepage}
                  </a>
                </h1>
              </div>
            </div>
          </>
        ) : null}
      </div>


        {/* Actors & Characters*/}
      <h1 className="text-4xl font-bold my-12 text-red-900">
        Actors <i className="fa-solid fa-user"></i> :
      </h1>
      <div className="flex flex-wrap justify-center gap-y-6">
        {credits?.cast?.slice(0, 5).map((credit) => (
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 px-4 hover:shadow-2xl shadow-lg">
            <img
              className="w-full h-auto"
              src={`https://image.tmdb.org/t/p/w500/${credit.profile_path}`}
              alt={credit.character}
            />
            <h1 className="font-bold text-lg mt-2 text-center">
              {credit.character}
            </h1>
          </div>
        ))}
      </div>

      <h1 className="text-4xl font-bold my-12 text-red-900">Characters :</h1>
      <div className="flex flex-wrap justify-center gap-y-6">
        {credits?.crew?.slice(0, 5).map((credit) => (
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 px-4 hover:shadow-2xl shadow-lg">
            <img
              className="w-full h-auto"
              src={`https://image.tmdb.org/t/p/w500/${credit.profile_path}`}
              alt={credit.name}
            />
            <h1 className="font-bold text-lg mt-2 text-center">
              {credit.name}
            </h1>
            <h1 className="font-bold text-lg mt-2 text-center text-red-600">
              {credit.job}
            </h1>
          </div>
        ))}
      </div>
    </>
  );
}
