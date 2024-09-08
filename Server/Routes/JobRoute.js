const express = require ("express")
const router = express.Router()
const Job = require ("../Controller/Job")


router.get("/get",Job.getallJob)
router.post("/create",Job.newJob)
router.put("/edit/:id",Job.loadEditJob)
router.get("/get/:id",Job.getJob)
router.delete("/delete/:id",Job.deleteJob)


module.exports = router