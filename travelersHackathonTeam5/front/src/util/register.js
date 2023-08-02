async function registerUser(data) {
    try {
        const response = await fetch('http://localhost:8081/register', {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
        });
        return response;
    } catch (err) {
        console.error(err);
    }
}

export default registerUser;