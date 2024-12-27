const TOTAL_PAGES = 10;
const TOTAL_POKEMONS = 151;

( async () => {
  const fs = require('fs');

  const pokemonIds = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1);
  let routes = pokemonIds.map(id => `/pokemons/${id}`).join('\n');

  const pages = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);
  routes += '\n' + pages.map(page => `/pokemons/page/${page}`).join('\n');

  const pokemonNameList = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`)
    .then(res => res.json())
    .then(data => data.results.map(pokemon => pokemon.name));

  routes += '\n' + pokemonNameList.map(name => `/pokemons/${name}`).join('\n');

  fs.writeFileSync('routes.txt', routes);
}) ();
