const DB = require('./connection');    
createDBIfNOTExist=()=>{
    return new Promise((resolve,reject)=>{
        initDatabase().then((isExists)=>{
            use(); 
            if(!isExists){
                populateDataBase().then(()=>{
                    resolve();
                }); 
            }
            else{
                resolve();
            }
            
        })
    })
}
populateDataBase=()=>{return new Promise((resolve,reject)=>(
    create()
    .then(()=>{
          insert()
           .then(()=>{
              console.log('inserted')
              readData();
              resolve();
           })
       })
   ))}

initDatabase=()=>{
    return new Promise((resolve, reject) => {
        {
            const connection=DB.connectionDB();  
            connection.query('CREATE DATABASE user;', function (err, results, fields) { 
                if (err) 
                    {
                        ("database is exist");
                        data=true;
                        resolve(true)
                    }
                else {
                    console.log('CREATE DATABASE user;');
                    resolve(false)
                    }
                })
 
        }}
    )}

// function deleteDatabase(){
//   connection.query('DROP DATABASE user;', function (err, results, fields) { 
//    if (err) throw err; 
//    console.log('CREATE DATABASE user;');
//  })
// }
function use(){
    const connection=DB.connectionDB();
  connection.query('USE user;', function (err, results, fields) { 
    if (err) throw err; 
    console.log('use use');
  })
}
function drop(){
  connection.query('DROP TABLE IF EXISTS inventory;', function (err, results, fields) { 
  if (err) throw err; 
  console.log('Dropped inventory table if existed.');
})
}
create=()=>{
    return new Promise((resolve,reject)=>{
        const connection=DB.connectionDB();
        connection.query('CREATE TABLE userData (id serial PRIMARY KEY, name VARCHAR(50), age INTEGER,email VARCHAR(50));', function (err, results, fields) { 
        if (err) throw err; 
        else{
         console.log('CREATE TABLE inventory');
        resolve();
        }
        })
    })
}
insert=()=>{
    return new Promise((resolve,reject)=>{
    const connection=DB.connectionDB();
  connection.query('INSERT INTO userData (name, age,email) VALUES (?, ?,?);', ['Girish', 25,'girishsuri@gmail.com'], function (err, results, fields) { 
    if (err) throw err; 
    else{
    console.log('INSERT INTO use');
    resolve()
    }
  })
}
)}
readData=(id)=>{
    return new Promise((resolve,reject)=>{   
        const connection=DB.connectionDB();
        connection.query('SELECT * FROM userData WHERE id = '+id, 
            function (err, results, fields) {
                let data={}
                if (err) 
                {
                    reject();
                }
                else {
                    console.log('Selected ' + results.length + ' row(s).');
                    if(results.length> 0)
                     data=JSON.stringify(results[0])
                }
                resolve(data);
            })
      })
}
function deleteDatabase(){
    const connection=DB.connectionDB(); 
    connection.query('DROP DATABASE user;', function (err, results, fields) { 
     if (err) throw err; 
     console.log('CREATE DATABASE user;');
   })
  }
module.exports={
    createDBIfNOTExist,
    readData,
    deleteDatabase
}

