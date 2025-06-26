import { State } from "./state.js";

export async function commandHelp(state: State) {
    console.log("\nWelcome to the Pokedex!\nUsage:\n");
    for (let k in state.commands) {
        console.log(`${state.commands[k].name}: ${state.commands[k].description}`);
    }
}