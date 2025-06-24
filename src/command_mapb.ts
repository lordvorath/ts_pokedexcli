import { State } from "./state.js";


export async function commandMapB(state: State) {
    if (state.previousLocationURL === undefined) {
        console.log("You're already on the first page");
        return;
    }
    const response = await state.api.fetchLocations(state.previousLocationURL);
    state.nextLocationURL = response.next ?? undefined;
    state.previousLocationURL = response.previous ?? undefined;
    for (let loc of response.results) {
        console.log(loc.name);
    }
}