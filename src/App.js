// import logo from './logo.svg';
// import './App.css';
import Movie from './Movie';
import { genres } from './genres'
import { bgColours } from './bgColours';

import { useState, useEffect } from 'react';

const API_KEY = `2f3d3a8ab38ec8199c7c0261d59c7f46`
const API_PATH = `https://api.themoviedb.org/3/`
const getQuery = API_PATH + `movie/now_playing?api_key=` + API_KEY

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max))
}



function compare(a, b) {
  if (a.popularity > b.popularity) {
    return -1;
  }
  if (a.popularity < b.popularity) {
    return 1;
  }
  return 0;
}

const isSubsetArr = (arr1, arr2) => {
  return arr2.every(val => arr1.includes(val))
}

const App = () => {

  const [status, setStatus] = useState('idle');
  const [query, setQuery] = useState(getQuery);
  const [movies, setMovies] = useState([]);
  const [data, setData] = useState([]);
  const [filterIds, setFilterIds] = useState([]);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setStatus('fetching');
      const response = await fetch(query)
      let { results } = await response.json()
      setData(results)
      setMovies(results)

      console.log('fetchData', results)
      setStatus('fetched')
    }

    fetchData()
  }, [query])

  useEffect(() => {
    if (!filterIds.length) return;

    const filterMovies = () => {
      let m = [...data]
      if (filterIds.length) {
        m = m.filter((r => {
          return isSubsetArr(r.genre_ids, filterIds)
        }))
      }
      m.sort(compare)
      setMovies(m)
    }
    filterMovies()

  }, [filterIds, data])

  const getGenreClass = (id) => {
    const activeGenreClass = "inline-flex cursor-pointer text-xs p-1 m-1 bg-blue-200 border border-blue-400 rounded-2xl"
    const genreClass = "inline-flex cursor-pointer text-xs p-1 m-1 bg-white border border-blue-400 rounded-2xl"
    return filterIds.includes(id) ? activeGenreClass : genreClass
  }

  const setFilter = (e) => {
    const id = parseInt(e.currentTarget.dataset.id)
    if (!id) {
      return
    }

    let arr = [...filterIds];
    if (!arr.includes(id)) {
      arr.push(id);
    }
    else {
      arr = arr.filter(x => x !== id);
    }
    setFilterIds(arr)
  }

  return (
    <div className="container mx-auto">
      <header className="bg-gray-200 pl-2 h-32 border-blue-400 border-b-2">
        <img alt='tmdb logo' src='tmdb_logo.png' />

      </header>
      <div className="min-h-screen bg-gray-100">
        Main

      <div className="flex flex-wrap">
          <div className="bg-gray-200 px-4 w-full lg:w-1/6">
            Filter
            <div>
              {genres && genres.map((g) => <div
                data-id={g.id}
                className={getGenreClass(g.id)}
                onClick={setFilter}
              >{g.name}</div>)
              }
            </div>
          </div>

          <div className="px-4 w-full lg:w-5/6">
            <div className="grid grid-cols-3 gap-4">
              {
                movies && movies.map((d) =>
                  <Movie
                    key={d.id}
                    d={d}
                    randomInt={getRandomInt(bgColours.length)}
                  />
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
