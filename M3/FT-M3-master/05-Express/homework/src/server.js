const bodyParser = require("body-parser");
const express = require("express");//importo express
const server = express();//"server es la aplicacion de "express()"
const STATUS_USER_ERROR = 422;
server.use(express.json());

let posts = [
  //{ "author":"Luis", "title": "Express", "contents":"Backend"},
  //{ author:"Carlos", title: "Logistica", contents:"Almacen", Id: 1},
  //{ author:"Felipe", title: "balu", contents:"inventario", Id: 2}
];
let postId = 0;

// Rutas:

server.post("/posts", (req, res) => {
  const { author, title, contents } = req.body;//aqui digo que debe llevar el body en "postman"

  if (!author || !title || !contents ) {
    res.status(STATUS_USER_ERROR).json({
      error: "No se recibieron los parámetros necesarios para crear el Post",
    });
  } 
  else {
    const newPost = { author, title, contents, id: postId };//construyo el nuevo objeto con el body y el "id"
    posts.push(newPost); //pusheo "newPost" en "posts"
    postId++;
    res.json(posts); //despliego el nuevo "newPost" creado
  }
});



//aqui enviamos el author por url (params) y un json con title y contents
//y arma un objeto con las tres propiedades
server.post("/posts/:author", (req, res) => {
  const { author } = req.params; //tomo el author del usuario con "req.params"
  const { title, contents } = req.body;//tomo "title" y "contents" desde el body

  if (!author || !title || !contents) { //valido si no existen...
    res.status(STATUS_USER_ERROR).json({
      error: "No se recibieron los parámetros necesarios para crear el Post",
    });
  } else {
    const newPost = { author, title, contents, id: postId };
    posts.push(newPost);

    postId++;
    res.send(posts);
  }
});


server.get("/posts", (req, res) => {
  // localhost:3000/posts?term=balu
  const { term } = req.query; //el query empieza con el "?"

  if (term) {
    let postsContainingTerm=[]
    postsContainingTerm = posts.filter((p) => p.title.includes(term) || p.author.includes(term));
    res.json(postsContainingTerm);//imprimo el objeto encontrado por pantalla
  } else {
    res.json(posts);
  }
});



server.get("/posts/:author", (req, res) => {
  const author = req.params.author

  const postsByAuthor = posts.filter((p) => p.author === author);

  if (postsByAuthor.length > 0)
     res.json(postsByAuthor);
  else
     res.status(STATUS_USER_ERROR)
        .json({ error: "No existe ningun post del autor indicado" });
});



server.get("/posts/:author/:title", (req, res) => {//author y title son params que pone el cliente
  let author =  req.params.author
  let title =  req.params.title
  
  const postsByAuthorAndTitle = posts.filter((p) =>
  p.author === author && p.title === title);

  if ((postsByAuthorAndTitle.length)!= 0) //Si existe un post que coincida con la busqueda
  res.json(postsByAuthorAndTitle);
  else
    res.status(STATUS_USER_ERROR).json({
      error: "No existe ningun post con dicho titulo y autor indicado",
    });
});

server.put("/posts", (req, res) => {
  let { id, title, contents, jj } = req.body; //en el body pongo el "id"

  if (!id || !title || !contents) {
    res.status(STATUS_USER_ERROR).json({
      error:
        "No se recibieron los parámetros necesarios para modificar el Post",
    });
  } else {
    let onePost = posts.find((p) => p.id === id);

    if (onePost) {
      onePost.title = title;
      onePost.contents = contents;

      res.json(onePost);
    } else {
      res.status(STATUS_USER_ERROR).json({
        error: "No existe ningun Post con el id indicado",
      });
    }
  }
});

server.delete("/posts", (req, res) => {
  if (!req.body.id)
    res.status(STATUS_USER_ERROR).json({ error: "No se recibió un ID" });
  else {
    const onePost = posts.find((p) => p.id === req.body.id); //para encontrar el objeto segun el "id"
    if (onePost) {
      posts = posts.filter((p) => p.id !== req.body.id);//filtro a todos menos el objeto a borrar

      res.json( posts );//despliega el objeto sin el objeto borrado
    } else {
      res
        .status(STATUS_USER_ERROR)
        .json({ error: "Ningun Post coincide con el ID provisto para delete" });
    }
  }
});

server.delete("/author", (req, res) => {
  
  if (!req.body.author) {
    res.status(STATUS_USER_ERROR).json({ error: "No se recibió un autor" });
  }
  const postsToBeDeleted = posts.filter((p) => p.author === req.body.author);
  if (!postsToBeDeleted.length) {
    res
      .status(STATUS_USER_ERROR)
      .json({ error: "No existe el autor indicado" });
  } else {
    posts = posts.filter((p) => p.author !== req.body.author);
    res.json(postsToBeDeleted);
  }
});

module.exports = { posts, server };