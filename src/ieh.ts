export type Entries<K, V> = Entry<K, V>[];
export type Entry<K, V> = [K, V];
export type Iteratee<K, V, R> = (v: V, k: K, index: number, src: Entries<K, V>) => R;
export type Reducer<K, V, T> = (acc: T, value: V, key: K, index: number, src: Entries<K, V>) => T;

namespace util {
    export function existy(v: any) {
        return !(v === null || v === undefined);
    }
    export function includes<T>(src: T[], target: T) {
        return src.indexOf(target) >= 0;
    }
    export function makeIteratee<K, V, R>(fn: Iteratee<K, V, R>, context: object | undefined) {
        return function (e: Entry<K, V>, i: number, co: Entries<K, V>): R {
            return fn.call(context, e[1], e[0], i, co);
        };
    }
    export function makeReducer<K, V, T>(callback: Reducer<K, V, T>) {
        return function (acc: T, kv: Entry<K, V>, i: number, src: Entries<K, V>) {
            return callback.call(null, acc, kv[1], kv[0], i, src);
        };
    }
}

export function has<K, V>(co: Entries<K, V>, key: K) {
    return util.existy(get(co, key));
}

export function get<K, V>(co: Entries<K, V>, key: K) {
    const results = co.find(([k]) => k === key);
    return util.existy(results) ? results![1] : undefined;
}

export function pick<K, V>(co: Entries<K, V>, keys: K[]) {
    return filter(co, (_, k) => util.includes(keys, k));
}

export function set<K, V>(co: Entries<K, V>, key: K, value: V) {
    return merge(co, [[key, value]]);
}

export function merge<K, V>(co: Entries<K, V>, src: Entries<K, V>) {
    const map = new Map(co);
    src.forEach(([k, v]) => map.set(k, v));
    return Array.from(map);
}

export function remove<K, V>(co: Entries<K, V>, key: K) {
    return filter(co, (_, k) => k !== key);
}

export function keys<K, V>(co: Entries<K, V>) {
    return co.map(([k]) => k);
}

export function values<K, V>(co: Entries<K, V>) {
    return co.map(([_, v]) => v);
}

export function first<K, V>(co: Entries<K, V>): Entry<K, V> | undefined {
    const target = co[0];
    return target ? [...target] as Entry<K, V> : undefined;
}

export function last<K, V>(co: Entries<K, V>): Entry<K, V> | undefined {
    const target = co[co.length - 1];
    return target ? [...target] as Entry<K, V> : undefined;
}

export function forEach<K, V>(co: Entries<K, V>, callback: Iteratee<K, V, void>, context?: object) {
    return co.forEach(util.makeIteratee(callback, context));
}

export function filter<K, V>(co: Entries<K, V>, callback: Iteratee<K, V, boolean>, context?: object) {
    return co.filter(util.makeIteratee(callback, context));
}

export function map<K, V, R>(co: Entries<K, V>, callback: Iteratee<K, V, R>, context?: object): R[] {
    return co.map(util.makeIteratee(callback, context));
}

export function reduce<K, V, T>(co: Entries<K, V>, callback: Reducer<K, V, T>, init: T): T {
    return co.reduce(util.makeReducer(callback), init);
}

export function toEntries<T, K extends keyof T, V extends T[K]>(src: T): Entries<string, V> {
    return Object.keys(src).map((k: K) => [k, src[k]]) as Entries<K, V>;
}

export function toHash<K, V>(co: Entries<K, V>) {
    return co.reduce((acc, [k, v]) => {
        acc[k + ""] = v;
        return acc;
    }, {} as { [k: string]: V });
}
