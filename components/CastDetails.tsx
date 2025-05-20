import React, { useState, useEffect } from "react";

const CastDetails = ({ movie_id }: any) => {
  const [cast, setCast] = useState<any>([]);

  useEffect(() => {
    const fetchCastDetails = async () => {
      try {
        const Api_key = "15094101c7bade2409881441afca31a4"; // replace with your actual API key
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${Api_key}&language=en-US`
        );
        const data = await response.json();
        setCast(data.cast); // setting cast data to state
      } catch (error) {
        console.error("Error fetching cast details:", error);
      }
    };

    fetchCastDetails();
  }, [movie_id]);

  // Fallback image URL
  const fallbackImage = "https://via.placeholder.com/500x500?text=No+Image"; // Dummy image

  return (
    <div>
      <h2 className="px-4 text-2xl font-semibold">Cast</h2>
      {/* Responsive grid with different column layouts based on screen size */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {cast.map((actor: any) => (
          <div
            key={actor.id}
            className="w-full bg-gray-800 rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                  : fallbackImage
              } // Use fallback image if profile_path is missing
              alt={actor.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 flex flex-row gap-2">
              <h3 className="text-lg font-semibold text-white">
                {actor.name}
              </h3>
              <p className="text-gray-600">Character: {actor.character}</p>
              <p className="text-gray-500">
                Popularity: {actor.popularity.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastDetails;
