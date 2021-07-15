const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const moment = require('moment-timezone');

const http = require('http').createServer(app);
const {Server} = require('socket.io');
const io = new Server(http);

/* CRUD ROUTES */
const {ProductRouter} = require('./routes/CRUD_Product.js');
const {StockRouter} = require('./routes/CRUD_Stock.js');
const {StatisticsRouter} = require('./routes/CRUD_Statistics.js');
const {StockHisRouter} = require('./routes/CRUD_StockHis.js');

/* config */
const {connection} = require('./DB/dbConfig.js');

/* NODEJS 필수 미들웨어 설정 */
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'views/build')));
app.use(express.urlencoded({extended: true}));

/* NODEJS 기본 세팅 */
dotenv.config();
app.set('port', process.env.DEV_PORT || 8080);

const server = async () => {
    console.log('test');
    try {
        await connection.connect();
        app.use('/statistics', StatisticsRouter);
        app.use('/product', ProductRouter);
        app.use('/stock', StockRouter);
        app.use('/stockHis', StockHisRouter);

        app.listen(app.get('port'), () => {
            console.log(`${app.get('port')} PORT SERVER ON (^0^)`);
        });

        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'views/build/index.html'));
        });

        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'views/build/index.html'));
        });
    } catch (err) {
        console.log(err);
    }
};

server();
