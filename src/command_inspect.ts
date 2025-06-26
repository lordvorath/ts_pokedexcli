import { State } from "./state.js";

export async function commandInspect(state:State, pokemon: string) {
    const pok = state.pokedex[pokemon];
    if (!pok) {
        console.log(`You have not caught that pokemon yet`);
        return;
    }
    console.log(`Name: ${pok.name}`);
    console.log(`Height: ${pok.height}`);
    console.log(`Weight: ${pok.weight}`);
    console.log(`Stats:`);
    for (let stat of pok.stats) {
        console.log(`  - ${stat.stat.name}: ${stat.base_stat}`);
    }
    console.log(`Types:`);
    for (let type of pok.types) {
        console.log(`  - ${type.type.name}`);
    }
}