import React, {useEffect, useState} from 'react';
import {Button} from '@material-ui/core';
import {connect} from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import qs from 'qs';

const ProductReg = (props: any) => {
    let findStockObject = props.ReduxStockLst.find((items: {chk: boolean; ProductIdx: number}) => {
        return items.chk === true;
    });
    let findProductObject = (): Array<any> =>
        props.ReduxProductLst.filter((items: {ProductIdx: number}, idx: number) => {
            return findStockObject.ProductIdx === items.ProductIdx;
        });

    const [getPackageValues, setPackageValues] = useState<string>('U');
    const [getQuanValues, setQuanValues] = useState<number>(1);

    type productStateTitle = 'I' | 'O' | 'D';
    // I => 입고, O => 출고, D => 폐기

    const changeTitle = (title: productStateTitle): string => {
        switch (title) {
            case 'I':
                return '입고';
            case 'O':
                return '출고';
            case 'D':
                return '폐기';
            default:
                return '';
        }
    };

    useEffect((): void => {
        setQuanValues(1);
        // if (props.invenTitle === 'D') {
        //     setPackageValues('U');
        // } else {
        //     setPackageValues('P');
        // }
    }, [props.invenRegModal]);

    return props.invenRegModal ? (
        <div
            className="productModal"
            onClick={() => {
                props.changeInvenRegModal(false);
            }}
        >
            <div
                className="product_modal_wrap"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <header className="modal_header">상품 {changeTitle(props.invenTitle)}</header>
                <section className="modal_contents">
                    <ul>
                        <li>
                            <label>상품 번호</label>
                            <input type="text" value={findProductObject()[0].ProductNum} readOnly={true} />
                        </li>
                        <li>
                            <label>상품명</label>
                            <input type="text" value={findProductObject()[0].ProductNam} readOnly={true} />
                        </li>
                        <li>
                            <label>옵션명</label>
                            <input type="text" value={findProductObject()[0].ProductOption} readOnly={true} />
                        </li>
                        <li>
                            <label>{changeTitle(props.invenTitle)} 단위</label>
                            <select
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    setPackageValues(e.target.value);
                                }}
                                disabled={props.invenTitle === 'D' ? true : false}
                                value={getPackageValues}
                                name="packageType"
                            >
                                <option value="P">패키지</option>
                                <option value="U">낱개</option>
                            </select>
                        </li>
                        <li>
                            <label>{changeTitle(props.invenTitle)} 수량</label>
                            <input
                                type="number"
                                value={getQuanValues}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    if (parseInt(e.target.value) > 0) setQuanValues(parseInt(e.target.value));
                                }}
                            />
                        </li>
                    </ul>
                    <Button
                        variant="contained"
                        color={props.invenTitle === 'I' ? 'primary' : 'secondary'}
                        onClick={(e: React.MouseEvent<HTMLElement>) => {
                            axios
                                .put(
                                    '/stock/mod',
                                    qs.stringify({
                                        ProductIdx: findProductObject()[0].ProductIdx,
                                        ProductState: props.invenTitle,
                                        SetPackage: getPackageValues,
                                        SetPackageQuan: findProductObject()[0].PackageMinUnitQuan,
                                        SetQuan: getQuanValues,
                                    }),
                                )
                                .then(function (res) {
                                    props.changeInvenRegModal(false);
                                    props.dispatch({
                                        type: 'SET_WEEK_STOCK',
                                        payload: {
                                            ProductState: props.invenTitle,
                                            Quan: getQuanValues,
                                            PackageType: getPackageValues,
                                            PackageUnit: findProductObject()[0].PackageMinUnitQuan,
                                        },
                                    });
                                    props.dispatch({
                                        type: 'SET_STOCK',
                                        payload: {
                                            ProductState: props.invenTitle,
                                            SetPackage: getPackageValues,
                                            SetPackageQuan: findProductObject()[0].PackageMinUnitQuan,
                                            SetQuan: getQuanValues,
                                        },
                                    });
                                    props.dispatch({
                                        type: 'ADD_HISTORY',
                                        payload: {
                                            InitDate: moment().format('YYYY-MM-DD HH:mm:ss'),
                                            ProductState: props.invenTitle,
                                            BarcodeNum: findProductObject()[0].ProductNum,
                                            ProductNam: findProductObject()[0].ProductNam,
                                            ProductOption: findProductObject()[0].ProductOption,
                                            PackageUnit: getPackageValues === 'P' ? findProductObject()[0].PackageUnit : findProductObject()[0].MinimumUnit,
                                            ChgQuan: getQuanValues,
                                            Processors: 1,
                                        },
                                    });
                                })
                                .catch(function (err) {
                                    console.log(err);
                                });
                        }}
                    >
                        {changeTitle(props.invenTitle)}
                    </Button>
                </section>
            </div>
        </div>
    ) : null;
};

const StateToProps = (state: any) => {
    return {
        ReduxProductLst: state.ReduxProductLst,
        ReduxStockLst: state.ReduxStockLst,
        ReduxWeekData: state.ReduxWeekData,
        ReduxHisStockLst: state.ReduxHisStockLst,
    };
};
export default connect(StateToProps)(ProductReg);
