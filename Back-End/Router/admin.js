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
const multer = require("multer")
const path = require("path")

const allowOnlyAdmin = (req, res, next) => {
  if (!req.user.role === "admin") {
    return res.status(403).json({
      message: 'เฉพาะแอดมินเท่านั้น'
    })
  }
  next()
}

const storage = multer.diskStorage({
  destination: '../Font-End/public/upload-photo',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage })

router.post("/admin/user",VerifyToken, RegisterValidator, async (req, res) => {
  const Validator_error = validationResult(req);
  if (!Validator_error.isEmpty()) {
    return res.status(400).json({
      validator: Validator_error.array(),
    });
  }
  try {
    const { username, email, password, role } = req.body;
    const [row] = await pool.execute("SELECT * FROM `users` WHERE email = ?", [
      email,
    ]);
    if (row.length >= 1) {
      return res.status(409).json({
        message: "อีเมลนี้ถูกใช้ไปแล้ว",
      });
    } else {
      const response = await pool.execute(
        "INSERT INTO `users` (`id_user`, `username`, `email`, `password`, `role`, `created_at`) VALUES (NULL, ?, ?, ?, ?, CURRENT_TIMESTAMP)",
        [username, email, password, role]
      );
      res.status(201).json({
        message: "สร้างผู้ใช้สำเร็จ",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "เกิดข้อผิดพลาดบางอย่างจากเซิฟเวอร์",
    });
  }
});

router.put("/admin/user/:id",VerifyToken, RegisterValidator, async (req, res) => {
  const Validator_error = validationResult(req);
  if (!Validator_error.isEmpty()) {
    return res.status(400).json({
      validator: Validator_error.array(),
    });
  }
  try {
    const id = req.params.id
    const { username, email, password, role } = req.body;

    const response = await pool.execute(
      "UPDATE `users` SET `username` = ?, `email` = ?, `password` = ?, `role` = ? WHERE `users`.`id_user` = ?",
      [username, email, password, role, id]
    );
    res.status(201).json({
      message: "แก้ไขผู้ใช้สำเร็จ",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "เกิดข้อผิดพลาดบางอย่างจากเซิฟเวอร์",
    });
  }
});

router.delete("/admin/user/:id",VerifyToken,async(req,res)=>{
  try {
    
    const id = req.params.id
    const response = await pool.execute("DELETE FROM users WHERE `users`.`id_user` = ?",
      [id]
    )
    
    res.status(200).json({
        message:'ลบสำเร็จ'
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "เกิดข้อผิดพลาดบางอย่างจากเซิฟเวอร์",
    });
  }
})
module.exports = router;
