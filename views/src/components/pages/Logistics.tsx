import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import moment from 'moment-timezone';
import axios from 'axios';

const Logistics = (props: any) => {
    useEffect(() => {
        props.setActionMenu(3);
        axios.get('/stockHis/list').then(async (res) => {
            await props.dispatch({type: 'INIT_HISTORY', payload: res.data});
        });
    });

    interface T_ReduxHisStockLst {
        InitDate: Date;
        ProductState: string;
        BarcodeNum: string;
        ProductNam: string;
        ProductOption: string;
        PackageUnit: number;
        ChgQuan: number;
        Processors: number;
    }

    return (
        <div className="gridWrap">
            <table>
                <colgroup>
                    <col style={{width: '15%'}} />
                    <col style={{width: '7%'}} />
                    <col style={{width: '10%'}} />
                    <col style={{width: '30%'}} />
                    <col style={{width: '15%'}} />
                    <col style={{width: '8%'}} />
                    <col style={{width: '8%'}} />
                    <col style={{width: '7%'}} />
                </colgroup>
                <thead>
                    <tr>
                        <th>발생 시간</th>
                        <th>상태</th>
                        <th>상품 번호</th>
                        <th>상품명</th>
                        <th>상품 옵션</th>
                        <th>단위</th>
                        <th>변경 수량</th>
                        <th>작업자</th>
                    </tr>
                </thead>
                <tbody>
                    {props.ReduxHisStockLst.map((items: T_ReduxHisStockLst, idx: number) => {
                        return (
                            <tr key={idx}>
                                <td>{items.InitDate}</td>
                                <td>{items.ProductState === 'I' ? '입고' : items.ProductState === 'O' ? '출고' : '폐기'}</td>
                                <td>{items.BarcodeNum}</td>
                                <td>{items.ProductNam}</td>
                                <td>{items.ProductOption}</td>
                                <td>{items.PackageUnit}</td>
                                <td>{items.ChgQuan}</td>
                                <td>{items.Processors}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

const StateToProps = (state: any) => {
    return {
        ReduxHisStockLst: state.ReduxHisStockLst,
    };
};
export default connect(StateToProps)(Logistics);
