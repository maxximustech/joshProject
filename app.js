const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const fs = require('fs')

const productModel = require('./models/product')
const productController = require('./controllers/product')

app.set('view engine','ejs')
app.set('views','views')
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

const productRoutes = require('./routes/product')

app.use(productRoutes)

app.get('/',productController.getAllProducts)
app.get('/login',(req,res)=>{
	//console.log(path.join(__dirname,'login.html'))
	res.render('login')
})

app.post('/login',(req,res)=>{
	if(typeof req.body.email !== 'string' || req.body.email.trim() === ''){
		res.send('Email address is not set')
		return	
	}
	if(typeof req.body.password !== 'string' || req.body.password.trim() === ''){
		res.send('Password is not set')
		return	
	}
	fs.readFile('data.json',(err,data)=>{
		if(err){
			return res.send('Sorry, an error occured. Try again later.');
		}
		let userData = JSON.parse(data)
		let userIndex = userData.findIndex((user)=>{
			return user.email.toLowerCase() === req.body.email.toLowerCase()
		})
		if(userIndex < 0){
			return res.send('User account not found')
		}
		if(userData[userIndex].password !== req.body.password){
			return res.send('Password is incorrect')
		}
		res.send(`Your full name is ${userData[userIndex].firstName + ' ' + userData[userIndex].lastName}.`)
	})
})
app.get('/signup',(req,res)=>{
	res.render('register')
})
app.post('/signup',(req,res)=>{
	if(typeof req.body.firstName !== 'string' || req.body.firstName.trim() === ''){
		res.send('First name is not set')
		return	
	}
	if(typeof req.body.lastName !== 'string' || req.body.lastName.trim() === ''){
		res.send('Last name is not set')
		return	
	}
	if(typeof req.body.email !== 'string' || req.body.email.trim() === ''){
		res.send('Email address is not set')
		return	
	}
	if(typeof req.body.password !== 'string' || req.body.password.trim() === ''){
		res.send('Password is not set')
		return	
	}
	//To check if file already exists
	fs.readFile('data.json',(err, data)=>{
		let existingData = [];
		if(!err){
			existingData = JSON.parse(data)
		}
		let existingEmailIndex = existingData.findIndex((user)=>{
			return user.email.toLowerCase() === req.body.email.toLowerCase()
		})
		if(existingEmailIndex >= 0){
			res.send('This email address already exists')
			return
		}
		existingData.unshift(req.body) // Adds the new data into the existing data array
		fs.writeFileSync('data.json',JSON.stringify(existingData)) // Replaces the existing data with the updated data inside the data.json
		res.redirect('/login');
	});
})
app.get('/edit',(req,res)=>{
	res.render('edit')
})
app.post('/edit',(req,res)=>{
	if(typeof req.body.firstName !== 'string' || req.body.firstName.trim() === ''){
		res.send('First name is not set')
		return	
	}
	if(typeof req.body.lastName !== 'string' || req.body.lastName.trim() === ''){
		res.send('Last name is not set')
		return	
	}
	if(typeof req.body.email !== 'string' || req.body.email.trim() === ''){
		res.send('Email address is not set')
		return	
	}
	if(typeof req.body.password !== 'string' || req.body.password.trim() === ''){
		res.send('Password is not set')
		return	
	}
	fs.readFile('data.json',(err,data)=>{
		if(err){
			return res.send('Sorry, an error occured. Try again later.');
		}
		let userData = JSON.parse(data)
		let userIndex = userData.findIndex((user)=>{
			return user.email.toLowerCase() === req.body.email.toLowerCase()
		})
		if(userIndex < 0){
			return res.send('User account not found')
		}
		if(userData[userIndex].password !== req.body.password){
			return res.send('Password is incorrect')
		}
		userData[userIndex].firstName = req.body.firstName
		userData[userIndex].lastName = req.body.lastName
		fs.writeFileSync('data.json',JSON.stringify(userData))
		res.send(`Your full name is ${userData[userIndex].firstName + ' ' + userData[userIndex].lastName}.`)
	})
})
app.get('/delete',(req,res)=>{
	if(typeof req.query.email !== 'string' || req.query.email.trim() === ''){
		res.send('Email address is not set')
		return	
	}
	if(typeof req.query.password !== 'string' || req.query.password.trim() === ''){
		res.send('Password is not set')
		return	
	}
	fs.readFile('data.json',(err,data)=>{
		if(err){
			return res.send('Sorry, an error occured. Try again later.');
		}
		let userData = JSON.parse(data)
		let userIndex = userData.findIndex((user)=>{
			return user.email.toLowerCase() === req.query.email.toLowerCase()
		})
		if(userIndex < 0){
			return res.send('User account not found')
		}
		if(userData[userIndex].password !== req.query.password){
			return res.send('Password is incorrect')
		}
		userData.splice(userIndex,1)
		fs.writeFileSync('data.json',JSON.stringify(userData))
		res.send(`Account deleted successfully`)
	})
})

app.use((req,res)=>{
	res.send('Page not found');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})