var connection = require("../config/connection");

//The below helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
function createQmarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function translateSql(ob) {
  var arr = [];

  for (var key in ob) {
    var value = ob[key];

    if (Object.hasOwnProperty.call(ob, key)) {

      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }
  return arr.toString();
}

var orm = {
  selectAll: function (tableInput, cb) {
    var dbQuery = "SELECT * FROM " + tableInput + ";";
    connection.query(dbQuery, function (err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },

  InsertOne: function (table, cols, vals, cb) {
    var dbQuery = "INSERT INTO " + table;

    dbQuery += " (";
    dbQuery += cols.toString();
    dbQuery += ") ";
    dbQuery += "VALUES (";
    dbQuery += createQmarks(vals.length);
    dbQuery += ") ";

    console.log(dbQuery);

    connection.query(dbQuery, vals, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    })
  },
  updateOne: function (table, objColVals, condition, cb) {
    var dbQuery = "UPDATE " + table;

    dbQuery += " SET ";
    dbQuery += translateSql(objColVals);
    dbQuery += " WHERE ";
    dbQuery += condition;

    console.log(dbQuery);

    connection.query(dbQuery, function (err, res) {
      if (err) {
        throw err;
      }

      cb(res);
    });
  },
};

module.exports = orm;
