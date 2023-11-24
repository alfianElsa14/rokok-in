const express = require('express')
const { registerUser, login, getAllUser, getUserById, editUser } = require('../controllers/userController')
const upload = require('../middleware/multer')

const router = express.Router()

router.get('/', getAllUser)
router.get('/detail/:id', getUserById)
router.put('/edit/:id', upload.single('image'), editUser)
router.post('/registerUser', registerUser)
router.post('/login', login)

module.exports = router
