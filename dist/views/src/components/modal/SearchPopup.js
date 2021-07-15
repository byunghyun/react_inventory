"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var react_highlight_words_1 = __importDefault(require("react-highlight-words"));
var react_router_dom_1 = require("react-router-dom");
var SearchPopup = function (props) {
    var history = react_router_dom_1.useHistory();
    return (<div className="searchLstPopWrap">
            {props.getSearchLst.length === 0 ? (<p>찾으시는 상품이 없습니다.</p>) : (props.getSearchLst.map(function (items, idx) {
            return (<p className="searchLst" key={idx} onClick={function (e) {
                    props.setSearchLst('');
                    props.setTargetValue('');
                    props.dispatch({ type: 'SET_SEARCHING', payload: items.ProductNam });
                    props.dispatch({ type: 'SET_SEARCHING_DATA_LIST', payload: items });
                    props.dispatch({ type: 'SET_CHECKED_STOCK', payload: items });
                    history.push('/inventory');
                }}>
                            <span>상품번호 : {items.ProductIdx} </span>
                            <span style={{ marginLeft: '25px' }}>
                                <react_highlight_words_1.default highlightClassName="YourHighlightClass" searchWords={[props.getTargetValue]} autoEscape={true} textToHighlight={items.ProductNam}/>
                            </span>
                            <span style={{ marginLeft: '10px' }}>({items.ProductOption})</span>
                        </p>);
        }))}
        </div>);
};
var StateToProps = function (state) {
    return {
        ReduxStockLst: state.ReduxStockLst,
        ReduxSearchVal: state.ReduxSearchVal,
        ReduxSearchObject: state.ReduxSearchObject,
    };
};
exports.default = react_redux_1.connect(StateToProps)(SearchPopup);
//# sourceMappingURL=SearchPopup.js.map