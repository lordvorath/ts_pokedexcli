import { State } from "./state.js";


export async function commandMap(state: State) {
    const response = await state.api.fetchLocations(state.nextLocationURL);
    state.nextLocationURL = response.next ?? undefined;
    state.previousLocationURL = response.previous ?? undefined;
    for (let loc of response.results) {
        console.log(loc.name);
    }
}