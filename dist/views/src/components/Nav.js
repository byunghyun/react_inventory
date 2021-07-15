"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var logo_png_1 = __importDefault(require("../images/logo.png"));
var Nav = function (props) {
    return (<nav>
            <h1 onClick={function () {
            props.setActionMenu(0);
        }}>
                <react_router_dom_1.Link to="/">
                    <img src={logo_png_1.default} alt=""/>
                </react_router_dom_1.Link>
            </h1>
            <ul className="menuLst">
                {props.menuLst.map(function (items, i) {
            if (props.getActionMenu === i) {
                return (<li className="on" key={i}>
                                <react_router_dom_1.Link to={items.link}>{items.name}</react_router_dom_1.Link>
                            </li>);
            }
            else {
                return (<li onClick={function (e) {
                        props.setActionMenu(i);
                    }} key={i}>
                                <react_router_dom_1.Link to={items.link}>{items.name}</react_router_dom_1.Link>
                            </li>);
            }
        })}
            </ul>
        </nav>);
};
exports.default = Nav;
//# sourceMappingURL=Nav.js.map