const mssql = require('mssql')
const config = require('../config/db.config')

const getUsers = async()=> {
     try {
        let pool= await mssql.connect(config)
        let sql = 'select id, username, email from users where isDeleted = 0';
        let users = await pool.request().query(sql)
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

 const getSpecificUser = async(id)=> {
    try {
       let pool= await mssql.connect(config)
       let sql = `select id, username, email from users where isDeleted = 0 and id =${id}`;
       let users = await pool.request().query(sql)
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

 module.exports = {getUsers, getSpecificUser}