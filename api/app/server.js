/*
* Server.js is the entry point of the application api
* It require(s) the model.js that contacts call backs
*/

import express from 'express'
import cors from 'cors'
import env from 'dotenv'
import bodyParser from 'body-parser'
import morgan from 'morgan'
// import '@babel/polyfill'


/// import routes  ///

import index_router from './../routes/index'
import user_router from './../routes/userRoute'
import request_router from './../routes/requestRoute'


env.config();
const PORT= process.env.PORT

const app = express()

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

// app.use(cors());  

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', index_router);
app.use('/api/v1', user_router);
app.use('/api/v1', request_router); 

// responds when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('Welcome to Maintenance Tracter Api default Index!')
})

app.listen(PORT, () => console.log(`Api App listening on port ${PORT}!`))

