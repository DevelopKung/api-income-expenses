const config = require("./../config/config");
const jwt = require("jsonwebtoken");
const db = require("../models");
const Members = db.Members
const bcrypt = require("bcrypt");
const { remove } = require("../models/member.model");

module.exports = {
  login: async(req, res) => {
    let time = "24h";
    try {
      if (req.body.username && req.body.password) {
        let member = await Members.findOne({ username: req.body.username })
        let comparePass = await bcrypt.compare(req.body.password, member.password);
        if (comparePass) {
          member = JSON.parse(JSON.stringify(member))
          delete member.password
          let token = jwt.sign({ member }, config.jwt_secret, { expiresIn: time });
          let data = { token, expiresIn: time };
          res.status(200).send({ status: true, message: "success", payload: data });
        } else {
          res.status(403).send({ status: false, message: "รหัสผ่านไม่ถูกต้อง!" });
        }
      } else res.status(403).send({ status: false, message: "รหัสผ่านไม่ถูกต้อง!" });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ status: false, message: error.message||"รหัสผ่านไม่ถูกต้อง!" });
    }
  },

  user: async(req, res) => {
    try {
      let token = req.headers.authorization.replace(("Bearer " || "bearer "), "");
      if (token) {
        const decoded = jwt.verify(token, config.jwt_secret);
        if (decoded) {
          res.status(200).send({
            status: true,
            message: "success",
            payload: decoded,
          });
        } else {
          res.status(403).send({
            status: false,
            message: "ไม่พบโทเค็น",
          });
        }
      } else {
        res.status(403).send({
          status: false,
          message: "ไม่พบโทเค็น",
        });
      }
    } catch (error) {
      res.status(403).send({
        status: false,
        message: "username password ไม่ถูกต้อง",
      });
    }
  },

  register: async(req, res) => {
    let form = req.body;
    form.password = await bcrypt.hash(req.body.password, 10);

    try {
      if (form.first_name && form.last_name && form.username && form.password) {
        let user = await Members.findOne({ username: form.username })
        if (user) {
          res.status(200).send({ status: false, message: "มีผู้ใช้ชื่อนี้แล้ว" });
          return
        }
        await Members(form).save(form)
        res.status(200).send({ status: true, message: "success" });
      } else {
        res.status(403).send({ status: false, message: "ข้อมูลไม่ถูกต้อง" });
      }
    } catch (error) {
      res.status(500).send({ status: false, message: error.message });
    }
  },
};