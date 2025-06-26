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

    async fetchPokemon(pokemon: string): Promise<Pokemon> {
        const url = `${PokeAPI.baseURL}/pokemon/${pokemon}`;
        const a = this.cache.get<Pokemon>(url)
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
    game_indices: { game_index: number; generation: NamedAPIResource }[];
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

export type Pokemon = {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: {
        is_hidden: boolean;
        slot: number;
        ability: NamedAPIResource
    }[];
    forms: NamedAPIResource[];
    game_indices: {
        game_index: number;
        version: NamedAPIResource;
    }[];
    held_items: {
        item: NamedAPIResource;
        version_details: {
            version: NamedAPIResource;
            rarity: number;
        }[];
    }[];
    location_area_encounters: string;
    moves: {
        move: NamedAPIResource;
        version_group_details: {
            move_learn_method: NamedAPIResource;
            version_group: NamedAPIResource;
            level_learned_at: number;
            order: number;
        }[];
    }[];
    past_types: {
        generation: NamedAPIResource;
        types: PokemonType[];
    }[];
    past_abilities: {
        generation: NamedAPIResource;
        abilities: {
            is_hidden: boolean;
            slot: number;
            ability: NamedAPIResource
        }[]
    }[];
    sprites: {
        front_default: string;
        front_shiny: string;
        front_female: string;
        front_shiny_female: string;
        back_default: string;
        back_shiny: string;
        back_female: string;
        back_shiny_female: string;
    };
    cries: {
        latest: string;
        legacy: string;
    };
    species: NamedAPIResource;
    stats: {
        stat: NamedAPIResource;
        effort: number;
        base_stat: number;
    }[];
    types: PokemonType[];
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

type PokemonType = {
    slot: number;
    type: NamedAPIResource;
}