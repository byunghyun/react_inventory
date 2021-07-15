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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var StockLstState = [
    { ProductIdx: 1, PackageQuan: 20, UnitQuan: 20, DiscardQuan: 20, WeekShipping: 54, chk: false },
    { ProductIdx: 2, PackageQuan: 20, UnitQuan: 20, DiscardQuan: 20, WeekShipping: 5, chk: false },
    { ProductIdx: 3, PackageQuan: 20, UnitQuan: 20, DiscardQuan: 20, WeekShipping: 3, chk: false },
    { ProductIdx: 4, PackageQuan: 20, UnitQuan: 20, DiscardQuan: 20, WeekShipping: 3, chk: false },
    { ProductIdx: 5, PackageQuan: 20, UnitQuan: 20, DiscardQuan: 20, WeekShipping: 5, chk: false },
];
var ReductProductLst = function (state, action) {
    if (state === void 0) { state = StockLstState; }
    switch (action.type) {
        case 'SET_CHECKED_STOCK': {
            var copyState = __spreadArray([], __read(state));
            var findIdx = copyState.findIndex(function (items, idx, arr) {
                return items.ProductIdx === action.payload.ProductIdx;
            });
            if (copyState[findIdx].chk === false) {
                copyState.map(function (items, idx, arr) {
                    items.chk = false;
                });
                copyState[findIdx].chk = true;
            }
            return copyState;
        }
        case 'INIT_STOCK': {
            var copyState = __spreadArray([], __read(action.payload));
            return copyState;
        }
        case 'SET_RECEVING': {
            var copyState = __spreadArray([], __read(state));
            var findObject = copyState.find(function (items, idx) {
                return items.chk === true;
            });
            if (action.payload.SetPackage === 'P') {
                findObject.PackageQuan += parseInt(action.payload.SetQuan);
            }
            else {
                findObject.UnitQuan += parseInt(action.payload.SetQuan);
            }
            return copyState;
        }
        case 'SET_SHIPPING': {
            var copyState = __spreadArray([], __read(state));
            var findObject = copyState.find(function (items, idx) {
                return items.chk === true;
            });
            if (action.payload.SetPackage === 'P') {
                findObject.PackageQuan -= parseInt(action.payload.SetQuan);
                findObject.WeekShipping += parseInt(action.payload.SetQuan) * action.payload.SetPackageQuan;
            }
            else {
                findObject.UnitQuan -= parseInt(action.payload.SetQuan);
                findObject.WeekShipping += parseInt(action.payload.SetQuan);
            }
            return copyState;
        }
        case 'SET_DISCARD': {
            var copyState = __spreadArray([], __read(state));
            var findObject = copyState.find(function (items, idx) {
                return items.chk === true;
            });
            findObject.DiscardQuan += action.payload.SetQuan;
            findObject.UnitQuan -= action.payload.SetQuan;
            return copyState;
        }
        case 'SET_SEARCH_LIST': {
            var copyState = __spreadArray([], __read(state));
            var findObject = copyState.find(function (items, idx) {
                return items.chk === true;
            });
            action.payload.SetPackage === 'P' ? (findObject.PackageQuan -= action.payload.SetQuan) : (findObject.UnitQuan -= action.payload.SetQuan);
            return copyState;
        }
        case 'SEARCHING_STOCK': {
            var copyState = __spreadArray([], __read(state));
            var payloadData = __spreadArray([], __read(action.payload));
            var result = lodash_1.default.intersection(copyState, payloadData);
            return result;
        }
        case 'DELETE_STOCK': {
            var copyState = __spreadArray([], __read(state));
            lodash_1.default.remove(copyState, function (items) {
                return items.ProductIdx === action.payload.ProductIdx;
            });
            return copyState;
        }
        case 'RESET_STOCKLST': {
            console.log(state);
            return state;
        }
        default:
            return state;
    }
};
exports.default = ReductProductLst;
//# sourceMappingURL=StockLst.js.map