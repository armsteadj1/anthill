import sqlite3 from 'sqlite3';

export default (req, res) => {
  let db = new sqlite3.Database('../db/anthill.db');

  db.run(`DELETE FROM data`, (err) => {
    if (err) {
      return console.log(err.message);
    }

  });

  db.close();

  res.statusCode = 200;
  res.json({});
}
