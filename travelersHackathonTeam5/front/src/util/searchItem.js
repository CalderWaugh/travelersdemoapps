async function searchItem(search, jwtToken) {
    try{
        const response = await fetch(`http://localhost:8081/get/items/${search}`, {
            method: "GET",
        });
        return response;
    } catch (error) {
        console.error(`Error getting item from cart: ${error}`);
    }
}

export default searchItem;