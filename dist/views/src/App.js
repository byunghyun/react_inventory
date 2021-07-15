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
var react_router_dom_1 = require("react-router-dom");
require("./style/layout/App.scss");
require("./style/barcode.scss");
var Nav_1 = __importDefault(require("./components/Nav"));
var Header_1 = __importDefault(require("./components/Header"));
var Main_1 = __importDefault(require("./components/pages/Main"));
var Inventory_1 = __importDefault(require("./components/pages/Inventory"));
var Logistics_1 = __importDefault(require("./components/pages/Logistics"));
var ProductLst_1 = __importDefault(require("./components/pages/ProductLst"));
var Barcode_1 = __importDefault(require("./components/Barcode"));
function App() {
    var _a = __read(react_1.useState(0), 2), getActionMenu = _a[0], setActionMenu = _a[1];
    var _b = __read(react_1.useState(false), 2), getBarcodeState = _b[0], setBarcodeState = _b[1];
    var menuLst = [
        { name: '메인', link: '/' },
        { name: '상품 관리', link: '/productLst' },
        { name: '재고 관리', link: '/inventory' },
        { name: '입출고 내역', link: '/logistics' },
    ];
    return (<div className="App">
            {getBarcodeState ? <Barcode_1.default getBarcodeState={getBarcodeState} setBarcodeState={setBarcodeState}/> : null}
            <div className="container">
                <Nav_1.default getActionMenu={getActionMenu} setActionMenu={setActionMenu} menuLst={menuLst}/>
                <div className="contents">
                    <Header_1.default />
                    <section className="mainContents">
                        <div className="headTitle">
                            <span>DASHBOARD</span>
                            <h3>{menuLst[getActionMenu].name}</h3>
                        </div>
                        <react_router_dom_1.Switch>
                            <react_router_dom_1.Route exact path="/">
                                <Main_1.default />
                            </react_router_dom_1.Route>
                            <react_router_dom_1.Route path="/inventory">
                                <Inventory_1.default setActionMenu={setActionMenu} getBarcodeState={getBarcodeState} setBarcodeState={setBarcodeState}/>
                            </react_router_dom_1.Route>
                            <react_router_dom_1.Route path="/productLst">
                                <ProductLst_1.default setActionMenu={setActionMenu}/>
                            </react_router_dom_1.Route>
                            <react_router_dom_1.Route path="/logistics">
                                <Logistics_1.default setActionMenu={setActionMenu}/>
                            </react_router_dom_1.Route>
                        </react_router_dom_1.Switch>
                    </section>
                </div>
            </div>
        </div>);
}
exports.default = App;
//# sourceMappingURL=App.js.map