const mongoose = require("../config/mongo.config");
const AutoIncrementFactory = require('mongoose-sequence');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const AutoIncrement = AutoIncrementFactory(mongoose.connection);
const Schema = mongoose.Schema;

let income_expense_group = new Schema({

  inc_exp_group_id: { type: Number, index: true, unique: true, auto: true },
  inc_exp_type_name: { type: String, default: null},
  inc_exp_type_value: { type: String, default: null },
  status: { type: Boolean, default: true },

  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },

}, { collection: "income_expense_group" });

income_expense_group.plugin(aggregatePaginate);
income_expense_group.plugin(AutoIncrement, { id: 'inc_exp_group_id_counter', inc_field: 'inc_exp_group_id' });
module.exports = mongoose.model("income_expense_group", income_expense_group);