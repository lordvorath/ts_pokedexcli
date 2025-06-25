
import { State } from "./state.js";

export async function commandExplore(state: State, location: string) {
    const response =  await state.api.fetchLocationArea(location);
    for (let p of response.pokemon_encounters) {
        console.log(` - ${p.pokemon.name}`);
    }
}