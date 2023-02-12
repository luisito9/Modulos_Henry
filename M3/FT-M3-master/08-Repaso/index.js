   
   //  AQUI EMPIEZA TODO.......

// Imports de herramientas
const express = require("express");
const morgan = require("morgan");
const { promisifiedGetCharacters, GetCharacters } = require("./controllers/getControllers");
const { createCharacter } = require("./controllers/postControllers");
const { updateCharacter, deleteCharacter } = require("./controllers/putControllers");

const app = express();//creo la instancia de express "app"

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// Read
app.get("/characters", GetCharacters);
// Create
app.post("/characters", createCharacter);
// Update
app.put("/characters/edit/:Id", updateCharacter);
// Delete
app.delete("/characters/:Id", deleteCharacter);

app.listen(3000, console.log("Corriendo en puerto 3000...!"));// Se puso a escuchar el servidor en pto 3000
