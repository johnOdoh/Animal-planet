//external dependency package import
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const SQLiteStore = require('connect-sqlite3')(session)
const csrf = require('csurf')
const flash = require('connect-flash')
const multer = require('multer')

//local express packages
const path = require('path')

//custom module imports
const { User } = require('./models/models')
const sequelize = require('./middlewares/database')

//Route imports
const userRoutes = require('./routes/user')
const publicRoutes = require('./routes/public')
const authRoutes = require('./routes/auth')

//Express initialization
const app = express()

// sychronize sequelize
// app.use(async(req, res, next) => {
//     await sequelize.sync()
//     next()
// })

//setting up the view engine
app.set('view engine', 'ejs')

//utility middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/account', multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/animals')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname)
        },
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
            cb(null, true)
        } else {
            cb(null, false)
        }
    }
}).single('animal'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
    secret: 'test secret',
    name: 'sessionId',
    saveUninitialized: false,
    resave: false,
    store: new SQLiteStore,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 } // 1 week
}))
app.use(flash())
app.use(csrf())

app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn
    res.locals.csrfToken = req.csrfToken()
    next()
})

app.use((req, res, next) => {
    if (req.session.userId) {
        User.findByPk(req.session.userId)
            .then(user => {
                req.user = user
                next()
            })
            .catch((err) => {
                console.log(err)
            })
    } else {
        next()
    }
})

//route middlewares 
app.use('/', publicRoutes)
app.use('/auth', authRoutes)
app.use('/account', userRoutes)

//default 404 page
app.use('/404', (req, res, next) => {
    res.status(404).render('public/404', { title: 'Not Found' })
})

//default 500 server error page
app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).render('public/500', { title: 'Server Error' })
})

app.listen(process.env.PORT || 3000, () => {
    console.log('connected')
})