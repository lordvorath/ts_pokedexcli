import { createInterface } from "readline";
import { commandExit } from "./command_exit.js";
import type { CLICommand } from "./command.js";
import { commandHelp } from "./command_help.js";

export function cleanInput (s: string): string[] {
    return s
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .filter((word) => word !== "");
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
    };
}

export function startREPL() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });
    rl.prompt();
    rl.on('line', (line) => {
        const ci = cleanInput(line);
        if (ci.length < 1) {
            rl.prompt();
            return;
        }
        const cmds = getCommands();
        const cmd = cmds[ci[0]];
        if (!cmd) {
            console.log(`Unknown command: "${ci[0]}". Type "help" for a list of commands.`,);
            rl.prompt();
            return;
            }
            
        try {
            cmd.callback(cmds);
        } catch (e) {
            console.log(e);
        }
        
        rl.prompt();
        return;
        
    });
}

