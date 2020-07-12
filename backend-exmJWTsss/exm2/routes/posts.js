const router = require('express').Router()
const verifyToken = require('../middleware/verifyToken')
const rolVerify = require('../middleware/rolValidation')


router.get('/', verifyToken,rolVerify(['seller','admin']), (req, res) => {
    // router.get('/', verifyToken, (req, res) => {
    res.status(200).send({user:req.userssss})
   
    // res.json({
    //     posts: {
    //         title: 'One posts cualquierae xD',
    //         description: 'Una vez me dijisite si era lo suficiente para ti, te mire no dije nada, pero nosabias cuando hermosa te vias cuando te ponias esa sonrisa'
    //     }
    // })
})

module.exports = router