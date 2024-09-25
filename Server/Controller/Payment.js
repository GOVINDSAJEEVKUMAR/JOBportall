
const express = require('express')
const Razorpay = require ('razorpay')


const Order = async(req,res)=>{
  const razorpay = new Razorpay({
    key_id : process.env.RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_SECERT

  })
  const options ={
    amount : req.body.amount,
    currency :req.body.currency,
    receipt:"Reacipt",
    payment_capture : 1
  }
  try{
    const response =await razorpay.orders.create(options)
    res.json({
      order_id:response.id,
      currenct:response.currency,
      amount:response.amount
    })
  }catch(error){
    res.status(500).send("Server error")
  }
}

const payment = async(req,res)=>{
  const razorpay = new Razorpay({
    key_id : process.env.RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_SECERT
  })
  try{
    const payment = await razorpay.payments.fetch(Id)
    if(!payment){
      return res.status(500).json("Error..😬😬😬😬😬😬😬😬")
    }
    res.json({
      status:payment.status,
      method: payment.method,
      amount : payment.amount,
      currency : payment.currency
    })

  }catch(error){
    res.status(500).json("Failed to fetch 🤦‍♂️🤦‍♂️🤦‍♂️🤦‍♂️")
  }
}


module.exports = {Order,payment}