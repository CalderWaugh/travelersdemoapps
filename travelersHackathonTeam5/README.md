# Hackathon
## E-Commerce website
### Justin Grove, Lena Zhang

## Middleware
### Packages used
1. Express
1. Mongoose
1. jwt
1. bcrypt
1. dotenv

### All requests
1. /register
* POST
* expected input: 
```
{ "email": <email>, "username": <username>, "password": <password>}
```
* Successful = 200 Ok
2. /login
* POST
* expected input:
```
{"email": <email>, "password": <password>}
```
* Successful receive a jwt token
3. /add/cart
* POST
* expected input:
```
"itemId": <id>
```
* Requires JWT
4. /get/cart
* GET
* Returns items in users cart
* Requires JWT
5. /add/item/
* POST
* Requires JWT
* expected input:
```
{
	"id": <int>,
	"name": <string>,
	"price": <decimal>,
	"categories": [<string>, <string>]
}
```
6. /get/items/:name
* GET
* returns items to front end with whole item object
* sample object
```
{
        "_id": <ObjectId>,
        "id": <int>,
        "name": <string>,
        "price": {
            "$numberDecimal": <string>
        },
        "categories": [
            <string>, 
            <string>
        ],
        "__v": 0
},
```
7. /get/items
* Returns items in same format as above
* Returns all items
8. /get/category/:category
* Returns all items in a specified category