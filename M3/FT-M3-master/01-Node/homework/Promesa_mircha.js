
function cuadradoPromise(value) { //recibo el valor
  
    if (typeof value !== "number" || value === 0) {
      return Promise.reject (`Error, el valor debe ser un numero,  y mayor que cero` );
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {// setTimeout es una funcion
        resolve({ // resolve es un objeto de Promise 
          value: value,
          result: (value * value),
          texto: "El valor es : "
        });
      }, 1000);
    });
  }
  
    cuadradoPromise(1)

    .then((obj) => {
      console.log(`Ejecutando Promises: ${obj.value}, ${obj.result}`);
      return cuadradoPromise(2);
    })
    .then((obj) => {
      console.log(`Ejecutando Promises: ${obj.value}, ${obj.result}`);
      return cuadradoPromise(3);
    })
    .then((obj) => {
      console.log(`Ejecutando Promises: ${obj.value}, ${obj.result}`);
      return cuadradoPromise(4);
    })
    .then((obj) => {
      console.log(`Ejecutando Promises: ${obj.value}, ${obj.result}`);
      return cuadradoPromise(5);
    })
    .then((obj) => {
      console.log(`Ejecutando Promises: ${obj.value}, ${obj.result}`);
      return cuadradoPromise(6);
    })
    .then((obj) => {
      console.log(`Ejecutando Promises: ${obj.value}, ${obj.result}`);
      console.log("Fin Promises");
    })
    .catch((err) => console.error(err));