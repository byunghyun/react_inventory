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
var ai_1 = require("react-icons/ai");
var react_redux_1 = require("react-redux");
var SearchPopup_1 = __importDefault(require("./modal/SearchPopup"));
var Header = function (props) {
    var _a = __read(react_1.useState(''), 2), getSearchLst = _a[0], setSearchLst = _a[1];
    var _b = __read(react_1.useState(''), 2), getTargetValue = _b[0], setTargetValue = _b[1];
    react_1.useEffect(function () { }, []);
    return (<header className="contentsHeader">
            {props.ReduxSearchVal !== '' ? (<div className="searchHis">
                    <p>
                        <span className="searchTitle">Searching...</span>
                        <span>{props.ReduxSearchVal}</span>
                        <span className="closeBtn" onClick={function (e) {
                props.dispatch({ type: 'SET_SEARCHING', payload: '' });
                props.dispatch({ type: 'RESET_SEARCHING_DATA_LIST' });
            }}>
                            X
                        </span>
                    </p>
                </div>) : null}

            <input className="searchTxt" type="text" onChange={function (e) {
            var searchData = props.ReduxProductLst.filter(function (x) {
                return x.ProductNam.includes(e.target.value);
            });
            setTargetValue(e.target.value);
            if (e.target.value === '')
                searchData = '';
            setSearchLst(searchData);
        }} value={getTargetValue} placeholder="Search for ProductName..."/>
            <div className="stateWrap">
                <div className="settingBtn" onClick={function (e) {
            alert('로그인 구현 후 작업 진행 예정');
        }}>
                    <ai_1.AiOutlineSetting />
                    <div className="tooltipPopup">
                        <p className="lst">사용자 설정</p>
                    </div>
                </div>
            </div>
            {getSearchLst === '' ? null : (<SearchPopup_1.default ReduxSearchVal={props.ReduxSearchVal} getSearchLst={getSearchLst} setSearchLst={setSearchLst} getTargetValue={getTargetValue} setTargetValue={setTargetValue}/>)}
        </header>);
};
var StateToProps = function (state) {
    return {
        ReduxStockLst: state.ReduxStockLst,
        ReduxSearchVal: state.ReduxSearchVal,
        ReduxSearchObject: state.ReduxSearchObject,
        ReduxProductLst: state.ReduxProductLst,
    };
};
exports.default = react_redux_1.connect(StateToProps)(Header);
//# sourceMappingURL=Header.js.map