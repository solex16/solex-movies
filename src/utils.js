import { months } from './months'

export const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max))
}

export const compare = (a, b) => {
  if (a.popularity > b.popularity) {
    return -1;
  }
  if (a.popularity < b.popularity) {
    return 1;
  }
  return 0;
}

export const isSubsetArr = (arr1, arr2) => {
  return arr2.every(val => arr1.includes(val))
}

export const getYear = (d) => {
  const dates = d.split('-')
  return months[parseInt(dates[1])] + ' ' + dates[0]
}