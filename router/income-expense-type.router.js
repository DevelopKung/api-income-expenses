const express = require('express')
const income_expense_type = require('../controller/income-expense-type.controller');
var router = express.Router();

router.get('/', income_expense_type.findAll );
router.get('/:id', income_expense_type.findOne );
router.post('/', income_expense_type.create );
router.put('/:id', income_expense_type.update );
router.delete('/:id', income_expense_type.delete );

module.exports = router;