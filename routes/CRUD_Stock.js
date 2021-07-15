const {Router} = require('express');
const {connection} = require('../DB/dbConfig.js');
const StockRouter = Router();
const moment = require('moment-timezone');

const startWeekDay = moment().startOf('week').add(0, 'days').tz('Asia/Seoul').format('YYYY-MM-DD 00:00:00');
const endWeekDay = moment().startOf('week').add(6, 'days').tz('Asia/Seoul').format('YYYY-MM-DD 23:59:59');

StockRouter.get('/list', (req, res) => {
    connection.query(
        `SELECT W.ProductIdx, PackageQuan, UnitQuan, AbandonQuan, Processors, SUM(ChgQuan) AS WeekShipping
        FROM  
            (
                SELECT P.ProductIdx, ChgTarget, IF(ChgTarget = "U", ChgQuan, ChgQuan*PackageMinUnitQuan) AS ChgQuan, ProductState
                FROM 
                    (
                        SELECT Productidx, initDate, productState, ChgTarget, ChgQuan
                        FROM StockHisLst
                        WHERE (ProductState = 'O' OR ProductState = 'N') AND (initDate BETWEEN '${startWeekDay}' AND '${endWeekDay}')
                    ) H
                LEFT JOIN ProductLst P ON H.ProductIdx = P.ProductIdx
        
            ) W
        LEFT JOIN StockLst S ON W.ProductIdx = S.ProductIdx
        GROUP BY W.ProductIdx
        `,
        function (err, results, fields) {
            if (err) throw error;
            return res.send(results);
        },
    );
});

// 추가는 ProductLst 상품 추가 시 트리거로 기본 생성됨.. ProductIdx FK임.. StockLst만 추가 불가능

StockRouter.put('/mod', async (req, res) => {
    let queryStrings = '';
    switch (req.body.ProductState) {
        case 'I':
            if (req.body.SetPackage === 'P') {
                queryStrings = `UPDATE StockLst
                                SET PackageQuan=PackageQuan+${parseInt(req.body.SetQuan)}
                                WHERE ProductIdx = ${req.body.ProductIdx}`;
            } else if (req.body.SetPackage === 'U') {
                queryStrings = `UPDATE StockLst
                                SET UnitQuan=UnitQuan+${parseInt(req.body.SetQuan)}
                                WHERE ProductIdx = ${req.body.ProductIdx}`;
            }
            break;
        case 'O':
            if (req.body.SetPackage === 'P') {
                queryStrings = `UPDATE StockLst
                                SET PackageQuan=PackageQuan-${parseInt(req.body.SetQuan)}
                                WHERE ProductIdx = ${req.body.ProductIdx}`;
            } else if (req.body.SetPackage === 'U') {
                queryStrings = `UPDATE StockLst
                                SET UnitQuan=UnitQuan-${parseInt(req.body.SetQuan)}
                                WHERE ProductIdx = ${req.body.ProductIdx}`;
            }
            break;
        case 'D':
            if (req.body.SetPackage === 'P') {
                queryStrings = `UPDATE StockLst
                                SET AbandonQuan=AbandonQuan+${parseInt(req.body.SetQuan)}
                                WHERE ProductIdx = ${req.body.ProductIdx}`;
            } else if (req.body.SetPackage === 'U') {
                queryStrings = `UPDATE StockLst
                                SET AbandonQuan=AbandonQuan+${parseInt(req.body.SetQuan)}
                                WHERE ProductIdx = ${req.body.ProductIdx}`;
            }
            break;
    }

    connection.query(queryStrings, function (err, results, fields) {
        if (err) throw err;
        return res.send(results);
    });
});

// 삭제는 ProductLst 상품 삭제 시 자동 삭제 (CASECADE)
// 프론트엔드쪽에서 재고가 있는 상품은 삭제 시 경고 메시지 출력

module.exports = {
    StockRouter,
};
