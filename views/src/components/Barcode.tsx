import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';

const Barcode = (props: any) => {
    const inputRef: any = useRef<HTMLInputElement>();

    useEffect(() => {
        inputRef.current.focus();
    }, []);
    return (
        <div
            className="barcodeContainer"
            onClick={() => {
                props.setBarcodeState(false);
            }}
        >
            <input
                type="text"
                ref={inputRef}
                style={{position: 'absolute', top: '-500px'}}
                onKeyDown={(e: any) => {
                    if (e.keyCode === 13) {
                        let findItem = props.ReduxProductLst.find((items: any, idx: any) => {
                            return items.BarcodeNum === e.target.value;
                        });
                        if (findItem !== undefined) {
                            props.dispatch({type: 'SET_SEARCHING', payload: e.target.value});
                            props.dispatch({type: 'SET_SEARCHING_DATA_LIST', payload: findItem});
                        } else {
                            alert('등록되지 않은 상품입니다.');
                        }
                        props.setBarcodeState(false);
                    }
                }}
            />
            <div className="anim-box center">
                <div></div>
                <div className="scanner"></div>
                <div className="anim-item anim-item-sm"></div>
                <div className="anim-item anim-item-lg"></div>
                <div className="anim-item anim-item-lg"></div>
                <div className="anim-item anim-item-sm"></div>
                <div className="anim-item anim-item-lg"></div>
                <div className="anim-item anim-item-sm"></div>
                <div className="anim-item anim-item-md"></div>
                <div className="anim-item anim-item-sm"></div>
                <div className="anim-item anim-item-md"></div>
                <div className="anim-item anim-item-lg"></div>
                <div className="anim-item anim-item-sm"></div>
                <div className="anim-item anim-item-sm"></div>
                <div className="anim-item anim-item-lg"></div>
                <div className="anim-item anim-item-sm"></div>
                <div className="anim-item anim-item-lg"></div>
                <div className="anim-item anim-item-sm"></div>
                <div className="anim-item anim-item-lg"></div>
                <div className="anim-item anim-item-sm"></div>
                <div className="anim-item anim-item-md"></div>
            </div>
        </div>
    );
};

const StateToProps = (state: any) => {
    return {
        ReduxSearchVal: state.ReduxSearchVal,
        ReduxSearchObject: state.ReduxSearchObject,
        ReduxProductLst: state.ReduxProductLst,
        ReduxStockLst: state.ReduxStockLst,
    };
};
export default connect(StateToProps)(Barcode);
