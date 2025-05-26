const mariadb = require("mariadb");

const pool = mariadb.createPool({
	host: "localhost",
	user: "root",
	password: "",
	database: "test",
	port: "3306"
});



async function asyncFunction() {
  let conn;
  try {
	conn = await pool.getConnection();
	const rows = await conn.query("SELECT * FROM `test`");
	console.log(rows); //[ {val: 1}, meta: ... ]

  } catch (err) {
	throw err;
  } finally {
	if (conn) conn.end();
  }
}
asyncFunction().then(() => {
  pool.end();
});




// module.exports = Object.freeze({
// 	pool: pool
// });








// let sql = "SELECT * FROM `mollusca_helix_pomatia_pl_1`";

// con.connect(function (err) {
// 	if (err) throw err;
// 	con.query(sql, function (err, result, fields) {
// 		if (err) throw err;
// 		console.log(result);
// 	});
// });

// const result = pool.query();

// console.log(result);
