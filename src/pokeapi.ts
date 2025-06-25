import { Cache } from "./pokecache.js";


export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private cache: Cache;

    constructor() {
        this.cache = new Cache(600000);
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const url = pageURL ?? `${PokeAPI.baseURL}/location-area/`;
        const a = this.cache.get<ShallowLocations>(url)
        if (a) {
            return a;
        }
        const response = await fetch(url,
            {
                method: "GET",
            }
        );
        try {
            const data = response.json()
            this.cache.add(url, data);
            return data;
        } catch (e) {
            throw e;
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}/location/${locationName}`;
        const a = this.cache.get<Location>(url)
        if (a) {
            return a;
        }
        const response = await fetch(url,
            {
                method: "GET",
            }
        );
        try {
            const data = response.json()
            this.cache.add(url, data);
            return data;
        } catch (e) {
            throw e;
        }
    }

    async fetchLocationArea(locationName: string): Promise<LocationArea> {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
        const a = this.cache.get<LocationArea>(url)
        if (a) {
            return a;
        }
        const response = await fetch(url,
            {
                method: "GET",
            }
        );
        try {
            const data = response.json()
            this.cache.add(url, data);
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
    names: Name[];
    game_indices: {game_index: number; generation: NamedAPIResource}[];
    areas: NamedAPIResource[];

}

export type LocationArea = {
    id: number;
    name: string;
    game_index: number;
    encounter_method_rates: {
        encounter_method: NamedAPIResource;
        version_details: {
            rate: number;
            version: NamedAPIResource
        }[];
    };
    location: NamedAPIResource;
    names: Name[];
    pokemon_encounters: {
        pokemon: NamedAPIResource,
        version_details: VersionEncounterDetail[]
    }[];
}

type NamedAPIResource = {
    name: string;
    url: string;
}

type Name = {
    name: string;
    language: NamedAPIResource
}

type VersionEncounterDetail = {
    version: NamedAPIResource;
    max_chance: number;
    encounter_details: Encounter;
}

type Encounter = {
    min_level: number;
    max_level: number;
    condition_values: NamedAPIResource[];
    chance: number;
    method: NamedAPIResource;
}