export declare type Entries<K, V> = Entry<K, V>[];
export declare type Entry<K, V> = [K, V];
export declare type Iteratee<K, V, R> = (v: V, k: K, index: number, src: Entries<K, V>) => R;
export declare function has<K, V>(co: Entries<K, V>, key: K): boolean;
export declare function get<K, V>(co: Entries<K, V>, key: K): [K, V] | undefined;
export declare function pick<K, V>(co: Entries<K, V>, keys: K[]): [K, V][];
export declare function set<K, V>(co: Entries<K, V>, key: K, value: V): [K, V][];
export declare function merge<K, V>(co: Entries<K, V>, src: Entries<K, V>): [K, V][];
export declare function remove<K, V>(co: Entries<K, V>, key: K): [K, V][];
export declare function keys<K, V>(co: Entries<K, V>): K[];
export declare function values<K, V>(co: Entries<K, V>): V[];
export declare function first<K, V>(co: Entries<K, V>): Entry<K, V> | undefined;
export declare function last<K, V>(co: Entries<K, V>): Entry<K, V> | undefined;
export declare function forEach<K, V>(co: Entries<K, V>, callback: Iteratee<K, V, void>, context?: object): void;
export declare function filter<K, V>(co: Entries<K, V>, callback: Iteratee<K, V, boolean>, context?: object): [K, V][];
export declare function map<K, V, R>(co: Entries<K, V>, callback: Iteratee<K, V, R>, context?: object): R[];
export declare function reduce<K, V, T>(co: Entries<K, V>, callback: _reduce.callback<K, V, T>, init: T): T;
export declare namespace _reduce {
    type callback<K, V, T> = (acc: T, value: V, key: K, index: number, src: Entries<K, V>) => T;
    function makeReducer<K, V, T>(callback: _reduce.callback<K, V, T>): (acc: T, kv: [K, V], i: number, src: [K, V][]) => any;
}
export declare function toEntries<T, K extends keyof T, V extends T[K]>(src: T): Entries<string, V>;
export declare function toHash<K, V>(co: Entries<K, V>): {
    [k: string]: V;
};
