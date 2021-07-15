import React, {useEffect, useState} from 'react';
import {AiOutlineSetting} from 'react-icons/ai';
import {connect} from 'react-redux';
import SearchPopup from './modal/SearchPopup';

const Header = (props: any) => {
    const [getSearchLst, setSearchLst] = useState<string | object>('');
    const [getTargetValue, setTargetValue] = useState<string>('');

    useEffect(() => {}, []);
    return (
        <header className="contentsHeader">
            {props.ReduxSearchVal !== '' ? (
                <div className="searchHis">
                    <p>
                        <span className="searchTitle">Searching...</span>
                        <span>{props.ReduxSearchVal}</span>
                        <span
                            className="closeBtn"
                            onClick={(e) => {
                                props.dispatch({type: 'SET_SEARCHING', payload: ''});
                                props.dispatch({type: 'RESET_SEARCHING_DATA_LIST'});
                            }}
                        >
                            X
                        </span>
                    </p>
                </div>
            ) : null}

            <input
                className="searchTxt"
                type="text"
                onChange={(e) => {
                    let searchData = props.ReduxProductLst.filter((x: {ProductNam: string}) => {
                        return x.ProductNam.includes(e.target.value);
                    });
                    setTargetValue(e.target.value);
                    if (e.target.value === '') searchData = '';
                    setSearchLst(searchData);
                }}
                value={getTargetValue}
                placeholder="Search for ProductName..."
            />
            <div className="stateWrap">
                <div
                    className="settingBtn"
                    onClick={(e) => {
                        alert('로그인 구현 후 작업 진행 예정');
                    }}
                >
                    <AiOutlineSetting />
                    <div className="tooltipPopup">
                        <p className="lst">사용자 설정</p>
                    </div>
                </div>
            </div>
            {getSearchLst === '' ? null : (
                <SearchPopup ReduxSearchVal={props.ReduxSearchVal} getSearchLst={getSearchLst} setSearchLst={setSearchLst} getTargetValue={getTargetValue} setTargetValue={setTargetValue} />
            )}
        </header>
    );
};

const StateToProps = (state: any) => {
    return {
        ReduxStockLst: state.ReduxStockLst,
        ReduxSearchVal: state.ReduxSearchVal,
        ReduxSearchObject: state.ReduxSearchObject,
        ReduxProductLst: state.ReduxProductLst,
    };
};
export default connect(StateToProps)(Header);
