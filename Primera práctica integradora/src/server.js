import express from 'express';
import cartRouter from './routes/cart.router.js'
import productsRouter from './routes/products.router.js';
import morgan from 'morgan';
import { __dirname } from './path.js';
import { errorHandler } from './middlewares/errorHandler.js';
import handlebars from "express-handlebars";
import { Server } from 'socket.io'

const app = express()


app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))

app.use('/api/carts', cartRouter);
app.use('/api/products', productsRouter);

app.use(errorHandler);

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");


app.get('/', (req, res)=>{
  res.render('home')
});

app.get('/realTimeProducts', (req, res)=>{
  res.render('realTimeProducts')
});




const httpServer = app.listen(8080, () => {
  console.log("Escuchando al puerto 8080");
});

const socketServer = new Server(httpServer);

const products = [];

socketServer.on('connection', (socket)=>{
  console.log(`Usuario conectado: ${socket.id}`);

  socket.on('disconnect', ()=>{
    console.log('Usuario desconectado');
  })

  socket.emit('saludoDesdeBack', 'Bienvenido a websockets')

  socket.on('respuestaDesdeFront', (message)=>{
    console.log(message);
  })



  socket.on('newProduct', (prod)=>{
    products.push(prod);
    socketServer.emit('products', products);
  })

 socket.on('DelProduct', (prod)=>{
    products.pop(prod);
  
  })
  app.post('/', (req, res)=>{
    const { message } = req.body;
    socketServer.emit('message', message);
    res.send('se envió mensaje al socket del cliente')
  })

})