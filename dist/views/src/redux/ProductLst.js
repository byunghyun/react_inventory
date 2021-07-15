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
var ProductLstState = [
    { ProductIdx: 1, ProductNum: '121212e1', BarcodeNum: '98151112e12', ProductNam: '신발1', ProductOption: '빨강', PackageUnit: 'BOX', PackageMinUnitQuan: 20, MinimumUnit: 'EA', chk: false },
    { ProductIdx: 2, ProductNum: '12e12e12ev2', BarcodeNum: '98151112e12', ProductNam: '신발2', ProductOption: '파랑', PackageUnit: 'BOX', PackageMinUnitQuan: 20, MinimumUnit: 'EA', chk: false },
    { ProductIdx: 3, ProductNum: '12ve12ve3', BarcodeNum: '98151112e12', ProductNam: '신발3', ProductOption: '노랑', PackageUnit: 'BOX', PackageMinUnitQuan: 20, MinimumUnit: 'EA', chk: false },
    { ProductIdx: 4, ProductNum: '12ve1v1e14', BarcodeNum: '98151112e12', ProductNam: '신발4', ProductOption: '초록', PackageUnit: 'BOX', PackageMinUnitQuan: 20, MinimumUnit: 'EA', chk: false },
    { ProductIdx: 5, ProductNum: '12ve12ev5', BarcodeNum: '98151112e12', ProductNam: '신발5', ProductOption: '검정', PackageUnit: 'BOX', PackageMinUnitQuan: 20, MinimumUnit: 'EA', chk: false },
];
var ReductProductLst = function (state, action) {
    if (state === void 0) { state = ProductLstState; }
    switch (action.type) {
        case 'SET_CHECKED_PRODUCT': {
            var copyState = __spreadArray([], __read(state));
            var findIdx = copyState.findIndex(function (items, idx) {
                return items.ProductIdx === action.payload.ProductIdx;
            });
            copyState.map(function (items, idx, arr) {
                if (items.chk)
                    items.chk = false;
            });
            copyState[findIdx].chk = true;
            return copyState;
        }
        case 'INIT_PRODUCT': {
            var copyState = __spreadArray([], __read(action.payload));
            return copyState;
        }
        case 'INSERT_PRODUCT': {
            var copyState = __spreadArray(__spreadArray([], __read(state)), [action.payload]);
            return copyState;
        }
        case 'UPDATE_PRODUCT': {
            var copyState = __spreadArray([], __read(state));
            var findIdx = copyState.findIndex(function (items, idx) {
                return items.ProductIdx === action.payload.ProductIdx;
            });
            copyState[findIdx] = action.payload;
            return copyState;
        }
        case 'DELETE_PRODUCT': {
            var copyState = __spreadArray([], __read(state));
            lodash_1.default.remove(copyState, function (items) {
                return items.ProductIdx === action.payload.ProductIdx;
            });
            return copyState;
        }
        default:
            return state;
    }
};
exports.default = ReductProductLst;
//# sourceMappingURL=ProductLst.js.map