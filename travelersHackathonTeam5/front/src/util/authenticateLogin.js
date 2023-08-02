async function authenticateLogin(jwtToken) {
    try{
        const response = await fetch('http://localhost:8081/', {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            }
        });
        return response;
    } catch (error) {
        console.error(`Error getting item from cart: ${error}`);
    }
}

export default authenticateLogin;