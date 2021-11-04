require('dotenv').config()
const mysql = require('mysql')
const express = require('express')
const db = require('./db.config')
const bcrypt = require('bcrypt')
const port = process.env.PORT


db.connect((error)=>{
    if(error){
        return console.log("Error: " + error.message);
    }

    console.log("Connected successfully to mysql");
})

const app = express()
app.use(express.json())

app.get("/",(req,res)=>{
     res.status(200).send("Welcome Home!")
})

app.get("/users")


app.post("/signup",(req,res)=>{
    const {username, email, password} = req.body
    let sql = `INSERT INTO user_data(username,email,password) VALUES ('${username}', '${email}', '${password}')`

    db.query(sql,(err,result)=>{
        if(err){
            console.log(err.message);
            throw err
            
        }else{
            res.status(200).send("User added successfully")
        console.log("User added successfully ");

        }
    }) 
})

app.listen(port,()=>{
     console.log(`Server running on port ${port}`);
})