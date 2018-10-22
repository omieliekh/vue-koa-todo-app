/* eslint-disable no-console */
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const INIT_SQL_PATH = process.env.INIT_SQL_PATH || '../db-init.sql';
const DB_NAME = process.env.DB_NAME || './sqlite3.db';

function init() {
  const initSql = fs.readFileSync(`${__dirname}/${INIT_SQL_PATH}`, 'utf-8');
  db.exec(initSql)
}

const db = new sqlite3.Database(DB_NAME, (err) => {
  if (err) {
    console.log('DB init error');
    console.error(err);
    return;
  }

  init()
});

const query = queryString => {
  return new Promise( (resolve, reject) => {
    db.all(queryString, (err, data) => {
      if (err){
        console.log('Error in query: ', queryString);
        console.error(err);
        reject(err);
        return;
      }

      resolve(data);
    });
  });
};

module.exports = { db, query };
