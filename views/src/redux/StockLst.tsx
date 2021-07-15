import _ from 'lodash';

let StockLstState: any = [];
// {ProductIdx: 1, PackageQuan: 20, UnitQuan: 20, DiscardQuan: 20, WeekShipping: 54, chk: false},
// {ProductIdx: 2, PackageQuan: 20, UnitQuan: 20, DiscardQuan: 20, WeekShipping: 5, chk: false},
// {ProductIdx: 3, PackageQuan: 20, UnitQuan: 20, DiscardQuan: 20, WeekShipping: 3, chk: false},
// {ProductIdx: 4, PackageQuan: 20, UnitQuan: 20, DiscardQuan: 20, WeekShipping: 3, chk: false},
// {ProductIdx: 5, PackageQuan: 20, UnitQuan: 20, DiscardQuan: 20, WeekShipping: 5, chk: false},

const ReductProductLst = (state = StockLstState, action: {type: string; payload: any}) => {
    switch (action.type) {
        case 'SET_CHECKED_STOCK': {
            let copyState: any = [...state];
            const findIdx = copyState.findIndex((items: {ProductIdx: string}) => {
                return items.ProductIdx === action.payload.ProductIdx;
            });
            if (copyState[findIdx].chk === false) {
                copyState.map((items: {chk: boolean}) => {
                    items.chk = false;
                });
                copyState[findIdx].chk = true;
            }
            return copyState;
        }
        case 'INIT_STOCK': {
            let copyState: Array<string | number | boolean> = [...action.payload];
            return copyState;
        }
        case 'SET_STOCK': {
            let copyState: any = [...state];
            const findObject: any = copyState.find((items: {chk: boolean}, idx: number) => {
                return items.chk === true;
            });
            if (action.payload.ProductState === 'I') {
                if (action.payload.SetPackage === 'P') {
                    findObject.PackageQuan += parseInt(action.payload.SetQuan);
                } else {
                    findObject.UnitQuan += parseInt(action.payload.SetQuan);
                }
            } else if (action.payload.ProductState === 'O') {
                if (action.payload.SetPackage === 'P') {
                    findObject.PackageQuan -= parseInt(action.payload.SetQuan);
                    findObject.WeekShipping += parseInt(action.payload.SetQuan) * action.payload.SetPackageQuan;
                } else {
                    findObject.UnitQuan -= parseInt(action.payload.SetQuan);
                    findObject.WeekShipping += parseInt(action.payload.SetQuan);
                }
            } else if (action.payload.ProductState === 'D') {
                findObject.DiscardQuan += action.payload.SetQuan;
                findObject.UnitQuan -= action.payload.SetQuan;
            }
            return copyState;
        }

        case 'SET_SEARCH_LIST': {
            let copyState: any = [...state];
            const findObject: {PackageQuan: number; SetQuan: number; UnitQuan: number} = copyState.find((items: {chk: boolean}, idx: number) => {
                return items.chk === true;
            });
            action.payload.SetPackage === 'P' ? (findObject.PackageQuan -= action.payload.SetQuan) : (findObject.UnitQuan -= action.payload.SetQuan);

            return copyState;
        }
        case 'SEARCHING_STOCK': {
            let copyState: any = [...state];
            let payloadData: any = [...action.payload];
            let result = _.intersection(copyState, payloadData);

            return result;
        }
        case 'DELETE_STOCK': {
            let copyState: any = [...state];
            _.remove(copyState, (items: {ProductIdx: string}) => {
                return items.ProductIdx === action.payload.ProductIdx;
            });
            return copyState;
        }
        case 'RESET_STOCKLST': {
            console.log(state);
            return state;
        }
        default:
            return state;
    }
};

export default ReductProductLst;
