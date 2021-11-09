require('dotenv').config()
const mssql = require('mssql')
const express = require('express')
const config = require('./config/db.config')
const PORT = process.env.PORT


const app = express()

app.get("/users",(req,res)=>{
    try{
        let pool = mssql.connect(config)
        console.log(pool);

    }catch(err){

    }
})

app.listen(PORT,()=>{
    console.log(`App running on port ${PORT}`);
})