const { decodeToken } = require("../helper/jwt")
const { handleInternalError } = require("./errorHandler")

exports.authentication = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization

        if (!bearerToken) {
            return res.status(403).json({ message: 'Invalid Token' })
        }

        const access_token = bearerToken.replace('Bearer ', '')
        const decode = decodeToken(access_token)
        req.user = decode

        next()
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.authorization = async (req, res, next) => {
    try {
        const role = req.user.role
        if (role !== "admin") {
            return res.status(403).json({ message: "akses tidak di izinkan, anda bukan admin" })
        }
        
        next()
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.userAuthorization = async (req, res, next) => {
    try {
        const role = req.user.role
        if (role !== "user") {
            return res.status(403).json({ message: "akses tidak di izinkan" })
        }
        
        next()
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}