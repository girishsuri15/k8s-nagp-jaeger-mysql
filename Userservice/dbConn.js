const conn= require('./connection')
const dataInit = require('./initDB')
 CreateDBIFNOtExist=async (host,password)=>{
  const connection=conn.ConnectionDataBase(host,password) 
  dataInit.createDBIfNOTExist().then(()=>{
  })
}
module.exports={
  CreateDBIFNOtExist
}
