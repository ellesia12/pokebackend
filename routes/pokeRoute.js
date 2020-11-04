const express = require('express');
const fs = require('fs');
const pokeRoute = express.Router()
let pokedex = require('../src/pokedex.json')


// Getting all pokemon
pokeRoute.get('/', (req, res) => {
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(pokedex))
})
    
// Getting one pokemon
pokeRoute.get('/:id', (req,res) => {
    console.log(req.params)
    const pokeId = pokedex.find(pokedex => pokedex.id === parseInt(req.params.id, 10))
    if (pokeId) {
        res.status(200).send(pokeId)
    } else {
        res.status(404).send('No pokemon match this id')
    }
})

// Getting pokemon's name|type|base




module.exports = pokeRoute;