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
var chart_1 = require("@toast-ui/chart");
require("@toast-ui/chart/dist/toastui-chart.min.css");
var react_redux_1 = require("react-redux");
var moment_1 = __importDefault(require("moment"));
var axios_1 = __importDefault(require("axios"));
var MainPage = function (props) {
    var _a = __read(react_1.useState(props.ReduxWeekData), 2), getWeekData = _a[0], setWeekData = _a[1];
    var _b = __read(react_1.useState(0), 2), getResultNum = _b[0], setResultNum = _b[1];
    var weekTitle = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    var nowDay = moment_1.default().day();
    var _c = __read(react_1.useState(props.ReduxWeekData[0].data[nowDay]), 2), getInCounter = _c[0], setInCounter = _c[1];
    var _d = __read(react_1.useState(props.ReduxWeekData[1].data[nowDay]), 2), getOutCounter = _d[0], setOutCounter = _d[1];
    var _e = __read(react_1.useState(props.ReduxWeekData[2].data[nowDay]), 2), getErrCounter = _e[0], setErrCounter = _e[1];
    var _f = __read(react_1.useState(0), 2), getInPercent = _f[0], setInPercent = _f[1];
    var _g = __read(react_1.useState(0), 2), getOutPercent = _g[0], setOutPercent = _g[1];
    var _h = __read(react_1.useState(0), 2), getErrPercent = _h[0], setErrPercent = _h[1];
    var _j = __read(react_1.useState(), 2), getInPercentShape = _j[0], setInPercentShape = _j[1];
    var _k = __read(react_1.useState(), 2), getOutPercentShape = _k[0], setOutPercentShape = _k[1];
    var _l = __read(react_1.useState(), 2), getErrPercentShape = _l[0], setErrPercentShape = _l[1];
    react_1.useEffect(function () {
        axios_1.default.get('/StockHisLst').then(function (res) {
            props.dispatch({ type: 'INIT_HISTORY', payload: res.data });
        });
        axios_1.default.get('/ProductLst').then(function (res) {
            res.data.map(function (items, idx) {
                items.chk = false;
            });
            props.dispatch({ type: 'INIT_PRODUCT', payload: res.data });
        });
        axios_1.default.get('/StockLst').then(function (res) {
            res.data.map(function (items, idx) {
                items.chk = false;
                items.WeekShipping = 20;
            });
            props.dispatch({ type: 'INIT_STOCK', payload: res.data });
        });
        if (nowDay > 0) {
            var inCalc = function () {
                var result = 0;
                if (props.ReduxWeekData[0].data[nowDay] === 0 || props.ReduxWeekData[0].data[nowDay - 1] === 0) {
                    return result;
                }
                else {
                    result = parseInt(((props.ReduxWeekData[0].data[nowDay] / props.ReduxWeekData[0].data[nowDay - 1] - 1) * 100).toFixed(2));
                    if (result === 0) {
                        setInPercentShape('none');
                    }
                    else if (result > 0) {
                        setInPercentShape('up');
                    }
                    else if (result < 0) {
                        setInPercentShape('down');
                    }
                    return result;
                }
            };
            var outCalc = function () {
                var result = 0;
                if (props.ReduxWeekData[1].data[nowDay] === 0 || props.ReduxWeekData[1].data[nowDay - 1] === 0) {
                    return 0;
                }
                else {
                    result = parseInt(((props.ReduxWeekData[1].data[nowDay] / props.ReduxWeekData[1].data[nowDay - 1] - 1) * 100).toFixed(2));
                    if (result === 0) {
                        setOutPercentShape('none');
                    }
                    else if (result > 0) {
                        setOutPercentShape('up');
                    }
                    else if (result < 0) {
                        setOutPercentShape('down');
                    }
                    return result;
                }
            };
            var errCalc = function () {
                var result = 0;
                if (props.ReduxWeekData[2].data[nowDay] === 0 || props.ReduxWeekData[2].data[nowDay - 1] === 0) {
                    return 0;
                }
                else {
                    result = parseInt(((props.ReduxWeekData[2].data[nowDay] / props.ReduxWeekData[2].data[nowDay - 1] - 1) * 100).toFixed(2));
                    if (result === 0) {
                        setErrPercentShape('none');
                    }
                    else if (result > 0) {
                        setErrPercentShape('up');
                    }
                    else if (result < 0) {
                        setErrPercentShape('down');
                    }
                    return result;
                }
            };
            setInPercent(inCalc);
            setOutPercent(outCalc);
            setErrPercent(errCalc);
        }
    }, []);
    return (<>
            <aside className="previewWrap">
                <div className="elements">
                    <p className="title">오늘 입고</p>
                    <p className="value">{getInCounter}</p>
                    <p className={"percent " + getInPercentShape}>
                        {getInPercentShape === 'up' ? '▲' : getInPercentShape === 'down' ? '▼' : '■'} {getInPercent}%p
                    </p>
                </div>
                <div className="elements">
                    <p className="title">오늘 출고</p>
                    <p className="value">{getOutCounter}</p>
                    <p className={"percent " + getOutPercentShape}>
                        {getOutPercentShape === 'up' ? '▲' : getOutPercentShape === 'down' ? '▼' : '■'} {getOutPercent}%p
                    </p>
                </div>

                <div className="elements">
                    <p className="title">오늘 불량/폐기</p>
                    <p className="value">{getErrCounter}</p>
                    <p className={"percent " + getErrPercentShape}>
                        {getErrPercentShape === 'up' ? '▲' : getErrPercentShape === 'down' ? '▼' : '■'} {getErrPercent}%p
                    </p>
                </div>
            </aside>
            <Chart weekTitle={weekTitle} getWeekData={getWeekData}/>
            <footer>
                <div className="notification">
                    <p>재고 부족 알림</p>
                    <ul>
                        {props.ReduxProductLst.map(function (items) {
            var findStockObject = props.ReduxStockLst.find(function (stock_items) {
                return stock_items.ProductIdx === items.ProductIdx;
            });
            if (findStockObject.WeekShipping >= findStockObject.UnitQuan + findStockObject.PackageQuan * items.PackageMinUnitQuan) {
                setResultNum(1);
                return (<li>
                                        <span>
                                            {items.ProductNam} ({items.ProductOption})
                                        </span>
                                        <span>
                                            {findStockObject.UnitQuan}
                                            {items.MinimumUnit} ({findStockObject.UnitQuan}
                                            {items.MinimumUnit})
                                        </span>
                                    </li>);
            }
        })}
                        {getResultNum === 0 ? (<li>
                                <span>주간 출고량보다 현재 재고가 적은 것이 없습니다.</span>
                            </li>) : null}
                    </ul>
                </div>
                <div className="recently">
                    <p>최근 입출고 내역</p>
                    <ul>
                        {props.ReduxHisStockLst.length !== 0 ? (props.ReduxHisStockLst.map(function (items) {
            return (<li>
                                        <span style={{ paddingRight: '5px' }}>[{items.ProductState === 'I' ? '입고' : items.ProductState === 'O' ? '출고' : '폐기'}]</span>
                                        <span style={{ paddingRight: '15px' }}>{items.InitDate}</span>
                                        <span style={{ paddingRight: '20px' }}>
                                            {items.ProductNam}[{items.ProductOption}] {items.ChgQuan}개
                                        </span>
                                        <span>{items.Processors}</span>
                                    </li>);
        })) : (<li>
                                <span>등록된 입출고 내역이 없습니다.</span>
                            </li>)}
                    </ul>
                </div>
            </footer>
        </>);
};
var Chart = function (props) {
    react_1.useEffect(function () {
        var el = document.getElementById('chart');
        var data = {
            categories: props.weekTitle,
            series: props.getWeekData,
        };
        var options = {
            chart: { width: '100%', height: 400 },
        };
        if (el !== null) {
            var chart = new chart_1.BarChart({ el: el, data: data, options: options });
        }
    }, []);
    return (<div id="chart">
            <p className="chartTitle">이번주 입출고 내역</p>
        </div>);
};
var StateToProps = function (state) {
    return {
        ReduxWeekData: state.ReduxWeekData,
        ReduxStockLst: state.ReduxStockLst,
        ReduxProductLst: state.ReduxProductLst,
        ReduxHisStockLst: state.ReduxHisStockLst,
    };
};
exports.default = react_redux_1.connect(StateToProps)(MainPage);
//# sourceMappingURL=Main.js.map