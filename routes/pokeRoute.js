const express = require('express');
const pokeRoute = express.Router()
const axios = require('axios')
let pokedex = require('../src/pokedex.json')


//Getting pokemon based on pagination 
pokeRoute.get('/', (req, res) => {
    const page = req.query.page
    const limit = req.query.limit
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const resultPokemon = pokedex.slice(startIndex, endIndex)
    res.json(resultPokemon)
})
    
//Getting one pokemon based on id
// pokeRoute.get('/:id', (req,res, next) => {
//     console.log(req.params)
//     const pokeId = pokedex.filter(pokedex => pokedex.id === parseInt(req.params.id, 10))
//     if (pokeId) {
//         res.status(200).send(pokeId)
//         next()
//     } else {
//         res.status(404).send('No pokemon match this id')
//     }
// })

// Getting pokemon's based on name|type|base
pokeRoute.get('/:id/:info', (req, res) => {
    const { id, info } = req.params;
    const result = pokedex.filter(obj => obj.id === parseInt(req.params.id, 10))

    if(info==="name") {
        res.send(result[0].name.english)
    } else if(info==="type"){
        res.send(result[0].type)
    } else if(info==="base"){
        res.send(result[0].base)
    }
})

//get one pokemon based on id and picture
pokeRoute.get('/:id', (req,res) => {
    console.log(req.params)
    const pokemon = pokedex.find(pokedex => pokedex.id === parseInt(req.params.id, 10))
    if (pokemon) {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name.english.toLowerCase()}`)
        .then(apiRes => {
            // Attach new information obtained from the external
            pokemon.externalData = apiRes.data
            // I have access to the data sent back by the API
            res.status(200).send(pokemon)
        })
        .catch(e => res.status(404).send("There was a problem fetching data from the PokeAPI", e.message))
    } else {
        res.status(404).send('No pokemon matches this id')
    }
})


module.exports = pokeRoute;