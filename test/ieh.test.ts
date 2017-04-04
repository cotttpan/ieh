import test from "ava";
import * as ieh from "./../src/ieh";

const co: ieh.Entries<number, string> = [[1, "hello"], [2, "world"]];

test("has", t => {
    t.true(ieh.has(co, 1));
    t.false(ieh.has(co, 3));
});

test("get", t => {
    t.deepEqual(ieh.get(co, 1)!, [1, "hello"]);
    t.is(ieh.get(co, 3)!, undefined);
});

test("pick", t => {
    const co2 = ieh.pick(co, [1]);
    const co3 = ieh.pick(co, [3]);
    t.deepEqual(co2, [co[0]]);
    t.deepEqual(co3, []);
});

test("set", t => {
    const co2 = ieh.set(co, 2, "!");
    const co3 = ieh.set(co, 3, "!!");
    t.deepEqual(ieh.get(co2, 2)!, [2, "!"]);
    t.true(ieh.has(co3, 3));
    t.notDeepEqual(co2, co3);
});

test("merge", t => {
    const co2 = ieh.merge(co, [[2, "!"], [3, "!!"]]);
    t.notDeepEqual(co, co2);
    t.deepEqual(co2, [[1, "hello"], [2, "!"], [3, "!!"]]);
});

test("remove", t => {
    const co2 = ieh.remove(co, 1);
    t.deepEqual(co2, [co[1]]);
});

test("keys", t => {
    const co2 = ieh.keys(co);
    t.deepEqual(co2, [1, 2]);
});

test("values", t => {
    const co2 = ieh.values(co);
    t.deepEqual(co2, ["hello", "world"]);
});

test("first", t => {
    const co2 = ieh.first(co);
    t.deepEqual(co2, co[0]);
});

test("last", t => {
    const co2 = ieh.last(co);
    t.deepEqual(co2, co[1]);
});

test("forEach", t => {
    const keys: number[] = [];
    const values: string[] = [];

    ieh.forEach(co, (v, k) => {
        keys.push(k);
        values.push(v);
    });

    t.deepEqual(keys, [1, 2]);
    t.deepEqual(values, ["hello", "world"]);
});

test("filter", t => {
    const co2 = ieh.filter(co, (_, k) => k === 1);
    t.deepEqual(co2, [co[0]]);
});

test("map", t => {
    const keys = ieh.map(co, (v, _) => v);
    t.deepEqual(keys, ["hello", "world"]);
});

test("reduce", t => {
    const n = ieh.reduce(co, (acc, _, k) => acc + k, 0);
    t.is(n, 3);
});

test("toEntries", t => {
    const src = { a: 1, b: 2 };
    const co2 = ieh.toEntries(src);
    t.deepEqual(co2, [["a", 1], ["b", 2]]);
});

test("toHash", t => {
    const co2 = ieh.toHash(co);
    t.deepEqual(co2, {
        "1": "hello",
        "2": "world"
    });
});
