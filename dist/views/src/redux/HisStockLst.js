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
var HisStockLst = [];
var ReduxHisStockLst = function (state, action) {
    if (state === void 0) { state = HisStockLst; }
    switch (action.type) {
        case 'INIT_HISTORY': {
            var copyState = __spreadArray([], __read(action.payload));
            return copyState;
        }
        case 'ADD_HISTORY': {
            var copyState = __spreadArray(__spreadArray([], __read(state)), [action.payload]);
            return copyState;
        }
        default:
            return state;
    }
};
exports.default = ReduxHisStockLst;
//# sourceMappingURL=HisStockLst.js.map