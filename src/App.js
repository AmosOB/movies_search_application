import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const API_KEY = '82b8ae8bbccc519b0a9db40164eb186c';
  const [movie_query, setMovie_query] = useState('Jack Reacher');
  const [movieDatas, setMovieDatas] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movie_query}`
      );
      setMovieDatas(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [movie_query]);

  const handleOnChange = (e) => {
    setMovie_query(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMovie_query(movie_query);
  };

  


  return (
    <>
      <div className="container-fluid bg-dark">
        <div className='row justify-content-center'>
          <div className='col-sm-9 text-center'>
            <h2 className='text-white mb-3'>Movies Search</h2>
            <form onSubmit={handleSubmit}>
              <div className='d-flex mb-3'>
                <input 
                  className="form-control mx-2" 
                  type="text" 
                  placeholder="Search"
                  value={movie_query} 
                  onChange={handleOnChange}
                />
                <button 
                  type='submit' 
                  className='btn btn-dark'
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {movieDatas.map((movieData, index) => 
            <div key={index} className='col-sm-4 mb-3'>
              <div className="card bg-dark">
                <h4 className="card-title mt-3 mx-2 text-white">{movieData.title}</h4>
                {movieData.backdrop_path && 
                  <img 
                    src={`https://image.tmdb.org/t/p/w500${movieData.backdrop_path}`} 
                    alt={movieData.title} 
                    className="img-fluid mb-3"
                  />
                }
                <h6 className='text-white'>Release date {movieData.release_date}</h6>
                <div className="card-body">
                  <p className="card-text text-white">{movieData.overview}</p>
                </div>
              </div>
            </div>
          )}

          
        </div>
      </div>
    </>
  );
}

export default App;
