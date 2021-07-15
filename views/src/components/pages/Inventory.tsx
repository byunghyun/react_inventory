import React, {useEffect, useState} from 'react';
import {ButtonGroup, Button} from '@material-ui/core';
import InvenReg from '../modal/InvenReg';
import {connect} from 'react-redux';
import _ from 'lodash';
import moment from 'moment-timezone';
import axios from 'axios';

const Inventory = (props: any) => {
    let checkedRow = props.ReduxStockLst.filter((items: {chk: boolean}, idx: number, arr: object) => {
        return items.chk;
    });

    useEffect(() => {
        props.setActionMenu(2);
        axios.get('/product/list').then(async (res) => {
            await res.data.map((items: {chk: boolean}, idx: number) => {
                items.chk = false;
            });
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

    let [invenRegModal, changeInvenRegModal] = useState<boolean>(false);

    type productStateTitle = 'I' | 'O' | 'D';
    // I => 입고, O => 출고, D => 폐기

    let [invenTitle, changeInvenTitle] = useState<productStateTitle>('I');
    return (
        <>
            <InvenReg invenRegModal={invenRegModal} changeInvenRegModal={changeInvenRegModal} invenTitle={invenTitle} />
            <div className="btnGroup">
                <ButtonGroup aria-label="contained primary button group">
                    <Button
                        variant="outlined"
                        onClick={() => {
                            props.setBarcodeState(true);
                        }}
                    >
                        바코드 입/출고
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={(e) => {
                            if (checkedRow.length !== 0) {
                                changeInvenTitle('I');
                                changeInvenRegModal(true);
                            } else {
                                alert('선택한 행이 없습니다.');
                            }
                        }}
                    >
                        입고
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={(e) => {
                            if (checkedRow.length !== 0) {
                                changeInvenTitle('O');
                                changeInvenRegModal(true);
                            } else {
                                alert('선택한 행이 없습니다.');
                            }
                        }}
                    >
                        출고
                    </Button>
                </ButtonGroup>
                <Button
                    variant="outlined"
                    color="secondary"
                    style={{marginLeft: '10px', marginTop: '-2px'}}
                    onClick={(e) => {
                        if (checkedRow.length !== 0) {
                            changeInvenTitle('D');
                            changeInvenRegModal(true);
                        } else {
                            alert('선택한 행이 없습니다.');
                        }
                    }}
                >
                    폐기
                </Button>
            </div>
            <div className="gridWrap">
                <table>
                    <colgroup>
                        <col style={{width: '5%'}} />
                        <col style={{width: '5%'}} />
                        <col style={{width: '7%'}} />
                        <col style={{width: '10%'}} />
                        <col style={{width: '25%'}} />
                        <col style={{width: '22%'}} />
                        <col style={{width: '8%'}} />
                        <col style={{width: '8%'}} />
                        <col style={{width: '10%'}} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>선택</th>
                            <th>글 번호</th>
                            <th>상품 번호</th>
                            <th>바코드 번호</th>
                            <th>상품명</th>
                            <th>옵션명</th>
                            <th>패키지 수량</th>
                            <th>낱개 수량</th>
                            <th>주간 출고량</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.ReduxStockLst.length === 0 || props.ReduxProductLst.length === 0
                            ? null
                            : props.ReduxStockLst.map((items: {ProductIdx: number; chk: boolean; PackageQuan: number; UnitQuan: number; WeekShipping: number}, idx: number) => {
                                  let joinProductObject = props.ReduxProductLst.find(
                                      (
                                          product_items: {
                                              ProductIdx: number;
                                              ProductNum: string;
                                              BarcodeNum: string;
                                              ProductNam: string;
                                              ProductOption: string;
                                              PackageUnit: string;
                                              MinimumUnit: string;
                                              PackageQuan: number;
                                              UnitQuan: number;
                                              WeekShipping: number;
                                          },
                                          product_idx: number,
                                      ) => {
                                          return items.ProductIdx === product_items.ProductIdx;
                                      },
                                  );
                                  if (joinProductObject !== undefined) {
                                      if (props.ReduxSearchObject.length !== 0) {
                                          //검색한 값이 있으면

                                          if (props.ReduxSearchObject[0].ProductIdx === items.ProductIdx) {
                                              //검색한 값과 일치하는 상품만 리턴함
                                              return (
                                                  <tr
                                                      onClick={(e) => {
                                                          props.dispatch({type: 'SET_CHECKED_STOCK', payload: items});
                                                      }}
                                                      key={idx}
                                                  >
                                                      <td>
                                                          <input type="radio" name="productChkLst" checked={items.chk} readOnly={true} />
                                                      </td>
                                                      <td>{idx + 1}</td>
                                                      <td>{joinProductObject.ProductNum}</td>
                                                      <td>{joinProductObject.BarcodeNum}</td>
                                                      <td>{joinProductObject.ProductNam}</td>
                                                      <td>{joinProductObject.ProductOption}</td>
                                                      <td>
                                                          {items.PackageQuan} ({joinProductObject.PackageUnit})
                                                      </td>
                                                      <td>
                                                          {items.UnitQuan} ({joinProductObject.MinimumUnit})
                                                      </td>
                                                      <td>
                                                          {items.WeekShipping} ({joinProductObject.MinimumUnit})
                                                      </td>
                                                  </tr>
                                              );
                                          }
                                      } else {
                                          return (
                                              <tr
                                                  onClick={(e) => {
                                                      props.dispatch({type: 'SET_CHECKED_STOCK', payload: items});
                                                  }}
                                                  key={idx}
                                              >
                                                  <td>
                                                      <input type="radio" name="productChkLst" checked={items.chk} readOnly={true} />
                                                  </td>
                                                  <td>{idx + 1}</td>
                                                  <td>{joinProductObject.ProductNum}</td>
                                                  <td>{joinProductObject.BarcodeNum}</td>
                                                  <td>{joinProductObject.ProductNam}</td>
                                                  <td>{joinProductObject.ProductOption}</td>
                                                  <td>
                                                      {items.PackageQuan} ({joinProductObject.PackageUnit})
                                                  </td>
                                                  <td>
                                                      {items.UnitQuan} ({joinProductObject.MinimumUnit})
                                                  </td>
                                                  <td>
                                                      {items.WeekShipping} ({joinProductObject.MinimumUnit})
                                                  </td>
                                              </tr>
                                          );
                                      }
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
        ReduxSearchVal: state.ReduxSearchVal,
        ReduxSearchObject: state.ReduxSearchObject,
        ReduxProductLst: state.ReduxProductLst,
    };
};
export default connect(StateToProps)(Inventory);
