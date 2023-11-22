Shopping Cart App

Group: 46
Name: 
LI Yuyao (12615034)

Application link: 

*************************************************
# Login

Each user has a username and password.
[
	{username: user1, password: 123456},
	{username: user2, password: 654321}	
]

After successful login, userid is stored in a session.

*************************************************
# Logout
In the home page, each user can logout their account by clicking the logout.

*************************************************
# CURD service
- Create
	The user can create a shopping item information through the create interface. The shopping item information include the following attributes.
	1) Shopping cart ID (SCXXX)
	2) Item Name (Clothes...)
	3) Quantity (1 or 2 ...)
	4) Price (Must be number)
	
All of theses attributes are mandatory.

- Search
	Searching shopping cart information by shopping cart ID.
	Input shopping cart ID you want to find.(SCXXX)
	
- Update
	The user can update the shopping cart information through the details interface.Among the attribute shown above, shopping cart ID cannot change.
	
	A shopping cart item information include the following attributes.
	1) Item Name (Clothes...)
	2) Quantity (1 or 2 ...)
	3) Price (Must be number)

- Delete
	The user can delete the shopping cart information through the details interface.

*****************************************************
# RESTful
- Post
	Post request is used for insert.
	Path URL: /api/app/sc_id/:sc_id
	Test: curl -X POST -H "Content-Type: application/json" --data '{"item": "Juice", "sc_id":"SC003"}'localhost:1106/api/app/sc_id/SC003/app/Juice
	
- Get
	Get request is used for find.
	Path URL: /api/app/sc_id/:sc_id
	Test: curl -X GET http://localhost:1106/api/app/sc_id/SC001
	
- Delete
	Delete request is used for deletion.
	Path URL: /api/app/sc_id/:sc_id
	Test: curl -X DELETE localhost:1106/api/app/item/sc_id/SC003
	
- Put
	Put request is used for update.
	Path URL: /api/app/sc_id/:sc_id
	Test: curl -X PUT -H "Content-Type: application/json" --data '{"item": "Shoes"}'localhost:1106/api/app/sc_id/SC002
	curl -X PUT -F "item = Shose"localhost:1106/api/app/sc_id/SC002
	
For all RESTful CRUD services, login should be done at first.

curl -X POST -H "Content-Type: application/json" --data '{"item": "Juice", "sc_id":"SC003"}'localhost:1106/api/app/sc_id/SC003/item/Juice

curl -X GET http://localhost:1106/api/app/sc_id/SC001

curl -X PUT -H "Content-Type: application/json" --data '{"item": "Shoes"}'localhost:1106/api/app/sc_id/SC003
curl -X PUT -F "item = Shose"localhost:1106/api/app/sc_id/SC002
curl -X DELETE localhost:1106/api/app/item/sc_id/SC003
