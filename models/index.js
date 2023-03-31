const db = {};

db.Members = require("./member.model.js")
db.Groups = require("./income-expense-group.model.js")
db.Types = require("./income-expense-type.model.js")
db.IncomeExpense = require("./income-expense.model.js")
module.exports = db;