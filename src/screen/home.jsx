import React from "react";
import PokemonListComponent from "../component/PokemonList";
import pokemonList from "../_mock/pokemonList.json";

function HomeScreen() {
  return <PokemonListComponent pokemons={pokemonList.data.pokemons} />;
}

export default HomeScreen;
