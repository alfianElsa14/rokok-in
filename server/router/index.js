const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const rokoRouter = require('./rokok')
const myRokokRouter = require('./myRokok')
const { authentication } = require('../middleware/auth')

router.use('/users', userRouter)
router.use('/rokoks', rokoRouter)
router.use('/myRokok',authentication, myRokokRouter)

module.exports = router
