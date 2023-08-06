import React from "react";

import Description from "./Description";

export default function Movies(props: { movies: any; setMovies: any; }) {
  const { movies, setMovies } = props;




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
