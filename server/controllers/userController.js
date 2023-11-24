const { compare, hash } = require('../helper/bcrypt');
const { sign } = require('../helper/jwt');
const { handleValidationError, handleExistingRecordError, handleInternalError, handleNotFoundError, handleLoginError } = require('../middleware/errorHandler');
const { User, myRokok, Rokok } = require('../models')
const joi = require('joi');
const fs = require('fs');
const path = require('path');

exports.getAllUser = async (req, res) => {
    try {
        const usersData = await User.findAll()
        res.status(200).json(usersData)
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.getUserById = async (req, res) => {
    try {
        const {id} = req.params

        const userData = await User.findOne({
            where: {
                id
            }
        })

        if (!userData) {
            return handleNotFoundError(res, 'User');
        }

        const response = await myRokok.findAll({
            where: {
                userId: id
            },
            include: [
                {
                    model: User,
                },
                {
                    model: Rokok,
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                }
            ]
        })

        const rokokCount = response.map((el) => {
            return el.Rokok
        })

        // const userDetail = {
        //     id: response[0].User.id,
        //     username: response[0].User.username,
        //     email: response[0].User.email,
        //     password: response[0].User.password,
        //     rokok: rokokCount
        // }
        

        res.status(200).json(userData)
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.registerUser = async (req, res) => {
    try {
        const newUser = req.body;

        const schema = joi.object({
            username: joi.string().required(),
            email: joi.string().required(),
            password: joi.string().min(6).required()
        })

        const { error } = schema.validate(newUser)

        if (error) {
            return handleValidationError(res, error)
        }

        const existingUser = await User.findOne({
            where: {
                email: newUser.email
            }
        });

        if (existingUser) {
            return handleExistingRecordError(res, 'Email sudah terdaftar, coba ganti dengan nama lain')
        }

        const result = await User.create({
            username: newUser.username,
            email: newUser.email,
            password: newUser.password,
            image: 'https://png.pngtree.com/png-clipart/20230305/original/pngtree-muslim-boy-profile-photo-png-image_8973295.png',
            role: 'user'
        })

        res.status(201).json({ message: 'success', result })
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.login = async (req, res) => {
    try {
        const dataLogin = req.body

        const schema = joi.object({
            email: joi.string().required(),
            password: joi.string().required()
        })

        const { error } = schema.validate(dataLogin)

        if (error) {
            return handleValidationError(res, error)
        }

        let dataUser = await User.findOne({
            where: {
                email: dataLogin.email
            }
        })

        if (!dataUser) {
            return handleNotFoundError(res, 'User')
        }

        let comparePass = compare(dataLogin.password, dataUser.password)

        if (!comparePass) {
            return handleLoginError(res)
        }

        const { id, email, role } = dataUser

        let access_token = sign({ id, email, role })
        let userEmail = dataUser.email

        res.status(201).json({ id, userEmail, role, access_token })
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.editUser = async (req, res) => {
    try {
        const { id } = req.params
        const newData = req.body;
        const userData = await User.findByPk(id)

        if (!userData) {
            return handleNotFoundError(res, 'User');
        }

        const schema = joi.object({
            username: joi.string().required(),
            email: joi.string().required(),
            password: joi.string().min(6).required(),
        })

        const { error } = schema.validate(newData)

        if (error) {
            return handleValidationError(res, error)
        }

        // const existingUser = await User.findOne({
        //     where: {
        //         email: newData.email
        //     }
        // });

        // if (existingUser) {
        //     return handleExistingRecordError(res, 'Email sudah terdaftar, coba ganti dengan nama lain')
        // }   

        const updatedImg = `http://localhost:3300/${req.file.path}`

        const result = await User.update({
            username: newData.username,
            email: newData.email,
            password: hash(newData.password) ,
            image: updatedImg,
        }, {
            where: {
                id
            }
        })

        res.status(201).json({ message: 'success', result })

    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}