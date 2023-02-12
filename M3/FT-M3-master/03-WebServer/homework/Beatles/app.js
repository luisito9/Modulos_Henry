var http = require("http");
const { home, perfil, api, artista } = require("./controlador");//Aqui importa las funciones desde controlador.js

const rutas = {//Esto es un arreglo de rutas
  "/": home,
  "/api": api,
  "/api/": api,
};

http.createServer(function (req, res) {  //aqui creo el servidor
    // req.url -----> "/"

    if (rutas[req.url]) { // "req.url" es la ruta url. entonces si dentro del arreglo de rutas esta alguna que coincida con esta..
      // si rutas["/"]
      // "req.url" es el tipo de ruta que puso el usuario en la url
      rutas[req.url](req, res);//de coincidir entonces invocar "rutas[req.url]" y pasale la (req, res)
    } else {
      if (req.url.substring(0, 5) === "/api/") {
        artista(req, res);
      } else {
        if (req.url.includes("20")) {
          perfil(req, res);
        } else {  //debo configurar 2 cosas "res.writeHead" y "res.end"
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("No encontramos la ruta solicitada");
        }
      }
    }
  })
  .listen(3000, console.log("Corriendo en PORT:3000"));