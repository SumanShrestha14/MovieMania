"use client";
import React, { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";
import PaginationControls from "@/components/PaginationControls";
import SkeletonLoading from "@/components/SkeletonLoading";

const TopRated = () => {
const apiKey = "15094101c7bade2409881441afca31a4";

  const [topMovies, setTopMovies] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(1);

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const fetchTopRatedMovie = async () => {
    setLoading(true);
    try {
      const APIURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${page}`;
      const res = await fetch(APIURL);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setTopMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Failed to fetch top-rated movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopRatedMovie();
  }, [page]);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold">Top Rated Movies</h2>

      <PaginationControls
        page={page}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      <div className="p-6">
        {loading ? (
          <SkeletonLoading />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-8">
            {topMovies.map((movie: any) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                rating={movie.vote_average}
                posterUrl={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopRated;
