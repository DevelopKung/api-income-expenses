const mongoose = require("../config/mongo.config");
const AutoIncrementFactory = require('mongoose-sequence');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const AutoIncrement = AutoIncrementFactory(mongoose.connection);
const Schema = mongoose.Schema;

let income_expense_type = new Schema({

  inc_exp_type_id: { type: Number, index: true, unique: true, auto: true },
  inc_exp_type_name: { type: String, default: null},
  inc_exp_type_value: { type: String, default: null },
  inc_exp_type_color: { type: String, default: null },
  inc_exp_type_icon: { type: String, default: null },
  status: { type: Boolean, default: true },

  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },

}, { collection: "income_expense_type" });

income_expense_type.plugin(aggregatePaginate);
income_expense_type.plugin(AutoIncrement, { id: 'inc_exp_type_id_counter', inc_field: 'inc_exp_type_id' });

module.exports = mongoose.model("income_expense_type", income_expense_type);