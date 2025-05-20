"use client";
import React, { useEffect, useState } from 'react';
import MovieCard from '@/components/MovieCard';
import PaginationControls from '@/components/PaginationControls';
import SkeletonLoading from '@/components/SkeletonLoading';

const UpComing = () => {
  const apiKey = "15094101c7bade2409881441afca31a4";
  const [upComing, setUpComing] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(1);

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const fetchUpcomingMovies = async () => {
    setLoading(true);
    try {
      const APIURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${page}`;
      const res = await fetch(APIURL);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setUpComing(data.results);
      setTotalPages(data.total_pages);
      console.log(data.results);
    } catch (error) {
      console.error("Failed to fetch upcoming movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcomingMovies();
  }, [page]);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold">Movies on the Way 🎞️</h2>

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
            {upComing.map((movie: any) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                // rating={movie.vote_average}
                release_date={movie.release_date}
                posterUrl={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : "/no-poster.png"
                }
              />
            ))}
          </div>
        )}
      </div>
            <PaginationControls
        page={page}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
};

export default UpComing;
