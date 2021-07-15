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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var core_1 = require("@material-ui/core");
var react_redux_1 = require("react-redux");
var ProductReg = function (props) {
    var _a = __read(react_1.useState([
        { title: '상품번호', name: 'ProductNum', val: '', maxLength: 20, readonly: false },
        { title: '상품명', name: 'ProductNam', val: '', maxLength: 30, readonly: false },
        { title: '바코드 번호', name: 'BarcodeNum', val: '', maxLength: 20, readonly: false },
        { title: '옵션명', name: 'ProductOption', val: '', maxLength: 10, readonly: false },
        { title: '패키지 단위', name: 'PackageUnit', val: '', maxLength: 10, readonly: false },
        { title: '패키지당 갯수', name: 'PackageMinUnitQuan', val: '', maxLength: 11, readonly: false },
        { title: '낱개 단위', name: 'MinimumUnit', val: '', maxLength: 10, readonly: false },
    ]), 2), getProductInfo = _a[0], setProductInfo = _a[1];
    var copyProductLst = __spreadArray([], __read(props.ReduxProductLst));
    var findObject = copyProductLst.find(function (items, idx) {
        return items.chk === true;
    });
    var ClickReadOnlyOff = function (idx) {
        if (getProductInfo[idx].readonly) {
            var copy = __spreadArray([], __read(getProductInfo));
            copy[idx].readonly = false;
            setProductInfo(copy);
        }
    };
    var sendData = function (name) {
        var data = getProductInfo.find(function (items) {
            return items.name === name;
        });
        return data.val;
    };
    react_1.useEffect(function () {
        if (props.productModalTitle === '수정') {
            var copy = __spreadArray([], __read(getProductInfo));
            copy.map(function (items, idx) {
                items.readonly = true;
                items.val = findObject[items.name];
            });
            setProductInfo(copy);
        }
    }, []);
    return props.productModal ? (<div className="productModal" onClick={function (e) {
            props.changeProductModal(false);
        }}>
            <div className="product_modal_wrap" onClick={function (e) {
            e.stopPropagation();
        }}>
                <header className="modal_header">상품 {props.productModalTitle}</header>
                <section className="modal_contents">
                    <ul>
                        {getProductInfo.map(function (items, idx) {
            return (<li key={idx}>
                                    <label>{items.title}</label>
                                    <input type="text" onChange={function (e) {
                    var copy = __spreadArray([], __read(getProductInfo));
                    copy[idx].val = e.target.value;
                    setProductInfo(copy);
                }} onClick={function (e) {
                    ClickReadOnlyOff(idx);
                }} value={items.val} readOnly={items.readonly} maxLength={items.maxLength}/>
                                </li>);
        })}
                    </ul>
                    <core_1.Button variant="contained" color="primary" onClick={function (e) {
            if (props.productModalTitle === '등록') {
                props.dispatch({
                    type: 'INSERT_PRODUCT',
                    payload: {
                        ProductNum: sendData('ProductNum'),
                        BarcodeNum: sendData('BarcodeNum'),
                        ProductNam: sendData('ProductNam'),
                        ProductOption: sendData('ProductOption'),
                        PackageUnit: sendData('PackageUnit'),
                        PackageMinUnitQuan: sendData('PackageMinUnitQuan'),
                        MinimumUnit: sendData('MinimumUnit'),
                        chk: false,
                    },
                });
                props.changeProductModal(false);
            }
            else if (props.productModalTitle === '수정') {
                props.dispatch({
                    type: 'UPDATE_PRODUCT',
                    payload: {
                        ProductIdx: findObject.ProductIdx,
                        ProductNum: sendData('ProductNum'),
                        BarcodeNum: sendData('BarcodeNum'),
                        ProductNam: sendData('ProductNam'),
                        ProductOption: sendData('ProductOption'),
                        PackageUnit: sendData('PackageUnit'),
                        PackageMinUnitQuan: sendData('PackageMinUnitQuan'),
                        MinimumUnit: sendData('MinimumUnit'),
                        chk: false,
                    },
                });
                props.changeProductModal(false);
            }
        }}>
                        {props.productModalTitle}
                    </core_1.Button>
                </section>
            </div>
        </div>) : null;
};
var StateToProps = function (state) {
    return {
        ReduxProductLst: state.ReduxProductLst,
    };
};
exports.default = react_redux_1.connect(StateToProps)(ProductReg);
//# sourceMappingURL=ProductReg.js.map