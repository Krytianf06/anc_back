const express = require("express");
const axios = require('axios').default;
const cors = require("cors");
const morgan = require("morgan");
const fetch = require('node-fetch');

const app = express();
// require("dotenv").config();

app.use(morgan("angle"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded( {extended:true}));


	app.get("/test", async (req, res) => {
		

		try {
			const response = await axios.post("https://amunatcoll.pl:8000/login/", {
				username: "kf63083@amu.edu.pl",
				password: "Krychu11L19*63083"
			}, {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'access-control-allow-credentials': 'true',
				  },
			})
			res.json(response.data.token)
			// console.log(response.data)
		}
		catch (err) {
			console.log(err)
		}
		const login = req;
		console.log(login);
	})


app.post("/test2", (req, res) => {
	console.log(req.body)
	res.send(req.boby)
	res.status(200).end();
});

app.listen(8888, () => {
	console.log("aplikacja działa!!!!2");
});
