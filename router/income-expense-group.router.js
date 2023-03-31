const express = require('express')
const income_expense_group = require('../controller/income-expense-group.controller');
var router = express.Router();

router.get('/', income_expense_group.findAll );
router.get('/:id', income_expense_group.findOne );
router.post('/', income_expense_group.create );
router.put('/:id', income_expense_group.update );
router.delete('/:id', income_expense_group.delete );

module.exports = router;