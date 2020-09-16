// Set up MySQL connection.
const mysql = require("mysql");

const connection = mysql.createConnection(
  process.env.JAWSDB_URL
  
);

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for ORM use.
module.exports = connection;
