async function getCart(jwtToken) {
    try{
        const response = await fetch('http://localhost:8081/get/cart', {
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

export default getCart;