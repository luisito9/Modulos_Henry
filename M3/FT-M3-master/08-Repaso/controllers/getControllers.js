const axios = require("axios") //importo "axios" para hacer los pedidos a la API
const db = require("../db.js")


  // ESTA ES LA FORMA CON ASYNC / AWAIT...
  //data es una propiedad de "axios", "result" es parte de la api, debo ver como vienen los datos desde la Api
  
 async function GetCharacters(req, res) { //const GetCharacters = async (req, res) => { 
  try {
    const All = await axios.get("https://rickandmortyapi.com/api/character");
    let format = All.data.results.map((char) => ({ 
      id: char.id,
      name: char.name,
      species: char.species,
      gender: char.gender,
      status: char.status
    }))
    res.json({ characters: [...db, ...format] })//genero una respuesta con la concatenacion de "db" y "format", en "characters"
  } catch (error) {
    res.status(400).json({ err: error })
    console.error(error)
  }
}

// ESTA ES OTRA FORMA PERO CON PROMESAS....

const promisifiedGetCharacters = (req, res) => {
  let APIcharacters
  axios.get("https://rickandmortyapi.com/api/character").then((response) => {
      APIcharacters = response.data.results.map((char) => ({//"APIcharacters" guarda lo que mapeamos en la APi (id, name, species)
        id: char.id,
        name: char.name,
        species: char.species,
      }));

      res.json({ characters: [...db, ...APIcharacters] });//ahora con spread operator concatenamos lo que hay en db y Apicharacters
    }, (reason) => {
      res.status(500).json({ error: reason })
    }
  )
}

module.exports = {
  GetCharacters,
  promisifiedGetCharacters
 
}
