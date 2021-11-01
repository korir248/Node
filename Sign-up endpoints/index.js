const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const port = 3000

const app = express()
app.use(express.json())

const users = []

app.get("/", (req,res)=>{
    res.status(200).send('Hello World')
})

app.get("/users",(req,res)=>{
    res.send(users)
    console.log(users);
})
app.post("/signup", async (req,res)=>{
    const {email, username,password,confirmPassword} = req.body
    const passwordLength = new RegExp("^(?=.{8,})");
    const PasswordSymbols = new RegExp("^(?=.*[!@#$%^&*])");
    const passwordCapsNumbers = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])"
    
    );
    const user = {name: username,password: password}
    try {
        if(password != confirmPassword){
            res.status(401).send("Make sure password and confirmPassword match")
        }else if(!passwordLength.test(password)){
            res.status(401).send("Password must be at least 8 characters long")                        
        }else if(!PasswordSymbols.test(password)){
            res.status(401).send("Password ,must have at least ! symbol")
        }else if(!passwordCapsNumbers.test(password)){
            res.status(401).send("Password must have at least one capital letter and number")
        }
        
    } catch (error) {
        
    }
})

app.post("/login",(req,res)=>{
    const {username,password}= req.body

    try {
        if ((username = null) || (password = null)) {
            return res.status(201).send("Fill all fields")            
        }
        
        // res.status(200).send("Successful")
    } catch (error) {
        
    }


})

app.listen(port,()=>{
    console.log(`app running on port ${port}`);    
})



