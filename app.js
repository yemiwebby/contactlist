// importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

//Assign a variable for express method
var app = express();

const route = require('./routes/route');

//Connect to mongodb
mongoose.connect('mongodb://localhost:27017/contactlist');

//on connection

mongoose.connection.on('connected', () => {
  console.log('Connected to database mongodb @ 27017');
})


// on Error
mongoose.connection.on('error', (err) => {
  if(err){
    console.log('Error on database connection has occured' + err);
  }
})


//Define a port number
const port = 3000;

//adding middleware - cors
app.use(cors());

//body parser ( Check more for the benefit of body parser in nodejs application)
app.use(bodyparser.json());

//Static files\
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', route);

// creating a route and abstracting the route configuration to a different file
app.get('/', (req, res) => {
  res.send('Foobar');
});

app.listen(port, () => {
  console.log('Server started on port ' + port);
});
