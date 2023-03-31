const db = require("../models");
const Groups = db.Groups
module.exports = {

  findAll: async(req, res) => {
    try {
      let data = await Groups.find()
      res.status(200).send({
        status: true,
        message: "success",
        payload: data
      });
    } catch (error) {
      res.status(500).send({ status: false, message: error.message });
    }
  },

  findOne: async(req, res) => {

  },

  create: async(req, res) => {
    let form = req.body
    if (form) {
      try {
        await new Groups(form).save(form)
        res.status(200).send({ status: true, message: "success" });
      } catch (error) {
        res.status(500).send({ status: false, message: error.message });
      }
    } else {
      res.status(403).send({ status: false, message: 'ข้อมูลไม่ถูกต้อง' });
    }
  },

  update: async(req, res) => {

  },

  delete: async(req, res) => {

  },

}