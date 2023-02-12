
import { INCREMENT, DECREMENT } from "../actions/index.js";

const initialState = { count: 0, otraCosa: "algo", }; //aqui inicializa el estado, recibido de store

// Nuestro reducer que maneja nuestros dos casos de acción incremento y decremento.
// Recibe el estado de nuestro store, junto con una action creada por nuestro action
// creator ¿Qué tiene que hacer el reducer con el contador de cada caso?

export default (state = initialState, action) => {//recibe el "state" y una accion
 
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,   //aqui guarda una copia del "state" primero
        count: state.count + action.payload,
      };
    case DECREMENT:
      return {
        ...state,  //aqui guarda una copia del "state" primero
        count: state.count - action.payload,
      };
    default:
      return state;
  }
};
