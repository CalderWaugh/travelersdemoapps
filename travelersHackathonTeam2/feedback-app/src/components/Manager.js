import React, { useState, useEffect } from 'react';
import '../App.css';

const url = 'http://localhost:4000';

function Manager(userState) {
    const { username } = userState.userState.userState;
    const [feedbackList, setFeedbackList] = useState([]);

    useEffect(() => {
        fetchFeedback();
    }, []);

    async function fetchFeedback() {
        try {
            const res = await fetch(url + '/getFeedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username }),
            });
            if (!res.ok) {
                setFeedbackList([]);
            } else {
                const data = await res.json();
                setFeedbackList(data.result);
            }
            console.log(feedbackList)
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <p className={'success'}>Signed in successfully!</p>
            <h3>Manager's Home Page</h3>
            {feedbackList.map((feedback, index) => (
                <div className={'feedback'} key={index}>
                    <h4>Feedback</h4>
                    {feedback.map((item, itemIndex) => (
                        <div key={itemIndex}>
                            <p>{item.question}</p>
                            <p>{item.answer}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Manager;