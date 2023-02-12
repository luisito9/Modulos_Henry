import React, { useState } from "react";

// necesita export si es utilizado en otro lado (en este caso el test)
export function validate(e) {
        // crea un obj de errores para retornarlo al final
        let errors = {};

    // validaciones para username
        if (!e.username) 
          {
           errors.username = "Username es requerido";
          } 
        else if (!/\S+@\S+\.\S+/.test(e.username)) { //debe ser un email con su @ y su punto(.)
           errors.username = "Username es invalido";
          }

    // validaciones para password
        if (!e.password) 
          {
            errors.password = "Password es requerido";
          } 
        else if (!/(?=.*[0-9])/.test(e.password)) //debe tener por lo menos 1 numero
          {
            errors.password = "Password es invalido";
          }

        return errors;
}

export default function Form() {

  const [user, setUser] = React.useState ({// aqui tres estados anidados, pero separados 
  username: "", 
  password: "",
  mail: "" })

  const [errores, setErrores] = useState({})  // estado para manejo de errores

  const handleInputChange = function (evento) {
    //Recuerden que setUsername y setPassword reciben un string que usará 
    //para actualizar el estado. Y que onChange ejecuta una función (handleInputChange) 
    //pasándole un evento como argumento, por lo tanto, tenemos que pasarle una función 
    //nueva que reciba un evento e invoque a setUsername con el valor del 
    //input, que esta en evento.target.value.
    // Modificar el estado: "como lo hago si es un obj?"
    // spread operator: ... --> "toma todo lo que haya dentro de"
    // setUser((estadoAnt) => {});
    setUser({ ...user, [evento.target.name]: evento.target.value })

    //Validacion de errores
    setErrores(validate({ ...user, [evento.target.name]: evento.target.value }))
  }

  return (
    <form onSubmit={handleInputChange}>
      
        <h2>Formularios</h2>
        <hr/>
        <div>
          <label><spam>Username : </spam></label>
          <input type="text" name="username" value={user.username} 
           onChange={handleInputChange} className={errores.username && "danger"} /> 
          {errores.username}
        </div> 

        <div>
          <label><spam>Password : </spam></label>
          <input type="password" name="password" value={user.password}
           onChange={handleInputChange} className={errores.password && "danger"}/>
          {errores.password}
        </div>
        
        <div>
          <label><spam>Submit : </spam></label>
          <input type="submit" name="mail" value={user.submit}
           onChange={handleInputChange} className={errores.submit && "danger"}/>
        </div>

    </form>
  );
};
