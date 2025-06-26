import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    api: PokeAPI;
    nextLocationURL: string | undefined;
    previousLocationURL: string | undefined;
    pokedex: Record<string, Pokemon>;
}

export function initState(): State {
const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });
const cmds = getCommands();
const api = new PokeAPI();
const pokedex: Record<string, Pokemon> = {};
return {readline: rl, commands: cmds, api: api, nextLocationURL: undefined, previousLocationURL: undefined, pokedex};
}

export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
        map: {
            name: "map",
            description: "List the next 20 location areas",
            callback: commandMap
        },
        mapb: {
            name: "mapb",
            description: "List the previous 20 location areas",
            callback: commandMapB
        },
        explore: {
            name: "explore <area>",
            description: "List the encounters in the selected area",
            callback: commandExplore
        },
        catch: {
            name: "catch <pokemon>",
            description: "Attempt to catch the selected pokemon",
            callback: commandCatch
        },
        inspect: {
            name: "inspect <pokemon>",
            description: "Visualize info of a caught pokemon",
            callback: commandInspect
        },
        pokedex: {
            name: "pokedex",
            description: "List all caught pokemon",
            callback: commandPokedex
        },
    };
}