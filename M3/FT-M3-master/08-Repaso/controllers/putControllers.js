const db = require("../db.js");

const updateCharacter = (req, res) => {
  // recepción de characterId por params
  const { Id } = req.params; // esto es un string, cuidado hay que usarlo como numero despues

  // recepción de información por body de request
  // Otra manera const {name, species} = req.body
  const { personaje } = req.body;
  // validaciones
  if (!Id || !Object.keys(personaje).length)//Object.keys valida si personaje tiene o no propiedades ?
    return res.status(400).json({ msg: "Debe ingresar un Id válido" });
  // busqueda
  let busquedaPersonaje = db.find((pj) => (pj.id) == (Id));//busco el Id introducido
  if (!busquedaPersonaje) //ahora valido si se encontró algo en la "Db"
    return res.status(404).json({ err: "Objeto no encontrado" });
  // edición y modificacion de personaje
  busquedaPersonaje.species = personaje.species;
  busquedaPersonaje.name = personaje.name;

  // busquedaPersonaje = {...personaje} // si no genero un obj nuevo, rompe por la ref de memoria
  // respuesta
  res.json({ msg: "Se modificó el objeto en la BD", data: busquedaPersonaje });
};

const deleteCharacter = (req, res) => {
  // recepción de Id por params
  const { Id } = req.params;//es un numero y lo ingresó el usuario
  // validaciones
  const characterToDelete = db.find((char) => char.id == (Id));

  if (!characterToDelete)
    return res.status(404).json({ error: "Datos no encontrados en la Db" });
  // eliminación de personaje
  db.splice(db.indexOf(characterToDelete), 1);//tambien con "filter" se borra
  // respuesta
  res.json({ msg: "Se borró el objeto", data: Id });
};

module.exports = {
  updateCharacter,
  deleteCharacter,
};
