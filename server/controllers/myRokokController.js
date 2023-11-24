const { handleInternalError, handleValidationError, handleNotFoundError, handleExistingRecordError } = require('../middleware/errorHandler');
const { myRokok, Rokok, User } = require('../models')
const midtransClient = require('midtrans-client');
const joi = require('joi');

exports.addMyRokok = async (req, res) => {
    try {
        const { rokokId } = req.params

        const dataRokok = await Rokok.findByPk(rokokId)

        if (!dataRokok) {
            return handleNotFoundError(res, 'Rokok');
        }

        const existingRokok = await myRokok.findOne({
            where: {
                userId: req.user.id,
                rokokId
            }
        });

        if (existingRokok) {
            return handleExistingRecordError(res, 'Rokok sudah ditambahkan ke list');
        }

        const result = await myRokok.create({
            userId: req.user.id,
            rokokId,
            status: 'Pending'
        })
        res.status(201).json({ status: 'sukses', result })
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.getMyRokok = async (req, res) => {
    try {
        console.log(req.user, "<<<<<<");
        const myList = await myRokok.findAll({
            where: {
                userId: req.user.id
            },
            include: [
                {
                    model: Rokok
                }
            ]
        })
        res.status(200).json(myList)
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.deleteMyRokok = async (req, res) => {
    try {
        const { id } = req.params
        const myList = await myRokok.findOne({
            where: {
                id
            }
        })

        if (!myList) {
            return handleNotFoundError(res, 'Rokok');
        }

        const deleted = await myRokok.destroy({
            where: {
                id
            }
        })
        res.status(200).json({ message: 'sukses delete', myList })
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.midtransPayment = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findByPk(req.user.id)

        const myrokok = await myRokok.findOne({
            where: {
                id
            },
            include: [
                {
                    model: Rokok
                }
            ]
        })

        if (!myrokok) {
            return handleNotFoundError(res, 'Rokok');
        }

        let snap = new midtransClient.Snap({
            isProduction: false,
            serverKey: process.env.SERVER_KEY_MIDTRANS,
        });

        let parameter = {
            "transaction_details": {
                "order_id": "TRANSACTION" + Math.floor(1000000 + Math.random() * 9000000),
                "gross_amount": myrokok.Rokok.price,
            },
            "credit_card": {
                "secure": true
            },
            "customer_details": {
                "email": user.email,
            }
        };

        const midtransToken = await snap.createTransaction(parameter)
        res.status(200).json(midtransToken)
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.statusMyRokok = async (req, res) => {
    try {
        const { id } = req.params
        const myList = await myRokok.findOne({
            where: {
                id
            }
        })

        if (!myList) {
            return handleNotFoundError(res, 'Rokok');
        }

        const updated = await myRokok.update({
            status: 'Completed'
        }, {
            where: {
                id
            }
        })
        res.status(200).json({ message: 'sukses update status', myList })
    } catch (error) {

    }
}