var primerMetodo = function() {
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('Terminó el primer método');
         resolve({ }); //pasamos unos datos para ver como los manejamos
      }, 1000); // para simular algo asincronico hacemos un setTimeOut de 2 s
   });
   return promise;
};
   

var segundoMetodo = function(datos) {
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('Terminó el segundo método');
         resolve({nuevosDatos: datos.num });
      }, 3000);
   });
   return promise;
};
 
var tercerMetodo = function(datos) {
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('Terminó el tercer método');
         console.log(datos.nuevosDatos); //imprimos los datos concatenados
         resolve('hola');
      }, 1000);
   });
   return promise;
};
 
primerMetodo()
   .then(segundoMetodo)
   .then(tercerMetodo)
   
