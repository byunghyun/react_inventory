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
var InvenReg_1 = __importDefault(require("../modal/InvenReg"));
var react_redux_1 = require("react-redux");
var Inventory = function (props) {
    var checkedRow = props.ReduxStockLst.filter(function (items, idx, arr) {
        return items.chk;
    });
    react_1.useEffect(function () {
        props.setActionMenu(2);
    }, []);
    var _a = __read(react_1.useState(false), 2), invenRegModal = _a[0], changeInvenRegModal = _a[1];
    // I => 입고, O => 출고, D => 폐기
    var _b = __read(react_1.useState('I'), 2), invenTitle = _b[0], changeInvenTitle = _b[1];
    return (<>
            <InvenReg_1.default invenRegModal={invenRegModal} changeInvenRegModal={changeInvenRegModal} invenTitle={invenTitle}/>
            <div className="btnGroup">
                <core_1.ButtonGroup aria-label="contained primary button group">
                    <core_1.Button variant="outlined" onClick={function () {
            props.setBarcodeState(true);
        }}>
                        바코드 입/출고
                    </core_1.Button>
                    <core_1.Button variant="outlined" color="primary" onClick={function (e) {
            if (checkedRow.length !== 0) {
                changeInvenTitle('I');
                changeInvenRegModal(true);
            }
            else {
                alert('선택한 행이 없습니다.');
            }
        }}>
                        입고
                    </core_1.Button>
                    <core_1.Button variant="outlined" color="secondary" onClick={function (e) {
            if (checkedRow.length !== 0) {
                changeInvenTitle('O');
                changeInvenRegModal(true);
            }
            else {
                alert('선택한 행이 없습니다.');
            }
        }}>
                        출고
                    </core_1.Button>
                </core_1.ButtonGroup>
                <core_1.Button variant="outlined" color="secondary" style={{ marginLeft: '10px', marginTop: '-2px' }} onClick={function (e) {
            if (checkedRow.length !== 0) {
                changeInvenTitle('D');
                changeInvenRegModal(true);
            }
            else {
                alert('선택한 행이 없습니다.');
            }
        }}>
                    폐기
                </core_1.Button>
            </div>
            <div className="gridWrap">
                <table>
                    <colgroup>
                        <col style={{ width: '5%' }}/>
                        <col style={{ width: '5%' }}/>
                        <col style={{ width: '7%' }}/>
                        <col style={{ width: '10%' }}/>
                        <col style={{ width: '25%' }}/>
                        <col style={{ width: '22%' }}/>
                        <col style={{ width: '8%' }}/>
                        <col style={{ width: '8%' }}/>
                        <col style={{ width: '10%' }}/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th>선택</th>
                            <th>글 번호</th>
                            <th>상품 번호</th>
                            <th>바코드 번호</th>
                            <th>상품명</th>
                            <th>옵션명</th>
                            <th>패키지 수량</th>
                            <th>낱개 수량</th>
                            <th>주간 출고량</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.ReduxStockLst.map(function (items, idx) {
            var joinProductObject = props.ReduxProductLst.find(function (product_items, product_idx) {
                return items.ProductIdx === product_items.ProductIdx;
            });
            if (props.ReduxSearchObject.length !== 0) {
                //검색한 값이 있으면
                if (props.ReduxSearchObject[0].ProductIdx === items.ProductIdx) {
                    //검색한 값과 일치하는 상품만 리턴함
                    return (<tr onClick={function (e) {
                            props.dispatch({ type: 'SET_CHECKED_STOCK', payload: items });
                        }} key={idx}>
                                            <td>
                                                <input type="radio" name="productChkLst" checked={items.chk} readOnly={true}/>
                                            </td>
                                            <td>{idx + 1}</td>
                                            <td>{joinProductObject.ProductNum}</td>
                                            <td>{joinProductObject.BarcodeNum}</td>
                                            <td>{joinProductObject.ProductNam}</td>
                                            <td>{joinProductObject.ProductOption}</td>
                                            <td>
                                                {items.PackageQuan} ({joinProductObject.PackageUnit})
                                            </td>
                                            <td>
                                                {items.UnitQuan} ({joinProductObject.MinimumUnit})
                                            </td>
                                            <td>
                                                {items.WeekShipping} ({joinProductObject.MinimumUnit})
                                            </td>
                                        </tr>);
                }
            }
            else {
                return (<tr onClick={function (e) {
                        props.dispatch({ type: 'SET_CHECKED_STOCK', payload: items });
                    }} key={idx}>
                                        <td>
                                            <input type="radio" name="productChkLst" checked={items.chk} readOnly={true}/>
                                        </td>
                                        <td>{idx + 1}</td>
                                        <td>{joinProductObject.ProductNum}</td>
                                        <td>{joinProductObject.BarcodeNum}</td>
                                        <td>{joinProductObject.ProductNam}</td>
                                        <td>{joinProductObject.ProductOption}</td>
                                        <td>
                                            {items.PackageQuan} ({joinProductObject.PackageUnit})
                                        </td>
                                        <td>
                                            {items.UnitQuan} ({joinProductObject.MinimumUnit})
                                        </td>
                                        <td>
                                            {items.WeekShipping} ({joinProductObject.MinimumUnit})
                                        </td>
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
        ReduxSearchVal: state.ReduxSearchVal,
        ReduxSearchObject: state.ReduxSearchObject,
        ReduxProductLst: state.ReduxProductLst,
    };
};
exports.default = react_redux_1.connect(StateToProps)(Inventory);
//# sourceMappingURL=Inventory.js.map