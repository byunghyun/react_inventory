import React, {useEffect, useState} from 'react';
import {ButtonGroup, Button} from '@material-ui/core';
import {Alert, AlertTitle} from '@material-ui/lab';
import ProductReg from '../modal/ProductReg';
import '../../style/gridStyle.scss';
import {connect} from 'react-redux';
import _ from 'lodash';
import axios from 'axios';
import qs from 'qs';

const ProductLst = (props: any) => {
    let checkedRow = props.ReduxProductLst.filter((items: {chk: boolean}) => {
        return items.chk;
    });
    const [errorLog, changeErrorLog] = useState(false);
    const [productModal, changeProductModal] = useState(false);
    const [productModalTitle, changeProductModalTitle] = useState('등록');

    useEffect(() => {
        props.setActionMenu(1);
        axios.get('/product/list').then(async (res) => {
            await res.data.map((items: {chk: boolean}, idx: number) => {
                items.chk = false;
            });
            console.log(res.data);
            await props.dispatch({type: 'INIT_PRODUCT', payload: res.data});
        });
        axios.get('/stock/list').then(async (res) => {
            console.log(res.data);
            await res.data.map((items: {chk: boolean; WeekShipping: number}, idx: number) => {
                items.chk = false;
            });
            await props.dispatch({type: 'INIT_STOCK', payload: res.data});
        });
    }, []);

    interface T_ReduxProductLst {
        ProductIdx: number;
        ProductNum: number;
        BarcodeNum: string;
        ProductNam: string;
        ProductOption: string;
        PackageUnit: string;
        PackageMinUnitQuan: number;
        MinimumUnit: string;
        chk: boolean;
    }

    return (
        <>
            {productModal ? <ProductReg productModal={productModal} changeProductModal={changeProductModal} productModalTitle={productModalTitle} /> : null}
            {errorLog === true ? (
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    <strong>상품을 선택하지 않았습니다.</strong>
                </Alert>
            ) : null}

            <div className="btnGroup">
                <ButtonGroup aria-label="contained primary button group">
                    <Button
                        variant="outlined"
                        onClick={() => {
                            changeProductModalTitle('등록');
                            changeProductModal(true);
                        }}
                    >
                        상품 등록
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={(e) => {
                            if (checkedRow.length !== 0) {
                                changeProductModalTitle('수정');
                                changeProductModal(true);
                            } else {
                                alert('선택된 상품이 없습니다.');
                            }
                        }}
                    >
                        상품 수정
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                            if (checkedRow.length !== 0) {
                                let searchStock = props.ReduxStockLst.find((items: {ProductIdx: number}, idx: number) => {
                                    return items.ProductIdx === checkedRow[0].ProductIdx;
                                });

                                if (searchStock.PackageQuan === 0 && searchStock.UnitQuan === 0) {
                                    axios
                                        .delete('/product/del', {
                                            params: {
                                                ProductIdx: checkedRow[0].ProductIdx,
                                            },
                                        })
                                        .then(function (res) {
                                            props.dispatch({
                                                type: 'DELETE_STOCK',
                                                payload: {
                                                    ProductIdx: checkedRow[0].ProductIdx,
                                                },
                                            });
                                            props.dispatch({
                                                type: 'DELETE_PRODUCT',
                                                payload: {
                                                    ProductIdx: checkedRow[0].ProductIdx,
                                                },
                                            });
                                        })
                                        .catch(function (err) {
                                            console.log(err);
                                        });
                                } else {
                                    alert('재고가 남아있는 상품은 삭제 할 수 없습니다.');
                                }
                            } else {
                                alert('선택된 상품이 없습니다.');
                            }
                        }}
                    >
                        상품 삭제
                    </Button>
                </ButtonGroup>
            </div>

            <div className="gridWrap">
                <table>
                    <colgroup>
                        <col style={{width: '5%'}} />
                        <col style={{width: '5%'}} />
                        <col style={{width: '7%'}} />
                        <col style={{width: '10%'}} />
                        <col style={{width: '30%'}} />
                        <col style={{width: '22%'}} />
                        <col style={{width: '8%'}} />
                        <col style={{width: '8%'}} />
                        <col style={{width: '5%'}} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>선택</th>
                            <th>글 번호</th>
                            <th>상품 번호</th>
                            <th>바코드 번호</th>
                            <th>상품명</th>
                            <th>옵션명</th>
                            <th>패키지 단위</th>
                            <th>패키지당 수량</th>
                            <th>낱개 단위</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.ReduxProductLst.length === 0
                            ? null
                            : props.ReduxProductLst.map((items: T_ReduxProductLst, idx: number) => {
                                  if (props.ReduxSearchObject.length !== 0) {
                                      if (props.ReduxSearchObject[0].ProductIdx === items.ProductIdx) {
                                          return (
                                              <tr
                                                  onClick={(e) => {
                                                      props.dispatch({type: 'SET_CHECKED_PRODUCT', payload: items});
                                                  }}
                                                  key={idx}
                                              >
                                                  <td>
                                                      <input type="radio" name="productChkLst" checked={items.chk} readOnly={true} />
                                                  </td>
                                                  <td>{idx + 1}</td>
                                                  <td>{items.ProductNum}</td>
                                                  <td>{items.BarcodeNum}</td>
                                                  <td>{items.ProductNam}</td>
                                                  <td>{items.ProductOption}</td>
                                                  <td>{items.PackageUnit}</td>
                                                  <td>{items.PackageMinUnitQuan}</td>
                                                  <td>{items.MinimumUnit}</td>
                                              </tr>
                                          );
                                      }
                                  } else {
                                      return (
                                          <tr
                                              onClick={(e) => {
                                                  props.dispatch({type: 'SET_CHECKED_PRODUCT', payload: items});
                                              }}
                                              key={idx}
                                          >
                                              <td>
                                                  <input type="radio" name="productChkLst" checked={items.chk} readOnly={true} />
                                              </td>
                                              <td>{idx + 1}</td>
                                              <td>{items.ProductNum}</td>
                                              <td>{items.BarcodeNum}</td>
                                              <td>{items.ProductNam}</td>
                                              <td>{items.ProductOption}</td>
                                              <td>{items.PackageUnit}</td>
                                              <td>{items.PackageMinUnitQuan}</td>
                                              <td>{items.MinimumUnit}</td>
                                          </tr>
                                      );
                                  }
                              })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

const StateToProps = (state: any) => {
    return {
        ReduxStockLst: state.ReduxStockLst,
        ReduxProductLst: state.ReduxProductLst,
        ReduxSearchObject: state.ReduxSearchObject,
    };
};
export default connect(StateToProps)(ProductLst);
