// import logo from './logo.svg';
// import './App.css';
import Movie from './Movie';

import { useState, useEffect } from 'react';

const API_KEY = `2f3d3a8ab38ec8199c7c0261d59c7f46`
const API_PATH = `https://api.themoviedb.org/3/`
const getQuery = API_PATH + `movie/now_playing?api_key=` + API_KEY

const App = () => {

  const [status, setStatus] = useState('idle');
  const [query, setQuery] = useState(getQuery);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setStatus('fetching');
      const response = await fetch(query);
      const d = await response.json();
      setData(d.results);
      console.log('data', d);
      setStatus('fetched');
    };

    fetchData();
  }, [query]);

  return (
    <div className="container mx-auto">
      <header className="bg-gray-200 pl-2 h-32 border-blue-400 border-b-2">
        <img alt='tmdb logo' src='tmdb_logo.png' />

      </header>
      <div className="min-h-screen bg-gray-100">
        Main

<div className="flex flex-wrap -mx-4">
          <div className="px-4 w-full lg:w-1/6">
            Filter
</div>

          <div className="px-4 w-full lg:w-5/6">
            <div className="grid grid-cols-3 gap-4">
              {
                data && data.map((d) =>
                  <Movie key={d.id} d={d} />
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
