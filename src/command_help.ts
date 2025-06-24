import { State } from "./state.js";

export function commandHelp(state: State) {
    console.log("\nWelcome to the Pokedex!\nUsage:\n");
    for (let k in state.commands) {
        console.log(`${k}: ${state.commands[k].description}`);
    }
}