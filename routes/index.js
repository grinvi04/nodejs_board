var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var squel2 = require('squel');


/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log('test');
});
*/
router.get('/', function (req, res, next) {
    pool.getConnection(function(err, connection) {
        // use the connection

        var s = squel2.select()
            .from("DD_VENDOR")
            .field("VEN_ID")
            .field("VEN_NM")
            .limit(10);

        console.log(squel2.select()
            .from("DD_VENDOR")
            .field("VEN_ID")
            .field("VEN_NM")
            .limit(10).toString());
        connection.query(s.toString(), function(err, rows) {
            if(err) {
                console.error("err : " + err);
            }

            console.log("rows : " + JSON.stringify(rows));

            res.render('index', { title : 'vendor', rows : rows});
            connection.release();

        });
    })
});

router.get('/mobile/users/getMainview', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var query = "SELECT BN.EXPOSE_POS" +
                         ", BN.EXPOSE_ORDERS" +
                         ", BN.URL" +
                         ", BN.REMARKS" +
                         ", IFNULL(getFunFilePath(BN.FILE_ID), '') as FILE_NM1" +
                         ", IFNULL(getFunFilePath(BN.FILE_ID_1), '') as FILE_NM2" +
                    " FROM DD_BANNER BN" +
                    " WHERE 1 = 1";

        if(req.body.compId) {
            var addQuery = " AND BN.COMP_ID = " + "'" + req.body.compId + "'";
            query += addQuery;
        }
        var condition = " AND BN.BANNER_FR <= DATE_FORMAT(now(),'%Y%m%d') " +
                        " AND BN.BANNER_TO >= DATE_FORMAT(now(),'%Y%m%d') " +
                        " AND WEB_APP_TP = 'IOS' " +
                        " AND BN.USE_YN = 'Y' " +
                        " ORDER BY BN.EXPOSE_POS, BN.EXPOSE_ORDERS";
        query += condition;

        connection.query(query, function (err, rows) {
            if(err) {
                console.error("err : " + err);
            }

            console.log("rows : " + JSON.stringify(rows));

            var result = JSON.stringify(rows);

            res.setHeader('Content-Type', 'application/json');
            res.writeHead(res.statusCode);
            res.end(result);
            connection.release();
        });
    });
});

module.exports = router;
