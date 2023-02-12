export const GET_MOVIES = "GET_MOVIES"
export const GET_DETAIL = "GET_DETAIL"
export const ADD_MOVIE_FAVORITE = "ADD_MOVIE_FAVORITE"
export const REMOVE_MOVIE_FAVORITE = "REMOVE_MOVIE_FAVORITE"

export function getMovies(titulo) {
  return function (dispatch) {
    return fetch("http://www.omdbapi.com/?apikey=283c32e7&s=" + titulo)
      .then((response) => response.json())
      .then((json) => dispatch({ type: GET_MOVIES, payload: json
       
    })) 
  }
} 

export function getDetail(movieId) {
  return function (dispatch) {
    return fetch(`http://www.omdbapi.com/?apikey=283c32e7&i=${movieId}`)
      .then((respuesta) => respuesta.json())
      .then((respJson) => dispatch({ type: GET_DETAIL, payload: respJson }))
  }
}

export function addMovieFavorite(payload) {
  return { type: ADD_MOVIE_FAVORITE, payload }
}

export function removeMovieFavorite(movie) {
  // payload sera el id de la pelicula a eliminar
  return { type: REMOVE_MOVIE_FAVORITE, payload: movie }
}




// .env --> variables de entorno 
