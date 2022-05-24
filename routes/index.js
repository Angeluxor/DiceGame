var express = require('express');
var router = express.Router();

/**
 * Ruta a la página de inicio
 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Dice Game' });
});

module.exports = router;
