const {Router} = require('express');
const {connection} = require('../DB/dbConfig.js');
const StatisticsRouter = Router();
const moment = require('moment-timezone');

const startWeekDay = moment().startOf('week').tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');
const endWeekDay = moment().startOf('week').add(7, 'days').tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');

//통계관련 데이터 모음집
StatisticsRouter.get('/WeekData', (req, res) => {
    const query = `
    SELECT d.initDate, d.ProductState, d.ChgTarget, sum(ChanQuan) AS ChanQuan FROM (
        SELECT DATE_FORMAT(initDate, '%Y-%m-%d') AS initDate, ProductState, ChgTarget
            ,IF(ChgTarget='P', sum(PackageMinUnitQuan * ChgQuan), sum(ChgQuan)) AS ChanQuan
              FROM
                  (
                      SELECT ProductIdx, initDate, ProductState, ChgTarget, ChgQuan, AbandonQuan    
                      FROM StockHisLst
                      WHERE initDate BETWEEN '${startWeekDay}' AND '${endWeekDay}'        
                  ) h
              LEFT JOIN ProductLst a ON h.ProductIdx = a.ProductIdx
              GROUP BY ProductState, ChgTarget, DATE_FORMAT(initDate, '%Y%m%d')
        ) d
        GROUP BY ProductState, DATE_FORMAT(initDate, '%Y%m%d')
        ORDER BY initDate ASC
    `;
    console.log(query);
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        return res.send(results);
    });
});

module.exports = {
    StatisticsRouter,
};
