const orm = require('../config/orm.js');

const burger = {
    all: function(cb) {
        orm.all('burgers', function (res) {
            cb(res)
        });
    },
    create: function(col, val, cb) {
        orm.create('burgers', col, val, function (res) {
            cb(res);
        });
    },
    update: function(currentVal, condition, cb) {
        orm.update('burgers', currentVal, condition, function(res) {
            cb(res);
        });
    },
    delete: function(condition, cb){
        orm.delete('burgers', condition, function(res) {
            cb(res);
        });
    }
};

module.exports = burger