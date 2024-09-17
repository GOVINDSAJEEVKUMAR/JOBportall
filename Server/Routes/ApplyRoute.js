const expreess = require("express");
const router = expreess.Router();
const {ApplyJob, 
    getApplicants,
     updateStatus, 
     getMyApplication, 
     getall, 
     getMypost}= require ("../Controller/Application")
     const upload = require ("../Middleware/Upload")



router.post("/apply/:id",upload.single('resume'),ApplyJob)
router.get("/application/:id",getApplicants)
router.put("/update/:id",updateStatus)
router.get("/myapplication",getMyApplication)
router.get("/all",getall)
router.get("/mypost/:_id",getMypost)







module.exports = router