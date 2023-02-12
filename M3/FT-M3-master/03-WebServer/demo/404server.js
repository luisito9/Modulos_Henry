
var servidor = require('http');
var fs = require('fs'); //Para llamar archivos y leerlos y escribirlos (html)

servidor.createServer( function(req, res){ //aqui creo el servidor
	if( req.url === '/'){
		res.writeHead(200, { 'Content-Type':'text/html' })//para leer archivos html
		var html = fs.readFileSync('./html/template.html');
		res.end(html);

	}else if(req.url === '/api'){ 
		res.writeHead(200, { 'Content-Type':'application/json' })
		var obj = {
			nombre: 'Juan',
			apellido: 'Perez'
		};	
		res.end( JSON.stringify(obj) );

	} else{
		res.writeHead(404); //Ponemos el status del response a 404: Not Found
		res.end(); //No devolvemos nada más que el estado.
	}
	
}).listen(1337, '127.0.0.1'); //especifica en que puerto y en qué dirección va a estar escuchando nuestro servidor