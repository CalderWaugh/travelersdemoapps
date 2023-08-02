async function searchCategory(search, jwtToken) {
    try{
        const response = await fetch(`http://localhost:8081/get/category/${search}`, {
            method: "GET",
        });
        return response;
    } catch (error) {
        console.error(`Error getting item from cart: ${error}`);
    }
}

export default searchCategory;