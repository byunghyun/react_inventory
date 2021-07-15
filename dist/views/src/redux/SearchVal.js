"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReduxSearchObject = exports.ReduxSearchVal = void 0;
var SearchValState = '';
var ReduxSearchVal = function (state, action) {
    if (state === void 0) { state = SearchValState; }
    switch (action.type) {
        case 'SET_SEARCHING': {
            var copy = action.payload;
            return copy;
        }
        default:
            return state;
    }
};
exports.ReduxSearchVal = ReduxSearchVal;
var SearchingData = [];
var ReduxSearchObject = function (state, action) {
    if (state === void 0) { state = SearchingData; }
    switch (action.type) {
        case 'SET_SEARCHING_DATA_LIST': {
            var copy = __spreadArray([], __read(state));
            copy = [action.payload];
            copy[0].chk = true;
            return copy;
        }
        case 'RESET_SEARCHING_DATA_LIST': {
            var copy = __spreadArray([], __read(state));
            copy = [];
            return copy;
        }
        case 'SET_SEARCHING_DATA_LIST_CHECKED': {
            var copy = __spreadArray([], __read(state));
            var findObject = copy.findIndex(function (items, idx) {
                return items.ProductIdx === action.payload.ProductIdx;
            });
            copy[findObject].chk = true;
            return copy;
        }
        case 'RESET_SEARCHING_DATA_LIST_CHECKED': {
            var copy = __spreadArray([], __read(state));
            var findObject = copy.findIndex(function (items, idx) {
                return items.ProductIdx === action.payload.ProductIdx;
            });
            copy[findObject].chk = false;
            return copy;
        }
        default:
            return state;
    }
};
exports.ReduxSearchObject = ReduxSearchObject;
//# sourceMappingURL=SearchVal.js.map