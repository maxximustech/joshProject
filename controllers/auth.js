const db = require('../database');
const bcrypt = require('bcryptjs');

const User = db.models.User;


exports.getSignUpPage = async (req,res)=>{
    try{
        res.render('register');
    }catch(err){
        res.render('error',{message: err.message});
    }
}

exports.postSignUp = async (req,res)=>{
    try{
        let data = req.body;
        if(typeof data.firstName !== 'string' || data.firstName.trim() === ''){
            throw new Error('Please enter your first name');
        }
        if(typeof data.lastName !== 'string' || data.lastName.trim() === ''){
            throw new Error('Please enter your last name');
        }
        if(typeof data.email !== 'string' || data.email.trim() === ''){
            throw new Error('Please enter your email address');
        }
        if(+data.age <= 9){
            throw new Error('Please enter a valid age');
        }
        if(typeof data.password !== 'string' || data.password.trim() === ''){
            throw new Error('Please enter a password');
        }
        let salt = bcrypt.genSaltSync(12);
        let hashedPass = bcrypt.hashSync(data.password,salt);
        let newUser = await User.create({
            ...data,
            password: hashedPass
        });
        res.redirect('/login');
    }catch(err){
        res.render('error',{message: err.message});
    }
}

exports.getLoginPage = async (req,res)=>{
    try{
        res.render('login');
    }catch(err){
        res.render('error',{message: err.message});
    }
}
exports.postLogin = async (req,res)=>{
    try{
        let data = req.body;
        if(typeof data.email !== 'string' || data.email.trim() === ''){
            throw new Error('Please enter your email address');
        }
        if(typeof data.password !== 'string' || data.password.trim() === ''){
            throw new Error('Please enter a password');
        }
        let authUser = await User.findOne({
            where: {
                email: data.email
            }
        });
        if(authUser == null){
            throw new Error('This email address is not associated to any user');
        }
        if(!bcrypt.compareSync(data.password,authUser.password)){
            throw new Error('The password you have entered is incorrect');
        }
        res.redirect('/');
    }catch(err){
        res.render('error',{message: err.message});
    }
}