const pokedex = require('../../sources/pokedex.json');

function pokeapp (req, res) {

    const getNumberRandom = (min, max) =>{
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    const getRandomPokemon = () => {
        let cant = parseInt(req.params.cant);
        let envelopes = [];
        for(let i = 1; i <= cant; i++){
            let pokemons = pokedex;
            let number = getNumberRandom(0, 808);
            envelopes.push(pokemons[number]);
        }
        return envelopes;
    }


    return getRandomPokemon();
}

module.exports = pokeapp;