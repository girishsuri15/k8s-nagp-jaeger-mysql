const mysql = require('mysql');
let connection;
ConnectionDataBase = (hostURL,password) => {
var config={
  host: hostURL,
  password: password,
  user: 'root',
}
 connection = mysql.createConnection(config);
connection.connect((err) => {
  if (err) throw err;
  else console.log('My sql connection is Connected!');
});
return connection;
}  
connectionDB=()=>{
    if(!connection)
    return new console.error();
    else
    return connection;
}    
module.exports={
    ConnectionDataBase,
    connectionDB
}