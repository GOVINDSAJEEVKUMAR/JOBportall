const exprees = require("express");
const router = exprees.Router();
const upload = require("../Middleware/Upload")

const {SignUp, Get, Login,Logout,getUser} = require("../Controller/Register")


router.post('/', upload.single('profilePhoto'),SignUp)
router.get('/get', Get)
router.get("/user/:id",getUser)
router.post('/login', Login)
router.post('/logout',Logout)







module.exports = router