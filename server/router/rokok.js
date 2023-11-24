const express = require('express')
const { getAllRokok, addRokok, addStock, reduceStock, getDetailRokok, deleteRokok } = require('../controllers/rokokController')
const { authentication, authorization } = require('../middleware/auth')
const upload = require('../middleware/multer')
const router = express.Router()

router.get('/', getAllRokok)
router.get('/detail/:id', getDetailRokok)
router.use(authentication)
router.post('/addRokok', authorization, upload.single('image'), addRokok)
router.patch('/addStock/:id', authorization, addStock)
router.delete('/deleteRokok/:id', authorization, deleteRokok)
router.patch('/reduceStock/:id', reduceStock)

module.exports = router
