"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util;
(function (util) {
    function existy(v) {
        return !(v === null || v === undefined);
    }
    util.existy = existy;
    function includes(src, target) {
        return src.indexOf(target) >= 0;
    }
    util.includes = includes;
    function makeIteratee(fn, context) {
        return function (e, i, co) {
            return fn.call(context, e[1], e[0], i, co);
        };
    }
    util.makeIteratee = makeIteratee;
    function makeReducer(callback) {
        return function (acc, kv, i, src) {
            return callback.call(null, acc, kv[1], kv[0], i, src);
        };
    }
    util.makeReducer = makeReducer;
})(util || (util = {}));
function has(co, key) {
    return util.existy(get(co, key));
}
exports.has = has;
function get(co, key) {
    const results = co.find(([k]) => k === key);
    return util.existy(results) ? results[1] : undefined;
}
exports.get = get;
function pick(co, keys) {
    return filter(co, (_, k) => util.includes(keys, k));
}
exports.pick = pick;
function set(co, key, value) {
    return merge(co, [[key, value]]);
}
exports.set = set;
function merge(co, src) {
    const map = new Map(co);
    src.forEach(([k, v]) => map.set(k, v));
    return Array.from(map);
}
exports.merge = merge;
function remove(co, key) {
    return filter(co, (_, k) => k !== key);
}
exports.remove = remove;
function keys(co) {
    return co.map(([k]) => k);
}
exports.keys = keys;
function values(co) {
    return co.map(([_, v]) => v);
}
exports.values = values;
function first(co) {
    const target = co[0];
    return target ? [...target] : undefined;
}
exports.first = first;
function last(co) {
    const target = co[co.length - 1];
    return target ? [...target] : undefined;
}
exports.last = last;
function forEach(co, callback, context) {
    return co.forEach(util.makeIteratee(callback, context));
}
exports.forEach = forEach;
function filter(co, callback, context) {
    return co.filter(util.makeIteratee(callback, context));
}
exports.filter = filter;
function map(co, callback, context) {
    return co.map(util.makeIteratee(callback, context));
}
exports.map = map;
function reduce(co, callback, init) {
    return co.reduce(util.makeReducer(callback), init);
}
exports.reduce = reduce;
function toEntries(src) {
    return Object.keys(src).map((k) => [k, src[k]]);
}
exports.toEntries = toEntries;
function toHash(co) {
    return co.reduce((acc, [k, v]) => {
        acc[k + ""] = v;
        return acc;
    }, {});
}
exports.toHash = toHash;
//# sourceMappingURL=ieh.js.map