import { useState } from "react";
import Stars from "./Starts";

export default function Description(props: { description: any; setDescription: any; }) {
  const { description } = props;


//style={{ backgroundImage: `url(${'https://image.tmdb.org/t/p/original'+description.poster_path})` }}
  const [isHoveringHere, setIsHoveringHere] = useState(false);
  const handleMouseOver = () => {
    setIsHoveringHere(true);
  };

  const handleMouseOut = () => {
    setIsHoveringHere(false);
  };

  return (

      <div className="container-characters" onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}>
    
          <div className="character-container">

            
            <div >
              <img style={{ display: !isHoveringHere ? "block" : "none" }} src={"https://image.tmdb.org/t/p/original"+description.poster_path} alt="name" />
            </div> 
        

              {isHoveringHere && (
            <div>
             <h6 className="movie-tittle">{description.title}</h6>
             <h6 className="movie-tittle">{description.release_date.substring(0, 4)} - {description.categories}</h6>
             <p className="movie-description-text">{description.overview}</p>
             <Stars item={description.vote_average}  />
             
              </div>
             )}
          </div>
      </div>

  );
}
