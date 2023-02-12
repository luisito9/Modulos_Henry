var fs = require("fs");
var http = require("http"); //importo http para crear el servidor

http    //aqui creo el servidor
.createServer(function (req, res) { //ve los parentesis, esto abarca todo, hasta el .listen
   
    if (req.url === "/") {//debo configurar 2 cosas "res.writeHead" y "res.end"
      res.writeHead(201, { "Content-Type": "application/json" }); //configuro el "writeHead" para una respuesta tipo "Json"
      const obj = {  // Esto es un arreglo
        mensaje: "Intenta buscar los siguientes nombres de doges :)",
        names: ["arcoiris", "badboy", "code", "resaca", "retrato", "sexy"],
      };
      res.end(JSON.stringify(obj)); //Esto pasa el archivo a Json y lo imprime, el arreglo
    }
      
    else { //sino vamos a leer la imagenes con "fs.readFile"
      fs.readFile(`./images${req.url}_doge.jpg`, (err, lecturaImg) => {//Busco en images la imagen del perro que corresponda
        // "req.url" es el tipo de perrito que puso el usuario en la url
        // "fs" para la leer el archivo images
        if (err) {
          res.end(`${req.url}, no se encontró en los perritos buscados !!`);
        } else {
          res.writeHead(200);
          res.end(lecturaImg);
        }
      });
    }
  })
  .listen(3000, console.log("Running on PORT 3000"));








