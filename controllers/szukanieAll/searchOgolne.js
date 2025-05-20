const axios = require("axios").default;
const token = require("../auth/login")
let tabIdOkaz = [];
let tabId = [];

SearchAll = async (req, res) => {
	const { filter, pagination } = req.body;
    console.log("dane wukane!!")
	// console.log(filter.kolekcjanumerokazu, pagination.currentPage);

	try {
		let daneWysz = "";
		await Search().then(function (dane) {
			daneWysz = dane;
		});
		// console.log(daneWysz);
		res.send(daneWysz);
		tabIdOkaz.splice(0, 1, daneWysz.items);
		// console.log("zrobione")
		// console.log(tabIdOkaz[0])
		TabOkaz();
	} catch (error) {
		console.log(error);
	}
}

Search = async (filter, paginacja) => {
	let daneWyszykania = "";
	await axios
		.post(
			"https://api.amunatcoll.pl/anc/taxons/search/",
			{
				filter: { kolekcjanumerokazu: "POZ-V" },
				pagination: { currentPage: 1, perPage: 20 },
			},
			{
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"access-control-allow-credentials": "true",
					Authorization: `Bearer ${token.idToken[0].access}`,
				},
			}
		)
		.then(function (response) {
			daneWyszykania = response.data;
			console.log(
				"dane z wyszukiwania!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
			);
		})
		.catch(function (error) {
			console.log(error);
		});
	// console.log(tokenID);
	return daneWyszykania;
};


const TabOkaz = () => {
    tabId = tabIdOkaz[0].map((idKolekcja) => idKolekcja.kolekcjanumerokazu);
    console.log("zapisane ID");
    console.log(tabId);
};


module.exports = {
	SearchAll,
    tabIdOkaz,
    tabId,
};