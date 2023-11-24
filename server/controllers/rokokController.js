const { handleInternalError, handleNotFoundError, handleExistingRecordError, handleValidationError } = require('../middleware/errorHandler');
const { Rokok } = require('../models')
const joi = require('joi');

exports.getAllRokok = async (req, res) => {
    try {
        const datarokok = await Rokok.findAll()
        res.status(200).json(datarokok)
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.getDetailRokok = async (req, res) => {
    try {
        const {id} = req.params

        const dataRokok = await Rokok.findOne({
            where: {
                id
            }
        })

        if(!dataRokok) {
            return handleNotFoundError(res, 'Rokok');
        }
        res.status(200).json(dataRokok)
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.addRokok = async (req, res) => {
    try {
        const newRokok = req.body

        const schema = joi.object({
            title: joi.string().required(),
            price: joi.number().required(),
            isi: joi.number().required(),
        })

        const { error } = schema.validate(newRokok)

        if (error) {
            return handleValidationError(res, error)
        }

        const existingRokok = await Rokok.findOne({
            where: {
                title: newRokok.title
            }
        });

        if (existingRokok) {
            return handleExistingRecordError(res, 'Rokok ini sudah tersedia.');
        }

        const updatedImg = `http://localhost:3300/${req.file.path}`

        const result = await Rokok.create({
            title: newRokok.title,
            price: newRokok.price,
            isi: newRokok.isi,
            image: updatedImg,
            stock: 10
        })

        res.status(201).json({ message: 'Rokok telah ditambahkan', result })
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.addStock = async (req, res) => {
    try {
        const {id} = req.params
        const newStock = req.body
        const dataRokok = await Rokok.findByPk(id)

        if(!dataRokok) {
            return handleNotFoundError(res, 'Rokok');
        }

        const schema = joi.object({
            stock: joi.number().required(),
        })

        const { error } = schema.validate(newStock)

        if (error) {
            return handleValidationError(res, error)
        }

        const updatedStock = dataRokok.stock + parseInt(newStock.stock);

        const result = await Rokok.update({
            stock: updatedStock,
        }, {
            where: {
                id,
            },
        });

        const updatedDataRokok = await Rokok.findByPk(id);
        res.status(200).json({ message: 'Stock rokok telah di tambahkan', updatedDataRokok })
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.reduceStock = async (req, res) => {
    try {
        const {id} = req.params
        const dataRokok = await Rokok.findByPk(id)

        if(!dataRokok) {
            return handleNotFoundError(res, 'Rokok');
        }

        if (dataRokok.stock === 0) {
            return res.status(400).json({ error: 'Stock sudah habis, tidak bisa dikurangi lagi' });
        }

        const result = await Rokok.update({
            stock: dataRokok.stock - 1
        }, {
            where: {
                id,
            }
        })

        const newData = await Rokok.findByPk(id)
        res.status(200).json({ message: `Stock rokok ${dataRokok.title} telah berkurang`, newData})
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.deleteRokok = async (req, res) => {
    try {
        const {id} = req.params
        const dataRokok = await Rokok.findByPk(id)

        if(!dataRokok) {
            return handleNotFoundError(res, 'Rokok');
        }

        const result = await Rokok.destroy({
            where: {
                id
            }
        })
        res.status(200).json({message: `rokok berhasil d delete`, dataRokok})
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}