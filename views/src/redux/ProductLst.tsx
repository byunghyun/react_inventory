import _ from 'lodash';

let ProductLstState: any = [];
// {ProductIdx: 1, ProductNum: '121212e1', BarcodeNum: '98151112e12', ProductNam: '신발1', ProductOption: '빨강', PackageUnit: 'BOX', PackageMinUnitQuan: 20, MinimumUnit: 'EA', chk: false},
// {ProductIdx: 2, ProductNum: '12e12e12ev2', BarcodeNum: '98151112e12', ProductNam: '신발2', ProductOption: '파랑', PackageUnit: 'BOX', PackageMinUnitQuan: 20, MinimumUnit: 'EA', chk: false},
// {ProductIdx: 3, ProductNum: '12ve12ve3', BarcodeNum: '98151112e12', ProductNam: '신발3', ProductOption: '노랑', PackageUnit: 'BOX', PackageMinUnitQuan: 20, MinimumUnit: 'EA', chk: false},
// {ProductIdx: 4, ProductNum: '12ve1v1e14', BarcodeNum: '98151112e12', ProductNam: '신발4', ProductOption: '초록', PackageUnit: 'BOX', PackageMinUnitQuan: 20, MinimumUnit: 'EA', chk: false},
// {ProductIdx: 5, ProductNum: '12ve12ev5', BarcodeNum: '98151112e12', ProductNam: '신발5', ProductOption: '검정', PackageUnit: 'BOX', PackageMinUnitQuan: 20, MinimumUnit: 'EA', chk: false},

const ReductProductLst = (state = ProductLstState, action: {type: string; payload: any}) => {
    switch (action.type) {
        case 'SET_CHECKED_PRODUCT': {
            let copyState = [...state];

            const findIdx = copyState.findIndex((items: {ProductIdx: number}, idx: number) => {
                return items.ProductIdx === action.payload.ProductIdx;
            });
            copyState.map((items, idx, arr) => {
                if (items.chk) items.chk = false;
            });
            copyState[findIdx].chk = true;
            return copyState;
        }
        case 'INIT_PRODUCT': {
            let copyState: Array<string | number | boolean> = [...action.payload];
            return copyState;
        }
        case 'INSERT_PRODUCT': {
            let copyState = [...state, action.payload];
            return copyState;
        }
        case 'UPDATE_PRODUCT': {
            let copyState = [...state];
            const findIdx = copyState.findIndex((items: {ProductIdx: number}, idx: number) => {
                return items.ProductIdx === action.payload.ProductIdx;
            });
            copyState[findIdx] = action.payload;
            return copyState;
        }
        case 'DELETE_PRODUCT': {
            let copyState = [...state];
            _.remove(copyState, (items) => {
                return items.ProductIdx === action.payload.ProductIdx;
            });
            return copyState;
        }

        default:
            return state;
    }
};

export default ReductProductLst;
