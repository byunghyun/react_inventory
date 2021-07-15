import React, {useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import './style/layout/App.scss';
import './style/barcode.scss';
import Navi from './components/Nav';
import HeaderDom from './components/Header';
import MainPage from './components/pages/Main';
import Inventory from './components/pages/Inventory';
import Logistics from './components/pages/Logistics';
import ProductLst from './components/pages/ProductLst';
import Barcode from './components/Barcode';

function App() {
    const [getActionMenu, setActionMenu] = useState<number>(0);
    const [getBarcodeState, setBarcodeState] = useState<boolean>(false);
    const menuLst: Array<{name: string; link: string}> = [
        {name: '메인', link: '/'},
        {name: '상품 관리', link: '/productLst'},
        {name: '재고 관리', link: '/inventory'},
        {name: '입출고 내역', link: '/logistics'},
    ];
    return (
        <div className="App">
            {getBarcodeState ? <Barcode getBarcodeState={getBarcodeState} setBarcodeState={setBarcodeState} /> : null}
            <div className="container">
                <Navi getActionMenu={getActionMenu} setActionMenu={setActionMenu} menuLst={menuLst} />
                <div className="contents">
                    <HeaderDom />
                    <section className="mainContents">
                        <div className="headTitle">
                            <span>DASHBOARD</span>
                            <h3>{menuLst[getActionMenu].name}</h3>
                        </div>
                        <Switch>
                            <Route exact path="/">
                                <MainPage />
                            </Route>
                            <Route path="/inventory">
                                <Inventory setActionMenu={setActionMenu} getBarcodeState={getBarcodeState} setBarcodeState={setBarcodeState} />
                            </Route>
                            <Route path="/productLst">
                                <ProductLst setActionMenu={setActionMenu} />
                            </Route>
                            <Route path="/logistics">
                                <Logistics setActionMenu={setActionMenu} />
                            </Route>
                        </Switch>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default App;
