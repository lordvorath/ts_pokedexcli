

type CacheEntry<T> = {
    createdAt: number;
    val: T;
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>;
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(n: number) {
        this.#interval = n;
        this.#startReapLoop();
    }

    add<T>(key: string, val: T) {
        this.#cache.set(key, {createdAt: Date.now(), val: val});
    }

    get<T>(key: string): T | undefined {
        return this.#cache.get(key)?.val;
    }

    #reap() {
        const now = Date.now();
        console.log("starting to REAP");
        for (let key of this.#cache.keys()) {
            console.log(`-- checking: ${key}`);
            const createdAt = this.#cache.get(key)?.createdAt;
            if (createdAt && ((now - this.#interval) > createdAt)){
                console.log(`---- reaping: ${key}`);
                this.#cache.delete(key);
            }
        }
    }

    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => {
            this.#reap();
        }, this.#interval);
    }

    stopReapLoop() {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
}