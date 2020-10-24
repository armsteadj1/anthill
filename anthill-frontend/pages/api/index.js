import sqlite3 from 'sqlite3';

export default (req, res) => {
  let db = new sqlite3.Database('../db/anthill.db');
  const currentTime = new Date().getTime();

  let threeSecond = `select avg(power) as power from data where time >= ${currentTime - 3000} and time <= ${currentTime}`;
  let twentyMinute = `select avg(power) as power from data where time >= ${currentTime - 1200000} and time <= ${currentTime}`;

  return Promise.all([
    new Promise(r => db.all(threeSecond, [], (err, rows) => r(rows))),
    new Promise(r => db.all(twentyMinute, [], (err, rows) => r(rows))),
    ]
    ).then((a) => {
    db.close();

    res.statusCode = 200;
    res.json({threeSecond: a[0][0].power, twentyMinute: a[1][0].power});
  });
}
