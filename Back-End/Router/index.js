const express = require("express");
const router = express.Router();
const { pool } = require("../Database/connectMysql");
const {
  LoginValidator,
  RegisterValidator,
} = require("../Middleware/Validator");
const { VerifyToken } = require("../Middleware/VerifyToken");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

router.post("/register", RegisterValidator, async (req, res) => {
  const Validator_error = validationResult(req);
  if (!Validator_error.isEmpty()) {
    return res.status(400).json({
      validator: Validator_error.array(),
    });
  }
  try {
    const { username, email, password } = req.body;
    const [row] = await pool.execute("SELECT * FROM `users` WHERE email = ?", [
      email,
    ]);
    if (row.length >= 1) {
      return res.status(409).json({
        message: "อีเมลนี้ถูกใช้ไปแล้ว",
      });
    } else {
      const response = await pool.execute(
        "INSERT INTO `users` (`id_user`, `username`, `email`, `password`, `role`, `created_at`) VALUES (NULL, ?, ?, ?, 'user', CURRENT_TIMESTAMP)",
        [username, email, password]
      );
      res.status(201).json({
        message: "สมัครสมาชิกสำเร็จ",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "เกิดข้อผิดพลาดบางอย่างจากเซิฟเวอร์",
    });
  }
});

router.post("/login", LoginValidator, async (req, res) => {
  const Validator_error = validationResult(req);
  if (!Validator_error.isEmpty()) {
    return res.status(400).json({
      validator: Validator_error.array(),
    });
  }
  try {
    const { email, password } = req.body;
    const [row] = await pool.execute(
      "SELECT * FROM `users` WHERE email = ? AND password = ?",
      [email, password]
    );
    if (row.length == 0) {
      res.status(404).json({
        message: "อีเมลหรือรหัสผ่านผิด",
      });
      return;
    } else {
      const user = row[0];
      const token = jwt.sign(
        { id_user: user.id_user, email: user.email, role: user.role },
        process.env.TOKEN_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        message: "เข้าสู่ระบบสำเร็จ",
        user: user,
        token: token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "เกิดข้อผิดพลาดบางอย่างจากเซิฟเวอร์",
    });
  }
});

router.get("/profile", VerifyToken, async (req, res) => {
  try {
    const { email } = req.user;
    const [row] = await pool.execute("SELECT * FROM `users` WHERE email = ?", [
      email,
    ]);
    if (row.length >= 1) {
      return res.status(200).json({
        user: row[0],
        token: req.token,
      });
    } else {
      res.status(404).json({
        message: "กรุณาเข้าสู่ระบบใหม่",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "เกิดข้อผิดพลาดบางอย่างจากเซิฟเวอร์",
    });
  }
});

router.put('/profile', VerifyToken, async (req, res) => {
  try {
    const { id_user } = req.user
    const { username, email, password } = req.body
    const response = await pool.execute("UPDATE `users` SET `username` = ?, `email` = ?, `password` = ? WHERE `users`.`id_user` = ?", [username, email, password, id_user])
    res.status(200).json({
      message: "แก้ไขข้อมูลสำเร็จ",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "เกิดข้อผิดพลาดบางอย่างจากเซิฟเวอร์",
    });
  }
})

module.exports = router;
