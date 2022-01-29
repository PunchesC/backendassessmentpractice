const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors')
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;


//custom middleware logger
app.use(logger);

//Cross-origin resource sharing
//TAKE OUT WHITELIST before launch, but keep your main webpage
// After development take out !origin
const whitelist =['https://www.domain.com','http://127.0.0.1:5500', 'http://localhost:3500'];
corsOptions = {
  origin: (origin,callback) => {
    if(whitelist.indexOf(origin) !== -1 || !origin){
      callback(null, true)
    }else{
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus:200
}
app.use(cors(corsOptions));

//built-in middleware to handle urlencoded data
//in other words, form data:
//'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({extended: false}));

//built-in middleware for json
app.use(express.json());

//serve static files
app.use(express.static(path.join(__dirname,'/public')));
app.use('/subdir',express.static(path.join(__dirname,'/public')));


// routes
app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
// Wont need any static files since it is JSON
app.use('/recipes', require('./routes/api/recipes'));



app.get('/recipes(.html)?', (req,res) => {
  res.sendFile(path.join(__dirname, 'data', 'data.json'));
});


// //Route Handler
// app.get('/hello(.html)?', (req,res,next)=>{
//   console.log('attempt to load hello.html');
//   next()
// }, (req,res)=>{
//   res.send('Hello World!')
// })


//app.use('/')
app.all('*', (req,res) => {
  res.status(404);
  if (req.accepts('html')) {
  res.sendFile(path.join(__dirname,'views', '404.html'))
  }
   else if (req.accepts('json')) {
  res.json({error: "404 Not Found"})
  }
   else {
  res.type('txt').send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

