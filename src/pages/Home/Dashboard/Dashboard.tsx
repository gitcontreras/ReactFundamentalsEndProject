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
  const [TypeMovies, setTypeMovies] = useState("now_playing");
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    GetGenders();
    GetMovies(TypeMovies);
  }, []);

  
  useEffect(() => {
    GetMovies(TypeMovies);
  }, [genders]);

  useEffect(() => {
    GetMovies(TypeMovies,pageCount)
  }, [pageCount]);


   const getFeatures =  (array: string | any[]) => {

    // if(genders.length==0) 
    // setGenders(ArrayGen);

    let categories = ""
    // for (let i = 0; i < array.length; ++i) 
    // {
      
    //    const found = ArrayGen.find(obj => {
    //      return obj.id == array[i];
    //    });
    //    if(found!=null && found!=undefined)
    //   categories+=found?.name+" / "
    // }

    if(categories=="")
    {
      for (let i = 0; i < array.length; ++i) 
      {
        
         const found = genders.find(obj => {
           return obj.id == array[i];
         });
         if(found!=null && found!=undefined)
        categories+=found?.name+" / "
      }
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

  const GetMovies =  (type:string, page: string | number =1) => {
      setTypeMovies(type);
      console.log("****"+type);
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${type}?page=${page}`,
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

  const classCheck1= TypeMovies=="now_playing" ? '-active' : "";
  const classCheck2= TypeMovies=="popular" ? '-active' : "";
  const classCheck3= TypeMovies=="top_rated" ? '-active' : "";
  const classCheck4= TypeMovies=="upcoming" ? '-active' : "";

  return (
    <Authtemplate>
    <div style={{textAlign: "center"}}>

    <button className={`btn${classCheck1}`}
    onClick={() => {
      setPageCount(1)
      setTypeMovies("now_playing")
      GetMovies("now_playing")
     }}
    >Now Playing</button>

    <button className={`btn${classCheck2}`} onClick={() => {
         setPageCount(1)
        setTypeMovies("popular")
         GetMovies("popular")
        }}>Popular</button>

    <button  className={`btn${classCheck3}`}
    onClick={() => {
      setPageCount(1)
      setTypeMovies("top_rated")
      GetMovies("top_rated")
     }}>Top rated</button>

    <button className={`btn${classCheck4}`} onClick={() => {
         setPageCount(1)
      setTypeMovies("upcoming")
      GetMovies("upcoming")
     }}>Upcoming</button>
    <div>
    </div>

    {movies ? (
          <Movies movies={movies} setMovies={setMovies} />
        ) : (
          <>
            <label>Error</label>
          </>
        )}

    </div>
    <div  style={{textAlign: "center"}}>
    <button className="btn-page" disabled={pageCount == 1? true : false} onClick={() => setPageCount((c) => c - 1)}> &lt;</button>
    <label>{pageCount}</label>
    <button className="btn-page" disabled={pageCount >499 ? true : false} onClick={() => setPageCount((c) => c + 1)}
    > &gt;</button>
    </div>
    </Authtemplate>
  );
});
Dashboard.displayName = "Dashboard";
export default Dashboard;
