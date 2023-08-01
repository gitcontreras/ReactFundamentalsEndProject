import { memo, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Movies from "../../../components/Movies";
import "./Dashboard.css";
import Authtemplate from "~/templates/AuthTemplate/Authtemplate";
import axios from "axios";

const Dashboard = memo(() => {
  const location = useLocation();
  const navigate = useNavigate();

  interface gen {
    id: string;
    name: string;
  }

  let ArrayGen: gen[]=[];
  const [movies, setMovies] = useState(null);
  const [genders, setGenders] =  useState<gen[]>([]);

 
  useEffect(() => {
    GetGenders();
    GetMovies();
  }, []);


   const getFeatures =  (array: string | any[]) => {
    let categories = ""
    for (let i = 0; i < array.length; ++i) 
    {
       const found = ArrayGen.find(obj => {
         return obj.id == array[i];
       });
      categories+=found?.name+" / "
    }

    return categories;
}

  const GetGenders = () => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/genre/movie/list",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTExY2U2ZTBjNGUxZjQ4M2E3NDIxMDNjMDJmYjZmOSIsInN1YiI6IjY0MTM3ZDEyYTZjMTA0MDA3OTA3MTM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IhXW1F90EvMAP_AMkFrEfMJdyuswuVnBY6_KlyVMkO0",
      },
    };

    axios
    .request(options)
    .then(function (response) { 
      ArrayGen=response.data.genres;
      setGenders(response.data.genres);   
    })
    .catch(function (error) {
      console.error(error);
    });
  };

  const GetMovies =  () => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/now_playing?page=1",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTExY2U2ZTBjNGUxZjQ4M2E3NDIxMDNjMDJmYjZmOSIsInN1YiI6IjY0MTM3ZDEyYTZjMTA0MDA3OTA3MTM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IhXW1F90EvMAP_AMkFrEfMJdyuswuVnBY6_KlyVMkO0",
      },
    };

    axios
    .request(options)
    .then(function (response) {
      //console.log(response.data); 
      const temp= response.data.results.map((res:any, key: any) =>{
        return{
          ...res,
          categories: getFeatures(res.genre_ids),
         }
        });
        
        console.log(temp); 
      setMovies(temp);   
    })
    .catch(function (error) {
      console.error(error);
    });
  };


  return (
    <Authtemplate>
    <div>

    {movies ? (
          <Movies movies={movies} setMovies={setMovies} />
        ) : (
          <>
            <label>Error</label>
          </>
        )}

      <button
        onClick={() => {
          navigate("/", { state: location.state });
        }}
      >
        redirect
      </button>
    </div>
    </Authtemplate>
  );
});
Dashboard.displayName = "Dashboard";
export default Dashboard;
