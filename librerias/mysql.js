const mysql = require('mysql');

function getConnection() {
  
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'admin123',
  database: 'autopartes_delta'
})

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });
 return connection;

}
module.exports = getConnection
