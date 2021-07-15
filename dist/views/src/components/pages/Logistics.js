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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var Logistics = function (props) {
    react_1.useEffect(function () {
        props.setActionMenu(3);
    });
    return (<div className="gridWrap">
            <table>
                <colgroup>
                    <col style={{ width: '15%' }}/>
                    <col style={{ width: '7%' }}/>
                    <col style={{ width: '10%' }}/>
                    <col style={{ width: '30%' }}/>
                    <col style={{ width: '15%' }}/>
                    <col style={{ width: '8%' }}/>
                    <col style={{ width: '8%' }}/>
                    <col style={{ width: '7%' }}/>
                </colgroup>
                <thead>
                    <tr>
                        <th>발생 시간</th>
                        <th>상태</th>
                        <th>상품 번호</th>
                        <th>상품명</th>
                        <th>상품 옵션</th>
                        <th>단위</th>
                        <th>변경 수량</th>
                        <th>작업자</th>
                    </tr>
                </thead>
                <tbody>
                    {props.ReduxHisStockLst.map(function (items, idx) {
            return (<tr key={idx}>
                                <td>{items.InitDate}</td>
                                <td>{items.ProductState === 'I' ? '입고' : items.ProductState === 'O' ? '출고' : '폐기'}</td>
                                <td>{items.BarcodeNum}</td>
                                <td>{items.ProductNam}</td>
                                <td>{items.ProductOption}</td>
                                <td>{items.PackageUnit}</td>
                                <td>{items.ChgQuan}</td>
                                <td>{items.Processors}</td>
                            </tr>);
        })}
                </tbody>
            </table>
        </div>);
};
var StateToProps = function (state) {
    return {
        ReduxHisStockLst: state.ReduxHisStockLst,
    };
};
exports.default = react_redux_1.connect(StateToProps)(Logistics);
//# sourceMappingURL=Logistics.js.map