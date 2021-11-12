require('dotenv').config()
const mssql = require('mssql')
const express = require('express')
const config = require('./config/db.config')
const {getUsers, getSpecificUser} = require('./controllers/usersController')
const PORT = process.env.PORT


const app = express()
app.use(express.json())


app.get("/",(req,res)=>{
    res.status(200).send("Welcome Home")
    console.log('welcome home');
})

app.get("/users",(req,res)=>{
    try {
        getUsers().then(result=>{
            res.json(result)
            console.log(result);
        })        
    } catch (err) {
        console.log(err.message);
        
    }
})

app.get("/users/:id",(req,res)=>{
    const id =req.params.id
    try {
        getSpecificUser(id).then(result=>{
            if(result === []){
                return res.send(`No user with id ${id} exists`)
            }
            res.json(result)
            console.log(result);
        })
        
    } catch (err) {
        console.log(err.message);        
    }
})



app.listen(PORT,()=>{
    console.log(`App running on port ${PORT}`);
})