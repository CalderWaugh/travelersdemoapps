async function checkoutCart(jwtToken) {
    try{
        const response = await fetch('http://localhost:8081/checkout/cart', {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            }
        });
        // const parsed = response.json()
        return response;
    } catch (error) {
        console.error(`Error adding item to cart: ${error}`);
    }
}

export default checkoutCart;