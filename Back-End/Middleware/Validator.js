const { checkSchema } = require('express-validator')



const RegisterValidator = checkSchema({
    username: {
        in: ["body"],
        isLength: { options: { min: 3 } },
        errorMessage: 'กรุณากรอกชื่อผู้ใช้ 3 ตัวขึ้นไป'
    },
    email: {
        in: ["body"],
        isEmail: true,
        normalizeEmail: true,
        errorMessage: 'อีเมลรูปแบบไม่ถูกต้อง'
    },
    password: {
        in: ["body"],
        isLength: { options: { min: 8 } },
        errorMessage: 'กรุณากรอกรหัสผ่าน 8 ตัวขึ้นไป'
    },
})

const LoginValidator = checkSchema({
    email: {
        in: ["body"],
        isEmail: true,
        normalizeEmail: true,
        errorMessage: 'อีเมลรูปแบบไม่ถูกต้อง'
    },
    password: {
        in: ["body"],
        isLength: { options: { min: 8 } },
        errorMessage: 'กรุณากรอกรหัสผ่าน 8 ตัวขึ้นไป'
    },
})

module.exports = { LoginValidator, RegisterValidator }