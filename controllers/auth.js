const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')

const { User } = require('../models/models')

exports.getLogin = (req, res, next) => {
    res.render('auth/login', { title: 'Login', errMessage: req.flash('error')[0] })
}

exports.getRegister = (req, res, next) => {
    res.render('auth/register', { title: 'Register', errors: {}, errMessage: req.flash('error')[0] })
}

exports.register = async(req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        console.log(error.mapped())
        return res.render('auth/register', {
            title: 'Register',
            errors: error.mapped(),
            errMessage: req.flash('error')[0]
        });
    }
    try {
        const user = await User.findOne({ where: { username: req.body.username } })
        if (user) {
            req.flash('error', 'Username already taken')
            return res.redirect('back')
        }
        const hash = await bcrypt.hash(req.body.password, 10)
        await User.create({
            username: req.body.username.toLowerCase(),
            password: hash
        })
        return res.redirect('/auth/login')
    } catch (error) {
        return next(new Error(error));
    }
}

exports.login = async(req, res, next) => {
    try {
        req.flash('error', 'Incorrect Username or Password')
        user = await User.findOne({ where: { username: req.body.username.toLowerCase() } })
        if (!user) return res.redirect('back')
        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) return res.redirect('back')
        req.flash('error', null)
        req.session.isLoggedIn = true;
        req.session.userId = user.id;
        req.session.save(() => {
            return res.redirect('/');
        })
    } catch (error) {
        return next(new Error(error));
    }

}

exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        return res.redirect('/')
    })
}