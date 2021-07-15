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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
require("./style/default/index.css");
var App_1 = __importDefault(require("./App"));
var serviceWorkerRegistration = __importStar(require("./serviceWorkerRegistration"));
var reportWebVitals_1 = __importDefault(require("./reportWebVitals"));
var react_router_dom_1 = require("react-router-dom");
var redux_1 = require("redux");
var react_redux_1 = require("react-redux");
var ProductLst_1 = __importDefault(require("./redux/ProductLst"));
var StockLst_1 = __importDefault(require("./redux/StockLst"));
var HisStockLst_1 = __importDefault(require("./redux/HisStockLst"));
var WeekData_1 = __importDefault(require("./redux/WeekData"));
var SearchVal_1 = require("./redux/SearchVal");
var store = redux_1.createStore(redux_1.combineReducers({ ReduxProductLst: ProductLst_1.default, ReduxStockLst: StockLst_1.default, ReduxHisStockLst: HisStockLst_1.default, ReduxWeekData: WeekData_1.default, ReduxSearchVal: SearchVal_1.ReduxSearchVal, ReduxSearchObject: SearchVal_1.ReduxSearchObject }));
react_dom_1.default.render(<react_1.default.StrictMode>
        <react_router_dom_1.BrowserRouter>
            <react_redux_1.Provider store={store}>
                <App_1.default />
            </react_redux_1.Provider>
        </react_router_dom_1.BrowserRouter>
    </react_1.default.StrictMode>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals_1.default();
//# sourceMappingURL=index.js.map