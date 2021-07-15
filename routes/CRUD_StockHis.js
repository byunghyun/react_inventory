const {Router} = require('express');
const {connection} = require('../DB/dbConfig.js');
const StockHisRouter = Router();
const moment = require('moment-timezone');

const startWeekDay = moment().startOf('week').add(0, 'days').tz('Asia/Seoul').format('YYYY-MM-DD 00:00:00');
const endWeekDay = moment().startOf('week').add(6, 'days').tz('Asia/Seoul').format('YYYY-MM-DD 23:59:59');

// 추가는 ProductLst 상품 추가 시 트리거로 기본 생성됨..

StockHisRouter.get('/list', (req, res) => {
    console.log(req.body);
    const query = `
    SELECT a.InitDate, a.ProductIdx, b.ProductNum, b.BarcodeNum, b.ProductNam, b.ProductOption, a.ProductState, a.ChgTarget, a.ChgQuan, a.Processors
    , IF(a.ChgTarget = "U", b.MinimumUnit, b.PackageUnit) AS PackageUnit
    FROM (
        SELECT ProductIdx, InitDate, ProductState, ChgTarget, ChgQuan, Processors FROM StockHisLst
        ) a
    LEFT JOIN ProductLst b ON a.ProductIdx = b.ProductIdx
    ORDER BY initDate DESC
    LIMIT 0, 10
`;
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        return res.send(results);
    });
});

// 삭제는 ProductLst 상품 삭제 시 자동 삭제 (CASECADE)
// 프론트엔드쪽에서 재고가 있는 상품은 삭제 시 경고 메시지 출력

module.exports = {
    StockHisRouter,
};
