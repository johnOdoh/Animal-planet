const { validationResult } = require('express-validator')
const fs = require('fs')
const { Animal } = require('../models/models')

exports.getAddAnimal = (req, res, next) => {
    res.render('user/add-animal', { title: 'Add Animal', errors: {}, message: req.flash('success')[0], imgError: req.flash('imgError')[0], body: {}, edit: false })
}

exports.getMyAnimals = async(req, res, next) => {
    try {
        const animals = await req.user.getAnimals()
        const count = await req.user.countAnimals()
        res.render('user/my-animals', { title: 'My Animals', animals: animals, count: count, message: req.flash('status')[0] })
    } catch (error) {
        return next(new Error(error))
    }
}

exports.getEditAnimal = async(req, res, next) => {
    try {
        const animal = await Animal.findByPk(req.params.id)
        if (!animal) return res.redirect('/404')
        res.render('user/add-animal', { title: 'Add Animal', errors: {}, message: req.flash('success')[0], imgError: req.flash('imgError')[0], body: animal, edit: true })
    } catch (error) {
        return next(new Error(error))
    }
}

exports.postEditAnimal = async(req, res, next) => {
    const error = validationResult(req)
    if (!error.isEmpty) {
        return res.render('user/add-animal', {
            title: 'Add Animal',
            errors: error.mapped(),
            message: req.flash('success')[0],
            imgError: req.flash('imgError')[0],
            body: req.body,
            edit: true
        })
    }
    const animal = await Animal.findByPk(req.params.id)
    animal.name = req.body.name
    animal.description = req.body.description
    animal.habitat = req.body.habitat
    animal.class = req.body.class
    animal.endangered = req.body.endangered
    if (req.file) {
        fs.unlink('public' + animal.image, (err) => {
            if (err) {
                console.log(pth + 'NOT DELETED')
            }
        })
        animal.image = '/animals/' + req.file.filename
    }
    await animal.save()
    req.flash('status', 'Animal updated')
    res.redirect('/account/animal')
}

exports.removeAnimal = async(req, res, next) => {
    try {
        // const status = await Animal.destroy({
        //         where: {
        //             id: req.params.id,
        //             [op.or]: [{ UserId: req.session.userId }, { id: 1 }]
        //         }
        //     })
        let imgPath = await Animal.findByPk(req.params.id, { attributes: ['image'] })
        await Animal.destroy({ where: { id: req.params.id, UserId: req.session.userId } })
        imgPath = 'public' + imgPath.image
        fs.unlink(imgPath, (err) => {
            if (err) {
                console.log(pth + 'NOT DELETED')
            }
        })
        req.flash('status', 'Animal Deleted!')
        res.redirect('back')
    } catch (error) {
        return next(new Error(error))
    }
}

exports.uploadAnimal = async(req, res, next) => {
    const error = validationResult(req)
    if (!req.file) {
        req.flash('imgError', 'Image must be a jpg, jpeg or png file')
        return res.render('user/add-animal', {
            title: 'Add Animal',
            errors: {},
            message: req.flash('success')[0],
            imgError: req.flash('imgError')[0],
            body: req.body,
            edit: false
        })
    }
    if (!error.isEmpty) {
        return res.render('user/add-animal', {
            title: 'Add Animal',
            errors: error.mapped(),
            message: req.flash('success')[0],
            imgError: req.flash('imgError')[0],
            body: req.body,
            edit: false
        })
    }
    try {
        await req.user.createAnimal({
            name: req.body.name,
            description: req.body.description,
            habitat: req.body.habitat,
            class: req.body.class,
            endangered: req.body.endangered,
            image: '/animals/' + req.file.filename
        })
        req.flash('success', 'Animal added Successfully')
        res.redirect('back')
    } catch (error) {
        return next(new Error(error))
    }
}