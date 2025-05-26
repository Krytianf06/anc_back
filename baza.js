const mariadb = require("mariadb");

const pool = mariadb.createPool({
	host: "db.web.amu.edu.pl",
	user: "kf63083_sqlanc",
	password: "Krychu11L19*",
	database: "kf63083_sqlanc",
	port: "3306",
	connectionLimit: 5
});



async function asyncFunction() {
  let conn;
  try {
	conn = await pool.getConnection();
	const rows = await conn.query("SELECT * FROM `mollusca_helix_pomatia_pl_1`");
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
