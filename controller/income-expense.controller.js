const db = require("../models");
const Members = db.Members
const IncomeExpense = db.IncomeExpense
const Types = db.Types
const moment = require('moment-timezone')

module.exports = {

  findAll: async(req, res) => {
    if (req.member) {
      try {
        let query = []
        const member_id = req.member._id

        query.push({ $match: { member_id } })

        query.push({
          $lookup: {
            from: Types.collection.collectionName,
            localField: 'inc_exp_type',
            foreignField: 'inc_exp_type_id',
            as: 'type'
          }
        });

        // let toDay = moment().utc().startOf('day').toDate()
        // query.push({
        //   $match: {
        //     $and:[
        //       {
        //         $or:[
        //           { 'start_date':null },
        //           { 'start_date':{ $lte:toDay }  }
        //         ]  
        //       },
        //       {
        //         $or:[
        //           { 'end_date':null },
        //           { 'end_date':{ $gte:toDay }  }
        //         ]  
        //       }
        //     ]
        //   }
        // })

        let data = await IncomeExpense.aggregate(query)
        res.status(200).send({
          status: true,
          message: "success",
          payload: data
        });
      } catch (error) {
        res.status(500).send({ status: false, message: error.message });
      }
    }
  },

  findOne: async(req, res) => {
    const id = req.params.id;
    const member_id = req.member._id
    if (id) {
      try {
        let data = await IncomeExpense.findOne({ _id: id, member_id })
        res.status(200).send({ status: true, message: "success", payload: data });
      } catch (error) {
        res.status(500).send({ status: false, message: error.message });
      }
    } else {
      res.status(403).send({ status: false, message: 'ข้อมูลไม่ถูกต้อง' });
    }
  },

  create: async(req, res) => {
    let form = req.body
    if (form.inc_exp_title && form.inc_exp_type && form.inc_exp_group && form.inc_exp_date && form.inc_exp_amount && req.member) {
      try {
        form.member_id = req.member._id
        await new IncomeExpense(form).save(form)
        res.status(200).send({ status: true, message: "success" });
      } catch (error) {
        res.status(500).send({ status: false, message: error.message });
      }
    } else {
      res.status(403).send({ status: false, message: 'ข้อมูลไม่ถูกต้อง' });
    }
  },

  update: async(req, res) => {
    const id = req.params.id;
    let form = req.body
    if (form.inc_exp_title && form.inc_exp_type && form.inc_exp_group && form.inc_exp_date && form.inc_exp_amount && req.member) {
      try {
        form.updated_date = new Date()
        await IncomeExpense.findOneAndUpdate({ _id: id }, form)
        res.status(200).send({ status: true, message: "success" });
      } catch (error) {
        res.status(500).send({ status: false, message: error.message });
      }
    } else {
      res.status(403).send({ status: false, message: 'ข้อมูลไม่ถูกต้อง' });
    }
  },

  delete: async(req, res) => {
    const id = req.params.id
    if (id) {
      try {
        await IncomeExpense.deleteOne({ _id: id })
        res.status(200).send({ status: true, message: "success" });
      } catch (error) {
        res.status(500).send({ status: false, message: error.message });
      }
    } else {
      res.status(403).send({ status: false, message: 'ข้อมูลไม่ถูกต้อง' });
    }
  },

}