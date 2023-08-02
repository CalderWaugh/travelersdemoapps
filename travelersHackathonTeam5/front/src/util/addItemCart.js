async function addItemCart(data, jwtToken) {
    try{
        const response = await fetch('http://localhost:8081/add/cart', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken}`
            },
            body: JSON.stringify(data)
        });
        const parsed = response.json()
        return parsed;
    } catch (error) {
        console.error(`Error adding item to cart: ${error}`);
    }
}

export default addItemCart;