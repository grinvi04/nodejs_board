var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.writeHead(res.statusCode);
  res.end('respond with a resource');
});

module.exports = router;
