const poke_container = document.getElementById('poke_container');
const pokemons_number = 170;

const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5',
}

const main_types = Object.keys(colors);

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemons_number; i++) {
    await getPokemon(i);
  }
}

const getPokemon = async (id) => {
  const URL_POKEMON = `https://pokeapi.co/api/v2/pokemon/${id}`
  const res = await fetch(URL_POKEMON);
  const pokemon = await res.json();

  createPokemonCard(pokemon);
}

fetchPokemons();

function createPokemonCard(pokemon) {
  const pokemonEl = document.createElement('div');
  pokemonEl.classList.add('pokemon');

  //map para los colres de los pokemons
  const poke_types = pokemon.types.map(el => el.type.name);
  const type = main_types.find(type => poke_types.indexOf(type) > -1);

  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

  //color de los pokemons
  const color = colors[type];
  pokemonEl.style.backgroundColor = color;

  const pokeInnerHTML = `
    <div class="img-container"> 
    <!--<img src="${pokemon.sprites.front_default}" alt="${name}"> -->
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${name}"> 
    </div>

    <div class="info">
      <!-- <span class="number">#${pokemon.id}</span> -->
      <span class="number"># ${pokemon.id.toString().padStart(3, '0')}</span>

      <h3 class="name">${name}</h3>
      <small class="type">Type: ${pokemon.types[0].type.name}</small>
    </div>
  `;

  pokemonEl.innerHTML = pokeInnerHTML;

  poke_container.appendChild(pokemonEl);
}

