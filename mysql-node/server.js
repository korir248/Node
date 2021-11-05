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

app.get("/users",(req,res)=>{
    let sql = 'select * from user_data'
    db.query(sql, (err,result)=>{
        if (err) {
            console.log(err.message);            
            throw err
        }else{
            console.log(result);
            res.status(200).send(result)
        }
    })
});

app.get("/users/:id", (req,res)=>{
    const {id} = req.params
    let sql = `select * from user_data where id = ${id}`
    db.query(sql,(err,result)=>{
        if (err) {
            throw err          
        }else{
            res.status(200).send(result)
            console.log(result);
        }
    })

})


app.post("/signup",(req,res)=>{
    const {username, email, password} = req.body
    let sql = `INSERT INTO user_data(username,email,password) VALUES ('${username}', '${email}', '${password}')`
    let sql2 = `select * from user_data where username = ${username}`

    db.query(sql2,(err,result)=>{
        console.log(result);
        if(err){
            db.query(sql,(err,result)=>{
                if(err) {
                    res.status(200).send(`User ${username} added successfully!`)
                    console.log(`User ${username} added successfully`);
                }             
            })

        }else{

        }
    }) 
})
app.delete("/users/:id", (req,res)=>{
    const {id} = req.params
    let sql = `delete from user_data where id = ${id}`
    db.query(sql,(err,result)=>{
        if(err){
            res.status().send(`Could not delete user with id ${id}`)
            throw err
        }else{
            res.status()
        }
    })
})

app.listen(port,()=>{
     console.log(`Server running on port ${port}`);
})