import { CLICommand } from "./command.js";

export function commandHelp(commands: Record<string, CLICommand>) {
    console.log("\nWelcome to the Pokedex!\nUsage:\n");
    for (let k in commands) {
        console.log(`${k}: ${commands[k].description}`);
    }
}