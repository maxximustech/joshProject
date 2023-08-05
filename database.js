const { Sequelize } = require('sequelize');
const db = new Sequelize('josh','root','Maxximus2013.',{
    host: 'localhost',
    dialect: 'mysql'
});

db.authenticate().then(response=>{
    console.log(response)
}).catch(err=>{
    console.log(err)
});