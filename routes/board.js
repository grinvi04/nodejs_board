/**
 * Created by kbm on 2016-04-28.
 */
var express = require('express');
var router = express.Router();
var squel = require('squel');



/* get users listing */
router.get('/', function (req, res, next) {
    // 그냥 board/로 접속할 경우 전체 목록으로 redirect
    res.redirect('/board/list/1');
});

router.get('/list/:page', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        // use the connection
        var sql = squel.select()
            .from("DD_BOARD")
            .field('BOARD_ID')
            .field('TITLE')
            .field('CONTENT')
            .where("BOARD_GRP_ID = 'BG00016'")
            .toString();
        console.log('sql : ' + sql);

        connection.query(sql, function (err, rows) {
            if (err) {
                console.log("rows : " + JSON.stringify(rows));
            }

            res.render('list', {title: '게시판 전체 목록 조회', rows: rows});
            connection.release();

        });
    });
});

router.get('/write', function (req, res, next) {
    res.render('write', {title : "게시판 글 쓰기"});
});

router.post('/write', function (req, res, next) {
    var regId = req.body.regId;
    var title = req.body.title;
    var content = req.body.content;

    var datas = [regId, title, content];

    pool.getConnection(function (err, connection) {
        // use the connection
        var sql = "INSERT INTO TEMP_BOARD(regId, title, content) VALUES(?, ?, ?)";

        connection.query(sql, datas, function (err, rows) {
            if(err) {
                console.log("err : " + err);
            }
            var result = "저장되었습니다.";

            res.redirect('/board');

            connection.release();
        });
    });
});

module.exports = router;