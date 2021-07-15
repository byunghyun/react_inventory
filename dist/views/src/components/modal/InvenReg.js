"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var core_1 = require("@material-ui/core");
var react_redux_1 = require("react-redux");
var moment_1 = __importDefault(require("moment"));
var ProductReg = function (props) {
    var findStockObject = props.ReduxStockLst.find(function (items) {
        return items.chk === true;
    });
    var findProductObject = function () {
        return props.ReduxProductLst.filter(function (items, idx) {
            return findStockObject.ProductIdx === items.ProductIdx;
        });
    };
    var _a = __read(react_1.useState('P'), 2), getPackageValues = _a[0], setPackageValues = _a[1];
    var _b = __read(react_1.useState(1), 2), getQuanValues = _b[0], setQuanValues = _b[1];
    // I => 입고, O => 출고, D => 폐기
    var changeTitle = function (title) {
        switch (title) {
            case 'I':
                return '입고';
            case 'O':
                return '출고';
            case 'D':
                return '폐기';
            default:
                return '';
        }
    };
    react_1.useEffect(function () {
        setQuanValues(1);
        if (props.invenTitle === 'D') {
            setPackageValues('U');
        }
        else {
            setPackageValues('P');
        }
    }, [props.invenRegModal]);
    return props.invenRegModal ? (<div className="productModal" onClick={function () {
            props.changeInvenRegModal(false);
        }}>
            <div className="product_modal_wrap" onClick={function (e) {
            e.stopPropagation();
        }}>
                <header className="modal_header">상품 {changeTitle(props.invenTitle)}</header>
                <section className="modal_contents">
                    <ul>
                        <li>
                            <label>상품 번호</label>
                            <input type="text" value={findProductObject()[0].ProductNum} readOnly={true}/>
                        </li>
                        <li>
                            <label>상품명</label>
                            <input type="text" value={findProductObject()[0].ProductNam} readOnly={true}/>
                        </li>
                        <li>
                            <label>옵션명</label>
                            <input type="text" value={findProductObject()[0].ProductOption} readOnly={true}/>
                        </li>
                        <li>
                            <label>{changeTitle(props.invenTitle)} 단위</label>
                            <select onChange={function (e) {
            setPackageValues(e.target.value);
        }} disabled={props.invenTitle === 'D' ? true : false} value={getPackageValues} name="packageType">
                                <option value="P">패키지</option>
                                <option value="U">낱개</option>
                            </select>
                        </li>
                        <li>
                            <label>{changeTitle(props.invenTitle)} 수량</label>
                            <input type="number" value={getQuanValues} onChange={function (e) {
            if (parseInt(e.target.value) > 0)
                setQuanValues(parseInt(e.target.value));
        }}/>
                        </li>
                    </ul>
                    <core_1.Button variant="contained" color={props.invenTitle === 'I' ? 'primary' : 'secondary'} onClick={function (e) {
            if (props.invenTitle === 'I') {
                props.dispatch({
                    type: 'SET_RECEVING',
                    payload: {
                        SetPackage: getPackageValues,
                        SetQuan: getQuanValues,
                    },
                });
                props.dispatch({
                    type: 'SET_PLUS_STOCK',
                    payload: {
                        Quan: getQuanValues,
                        PackageType: getPackageValues,
                        PackageUnit: findProductObject(),
                    },
                });
                props.dispatch({
                    type: 'ADD_HISTORY',
                    payload: {
                        InitDate: moment_1.default().format('YYYY-MM-DD HH:mm:ss'),
                        ProductState: props.invenTitle,
                        BarcodeNum: findProductObject()[0].ProductNum,
                        ProductNam: findProductObject()[0].ProductNam,
                        ProductOption: findProductObject()[0].ProductOption,
                        PackageUnit: getPackageValues === 'P' ? findProductObject()[0].PackageUnit : findProductObject()[0].MinimumUnit,
                        ChgQuan: getQuanValues,
                        Processors: 'ADMIN',
                    },
                });
                props.changeInvenRegModal(false);
            }
            else if (props.invenTitle === 'O') {
                props.dispatch({
                    type: 'SET_SHIPPING',
                    payload: {
                        SetPackage: getPackageValues,
                        SetPackageQuan: findProductObject()[0].PackageMinUnitQuan,
                        SetQuan: getQuanValues,
                    },
                });
                props.dispatch({
                    type: 'SET_MINUS_STOCK',
                    payload: {
                        Quan: getQuanValues,
                        PackageType: getPackageValues,
                        PackageUnit: findProductObject(),
                    },
                });
                props.dispatch({
                    type: 'ADD_HISTORY',
                    payload: {
                        InitDate: moment_1.default().format('YYYY-MM-DD HH:mm:ss'),
                        ProductState: props.invenTitle,
                        BarcodeNum: findProductObject()[0].ProductNum,
                        ProductNam: findProductObject()[0].ProductNam,
                        ProductOption: findProductObject()[0].ProductOption,
                        PackageUnit: getPackageValues === 'P' ? findProductObject()[0].PackageUnit : findProductObject()[0].MinimumUnit,
                        ChgQuan: getQuanValues,
                        Processors: 'ADMIN',
                    },
                });
                props.changeInvenRegModal(false);
            }
            else if (props.invenTitle === 'D') {
                props.dispatch({
                    type: 'SET_SHIPPING',
                    payload: {
                        SetPackage: getPackageValues,
                        SetPackageQuan: findProductObject()[0].PackageMinUnitQuan,
                        SetQuan: getQuanValues,
                    },
                });
                props.dispatch({
                    type: 'SET_ERR_STOCK',
                    payload: {
                        Quan: getQuanValues,
                        PackageType: getPackageValues,
                        PackageUnit: findProductObject(),
                    },
                });
                props.dispatch({
                    type: 'ADD_HISTORY',
                    payload: {
                        InitDate: moment_1.default().format('YYYY-MM-DD HH:mm:ss'),
                        ProductState: props.invenTitle,
                        BarcodeNum: findProductObject()[0].ProductNum,
                        ProductNam: findProductObject()[0].ProductNam,
                        ProductOption: findProductObject()[0].ProductOption,
                        PackageUnit: getPackageValues === 'P' ? findProductObject()[0].PackageUnit : findProductObject()[0].MinimumUnit,
                        ChgQuan: getQuanValues,
                        Processors: 'ADMIN',
                    },
                });
                props.changeInvenRegModal(false);
            }
        }}>
                        {changeTitle(props.invenTitle)}
                    </core_1.Button>
                </section>
            </div>
        </div>) : null;
};
var StateToProps = function (state) {
    return {
        ReduxProductLst: state.ReduxProductLst,
        ReduxStockLst: state.ReduxStockLst,
        ReduxWeekData: state.ReduxWeekData,
        ReduxHisStockLst: state.ReduxHisStockLst,
    };
};
exports.default = react_redux_1.connect(StateToProps)(ProductReg);
//# sourceMappingURL=InvenReg.js.map