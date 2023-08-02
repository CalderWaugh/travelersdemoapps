import React, { useState } from 'react';
import '../App.css';

const url = 'http://localhost:4000'

function Employee(userState) {
	const [answers, setAnswers] = useState([]);
	const { username } = userState.userState.userState;

	const questionList = [
		"Are you happy with our level of communication? How would you change it?",
		"Am I providing enough clarity on our direction?",
		"What's one thing we can do to improve the performance of the team?",
		"If you were managing the team, what would you do differently?",
		"Do I have anything outstanding for you that I haven't done yet?",
		"Additional questions or feedback?",
	];

	const handleAnswerChange = (index, e) => {
		const newAnswers = [...answers];		// shallow copy of answers array
		newAnswers[index] = e.target.value;
		setAnswers(newAnswers);
	};

	const submitAnswers = async () => {
		// constructs an array of question-answer objects
		let data = questionList.map((question, index) => ({
			question: question,
			answer: answers[index] || '', // if no answer, set to empty string
		}));
		data.push({username: username})
		try {
			const res = await fetch(url + '/submit-employee', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});
			if (!res.ok) {
				console.log('Failed to submit feedback.');
			} else {
				console.log('Successfully submitted answers submitted.');
			}
		} catch (error) {
			console.error('Error submitting answers: ', error);
		}
	};

	return (
		<div>
			<p className={'success'}>Signed in successfully!</p>
			<h4>Employee's Home Page</h4>
			<p>Submit feedback to your manager by answering the questions below.</p>
			{questionList.map((question, index) => (
				<div className={'feedback'} key={index}>
					<p>{question}</p>
					<textarea
						className={'answer-box'}
						type="text"
						placeholder='Answer here...'
						value={answers[index] || ''}
						onChange={(e) => handleAnswerChange(index, e)}
					/>
				</div>
			))}
			<button className={'button'} onClick={submitAnswers}>Submit Feedback</button>
		</div>
	);
}

export default Employee;
