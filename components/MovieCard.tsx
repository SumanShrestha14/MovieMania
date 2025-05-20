"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface Card {
  id: string;
  title: string;
  posterUrl: string;
  rating?: number;
  release_date?: string;
}

const MovieCard: React.FC<Card> = ({
  id,
  title,
  posterUrl,
  rating,
  release_date,
}) => {
  const router = useRouter();

  const redirectToSinglePage = () => {
    router.push(`/SingleDetails/${id}`);
  };

  return (
    <div
      onClick={redirectToSinglePage}
      className="max-w-xs bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
    >
      <img
        src={posterUrl}
        alt={`${title} poster`}
        className="w-full h-64 object-cover"
      />
      <div className="pad-x">
        <h3 className="text-lg font-bold mb-1">{title}</h3>

        {rating !== undefined && (
          <p className="text-md margin-bottom">⭐ Rating: {rating}</p>
        )}

        {release_date && (
          <p className="text-gray-400 text-md margin-bottom">🎬 Release: {release_date}</p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
