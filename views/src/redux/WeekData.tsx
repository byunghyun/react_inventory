import moment from 'moment';

let nowDay = moment().day();

const WeekData = [
    {
        dayOfWeek: '일요일',
        I: 0,
        O: 0,
        D: 0,
    },
    {
        dayOfWeek: '월요일',
        I: 0,
        O: 0,
        D: 0,
    },
    {
        dayOfWeek: '화요일',
        I: 0,
        O: 0,
        D: 0,
    },
    {
        dayOfWeek: '수요일',
        I: 0,
        O: 0,
        D: 0,
    },
    {
        dayOfWeek: '목요일',
        I: 0,
        O: 0,
        D: 0,
    },
    {
        dayOfWeek: '금요일',
        I: 0,
        O: 0,
        D: 0,
    },
    {
        dayOfWeek: '토요일',
        I: 0,
        O: 0,
        D: 0,
    },
];

const ReductWeekData = (state = WeekData, action: {type: string; payload: any}) => {
    switch (action.type) {
        case 'INIT_WEEK_DATA': {
            let copyState: Array<string | number> = [...action.payload];
            return copyState;
        }
        case 'SET_WEEK_STOCK': {
            let copyState = [...state];
            if (action.payload.ProductState === 'I') {
                if (action.payload.PackageType === 'P') {
                    copyState[nowDay].I += parseInt(action.payload.Quan) * action.payload.PackageUnit;
                } else if (action.payload.PackageType === 'U') {
                    copyState[nowDay].I += parseInt(action.payload.Quan);
                }
            } else if (action.payload.ProductState === 'O') {
                if (action.payload.PackageType === 'P') {
                    copyState[nowDay].O += parseInt(action.payload.Quan) * action.payload.PackageUnit;
                } else if (action.payload.PackageType === 'U') {
                    copyState[nowDay].O += parseInt(action.payload.Quan);
                }
            } else if (action.payload.ProductState === 'D') {
                if (action.payload.PackageType === 'P') {
                    copyState[nowDay].D += parseInt(action.payload.Quan) * action.payload.PackageUnit;
                } else if (action.payload.PackageType === 'U') {
                    copyState[nowDay].D += parseInt(action.payload.Quan);
                }
            }

            return copyState;
        }

        default:
            return state;
    }
};

export default ReductWeekData;
