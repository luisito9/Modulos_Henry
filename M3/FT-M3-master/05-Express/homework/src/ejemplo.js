const express = require("express"); //vamos a requerir 'express'.
const server = express();// para inicializar una nueva applicación, `server` y guardar en ella la ejecución de express.
server.use(express.json());


//Creando rutas

server.get("/", function (req, res) { //El método GET es el que hace el broswer por defecto cuando escribimos algo en la barra de direcciones_):
   
var object={
    nombre:"Carlos",
    apellido:"Viña",
    edad:"51",
    framework: "express",
    ventaja: "serializó por nosotros",
}
    res.json(object) //para enviar Json como respuesta.
    
  });

  server.get("/:id", function (req, res) {// params tomara como valor lo que esta despues de los dos puntos (:)
   
    res.json({ parametro: req.params.id });//esa ruta devolvera un objeto json con la propiedad `parametro` y cuyo valor es el contenido de `id`. 
    res.send("El valor es : ")
  });

  server.get("/ruidos/:animal",function(req, res){
    var ruidos = {
      perro:"wauf",
      gato: "meow",
      vaca: "muuu"
    }
    var animal = req.params.animal
    var ruido = ruidos[animal]
   
    if(ruido !== undefined) {
       return res.send(`El ${animal} hizo ${ruido}`)
    }
    else{
       return res.send(`El ${animal} no esta en la lista de animales !`)
    }
  })

server.listen(3001), console.log("Corriendo ejemplo en PORT: 3001");
