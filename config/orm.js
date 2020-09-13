const connection = require('./connection');


//function to make as many question marks needed for the querrys to come from the burger app
function makeQmarks(num) {
    const arr = []

    for (let i = 0; i < num; i++){
        arr.push('?')
    }
    return arr.toString();
};



//creating a functon that will allow all key value pairs from the object to be pushed into the arr
function objToSql(ob){
    const arr = []
    
    for(let key in ob){
        let value  = ob[key];

        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === 'string' && value.indexOf(' ') >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + '=' + value);
        }
    }
    return arr.toString();
}


//Creating my object relational mapping to make the querrys alot eaiser for the burger app
const orm = {
    all: function(input , cb) {
        let queryString = `SELECT * FROM ${input};`; 
        console.log(queryString);
        connection.query(queryString, function(err, res) {
            if (err) throw err;
            cb(res);
        });
    },

    create: function(table, val, col, cb){
        let queryString = `INSERT INTO ${table}`;

        queryString += '(';
        queryString += col.toString();
        queryString += ') ';
        queryString += 'VALUES (';
        queryString += makeQmarks(val.length);
        queryString += ') ';

        console.log(queryString)

        connection.query(queryString, val, function(err, res) {
            if (err) throw err;
            cb(res);
        });
    }, 
    update: function(table, currentVal, condition, cb) {
        let queryString = `UPDATE ${table}`;

        queryString += 'SET ';
        queryString += objToSql(currentVal);
        queryString += 'WHERE ';
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, res) {
            if (err) throw err;
            cb(res);
        })

    },
    delete: function(table, condition, cb) {
        let queryString = `DELETE FROM ${table} WHERE ${condition};`;

        connection.query(queryString, function(err, res) {
            if (err) throw err;
            cb(res);
        });
    }
};

module.exports = orm; 


