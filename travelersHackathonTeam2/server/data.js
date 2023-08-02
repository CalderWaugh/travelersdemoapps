const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'feedback';
let db;

// connect to database
try {
	const client = new MongoClient(url);
	client.connect();
	db = client.db(dbName);
	collection = db.collection('users');
} catch (err) {
	console.error('Error connecting to database: ', err);
	throw err;
}

module.exports.callAPI = async function () {
	try {
		const data = await collection.find().toArray();
		console.log('Data retrived successfully.')
		return data;
	} catch (err) {
		console.error('Error retrieving data: ', err);
		throw err;
	}
}

module.exports.userRegister = async function (userData) {
	const { username, password, role } = userData;
	let res = 0;
	await collection.findOne({ username })
		.then(async (document) => {
			if (document) {		// if username exists, set res code = 0
				res = 0;
			} else {			// else register new account and set res code = 1
				if (role === 'emp') { 
					await collection.insertOne(
						{
							username,
							password,
							role,
							'response': '',
							feedback: []
						});
					res = 1;
				} else { 
					await collection.insertOne(
						{
							username,
							password,
							role,
							employees:['johndoe1','johndoe2','johndoe3']
						});
					res = 1;
				}
			}
		});
	return res;
}

module.exports.userSignIn = async function (userData) {
	const { username, password } = userData;
	let data;
	await collection.findOne({ username, password })
		.then((document) => {
			if (document) {
				data = document;
			}
		});
	return data;
}

module.exports.submitEmployee = async function (userQuery, update) {
	let res = 0;
	try {
		await collection.updateOne(userQuery, { $set: { feedback: update } });
		res = 1;
	} catch (err) {
		res = 0;
		throw err;
	}
	return res;
}

module.exports.getFeedback = async function (username) {
	const user = await collection.findOne({ username });
	const { employees } = user;
	let data = [];
	for (let i = 0; i < employees.length; i++) {
		await collection.findOne({ 'username': employees[i] })
			.then((document) => {
				if (document) {
					// document.feedback.username = employees[i];
					data.push(document.feedback);
					// console.log(data)
				}
			})
	}
	return data;
}
