import axios from 'axios';

let HisStockLst: any = [
    {
        productIdx: 1,
        BarcodeNum: '121212e1',
        ChgQuan: 3,
        InitDate: '2021-07-10 06:54:20',
        PackageUnit: 'BOX',
        Processors: 1,
        ProductNam: '신발1',
        ProductOption: '빨강',
        ProductState: 'I',
    },
];

const ReduxHisStockLst = (state = HisStockLst, action: {type: String; payload: any}): Array<any> => {
    switch (action.type) {
        case 'INIT_HISTORY': {
            let copyState: Array<string | number | boolean> = [...action.payload];
            return copyState;
        }
        case 'ADD_HISTORY': {
            let copyState: Array<string | number | boolean> = [...state, action.payload];
            return copyState;
        }
        default:
            return state;
    }
};

export default ReduxHisStockLst;
