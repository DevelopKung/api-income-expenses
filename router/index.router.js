const authJwt = require("../middleware");
const express = require('express')
var router = express.Router();

/** Router */
const auth = require('./auth.router');
router.use('/auth', auth);

const register = require('./register.router');
router.use('/register', register);

const incomeExpense = require('./income-expense.router');
router.use('/income-expense', authJwt, incomeExpense);

const incomeExpenseGroup = require('./income-expense-group.router');
router.use('/income-expense-group', authJwt, incomeExpenseGroup);

const incomeExpenseType = require('./income-expense-type.router');
router.use('/income-expense-type', authJwt, incomeExpenseType);

module.exports = router