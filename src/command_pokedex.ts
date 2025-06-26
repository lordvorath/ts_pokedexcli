import { State } from "./state.js";

export async function commandPokedex(state:State) {
    console.log("Your Pokedex:")
    for (let pok in state.pokedex) {
        console.log(` - ${pok}`);
    }
}