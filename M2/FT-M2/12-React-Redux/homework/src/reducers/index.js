import { GET_MOVIES, GET_DETAIL, ADD_MOVIE_FAVORITE, REMOVE_MOVIE_FAVORITE } from "../actions/index";

const initialState = { // estado inicial.
  search: [],
  detail: {},
  favorites: [],
};

export default function reducer(state = initialState, action) {
  //un reducer es simplemente una funcion que recibe 2 parametros: state y action.
  // con if tambien funciona

  switch (action.type) {
    // action.type === valor del case

    case GET_MOVIES:
      return {
        ...state,
        search: action.payload.Search, // [{...},{...}]
      };

    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
        };
  
    case ADD_MOVIE_FAVORITE:
      return {
        ...state, //hago una copia de todo el estado (state = initialState)
        favorites: Array.from(new Set([...state.favorites, action.payload])), //A favorites le anexo al final lo que viene en payload
        // set 
      };

    case REMOVE_MOVIE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter((pelicula) => pelicula.imdbID !== action.payload
        ),
      };
   
    default:
      return { ...state };
  }
}

// reducer(initialState, {type: "GET_DETAIL", payload: json})

// como definir que estados necesito:
// guardar los favoritos
// guardar la busqueda --> 10 peliculas
// guardar el detalle de una pelicula!
