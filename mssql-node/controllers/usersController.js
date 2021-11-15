const mssql = require('mssql')
const config = require('../config/db.config')

const getUsers = async()=> {
     try {
        let pool= await mssql.connect(config)
        let sql = 'select id, username, email,isDeleted from users where isDeleted = 0';
        let users = await pool.request().query(sql)
        console.log(users.recordset.length)

        const u =users.recordset.map(user=>{
            
            return {
                user_id: user.id,
                username: user.username.trim(),
                email: user.email.trim(),
                isDeleted: user.isDeleted
            }
        })
        return u
     } catch (err) {
         console.log(err.message);
     }
 }

 const getSpecificUser = async(id)=> {
    try {
       let pool= await mssql.connect(config)
       let sql = `select id, username, email from users where isDeleted = 0 and id =${id}`;
       let users = await pool.request().query(sql)
       if(users.recordset.length === 0){
           return `No user with id ${id} was found!`
       }

       const u =users.recordset.map(user=>{          
           return {
               user_id: user.id,
               username: user.username.trim(),
               email: user.email.trim()
           }
       })
       return u
    } catch (err) {
        console.log(err.message);
    }
}
const deleteUser = async(id)=>{
    try {
        let pool = await mssql.connect(config)
        let sql = `update users set isDeleted = 1 where id = ${id}`
        let result = await pool.request().query(sql,(err,result)=>{
            if (err) {
                console.log(err.message);
                return err.message              
            }else{
                
            }
        })
    } catch (error) {
        console.log(error.message);        
    }
}

const updateUser = async(id,username)=>{
    try {
        let pool = await mssql.connect(config)
        let sql = `update users set username = ${username} where id = ${id}`
        let result = await pool.request().query(sql,(err,result)=>{
            if (err) {
                console.log(err.message);
                return err.message              
            }else{
                return result                
            }
        })
    } catch (error) {
        console.log(error.message);        
    }

}

const addUser = async(username,email,password)=>{
    try {
        let pool = await mssql.connect(config)
        let sql = `insert into users(username,email,password) values(${username},${email},${password})`
        let result = await pool.request().query(sql,(err,result)=>{
            if (err) {
                console.log(err.message);
                return err.message         
            } else {
                return result
                
            }
        })
        
    } catch (err) {
        console.log(err.message);
    }
}
 module.exports = {getUsers, getSpecificUser,deleteUser,updateUser,addUser}