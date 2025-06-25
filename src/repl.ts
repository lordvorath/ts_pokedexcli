import { State } from "./state.js";

export function cleanInput (s: string): string[] {
    return s
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .filter((word) => word !== "");
}

export function startREPL(state: State) {
    state.readline.prompt();
    state.readline.on('line', async (line) => {
        const ci = cleanInput(line);
        if (ci.length < 1) {
            state.readline.prompt();
            return;
        }
        
        const cmd = state.commands[ci[0]];
        const args = ci.splice(1);
        if (!cmd) {
            console.log(`Unknown command: "${ci[0]}". Type "help" for a list of commands.`,);
            state.readline.prompt();
            return;
            }
            
        try {
            const res = await cmd.callback(state, ...args);
        } catch (e) {
            console.log(e);
        }
        
        state.readline.prompt();
        return;
        
    });
}

