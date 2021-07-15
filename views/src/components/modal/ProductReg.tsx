import React, {useState, useEffect} from 'react';
import {Button} from '@material-ui/core';
import {connect} from 'react-redux';
import axios from 'axios';
import qs from 'qs';

const ProductReg = (props: any) => {
    // input Type Style List State
    let [getProductInfo, setProductInfo] = useState<any>([
        {type: 'text', title: '상품번호', name: 'ProductNum', val: '', maxLength: 20, readonly: false},
        {type: 'text', title: '상품명', name: 'ProductNam', val: '', maxLength: 30, readonly: false},
        {type: 'text', title: '바코드 번호', name: 'BarcodeNum', val: '', maxLength: 20, readonly: false},
        {type: 'text', title: '옵션명', name: 'ProductOption', val: '', maxLength: 10, readonly: false},
        {type: 'text', title: '패키지 단위', name: 'PackageUnit', val: '', maxLength: 10, readonly: false},
        {type: 'number', title: '패키지당 갯수', name: 'PackageMinUnitQuan', val: '', maxLength: 11, readonly: false},
        {type: 'text', title: '낱개 단위', name: 'MinimumUnit', val: '', maxLength: 10, readonly: false},
    ]);

    let findObject = props.ReduxProductLst.find((items: {chk: boolean}, idx: number) => {
        return items.chk === true;
    });

    const ClickReadOnlyOff = (idx: number) => {
        if (getProductInfo[idx].readonly) {
            let copy = [...getProductInfo];
            copy[idx].readonly = false;
            setProductInfo(copy);
        }
    };

    const sendData = (name: string) => {
        let data = getProductInfo.find((items: {name: string}) => {
            return items.name === name;
        });
        return data.val;
    };

    useEffect(() => {
        if (props.productModalTitle === '수정') {
            let copy = [...getProductInfo];
            copy.map((items: {readonly: boolean; val: string; name: string}, idx: number) => {
                items.readonly = true;
                items.val = findObject[items.name];
            });
            setProductInfo(copy);
        }
    }, []);

    //props.changeProductModal
    return props.productModal ? (
        <div
            className="productModal"
            onClick={(e: React.MouseEvent<HTMLElement>) => {
                props.changeProductModal(false);
            }}
        >
            <div
                className="product_modal_wrap"
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                    e.stopPropagation();
                }}
            >
                <header className="modal_header">상품 {props.productModalTitle}</header>
                <section className="modal_contents">
                    <ul>
                        {getProductInfo.map((items: {type: string; title: string; val: string; readonly: boolean; maxLength: number}, idx: number) => {
                            return (
                                <li key={idx}>
                                    <label>{items.title}</label>
                                    <input
                                        type={items.type}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            let copy = [...getProductInfo];
                                            copy[idx].val = e.target.value;
                                            setProductInfo(copy);
                                        }}
                                        onClick={(e: React.MouseEvent<HTMLElement>) => {
                                            ClickReadOnlyOff(idx);
                                        }}
                                        value={items.val}
                                        readOnly={items.readonly}
                                        maxLength={items.maxLength}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={(e) => {
                            let blankChk: any = getProductInfo.findIndex((items: any) => {
                                return items.val === '';
                            });

                            if (blankChk === -1) {
                                if (props.productModalTitle === '등록') {
                                    axios
                                        .post(
                                            '/product/add',
                                            qs.stringify({
                                                ProductNum: getProductInfo[0].val,
                                                BarcodeNum: getProductInfo[2].val,
                                                ProductNam: getProductInfo[1].val,
                                                ProductOption: getProductInfo[3].val,
                                                PackageUnit: getProductInfo[4].val,
                                                PackageMinUnitQuan: getProductInfo[5].val,
                                                MinimumUnit: getProductInfo[6].val,
                                                Processors: 1,
                                            }),
                                        )
                                        .then(function async(res) {
                                            axios.get('/product/list').then(async (res) => {
                                                await res.data.map((items: {chk: boolean}, idx: number) => {
                                                    items.chk = false;
                                                });
                                                await props.dispatch({type: 'INIT_PRODUCT', payload: res.data});
                                            });
                                            axios.get('/stock/list').then(async (res) => {
                                                await res.data.map((items: {chk: boolean; WeekShipping: number}, idx: number) => {
                                                    items.chk = false;
                                                });
                                                await props.dispatch({type: 'INIT_STOCK', payload: res.data});
                                            });

                                            props.changeProductModal(false);
                                        })
                                        .catch(function (err) {
                                            console.log(err);
                                        });
                                } else if (props.productModalTitle === '수정') {
                                    axios
                                        .put(
                                            '/product/mod',
                                            qs.stringify({
                                                ProductIdx: findObject.ProductIdx,
                                                ProductNum: sendData('ProductNum'),
                                                BarcodeNum: sendData('BarcodeNum'),
                                                ProductNam: sendData('ProductNam'),
                                                ProductOption: sendData('ProductOption'),
                                                PackageUnit: sendData('PackageUnit'),
                                                PackageMinUnitQuan: sendData('PackageMinUnitQuan'),
                                                MinimumUnit: sendData('MinimumUnit'),
                                                Processors: 1,
                                            }),
                                        )
                                        .then(function (res) {
                                            props.dispatch({
                                                type: 'UPDATE_PRODUCT',
                                                payload: {
                                                    ProductIdx: findObject.ProductIdx,
                                                    ProductNum: sendData('ProductNum'),
                                                    BarcodeNum: sendData('BarcodeNum'),
                                                    ProductNam: sendData('ProductNam'),
                                                    ProductOption: sendData('ProductOption'),
                                                    PackageUnit: sendData('PackageUnit'),
                                                    PackageMinUnitQuan: sendData('PackageMinUnitQuan'),
                                                    MinimumUnit: sendData('MinimumUnit'),
                                                    chk: false,
                                                },
                                            });
                                            props.changeProductModal(false);
                                        })
                                        .catch(function (err) {
                                            console.log(err);
                                        });

                                    props.changeProductModal(false);
                                }
                            } else {
                                alert('입력하지 않은 값이 있습니다.');
                            }
                        }}
                    >
                        {props.productModalTitle}
                    </Button>
                </section>
            </div>
        </div>
    ) : null;
};

const StateToProps = (state: any) => {
    return {
        ReduxProductLst: state.ReduxProductLst,
    };
};
export default connect(StateToProps)(ProductReg);
