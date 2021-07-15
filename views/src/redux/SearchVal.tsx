let SearchValState:any = '';

const ReduxSearchVal = (state:string = SearchValState, action:{type:string, payload:any}) => {
    switch (action.type) {
        case 'SET_SEARCHING': {
            let copy = action.payload;
            return copy;
        }
        default:
            return state;
    }
};

let SearchingData:any = [];

const ReduxSearchObject = (state = SearchingData, action:{type:string, payload:any}) => {
    switch (action.type) {
        case 'SET_SEARCHING_DATA_LIST': {
            let copy = [...state];
            copy = [action.payload];
            copy[0].chk = true;
            return copy;
        }
        case 'RESET_SEARCHING_DATA_LIST': {
            let copy = [...state];
            copy = [];
            return copy;
        }
        case 'SET_SEARCHING_DATA_LIST_CHECKED': {
            let copy = [...state];
            let findObject = copy.findIndex((items:{ProductIdx:number}, idx:number) => {
                return items.ProductIdx === action.payload.ProductIdx;
            });
            copy[findObject].chk = true;
            return copy;
        }
        case 'RESET_SEARCHING_DATA_LIST_CHECKED': {
            let copy = [...state];
            let findObject = copy.findIndex((items:{ProductIdx:number}, idx:number) => {
                return items.ProductIdx === action.payload.ProductIdx;
            });
            copy[findObject].chk = false;
            return copy;
        }
        default:
            return state;
    }
};

export {ReduxSearchVal, ReduxSearchObject};
