'use client'

import MovieCard from "@/components/MovieCard";
import PaginationControls from "@/components/PaginationControls";
import SkeletonLoading from "@/components/SkeletonLoading";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const apiKey = "15094101c7bade2409881441afca31a4";

export default function PopularMovies() {
  const [allMovies, setAllMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        let APIURL = "";

        if (search) {
          APIURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${search}&page=${page}`;
        } else {
          APIURL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;
        }

        const res = await fetch(APIURL);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        setAllMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, search]);

  return (
    <div>
      <h2 className="text-2xl font-bold">
        {search ? "Search Result for " + search : "Popular Movies"}
      </h2>
      <PaginationControls
        page={page}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      <div className="p-6">
        {loading && <SkeletonLoading />}
        {error && <p className="text-red-600">Error: {error}</p>}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-8">
          {allMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              rating={movie.vote_average}
              posterUrl={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            />
          ))}
        </div>
      </div>

      <PaginationControls
        page={page}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
}
