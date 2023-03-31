const express = require('express')
const income_expense = require('../controller/income-expense.controller');
var router = express.Router();

router.get('/', income_expense.findAll );
router.get('/:id', income_expense.findOne );
router.post('/', income_expense.create );
router.put('/:id', income_expense.update );
router.delete('/:id', income_expense.delete );

module.exports = router;