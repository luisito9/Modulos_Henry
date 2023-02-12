const { idGenerator, validatePost } = require("../utils/index.js");
const db = require("../db.js");
const generatorObj = idGenerator(10);

const createCharacter = (req, res) => {
  //recepción de información por body de request
  const { personaje } = req.body; //"personaje" es lo que va en el body 
  personaje.id = generatorObj.next().value;

  // validaciones
  const error = validatePost(personaje);
  if (error) return res.status(400).json({ msg: "Missing data or length" });

  // creación de nuevo personaje
  db.push(personaje);
  //db = [...db, personaje]//Este spread operator guarda la db + personaje

  // respuesta
  return res.json({ msg: "Se creó un nuevo objeto", data: personaje });
};

module.exports = {
  createCharacter,
};
