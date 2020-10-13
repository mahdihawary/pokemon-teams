const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers/`
const POKEMONS_URL = `${BASE_URL}/pokemons/`
document.addEventListener("DOMContentLoaded", function () {
    const clickHandler = () => {
        document.addEventListener('click', (e) => {
            const target = e.target
            if (target.textContent == "Release") {
                const targetPokemonId = target.dataset.pokemonId
                const options = {
                    method: "DELETE"
                }
                fetch(POKEMONS_URL + targetPokemonId, options)
                    .then(res => res.json())
                    .then(_data => {
                        target.parentElement.remove()
                    })
            } else if (target.textContent == "Add Pokemon") {
                const trainerId = {
                    trainer_id: target.dataset.trainerId
                }
                const pokemonCard = target.parentElement
                const newPokemonLi = document.createElement('li')
                const pokemonUl = pokemonCard.querySelector('ul')
                const options = {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    body: JSON.stringify(trainerId)
                }
                fetch(POKEMONS_URL, options)
                    .then(res => res.json())
                    .then(pokemon => {
                        newPokemonLi.innerHTML = `
              ${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>`
                        pokemonUl.append(newPokemonLi)
                    })






            }
        })
    }


    const renderPokemon = (pokemons) => {
        const mainTag = document.querySelector('main')
        for (const pokemon of pokemons) {
            const pokemonLi = document.createElement('li')
            pokemonLi.innerHTML = `
          ${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>`
            mainTag.append(pokemonLi)
        }
    }
    const displayTrainer = trainers => {
        const mainTag = document.querySelector('main')
        for (const trainer of trainers) {
            const pokemonDiv = document.createElement("div")
            pokemonDiv.setAttribute('class', 'card')
            pokemonDiv.setAttribute('data-id', `${trainer.id}`)
            pokemonDiv.innerHTML = `
            <p>${trainer.name}</p>
            <button data-trainer-id="${trainer.id}">Add Pokemon</button>
            <ul></ul>
            `
            mainTag.append(pokemonDiv)
            const pokemonUl = pokemonDiv.querySelector('ul')
            for (const pokemon of trainer.pokemons) {
                const pokemonLi = document.createElement('li')
                pokemonLi.innerHTML = `
              ${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>`
                pokemonUl.append(pokemonLi)
            }
        }
    }
    const renderData = () => {
        fetch(TRAINERS_URL)
            .then(resp => resp.json())
            .then(data => {
                displayTrainer(data)
            })
    }
    renderData()
    clickHandler()
})