
var http = require('http');
var fs   = require('fs'); //Importamos el módulo fs que nos permite leer y escribir archivos del file system

http.createServer( function(req, res){ 
	
 res.writeHead(200, { 'Content-Type':'text/html' })
 var html = fs.readFileSync('./html/template.html', 'utf8'); //Codificamos el buffer para que sea una String
 var nombre = 'Soy Luis A. Viña G.'; //Esta es la variable con la que vamos a reemplazar el template
 html = html.replace('{name}', nombre); // Usamos el método replace es del objeto String
 res.end(html);


}).listen(1337, '127.0.0.1');