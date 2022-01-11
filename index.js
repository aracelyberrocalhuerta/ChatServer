/* Cargar modulo nativo http y guardar en constante */
// const http = require('http');

/* Guardar json en una variable para poder acceder a el. */
let messages = require('./messages.json');
const express = require("express");
const {response} = require("express");

/* Crear la app */
const app = express();

app.use(express.json());

/* RUTAS */
/* Versión resumida utilizando Express */
app.get('/',(request,response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/messages',(request, response) => {
    response.json(messages)
})

/* PATH que nos devuelve un solo recurso */
app.get('/api/messages/:id',(request,response) => {
    const id = Number(request.params.id)
    const message = messages.find(message => message.id === id)

    /* Si no encuentra el mensaje con la id */
    if (message){
        response.json(message)
    } else {
        response.status(404).end()
    }
})

/* Eliminar un recurso  */
app.delete('/api/messages/:id',(request,response) => {
    const id = Number(request.params.id)
    messages = messages.filter(message => message.id !== id)
    response.status(204).end()

})

/* Crear un recurso */
app.post('/api/messages',(request,response) => {
    const message = request.body

    if (!message || !message.message){
        return response.status(400).json({error:'message is missing'})
    }

    const ids = messages.map(message => message.id)
    const maxID = Math.max(...ids)

    const newMessage= {
        id: maxID + 1,
        message: message.message
    }
    messages = [...messages,newMessage]
    response.json(message)

})

/* Versión sin utilizar Express */
/* Crear un servidor y guardar en constante, pasamos por parámetro un callback
const app = http.createServer((request, response) => {
    /* Cada vez que el servidor recibe una petición realizará esta función.

    /* Escribirá en la cabecera ; 200 es el es estado, significa que ha ido bien, tiene una cabecera que es content-type de tipo json .
    response.writeHead(200, {'Content-Type': 'application/json' })

    /* Mostrar json
    response.end(JSON.stringify(messages))
})/*

 */

/* Puerto por donde estará escuchando el servidor*/
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)