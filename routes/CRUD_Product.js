const {Router} = require('express');
const {connection} = require('../DB/dbConfig.js');
const ProductRouter = Router();
const moment = require('moment-timezone');
/* ./product/~Routes */

const startWeekDay = moment().startOf('week').add(0, 'days').tz('Asia/Seoul').format('YYYY-MM-DD 00:00:00');
const endWeekDay = moment().startOf('week').add(6, 'days').tz('Asia/Seoul').format('YYYY-MM-DD 23:59:59');

ProductRouter.get('/list', (req, res) => {
    connection.query('SELECT * FROM ProductLst', function (err, results, fields) {
        if (err) throw err;
        return res.send(results);
    });
});

ProductRouter.post('/add', (req, res) => {
    connection.query(
        `INSERT INTO 
        ProductLst(ProductNum, BarcodeNum, ProductNam, ProductOption, PackageUnit, PackageMinUnitQuan, MinimumUnit, Processors) 
        VALUES ('${req.body.ProductNum}', '${req.body.BarcodeNum}'
        , '${req.body.ProductNam}', '${req.body.ProductOption}'
        , '${req.body.PackageUnit}', ${parseInt(req.body.PackageMinUnitQuan)}
        , '${req.body.MinimumUnit}', ${parseInt(req.body.Processors)});`,
        function (err, results, fields) {
            if (err) throw err;
            return res.send(results);
        },
    );
});
ProductRouter.put('/mod', (req, res) => {
    console.log(req.body);
    connection.query(
        `UPDATE ProductLst
        SET ProductNum = '${req.body.ProductNum}', BarcodeNum='${req.body.BarcodeNum}'
        , ProductNam='${req.body.ProductNam}', ProductOption='${req.body.ProductOption}'
        , PackageUnit='${req.body.PackageUnit}', PackageMinUnitQuan=${parseInt(req.body.PackageMinUnitQuan)}
        , MinimumUnit='${req.body.MinimumUnit}', Processors=${parseInt(req.body.Processors)}
        WHERE ProductIdx = ${parseInt(req.body.ProductIdx)}
        `,
        function (err, results, fields) {
            if (err) throw err;
            return res.send(results);
        },
    );
});
ProductRouter.delete('/del', (req, res) => {
    connection.query(`DELETE FROM ProductLst WHERE ProductIdx = ${req.query.ProductIdx}`, function (err, results, fields) {
        if (err) throw err;
        return res.send(results);
    });
});

module.exports = {
    ProductRouter,
};
