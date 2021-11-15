require('dotenv').config()
const mssql = require('mssql')
const express = require('express')
const config = require('./config/db.config')
const {getUsers, getSpecificUser, deleteUser, updateUser, addUser} = require('./controllers/usersController')
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
        }).catch(err=>{
            console.log(err.message);
        })       
    } catch (err) {
        console.log(err.message);
        
    }
})

app.get("/users/:id",(req,res)=>{
    const id = parseInt(req.params.id)


    try {
        getSpecificUser(id).then(result=>{
            if(result[0] === null){
                return res.send(`No user with id ${id} exists`)
            }else{
                res.send(result)
                console.log(result);
            }
            
        })
        
    } catch (err) {
        console.log(err.message);        
    }
})

app.post("/users",(req,res)=>{
    const {username,email,password,cpassword} = req.body
    if (password === cpassword) {
        try {
            addUser(username,email,password).then(result=>{
                console.log(result);
            }).catch(err=>{
                console.log(err);
                res.send("Could not add new user!")
            })
            
        } catch (err) {
            console.log(err.message);
            
        }
    }else{
        return res.status(200).send("Confirm that both passwords match!")
    }
})

app.delete("/users/:id",(req,res)=>{
    const id = req.params.id
    try {
        deleteUser(id).then(result=>{
            res.status(204).send(`user with id ${id} deleted!!`)
        })
    } catch (err) {
        console.log(err.message);        
    }
})
app.put("/users/:id",(req,res)=>{
const {username} = req.body
const {id} = req.params
try {
    updateUser(id,username).then(result=>{
        res.send(`Username changed to ${username}`)
        console.log(result);
    })
} catch (err) {
console.log(err.message);
}
})


app.listen(PORT,()=>{
    console.log(`App running on port ${PORT}`);
})