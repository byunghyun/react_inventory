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
var lab_1 = require("@material-ui/lab");
var ProductReg_1 = __importDefault(require("../modal/ProductReg"));
require("../../style/gridStyle.scss");
var react_redux_1 = require("react-redux");
var ProductLst = function (props) {
    var checkedRow = props.ReduxProductLst.filter(function (items) {
        return items.chk;
    });
    react_1.useEffect(function () {
        props.setActionMenu(1);
    }, []);
    var _a = __read(react_1.useState(false), 2), errorLog = _a[0], changeErrorLog = _a[1];
    var _b = __read(react_1.useState(false), 2), productModal = _b[0], changeProductModal = _b[1];
    var _c = __read(react_1.useState('등록'), 2), productModalTitle = _c[0], changeProductModalTitle = _c[1];
    return (<>
            {productModal ? <ProductReg_1.default productModal={productModal} changeProductModal={changeProductModal} productModalTitle={productModalTitle}/> : null}
            {errorLog === true ? (<lab_1.Alert severity="error">
                    <lab_1.AlertTitle>Error</lab_1.AlertTitle>
                    <strong>상품을 선택하지 않았습니다.</strong>
                </lab_1.Alert>) : null}

            <div className="btnGroup">
                <core_1.ButtonGroup aria-label="contained primary button group">
                    <core_1.Button variant="outlined" onClick={function () {
            changeProductModalTitle('등록');
            changeProductModal(true);
        }}>
                        상품 등록
                    </core_1.Button>
                    <core_1.Button variant="outlined" color="primary" onClick={function (e) {
            if (checkedRow.length !== 0) {
                changeProductModalTitle('수정');
                changeProductModal(true);
            }
            else {
                alert('선택된 상품이 없습니다.');
            }
        }}>
                        상품 수정
                    </core_1.Button>
                    <core_1.Button variant="outlined" color="secondary" onClick={function () {
            if (checkedRow.length !== 0) {
                var searchStock = props.ReduxStockLst.find(function (items, idx) {
                    return items.ProductIdx === checkedRow[0].ProductIdx;
                });
                if (searchStock.PackageQuan === 0 && searchStock.PackageQuan === 0) {
                    props.dispatch({
                        type: 'DELETE_STOCK',
                        payload: {
                            ProductIdx: checkedRow[0].ProductIdx,
                        },
                    });
                    props.dispatch({
                        type: 'DELETE_PRODUCT',
                        payload: {
                            ProductIdx: checkedRow[0].ProductIdx,
                        },
                    });
                }
                else {
                    alert('재고가 남아있는 상품은 삭제 할 수 없습니다.');
                }
            }
            else {
                alert('선택된 상품이 없습니다.');
            }
        }}>
                        상품 삭제
                    </core_1.Button>
                </core_1.ButtonGroup>
            </div>

            <div className="gridWrap">
                <table>
                    <colgroup>
                        <col style={{ width: '5%' }}/>
                        <col style={{ width: '5%' }}/>
                        <col style={{ width: '7%' }}/>
                        <col style={{ width: '10%' }}/>
                        <col style={{ width: '30%' }}/>
                        <col style={{ width: '22%' }}/>
                        <col style={{ width: '8%' }}/>
                        <col style={{ width: '8%' }}/>
                        <col style={{ width: '5%' }}/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th>선택</th>
                            <th>글 번호</th>
                            <th>상품 번호</th>
                            <th>바코드 번호</th>
                            <th>상품명</th>
                            <th>옵션명</th>
                            <th>패키지 단위</th>
                            <th>패키지당 수량</th>
                            <th>낱개 단위</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.ReduxProductLst.map(function (items, idx) {
            if (props.ReduxSearchObject.length !== 0) {
                if (props.ReduxSearchObject[0].ProductIdx === items.ProductIdx) {
                    return (<tr onClick={function (e) {
                            props.dispatch({ type: 'SET_CHECKED_PRODUCT', payload: items });
                        }} key={idx}>
                                            <td>
                                                <input type="radio" name="productChkLst" checked={items.chk} readOnly={true}/>
                                            </td>
                                            <td>{idx + 1}</td>
                                            <td>{items.ProductNum}</td>
                                            <td>{items.BarcodeNum}</td>
                                            <td>{items.ProductNam}</td>
                                            <td>{items.ProductOption}</td>
                                            <td>{items.PackageUnit}</td>
                                            <td>{items.PackageMinUnitQuan}</td>
                                            <td>{items.MinimumUnit}</td>
                                        </tr>);
                }
            }
            else {
                return (<tr onClick={function (e) {
                        props.dispatch({ type: 'SET_CHECKED_PRODUCT', payload: items });
                    }} key={idx}>
                                        <td>
                                            <input type="radio" name="productChkLst" checked={items.chk} readOnly={true}/>
                                        </td>
                                        <td>{idx + 1}</td>
                                        <td>{items.ProductNum}</td>
                                        <td>{items.BarcodeNum}</td>
                                        <td>{items.ProductNam}</td>
                                        <td>{items.ProductOption}</td>
                                        <td>{items.PackageUnit}</td>
                                        <td>{items.PackageMinUnitQuan}</td>
                                        <td>{items.MinimumUnit}</td>
                                    </tr>);
            }
        })}
                    </tbody>
                </table>
            </div>
        </>);
};
var StateToProps = function (state) {
    return {
        ReduxStockLst: state.ReduxStockLst,
        ReduxProductLst: state.ReduxProductLst,
        ReduxSearchObject: state.ReduxSearchObject,
    };
};
exports.default = react_redux_1.connect(StateToProps)(ProductLst);
//# sourceMappingURL=ProductLst.js.map