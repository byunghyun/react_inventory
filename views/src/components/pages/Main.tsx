import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import moment from 'moment-timezone';
import axios from 'axios';
import ChartComponent from '../Chart';

const MainPage = (props: any) => {
    const weekTitle: Array<String> = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const startWeekDay = (num: number): String => {
        return moment().startOf('week').add(num, 'days').tz('Asia/Seoul').format('YYYY-MM-DD');
    };
    const nowDay: number = moment().day();
    let findObjectNullChker: boolean = false;

    const WeekData = [...props.ReduxWeekData];

    useEffect(() => {
        axios.get('/stock/list').then(async (res) => {
            await res.data.map((items: {chk: boolean; WeekShipping: number}, idx: number) => {
                items.chk = false;
            });
            await props.dispatch({type: 'INIT_STOCK', payload: res.data});
        });
        axios.get('/product/list').then(async (res) => {
            await res.data.map((items: {chk: boolean}, idx: number) => {
                items.chk = false;
            });
            await props.dispatch({type: 'INIT_PRODUCT', payload: res.data});
        });
        axios.get('/statistics/WeekData').then(async (res) => {
            await res.data.map((items: any, idx: number) => {
                if (items.ProductState === 'I') {
                    switch (items.initDate) {
                        case startWeekDay(0):
                            WeekData[0].I = items.ChanQuan;
                            break;
                        case startWeekDay(1):
                            WeekData[1].I = items.ChanQuan;
                            break;
                        case startWeekDay(2):
                            WeekData[2].I = items.ChanQuan;
                            break;
                        case startWeekDay(3):
                            WeekData[3].I = items.ChanQuan;
                            break;
                        case startWeekDay(4):
                            WeekData[4].I = items.ChanQuan;
                            break;
                        case startWeekDay(5):
                            WeekData[5].I = items.ChanQuan;
                            break;
                        case startWeekDay(6):
                            WeekData[6].I += items.ChanQuan;
                            break;
                    }
                }
                if (items.ProductState === 'O') {
                    switch (items.initDate) {
                        case startWeekDay(0):
                            WeekData[0].O = items.ChanQuan;
                            break;
                        case startWeekDay(1):
                            WeekData[1].O = items.ChanQuan;
                            break;
                        case startWeekDay(2):
                            WeekData[2].O = items.ChanQuan;
                            break;
                        case startWeekDay(3):
                            WeekData[3].O = items.ChanQuan;
                            break;
                        case startWeekDay(4):
                            WeekData[4].O = items.ChanQuan;
                            break;
                        case startWeekDay(5):
                            WeekData[5].O = items.ChanQuan;
                            break;
                        case startWeekDay(6):
                            WeekData[6].O = items.ChanQuan;
                            break;
                    }
                }
                if (items.ProductState === 'D') {
                    switch (items.initDate) {
                        case startWeekDay(0):
                            WeekData[0].D = items.ChanQuan;
                            break;
                        case startWeekDay(1):
                            WeekData[1].D = items.ChanQuan;
                            break;
                        case startWeekDay(2):
                            WeekData[2].D = items.ChanQuan;
                            break;
                        case startWeekDay(3):
                            WeekData[3].D = items.ChanQuan;
                            break;
                        case startWeekDay(4):
                            WeekData[4].D = items.ChanQuan;
                            break;
                        case startWeekDay(5):
                            WeekData[5].D = items.ChanQuan;
                            break;
                        case startWeekDay(6):
                            WeekData[6].D = items.ChanQuan;
                            break;
                    }
                }
            });
            await props.dispatch({type: 'INIT_WEEK_DATA', payload: WeekData});
            await console.log(props.ReduxWeekData);
        });
        axios.get('/stockHis/list').then(async (res) => {
            await props.dispatch({type: 'INIT_HISTORY', payload: res.data});
        });
    }, []);

    return (
        <>
            <aside className="previewWrap">
                <div className="elements">
                    <p className="title">오늘 입고</p>
                    <p className="value">{props.ReduxWeekData[nowDay].I}</p>
                </div>
                <div className="elements">
                    <p className="title">오늘 출고</p>
                    <p className="value">{props.ReduxWeekData[nowDay].O}</p>
                </div>

                <div className="elements">
                    <p className="title">오늘 불량/폐기</p>
                    <p className="value">{props.ReduxWeekData[nowDay].D}</p>
                </div>
            </aside>
            <ChartComponent weekTitle={weekTitle} />
            <footer>
                <div className="notification">
                    <p>재고 부족 알림</p>
                    <ul>
                        {props.ReduxProductLst.length === 0 || props.ReduxStockLst.length === 0
                            ? null
                            : props.ReduxProductLst.map((items: {ProductNam: String; ProductOption: String; ProductIdx: number; PackageMinUnitQuan: number; MinimumUnit: number}) => {
                                  let findStockObject = props.ReduxStockLst.find((stock_items: {ProductIdx: number; WeekShipping: number; UnitQuan: number; PackageQuan: number}) => {
                                      return stock_items.ProductIdx === items.ProductIdx;
                                  });
                                  if (findStockObject !== undefined) {
                                      if (findStockObject.WeekShipping >= findStockObject.UnitQuan + findStockObject.PackageQuan * items.PackageMinUnitQuan) {
                                          if (!findObjectNullChker) findObjectNullChker = true;
                                          return (
                                              <li>
                                                  <span>
                                                      {items.ProductNam} ({items.ProductOption})
                                                  </span>
                                                  <span>
                                                      {findStockObject.UnitQuan}
                                                      {items.MinimumUnit} ({findStockObject.UnitQuan}
                                                      {items.MinimumUnit})
                                                  </span>
                                              </li>
                                          );
                                      }
                                  }
                              })}
                        {!findObjectNullChker ? (
                            <li>
                                <span>주간 출고량보다 현재 재고가 적은 것이 없습니다.</span>
                            </li>
                        ) : null}
                    </ul>
                </div>
                <div className="recently">
                    <p>최근 입출고 내역</p>
                    <ul>
                        {props.ReduxHisStockLst.length !== 0 ? (
                            props.ReduxHisStockLst.map((items: {ProductState: String; InitDate: String; ProductNam: String; ProductOption: String; ChgQuan: number; Processors: number}) => {
                                return (
                                    <li>
                                        <span style={{paddingRight: '5px'}}>[{items.ProductState === 'I' ? '입고' : items.ProductState === 'O' ? '출고' : '폐기'}]</span>
                                        <span style={{paddingRight: '15px'}}>{items.InitDate}</span>
                                        <span style={{paddingRight: '20px'}}>
                                            {items.ProductNam}[{items.ProductOption}] {items.ChgQuan}개
                                        </span>
                                        <span>{items.Processors === 1 ? '관리자' : items.Processors}</span>
                                    </li>
                                );
                            })
                        ) : (
                            <li>
                                <span>등록된 입출고 내역이 없습니다.</span>
                            </li>
                        )}
                    </ul>
                </div>
            </footer>
        </>
    );
};

interface ReduxStates {
    ReduxWeekData: Array<any>;
    ReduxStockLst: Array<any>;
    ReduxProductLst: Array<any>;
    ReduxHisStockLst: Array<any>;
}

const StateToProps = (state: ReduxStates) => {
    return {
        ReduxWeekData: state.ReduxWeekData,
        ReduxStockLst: state.ReduxStockLst,
        ReduxProductLst: state.ReduxProductLst,
        ReduxHisStockLst: state.ReduxHisStockLst,
    };
};
export default connect(StateToProps)(MainPage);
