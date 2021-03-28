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
  const [rating, setRating] = useState(0);
  const [filterIds, setFilterIds] = useState([]);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setStatus('fetching');
      const response = await fetch(query)
      let { results } = await response.json()
      setData(results)
      setMovies(results)
      // console.log('fetchData', results)
      setStatus('fetched')
    }

    fetchData()
  }, [query])

  /**
   * manages the effect of updating either of the filters 
   */
  useEffect(() => {

    const filterMovies = () => {
      /** make copy of full data set from api */
      let m = [...data]

      /** filter by genre */
      if (filterIds.length) {
        m = m.filter((r => {
          return isSubsetArr(r.genre_ids, filterIds)
        }))
      }

      /** filter by rating */
      if (rating) {
        m = m.filter(r => r.vote_average >= rating)
      }

      /** sort by popularity */
      m.sort(compare)

      setMovies(m)
    }
    filterMovies()

  }, [filterIds, data, rating])


  const resetFilters = () => {
    setFilterIds([])
    setRating(0)
  }

  const getGenreClass = (id) => {
    const bg = filterIds.includes(id) ? 'bg-blue-200' : 'bg-white'
    return "inline-flex cursor-pointer text-xs p-1 m-1 border border-blue-400 rounded-2xl " + bg;
  }

  const updateSlider = (e) => {
    setRating(e.currentTarget.value)
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
      <header className="bg-gray-200 pl-4 h-32 border-blue-400 border-b-2">
        <img alt='tmdb logo' src='tmdb_logo.png' />
      </header>

      <div className="flex flex-wrap">
        <div className="bg-gray-200 w-full lg:w-1/6">
          <div className="border border-gray-800">

            <div className="bg-gray-600 px-6 pb-1 text-white">Filter by Genre</div>
            <div className="px-2 pt-2">
              {genres && genres.map((g) => <div
                key={g.id}
                data-id={g.id}
                className={getGenreClass(g.id)}
                onClick={setFilter}
              >{g.name}</div>)
              }
            </div>

            <div className="mt-4 bg-gray-600 px-6 pb-1 text-white">Filter by Rating</div>
            <div className="px-1 my-4">
              <label className="text-sm" htmlFor="fader">Minimum Rating:</label>
              <input type="range" min="0" max="10" value={rating} id="fader"
                step="1" onChange={updateSlider} />
              <output className="mx-1 text-blue-700" htmlFor="fader">{rating}</output>
            </div>

            <div className="border-0 border-t-4 border-white w-full mt-4 mb-4 pt-4">
              <button
                onClick={resetFilters}
                className="ml-7 mt-1 bg-red-500 hover:bg-red-700 text-white text-sm py-1 px-4 rounded shadow">
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-5/6">
          <div className="min-h-screen border-0 border-r pt-2">
            <span className="ml-4 text-2xl">Movies Playing Now..</span>
            {
              status === 'fetched' &&
              <div className="grid grid-cols-3 gap-4 mr-4">
                {
                  movies.length ? movies.map((d) =>
                    <Movie
                      key={d.id}
                      d={d}
                      randomInt={getRandomInt(bgColours.length)}
                    />
                  )
                    :
                    <div className="m-10 w-64 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                      <span className="block sm:inline">No Movies matched the Filter</span>
                    </div>
                }
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
