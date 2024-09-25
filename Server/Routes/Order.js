const express = require ('express')
const router = express.Router()
const {Order,payment} = require ("../Controller/Payment")



router.post("/order",Order)
router.get ("/payment/:id",payment)


module.exports = router