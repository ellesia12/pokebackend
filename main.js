//load all necessary framework incl cors and body-parser helper
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path');
const app = express()
//fs is needed to serve JSON file
const fs = require('fs');
const port = process.env.PORT || 8080
//don't forget the routes
const pokeRoute = require('./routes/pokeRoute')

// serving the static folder
app.use('/assets', express.static(path.join(__dirname, 'assets')));


// configure express instance w/ some body-parser settings, including handling JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//handling the cors for all
app.use(cors())
//handling the route
app.use('/pokemon', pokeRoute)


app.get('/', (req, res) => {
    res.send('The homepage is working')
})

//listen to port
app.listen(port, () => {
    console.log(`server is listening at port ${port}`)
})
