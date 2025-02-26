class LRU {
    #map = new Map();
    #limit = 3;

    constructor(limit = 3) {
        this.#limit = limit;
    }

    get(key) {
        if (!this.#map.has(key)) {
            return null;
        }

        const value = this.#map.get(key);
        this.#map.delete(key);
        this.#map.set(key, value);

        return value;
    }

    set(key, value) {
        if (this.#map.has(key)) {
            this.#map.delete(key);
        }

        this.#map.set(key, value);

        if (this.#map.size > this.#limit) {
            this.#map.delete(this.#map.keys().next().value);
        }
    }

    log() {
        console.log(this.#map);
    }
}

const cache = new LRU();

cache.set('a', 1);
cache.set('b', 2);
cache.set('c', 3); // {c: 3, b: 2, a: 1}
cache.get('a');
cache.set('d', 4);

cache.log();
