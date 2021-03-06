import { genres } from './genres'
import { bgColours } from './bgColours';
import { getYear, truncate } from './utils';
import { IMG_BASE_URL } from './config';

/**
 * filters the list of genres by ids
 * and returns their names
 */
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
            {truncate({ text: d.title, max: 25 })}
          </span>
        </div>
        <div className="h-34 w-64 grid grid-cols-8 grid-rows-5 bg-gray-100">
          <div className="col-span-3 row-span-5 m-auto">
            <img
              src={IMG_BASE_URL + d.poster_path}
              alt=""
            />
          </div>
          <div className="col-span-5 row-span-3 mt-1 px-2">
            {getGenres(d.genre_ids)}
          </div>
          <div className="text-green-600 col-span-5 row-span-1 text-sm px-2">
            {getYear(d.release_date)}
          </div>
          <div className="col-span-5 row-span-1 px-2">
            <span className="inline-flex items-center justify-center px-2 py-1 text-xs leading-none text-yellow-100 bg-yellow-400 rounded-full">
              {d.vote_average}
            </span>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Movie;