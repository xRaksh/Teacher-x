const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const cookieParser = require('cookie-parser');
const Sroutes = require('./routes/staticRoutes')
const Droutes = require('./routes/dynamicRoutes')

const connectDb = require('./DB/connection') //Database connection

require("dotenv").config();
const PORT = process.env.PORT

const viewsPath = path.join('./views',)
const partialsPath = path.join('./partials',)

app.use(express.json());                            // middleware for json responses
app.use(express.urlencoded({ extended: false }));   // middleware for form data
app.use(cookieParser());                            // middleware for cookie
app.use(express.static('public'));                  // set static routes
app.use('/uploads', express.static('uploads'));

// Serve static files from Upload Folder, including PDFs
app.use('/uploads', express.static('uploads', {
    setHeaders: (res, path) => {
        if (path.endsWith('.pdf')) {
            res.setHeader('Content-Type', 'application/pdf');
        }
    },
}));

app.use('/', Sroutes);
app.use('/form', Droutes);

app.set('view engine', 'hbs'); // set templates engine
app.set('views', viewsPath);  // set views
hbs.registerPartials(partialsPath);  // set partials

const start = async (req, res) => {
    try {
        await connectDb
        app.listen(PORT, () => {
            console.log(`connect to ${PORT}`)
        })
    } catch (e) {
        const filePath = path.join(__dirname, '../public/error.html');
        res.sendFile(filePath);
    }
}
start();