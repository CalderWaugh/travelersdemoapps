async function loginUser(data) {
    try {
        const response = await fetch('http://localhost:8081/login', {
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
        const returned = await response.json();
        return returned
    } catch (error) {
        console.error(`Error fetching JWT token:`, error);
    }

}

export default loginUser;