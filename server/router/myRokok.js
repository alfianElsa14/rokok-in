const express = require('express')
const { addMyRokok, getMyRokok, deleteMyRokok, midtransPayment, statusMyRokok } = require('../controllers/myRokokController')
const { userAuthorization } = require('../middleware/auth')
const router = express.Router()

router.use(userAuthorization)
router.get('/', getMyRokok)
router.post('/add/:rokokId', addMyRokok)
router.delete('/delete/:id', deleteMyRokok)
router.patch('/status/:id', statusMyRokok)
router.post('/midtransToken/:id', midtransPayment)


module.exports = router