
import React, { Component } from "react";
import { connect } from "react-redux";//conecta un componente de React con la tienda Redux.
import { increment, decrement } from "../actions/index.js"; //importa las funciones (acciones)

class Counter extends Component {
  
  incrementImpar = () => {
    //Implementar una función de incremento que sólo aumenta si el valor del contador es impar
    if (this.props.count % 2 === 1) this.props.increment(1);
  }

  decrementa_Par = () => {
    //Implementar una función de incremento que sólo aumenta si el valor del contador es impar
    if (this.props.count % 2 === 0) this.props.decrement(1);
  }
 
  incrementAsync = () => {
    //  Implementar una función de incremento que aumenta después de esperar un segundo
    //  REDUX THUNK
    setTimeout(()=>{
        this.props.increment(1)
    }, 1000)
  }

  render() {
   
    // Al hacer clic en estos botones, el recuento debe disminuir o aumentar en consecuencia
    return (
      <div>
        <p>Clickeado: {this.props.count} veces</p>
        <button onClick = { () =>  this.props.increment() }> + </button>

        <button onClick={ () => this.props.decrement() } > - </button>

      
        <button onClick = {this.incrementImpar}> incrementa si es impar </button>
        <button onClick = {this.decrementa_Par}> decrementa si es par </button>
        <button onClick = {this.incrementAsync}> Incrementa despues de un segundos </button>
      </div>
    )
  }
}

// La función mapStateToProps especifica qué porción del árbol de estados necesita recibir 
//este componente.
// En este caso, dado que nuestro store de redux sólo almacena el valor del contador,
// este componente recibe el estado completo.
// Sin embargo, en una aplicación redux más compleja,
// recibiría sólo las partes relevantes que necesita del objeto de estado.

const mapStateToProps = (state) => {
  return {
    count: state.count,
  };
};

// Se llama a la función de connect para que este componente conozca el resto de la arquitectura
// de redux.
// Sin esto, este componente es sólo un componente tonto de React.
//Pasamos todas las funciones que dependen de Redux, junto con el propio componente,
// para que Redux se dé a conocer a este componente.
export default connect(mapStateToProps, { increment, decrement })(Counter);
