

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    constructor() {}

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const url = pageURL ?? `${PokeAPI.baseURL}/location-area/`;
        const response = await fetch(url,
            {
                method: "GET",
            }
        );
        try {
            const data = response.json()
            return data;
        } catch (e) {
            throw e;
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}/location/${locationName}`;
        const response = await fetch(url,
            {
                method: "GET",
            }
        );
        try {
            const data = response.json()

            return data;
        } catch (e) {
            throw e;
        }
    }
}

export type ShallowLocations = {
    count: number;
    next?: string;
    previous?: string;
    results: NamedAPIResource[]
}

export type Location = {
    id: number;
    name: string;
    region: NamedAPIResource;
    names: {name: string; language: NamedAPIResource}[];
    game_indices: {game_index: number; generation: NamedAPIResource}[];
    areas: NamedAPIResource[];

}

type NamedAPIResource = {
    name: string;
    url: string;
}