const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dao = require('./data');

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
	try {
		const data = await dao.callAPI();
		res.send(data);
	} catch (err) {
		console.error('Error retrieving data: ', err);
		res.sendStatus(500);
	}
})

app.post('/register', async (req, res) => {
	try {
		const { username, password, role } = req.body;
		const result = await dao.userRegister({ username, password, role });
		if (result == 1) {
			res.status(200).json({ message: 'User registered successfully' });
		} else {
			res.status(500).json({ message: 'Error registering user' });
		}
	} catch (err) {
		console.error('Error registering user: ', err);
		res.sendStatus(500);
	}
})

app.post('/signin', async (req, res) => {
	try {
		const { username, password } = req.body;
		const result = await dao.userSignIn({ username, password });
		if (result !== undefined) {
			res.status(200).json({ message: 'Signed in successfully', user: result })
		} else {
			res.status(401).json({ message: 'Invalid credentials' })
		}
	} catch (err) {
		console.error('Error signing in: ', err);
		res.sendStatus(500);
	}
})

app.post('/submit-employee', async (req, res) => {
	try {
		const userQuery = req.body.pop(); // pop() --> removes the last element of array, the username obj, and returns it
		const result = await dao.submitEmployee(userQuery, req.body)
		if (result == 1) {
			res.status(200).json({ message: 'Successfully submitted feedback ' })
		} else {
			res.status(500).json({ message: 'Error submitting feedback ' });
		}
	} catch (err) {
		console.error('Error submitting feedback: ', err);
		res.sendStatus(500);
	}
})

app.post('/getFeedback', async (req, res) => {
	try {
		const { username } = req.body;
		const result = await dao.getFeedback(username);
		if (result.length > 0) {
			res.status(200).json({ message: 'Successfully retrieved feedback ', result})
		} else {
			res.status(500).json({ message: 'Error retrieving feedback ' });
		}
	} catch (err) {
		console.error('Error retrieving feedback: ', err);
		res.sendStatus(500);
	}
})

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
})
