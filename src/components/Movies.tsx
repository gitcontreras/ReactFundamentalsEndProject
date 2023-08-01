import React from "react";
import { useState } from "react";
import Description from "./Description";

export default function Movies(props: { movies: any; setMovies: any; }) {
  const { movies, setMovies } = props;

  const resetMovies = () => {
    setMovies(null);
  };

  const [isHovering, setIsHovering] = useState(true);
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };



  return (
  
    <div className="characters">
      <div className="container-characters">
        {movies.map((movie: { poster_path: string ; title: string ; overview: string, release_date:string, vote_average:number, categories: string}, index: React.Key | null | undefined) => (
          <div className="character-container" key={index}>
           <Description description={movie} setDescription={setMovies} />
         </div>
        ))}
      </div>
    </div>
  );
}
