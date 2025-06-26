import { State } from "./state.js";

export async function commandCatch(state: State, pokemon: string) {
    console.log(`Throwing a Pokeball at ${pokemon}...`);
    const pok = await state.api.fetchPokemon(pokemon);
    const target = 50;
    //console.log(`${pok.name} has ${pok.base_experience} base exp`);
    const chance = Math.random() * pok.base_experience;
    if (chance <= target) {
        console.log(`${pok.name} was caught!`);
        state.pokedex[pok.name] = pok;
    } else {
        console.log(`${pok.name} escaped!`);
    }
}