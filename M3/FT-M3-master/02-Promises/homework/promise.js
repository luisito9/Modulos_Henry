
let desarrollo = new Promise (function(resolve, reject) {
 
  setTimeout(() => {
    const promesa = "Aqui esta tu promesa !";
    const error = "Error promesa no cumplida !";
    let aleatorio = Math.random()
    if (aleatorio > 0.5) {
       resolve (promesa)
    } else {
       reject(error)
    }
    
  },1200)
})

desarrollo //llamo a la promesa
  .then((promesa) => console.log(promesa)) 
  .catch((Error) => console.log(Error))
  .finally();