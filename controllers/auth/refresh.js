const axios = require("axios").default;
const { idToken } = require("./login");

Refresh = async (req, res) => {
	// if (idToken == )
	console.log(idToken);
	try {
		let noweID = "";
		await RefreshToken(idToken[0].refresh).then(function (idRefreshID2) {
			noweID = idRefreshID2;
			console.log("wysylanie12");
			// console.log(idToken[0].refresh)
			// console.log(noweID)
		});
		// console.log(noweID)
		// login1();
		res.send(noweID);
	} catch (error) {
		console.log(error);
	}
};

RefreshToken = async (refreshID) => {
	let newRefreshID = "";
	console.log("-------------------------------------------------");
	await axios
		.post(
			"https://api.amunatcoll.pl/refresh_token/",
			{
				refresh: refreshID,
			},
			{
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"access-control-allow-credentials": "true",
				},
			}
		)
		.then(function (response) {
			newRefreshID = response.data;
			console.log(
				"dane z refresh!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
			);
			// console.log(newRefreshID);
			idToken.splice(0, 1, newRefreshID);
		})
		.catch(function (error) {
			console.log(error);
		});
	// console.log(tokenID);
	return newRefreshID;
};

module.exports = {
	Refresh,
};
