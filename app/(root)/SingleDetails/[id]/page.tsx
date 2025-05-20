"use client";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import CastDetails from "@/components/CastDetails";

type Props = {
  params : Promise <{id:string }>;
}
// Replace with your actual API key
const API_KEY = "15094101c7bade2409881441afca31a4";

const SinglePageDetails= ({ params }:Props) => {

  const { id}  = use(params); // Extract movie ID from the route

  const [movie, setMovie] = useState<any>(null); // Movie details state
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch movie details from the TMDb API
  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch movie details");
        }
        const data = await res.json();
        setMovie(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center text-white">Loading movie details...</div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!movie) {
    return <div className="text-center text-white">No movie data found.</div>;
  }

  return (
    <div className="flex flex-col gap-9">
      <div className="relative bg-gray-900 text-white rounded-lg shadow-lg m-4 flex flex-col lg:flex-row">
        {/* Content on the left side */}
        <div className="relative justify-between w-full p-6 border border-black/10 bg-gradient-to-br from-black via-black to-gray-900 rounded-lg shadow-lg flex flex-row gap-5">
          {/* Movie Poster */}
          <div className="mb-4 flex justify-center items-start flex-shrink-0">
            <Image
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/fallback.jpg" // fallback for missing poster
              }
              alt={movie.title || "Movie Poster"}
              width={384}
              height={576}
              className="rounded-lg shadow-lg object-cover"
              priority
            />
          </div>

          {/* Movie Details */}
          <div className="flex flex-col justify-center gap-3 flex-1 overflow-hidden">
            <h1 className="text-3xl font-bold mb-1 truncate">{movie.title}</h1>

            {/* Rating */}
            <div className="text-gray-300 flex items-center text-sm">
              <span className="mr-2">
                <span className="text-blue-400 font-semibold">Rating:</span>{" "}
                {movie.vote_average?.toFixed(1) || "N/A"}
              </span>
            </div>

            {/* Runtime & Genres */}
            <div className="flex flex-wrap items-center text-sm text-gray-400 gap-2">
              {movie.runtime && <span>{movie.runtime} min</span>}
              {movie.genres?.length > 0 && (
                <span className="truncate">
                  {movie.genres.map((g: any) => g.name).join(", ")}
                </span>
              )}
            </div>

            {/* Release Date */}
            <div className="text-gray-400 text-sm">
              <span className="mr-2 font-medium">Release Date:</span>
              {movie.release_date
                ? new Date(movie.release_date).toLocaleDateString("en-GB", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "N/A"}
            </div>

            {/* Overview */}
            <div className="text-white mt-4 text-base leading-relaxed">
              <h3 className="font-semibold mb-1">Overview</h3>
              <p className="text-gray-300 max-h-48 overflow-y-auto">
                {movie.overview || "No overview available."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <CastDetails movie_id={id} />
    </div>
  );
};

export default SinglePageDetails;
