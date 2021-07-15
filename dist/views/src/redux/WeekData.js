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
var moment_1 = __importDefault(require("moment"));
var nowDay = moment_1.default().day();
var WeekData = [
    {
        name: '입고량',
        data: [12, 0, 3, 23, 344, 35, 222],
    },
    {
        name: '출고량',
        data: [24, 12, 3, 46, 346, 33, 1],
    },
    {
        name: '불량/폐기',
        data: [5, 1, 23, 31, 32, 12, 23],
    },
];
var ReductWeekData = function (state, action) {
    if (state === void 0) { state = WeekData; }
    switch (action.type) {
        case 'SET_PLUS_STOCK': {
            var copyState = __spreadArray([], __read(state));
            if (action.payload.PackageType === 'P') {
                copyState[0].data[nowDay] += parseInt(action.payload.Quan) * action.payload.PackageUnit[0].PackageMinUnitQuan;
            }
            else if (action.payload.PackageType === 'U') {
                copyState[0].data[nowDay] += parseInt(action.payload.Quan);
            }
            return copyState;
        }
        case 'SET_MINUS_STOCK': {
            var copyState = __spreadArray([], __read(state));
            if (action.payload.PackageType === 'P') {
                copyState[1].data[nowDay] += parseInt(action.payload.Quan) * action.payload.PackageUnit[0].PackageMinUnitQuan;
            }
            else if (action.payload.PackageType === 'U') {
                copyState[1].data[nowDay] += parseInt(action.payload.Quan);
            }
            return copyState;
        }
        case 'SET_ERR_STOCK': {
            var copyState = __spreadArray([], __read(state));
            if (action.payload.PackageType === 'P') {
                copyState[2].data[nowDay] += parseInt(action.payload.Quan) * action.payload.PackageUnit[0].PackageMinUnitQuan;
            }
            else if (action.payload.PackageType === 'U') {
                copyState[2].data[nowDay] += parseInt(action.payload.Quan);
            }
            return copyState;
        }
        default:
            return state;
    }
};
exports.default = ReductWeekData;
//# sourceMappingURL=WeekData.js.map