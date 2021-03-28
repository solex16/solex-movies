import { genres } from './genres'
import { bgColours } from './bgColours';

const BASE_URL = `https://image.tmdb.org/t/p/w200/`

const getGenres = (ids) => {
  return genres
    .filter((g) => { return ids.includes(g.id) })
    .map(x => x.name)
    .join(', ')
}

const Movie = ({ d, randomInt }) => {

  const lightness = 200;

  const getBackGround = ({ randomInt, lightness }) => {
    return `bg-${bgColours[randomInt]}-${lightness}`
  }

  const headerClass = `flex min-w-full max-w-max justify-center border rounded-2xl rounded-b-none text-gray-600 ${getBackGround(
    { randomInt, lightness }
  )} pt-2 min-h-full h-12`

  return (
    <div className="w-full justify-items-center">
      <div
        className="w-64 m-4 border rounded-2xl border-gray-300 shadow-lg"
      >
        <div className={headerClass}>
          <span className="font-sans text-xl">
            {d.title}
          </span>
        </div>
        <div className="h-28 w-64 grid grid-cols-10 grid-rows-4 bg-gray-100">
          <div className="border border-gray-100 col-span-3 row-span-2 m-auto">
            <img
              // className="h-12 w-12 rounded-full"
              src={BASE_URL + d.poster_path}
              alt=""
            />
          </div>

          <div className="border border-gray-100 col-span-7 row-span-1 mt-2 px-2">

            <span className="inline-block align-text-top mx-1">
              {d.release_date}
            </span>
          </div>
          <div className="border border-gray-100 col-span-7 row-span-1 mt-2 px-2">
            {getGenres(d.genre_ids)}
          </div>
        </div>
      </div>
    </div>

  );
}

export default Movie;