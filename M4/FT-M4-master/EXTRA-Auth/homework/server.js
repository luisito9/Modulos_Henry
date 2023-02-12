const express = require('express');
const morgan = require('morgan');
const cookieparser = require('cookie-parser');//Importar el middleware

const app = express();

// La idea es que una vez logueado un usuario, este no tenga acceso a la ruta de registro,
// ni a la ruta de login, usando "isAuthenticated" e "isNotAuthenticated"

const users = [
  {id: 1, name: 'Franco', email: 'Franco@mail.com', password: '1234'},
  {id: 2, name: 'Toni', email: 'Toni@mail.com', password: '1234'},
  {id: 3, name: 'Luis', email: 'Luis@mail.com', password: '1234'}
]

let prevId = 3

app.use(morgan('dev'));
app.use(cookieparser());//Aplicar el middleware a todos los request
app.use(express.urlencoded({ extended: true }));//Para poder parsear la información recibida(para formularios Html)

//Middleware que será ejecutado previo a cada request recibido por el servidor,
//`next()` para que avance al request correspondiente y no se quede tildado en el middleware.
app.use((req, res, next) => {
  console.log("cookies:", req.cookies);
  next();
});

const isAuthenticated = (req, res, next) => {
  // Si hay un usuario logueado redirigir a /home de lo contrario llamar a next()
  if(req.cookies.userId){
    res.redirect("/home")
  } else {
    next()
  }
}

const isNotAuthenticated = (req, res, next) => {
  // Si NO hay un usuario logueado redirigir a /login de lo contrario llamar a next()
  if(!req.cookies.userId){
    res.redirect("/login")
  } else {
    next()
  }}

app.get('/', (req, res) => {//muestre los botones de 'Ingresar' y 'Registrarse' en el
  // caso de que no esté logueado o un botón de 'Salir' caso contrario
  res.send(`
    <h1>Bienvenidos a Henry!</h1>
    ${req.cookies.userId ? `
      <a href='/home'>Perfil</a>
      <form method='post' action='/logout'>
        <button>Salir</button>
      </form>
      ` : `
      <a href='/login'>- Ingresar -</a>
      <a href='/register'>- Registrarse -</a>
      `}
  `)
});

app.get('/login', isAuthenticated,(req, res) => {
  res.send(`
    <h2>Iniciar sesión</h2>
    <form method='post' action='/login'>
      <input type='email' name='email' placeholder='Email'  />
      <input type='password' name='password' placeholder='Contraseña'  />
      <input type='submit' value='Ingresar' />
    </form>
    <a href='/register'>Aqui Registrarse</a>
  `)
});
//Implementemos el POST para procesar los datos enviados por el formulario de login
// que recién definimos.

app.post('/login', isAuthenticated,(req, res) => {
  // 1) Obtener el email y password desde el body del request
  const { email, password } = req.body
  // 2) Verificar que ambos datos hayan sido provistos
  if ( email && password) { 
  // Si ambos datos fueron provistos:
  //   a) Obtener del listado de usuarios (si existe) el que tenga dicho email y contraseña
    const usuario = users.find((user) => user.email === email && user.password === password);
    if (usuario) { 

  //   b) Aqui se guardan los datos del usuario en la cookie: res.cookie('userId', usuario.id) 
      res.cookie("userId", usuario.id);//el primer parámetro es el nombre de la cookie y el segundo su valor

      //   c) Redirigir a /home
    return res.redirect("/home");//existe en la base de datos entonces le da entrada("/home")
    } 
    }else {
    res.send("Faltan datos") }
  // En el caso de que no exista un usuario con esos datos o directamente no se hayan provisto o
  // el email o la password, redirigir a /login
  return res.redirect("/login")
});


app.get('/register', isAuthenticated,(req, res) => {//formulario para completar
  // nombre, mail y contraseña
  res.send(`
    <h1>Registrarse</h1>
    <form method='post' action='/register'>
      <input name='name' placeholder='Nombre' />
      <input type='email' name='email' placeholder='Email' />
      <input type='password' name='password' placeholder='Contraseña' />
      <input type='submit' value='Registrarse' />
    </form>
    <a href='/login'>Iniciar sesión</a>
  `)
});

app.post('/register', isAuthenticated,(req, res) => {//post de /register para poder crear nuevos usuarios:
  // 1) Obtener el name, email y password desde el body del request
        const { name, email, password } = req.body
  // 2) Verificar que los tres datos hayan sido provistos
        if(name && email && password) {
    // Si todos los datos fueron provistos:
    //   a) Buscar dentro del listado de usuarios si existe alguno que tenga dicho email para evitar
    //      que existan dos usuarios con mismo mail
         const user = users.find( (user) => user.email === email );
         if(!user) { 
    //   b) Crear un nuevo objeto con los datos del usuario y pushearlo al array de users
         users.push({id: ++prevId, name, email, password })
         console.log(users)
    //   c) Redirigir a la pantalla inicial '/'
        
         return res.redirect("/");
  } 
}
  // En el caso de que ya exista un usuario con ese email o no se hayan provisto o
  // el name o el email o la password, redirigir a /register
  return res.redirect("/register");
});


app.get('/home', isNotAuthenticated, (req, res) => {//Para usuarios logueados pantalla de 'Home'
  //                                                que muestre su nombre y email
  const user = users.find((user) => user.id === parseInt(req.cookies.userId));

  user ? res.send(` 
      <h1>Bienvenido ${user.name} !</h1>
      <h4>Hola ${user.name}, tu Email es ${user.email}</h4>
      <a href='/'>Inicio</a>
    `)
    : res.redirect("/")
  });


app.post('/logout', (req, res) => { //desloguearnos, para ello es necesario borrar la cookie 
  //                                  donde tenemos actualmente guardada la información del usuario
  res.clearCookie('userId');//borramos 
  console.log(users)
  res.redirect('/');
});


app.listen(3001, (err) => {
  if(err) {
   console.log(err);
 } else {
   console.log('Listening on localhost:3001');
 }
});
