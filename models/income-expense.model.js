const mongoose = require("../config/mongo.config");
const AutoIncrementFactory = require('mongoose-sequence');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const AutoIncrement = AutoIncrementFactory(mongoose.connection);
const Schema = mongoose.Schema;

let income_expense = new Schema({

  inc_exp_id: { type: Number, index: true, unique: true, auto: true },
  inc_exp_title: { type: String, default: null},
  inc_exp_note: { type: String, default: null },
  inc_exp_type: { type: Number, default: null },
  inc_exp_group: { type: String, default: null },
  inc_exp_date: { type: Date, default:  Date.now },
  inc_exp_amount: { type: Number, default: 0 },
  member_id: { type: String, default: null },

  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },

}, { collection: "income_expense" });

income_expense.plugin(aggregatePaginate);
income_expense.plugin(AutoIncrement, { id: 'inc_exp_id_counter', inc_field: 'inc_exp_id' });

module.exports = mongoose.model("income_expense", income_expense);