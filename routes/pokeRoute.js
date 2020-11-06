const express = require('express');
const pokeRoute = express.Router()
let pokedex = require('../src/pokedex.json')


// Getting pokemon based on pagination 
pokeRoute.get('/', (req, res) => {
    const page = req.query.page
    const limit = req.query.limit
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const resultPokemon = pokedex.slice(startIndex, endIndex)
    res.json(resultPokemon)
})
    
// Getting one pokemon
pokeRoute.get('/pokemon/:id', (req,res, next) => {
    console.log(req.params)
    const pokeId = pokedex.find(pokedex => pokedex.id === parseInt(req.params.id, 10))
    if (pokeId) {
        res.status(200).send(pokeId)
        next()
    } else {
        res.status(404).send('No pokemon match this id')
    }
})

// Getting pokemon's name|type|base
// pokeRoute.get('/:id/:name', (req, res) => {
//     const pokename = pokedex.find(pokedex => pokedex.name === parseInt(req.params.name, 10))
//     console.log(pokename)
//     if (pokename) {
//         res.status(200).send(pokename)
//     } else {
//         res.status(404).send('No pokemon match this id')
//     }
// })


module.exports = pokeRoute;