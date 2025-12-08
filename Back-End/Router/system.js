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

const allowOnlyAdminAndUser = (req, res, next) => {
  if (!req.user.role === "admin") {
    return res.status(403).json({
      message: 'เฉพาะแอดมินเท่านั้น'
    })
  }else if (!req.user.role === "menager") {
    return res.status(403).json({
      message: 'เฉพาะผู้จัดการเท่านั้น'
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

router.get("/SelectUsers", VerifyToken, allowOnlyAdminAndUser, async (req, res) => {
  try {
    const {id_user} = req.user
    const [response] = await pool.execute("SELECT *,DATE_FORMAT(created_at,'%Y-%m-%d') AS Date_At FROM `users` WHERE `id_user` != ? ORDER BY `users`.`id_user` DESC",[id_user])
    res.status(200).json({
      row:response
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "เกิดข้อผิดพลาดบางอย่างจากเซิฟเวอร์",
    });
  }
})


router.post("/CreatedReport",VerifyToken,allowOnlyAdminAndUser,upload.single("photo"),async(req,res)=>{
  try {
    const {id_user} = req.user
    const {title,message,minHum,maxHum,minTemp,maxTemp} = req.body
    const photo = req.file.filename
    const response =await pool.execute("INSERT INTO `reports` (`id_report`, `title`, `photo`, `message`, `minHum`, `maxHum`, `minTemp`, `maxTemp`, `id_user`, `created_at`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)"
      ,[title,photo,message,minHum,maxHum,minTemp,maxTemp,id_user])
    
    res.status(201).json({
        message:'เพิ่มรายงานสำเร็จ'
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "เกิดข้อผิดพลาดบางอย่างจากเซิฟเวอร์",
    });
  }
})

router.get("/Report",VerifyToken,allowOnlyAdminAndUser,async(req,res)=>{
  try {
    const [response] = await pool.execute("SELECT *,DATE_FORMAT(created_at,'%Y-%m-%d') AS Date_At FROM `reports` ORDER BY `reports`.`id_report` DESC")
    res.status(200).json({
        row:response
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "เกิดข้อผิดพลาดบางอย่างจากเซิฟเวอร์",
    });
  }
})

router.put("/Report",VerifyToken,allowOnlyAdminAndUser,upload.single("photo"),async(req,res)=>{
  try {
    const {title,message,oldphoto,id_report} = req.body
    
    const photo = req.file ? req.file.filename : oldphoto

    const response = await pool.execute("UPDATE `reports` SET `title` = ?, `photo` = ?, `message` = ? WHERE `reports`.`id_report` = ?",
      [title,photo,message,id_report]
    )
    
    res.status(200).json({
        message:'แก้ไขรายงานสำเร็จ'
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "เกิดข้อผิดพลาดบางอย่างจากเซิฟเวอร์",
    });
  }
})

router.delete("/Report/:id",VerifyToken,allowOnlyAdminAndUser,async(req,res)=>{
  try {
    
    const id = req.params.id
    const response = await pool.execute("DELETE FROM reports WHERE `reports`.`id_report` = ?",
      [id]
    )
    
    res.status(200).json({
        message:'ลบรายงานสำเร็จ'
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "เกิดข้อผิดพลาดบางอย่างจากเซิฟเวอร์",
    });
  }
})

module.exports = router;
