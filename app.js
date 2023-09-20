const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const fs = require('fs')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const Store = require('express-session-sequelize')(session.Store);

const db = require('./database');

const productController = require('./controllers/product')
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');

app.set('view engine','ejs')
app.set('views','views')
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(cookieParser());

const sequelizeSessionStore = new Store({
    db: db
});

app.use(session({
    secret: 'joshua is a very hardworking guy',
    store: sequelizeSessionStore,
    cookie: {
        maxAge: 86400000 //24 hours
    },
    saveUninitialized: false,
    resave: false
}));

app.use(productRoutes);
app.use(authRoutes);

app.get('/',productController.getAllProducts)

app.use((req,res)=>{
	res.send('Page not found');
});

db.sync({
    //force: true
}).then(result=>{
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}).catch(err=>{
    console.log(err);
});