import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Highlighter from 'react-highlight-words';
import {useHistory} from 'react-router-dom';

const SearchPopup = (props: any) => {
    let history = useHistory();

    return (
        <div className="searchLstPopWrap">
            {props.getSearchLst.length === 0 ? (
                <p>찾으시는 상품이 없습니다.</p>
            ) : (
                props.getSearchLst.map((items: {ProductIdx: number; ProductNam: string; ProductOption: string}, idx: number) => {
                    return (
                        <p
                            className="searchLst"
                            key={idx}
                            onClick={(e) => {
                                props.setSearchLst('');
                                props.setTargetValue('');
                                props.dispatch({type: 'SET_SEARCHING', payload: items.ProductNam});
                                props.dispatch({type: 'SET_SEARCHING_DATA_LIST', payload: items});
                                props.dispatch({type: 'SET_CHECKED_STOCK', payload: items});
                                history.push('/inventory');
                            }}
                        >
                            <span>상품번호 : {items.ProductIdx} </span>
                            <span style={{marginLeft: '25px'}}>
                                <Highlighter highlightClassName="YourHighlightClass" searchWords={[props.getTargetValue]} autoEscape={true} textToHighlight={items.ProductNam} />
                            </span>
                            <span style={{marginLeft: '10px'}}>({items.ProductOption})</span>
                        </p>
                    );
                })
            )}
        </div>
    );
};

const StateToProps = (state: any) => {
    return {
        ReduxStockLst: state.ReduxStockLst,
        ReduxSearchVal: state.ReduxSearchVal,
        ReduxSearchObject: state.ReduxSearchObject,
    };
};
export default connect(StateToProps)(SearchPopup);
